/**
 * SettlementCalculatorService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Build settlement from order/refund/adjustment records
 *  - Reconcile net amount
 *  - Determine settlement cycle
 *  - Decide settlement eligibility
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_SETTLEMENT } from '@vubon/shared-constants/business';

export type SettlementCycleValue =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly';

// ─── Order Record ─────────────────────────
export interface SettlementOrderRecord {
  readonly orderId: string;
  readonly orderAmount: number;
  readonly commissionAmount: number;
  readonly netAmount: number;
  readonly completedAt: string;
}

// ─── Refund Record ────────────────────────
export interface SettlementRefundRecord {
  readonly refundId: string;
  readonly amount: number;
  readonly refundedAt: string;
}

// ─── Adjustment Record ────────────────────
export interface SettlementAdjustmentRecord {
  readonly adjustmentId: string;
  readonly amount: number; // positive or negative
  readonly reason: string;
  readonly appliedAt: string;
}

// ─── Build Input ──────────────────────────
export interface SettlementBuildInput {
  readonly orders: readonly SettlementOrderRecord[];
  readonly refunds: readonly SettlementRefundRecord[];
  readonly adjustments: readonly SettlementAdjustmentRecord[];
  readonly currency: string;
}

// ─── Build Result ─────────────────────────
export interface SettlementBuildResult {
  readonly grossAmount: number;
  readonly commissionAmount: number;
  readonly refundAmount: number;
  readonly adjustmentAmount: number;
  readonly netAmount: number;
  readonly orderCount: number;
  readonly currency: string;
  readonly averageOrderValue: number;
  readonly effectiveCommissionRate: number;
}

// ─── Eligibility Context ──────────────────
export interface SettlementEligibilityContext {
  readonly netAmount: number;
  readonly daysSincePeriodEnd: number;
  readonly pendingSettlementCount: number;
  readonly hasActiveSuspension: boolean;
  readonly hasFailedDocuments: boolean;
}

// ─── Eligibility Result ───────────────────
export interface SettlementEligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
  readonly warnings: readonly string[];
}

// ─── Cycle by Tier ────────────────────────
const TIER_CYCLES: Record<string, SettlementCycleValue> = {
  bronze: 'monthly',
  silver: 'biweekly',
  gold: 'weekly',
  platinum: 'weekly',
  diamond: 'daily',
};

export class SettlementCalculatorService {
  /**
   * Order/refund/adjustment list থেকে settlement build করো।
   */
  static build(input: SettlementBuildInput): SettlementBuildResult {
    this.validateBuildInput(input);

    const grossAmount = this.round(
      input.orders.reduce((s, o) => s + o.orderAmount, 0),
    );
    const commissionAmount = this.round(
      input.orders.reduce((s, o) => s + o.commissionAmount, 0),
    );
    const refundAmount = this.round(
      input.refunds.reduce((s, r) => s + r.amount, 0),
    );
    const adjustmentAmount = this.round(
      input.adjustments.reduce((s, a) => s + a.amount, 0),
    );

    const netAmount = this.round(
      grossAmount - commissionAmount - refundAmount + adjustmentAmount,
    );

    const orderCount = input.orders.length;
    const averageOrderValue =
      orderCount === 0 ? 0 : this.round(grossAmount / orderCount);
    const effectiveCommissionRate =
      grossAmount === 0
        ? 0
        : this.round((commissionAmount / grossAmount) * 10000) / 100;

    return {
      grossAmount,
      commissionAmount,
      refundAmount,
      adjustmentAmount,
      netAmount,
      orderCount,
      currency: input.currency,
      averageOrderValue,
      effectiveCommissionRate,
    };
  }

  /**
   * Reconcile করে netAmount verify করো।
   */
  static reconcile(
    input: {
      readonly grossAmount: number;
      readonly commissionAmount: number;
      readonly refundAmount: number;
      readonly adjustmentAmount: number;
      readonly netAmount: number;
    },
  ): { readonly valid: boolean; readonly expected: number; readonly difference: number } {
    const expected = this.round(
      input.grossAmount -
        input.commissionAmount -
        input.refundAmount +
        input.adjustmentAmount,
    );
    const difference = this.round(input.netAmount - expected);
    return {
      valid: Math.abs(difference) < 0.01,
      expected,
      difference,
    };
  }

  /**
   * Settlement eligibility check।
   */
  static checkEligibility(
    ctx: SettlementEligibilityContext,
  ): SettlementEligibilityResult {
    this.validateEligibilityContext(ctx);

    const reasons: string[] = [];
    const warnings: string[] = [];

    if (ctx.netAmount < VENDOR_SETTLEMENT.MIN_AMOUNT) {
      reasons.push(
        `Settlement amount ${ctx.netAmount} below minimum ${VENDOR_SETTLEMENT.MIN_AMOUNT}`,
      );
    }

    if (ctx.daysSincePeriodEnd < VENDOR_SETTLEMENT.HOLD_PERIOD_DAYS) {
      const remaining = VENDOR_SETTLEMENT.HOLD_PERIOD_DAYS - ctx.daysSincePeriodEnd;
      reasons.push(
        `Settlement on hold for ${remaining} more day(s)`,
      );
    }

    if (ctx.hasActiveSuspension) {
      reasons.push('Vendor has active suspension');
    }
    if (ctx.hasFailedDocuments) {
      reasons.push('Vendor has failed/expired documents');
    }

    if (ctx.pendingSettlementCount > 0) {
      warnings.push(
        `${ctx.pendingSettlementCount} settlement(s) already pending`,
      );
    }

    return {
      eligible: reasons.length === 0,
      reasons,
      warnings,
    };
  }

  static assertEligible(ctx: SettlementEligibilityContext): void {
    const result = this.checkEligibility(ctx);
    if (!result.eligible) {
      throw new BusinessRuleError(
        `Settlement not eligible: ${result.reasons.join('; ')}`,
        'SETTLEMENT_NOT_ELIGIBLE',
        { netAmount: ctx.netAmount, reasons: result.reasons },
      );
    }
  }

  /**
   * Vendor tier থেকে settlement cycle বের করো।
   */
  static getCycleForTier(tier: string): SettlementCycleValue {
    return TIER_CYCLES[tier.toLowerCase()] ?? 'monthly';
  }

  /**
   * Settlement cycle থেকে period dates বের করো।
   */
  static computePeriodDates(
    cycle: SettlementCycleValue,
    referenceDate = new Date(),
  ): { readonly periodStart: string; readonly periodEnd: string } {
    const ref = new Date(referenceDate.getTime());
    ref.setHours(0, 0, 0, 0);

    const periodEnd = new Date(ref.getTime());
    const periodStart = new Date(ref.getTime());

    if (cycle === 'daily') {
      periodStart.setDate(periodEnd.getDate() - 1);
    } else if (cycle === 'weekly') {
      periodStart.setDate(periodEnd.getDate() - 7);
    } else if (cycle === 'biweekly') {
      periodStart.setDate(periodEnd.getDate() - 14);
    } else if (cycle === 'monthly') {
      periodStart.setMonth(periodEnd.getMonth() - 1);
    }

    return {
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
    };
  }

  /**
   * Cycle এর days count।
   */
  static cycleDays(cycle: SettlementCycleValue): number {
    switch (cycle) {
      case 'daily': return 1;
      case 'weekly': return 7;
      case 'biweekly': return 14;
      case 'monthly': return 30;
    }
  }

  /**
   * Settlement আরো বেশি frequent করার জন্য tier upgrade suggestion।
   */
  static suggestCycleUpgrade(
    currentTier: string,
    currentCycle: SettlementCycleValue,
  ): { readonly recommended: SettlementCycleValue | null; readonly reason: string } {
    const tierCycle = this.getCycleForTier(currentTier);
    if (tierCycle === currentCycle) {
      return { recommended: null, reason: 'Current cycle matches tier' };
    }
    const cycleWeight: Record<SettlementCycleValue, number> = {
      daily: 0,
      weekly: 1,
      biweekly: 2,
      monthly: 3,
    };
    if (cycleWeight[tierCycle] < cycleWeight[currentCycle]) {
      return {
        recommended: tierCycle,
        reason: `Tier "${currentTier}" qualifies for faster cycle "${tierCycle}"`,
      };
    }
    return { recommended: null, reason: 'Current cycle is optimal for tier' };
  }

  // ═══════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }

  private static validateBuildInput(input: SettlementBuildInput): void {
    if (!input.currency || input.currency.length !== 3) {
      throw new BusinessRuleError(
        'currency must be a 3-char ISO code',
        'INVALID_CURRENCY',
        { currency: input.currency },
      );
    }
    for (const o of input.orders) {
      if (!Number.isFinite(o.orderAmount) || o.orderAmount < 0) {
        throw new BusinessRuleError(
          'orderAmount must be non-negative',
          'INVALID_ORDER_AMOUNT',
          { orderId: o.orderId },
        );
      }
    }
    for (const r of input.refunds) {
      if (!Number.isFinite(r.amount) || r.amount < 0) {
        throw new BusinessRuleError(
          'refund amount must be non-negative',
          'INVALID_REFUND_AMOUNT',
          { refundId: r.refundId },
        );
      }
    }
    for (const a of input.adjustments) {
      if (!Number.isFinite(a.amount)) {
        throw new BusinessRuleError(
          'adjustment amount must be a finite number',
          'INVALID_ADJUSTMENT_AMOUNT',
          { adjustmentId: a.adjustmentId },
        );
      }
    }
  }

  private static validateEligibilityContext(
    ctx: SettlementEligibilityContext,
  ): void {
    if (!Number.isFinite(ctx.netAmount)) {
      throw new BusinessRuleError(
        'netAmount must be a finite number',
        'INVALID_NET_AMOUNT',
        { netAmount: ctx.netAmount },
      );
    }
    if (!Number.isInteger(ctx.daysSincePeriodEnd) || ctx.daysSincePeriodEnd < 0) {
      throw new BusinessRuleError(
        'daysSincePeriodEnd must be a non-negative integer',
        'INVALID_DAYS_SINCE_PERIOD_END',
        { daysSincePeriodEnd: ctx.daysSincePeriodEnd },
      );
    }
  }
}
