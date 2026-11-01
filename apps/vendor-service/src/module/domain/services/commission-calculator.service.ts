/**
 * CommissionCalculatorService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Compute commission for an order given vendor configuration
 *  - Support percentage, fixed, hybrid, tiered, category-based
 *  - Apply min/max constraints
 *  - Compute net payout after commission
 *  - Compute refund-adjusted commission
 *  - Compute tax (BD VAT 15% on commission)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/business';
import type { VendorCommissionVO } from '../value-objects/composites/vendor-commission.vo.js';
import { CommissionRateVO } from '../value-objects/primitives/commission-rate.vo.js';

// ─── Commission Calculation Context ───────
export interface CommissionContext {
  readonly orderAmount: number;
  readonly categoryId?: string;
  readonly shippingAmount?: number;
  readonly taxAmount?: number;
  readonly discountAmount?: number;
}

// ─── Commission Breakdown ─────────────────
export interface CommissionBreakdown {
  readonly orderAmount: number;
  readonly taxableAmount: number;
  readonly commissionType: string;
  readonly commissionRate: number | null;
  readonly commissionAmount: number;
  readonly vatAmount: number;
  readonly totalDeduction: number;
  readonly netPayout: number;
  readonly appliedConstraints: readonly string[];
}

// ─── Tier definition for tiered commissions
export interface CommissionTier {
  readonly minAmount: number;
  readonly maxAmount: number | null;
  readonly ratePercent: number;
}

// ─── Constants ────────────────────────────
const VAT_RATE = 0.15; // BD standard VAT
const VAT_EXEMPT_CURRENCIES = new Set(['USD', 'EUR', 'GBP', 'INR', 'JPY']);

export class CommissionCalculatorService {
  // ═══════════════════════════════════════════
  // MAIN CALCULATION
  // ═══════════════════════════════════════════
  /**
   * Commission calculate করো context অনুযায়ী।
   */
  static calculate(
    commission: VendorCommissionVO,
    ctx: CommissionContext,
    currency = 'BDT',
  ): CommissionBreakdown {
    this.validateContext(ctx);

    const taxableAmount = this.computeTaxableAmount(ctx);
    const constraints: string[] = [];

    let commissionAmount = this.computeRawCommission(
      commission,
      taxableAmount,
      ctx.categoryId,
    );

    // Apply min/max constraints
    if (commission.minAmount !== undefined && commissionAmount < commission.minAmount) {
      commissionAmount = commission.minAmount;
      constraints.push(`min_amount_applied:${commission.minAmount}`);
    }
    if (commission.maxAmount !== undefined && commissionAmount > commission.maxAmount) {
      commissionAmount = commission.maxAmount;
      constraints.push(`max_amount_applied:${commission.maxAmount}`);
    }

    const vatAmount = this.computeCommissionVat(commissionAmount, currency);
    const totalDeduction = this.round(commissionAmount + vatAmount);
    const netPayout = this.round(taxableAmount - totalDeduction);

    return {
      orderAmount: this.round(ctx.orderAmount),
      taxableAmount: this.round(taxableAmount),
      commissionType: commission.type.value,
      commissionRate: commission.type.usesPercent() ? commission.rate.percent : null,
      commissionAmount: this.round(commissionAmount),
      vatAmount,
      totalDeduction,
      netPayout,
      appliedConstraints: constraints,
    };
  }

  /**
   * Net payout (commission + VAT সহ) calculate করো।
   */
  static netPayout(
    commission: VendorCommissionVO,
    ctx: CommissionContext,
    currency = 'BDT',
  ): number {
    return this.calculate(commission, ctx, currency).netPayout;
  }

  /**
   * Refund এর জন্য commission adjust করো।
   * Refund full হলে commission-ও full reverse হয়।
   */
  static adjustForRefund(
    commission: VendorCommissionVO,
    ctx: CommissionContext,
    refundAmount: number,
    currency = 'BDT',
  ): CommissionBreakdown {
    if (!Number.isFinite(refundAmount) || refundAmount < 0) {
      throw new BusinessRuleError(
        'refundAmount must be a non-negative finite number',
        'INVALID_REFUND_AMOUNT',
        { refundAmount },
      );
    }
    if (refundAmount > ctx.orderAmount) {
      throw new BusinessRuleError(
        'refundAmount cannot exceed orderAmount',
        'REFUND_EXCEEDS_ORDER',
        { refundAmount, orderAmount: ctx.orderAmount },
      );
    }

    const ratio = ctx.orderAmount === 0 ? 0 : refundAmount / ctx.orderAmount;
    const originalBreakdown = this.calculate(commission, ctx, currency);

    const adjustedCommission = this.round(
      originalBreakdown.commissionAmount * ratio,
    );
    const adjustedVat = this.computeCommissionVat(adjustedCommission, currency);

    return {
      ...originalBreakdown,
      orderAmount: this.round(refundAmount),
      taxableAmount: this.round(originalBreakdown.taxableAmount * ratio),
      commissionAmount: adjustedCommission,
      vatAmount: adjustedVat,
      totalDeduction: this.round(adjustedCommission + adjustedVat),
      netPayout: this.round(
        originalBreakdown.taxableAmount * ratio -
          adjustedCommission -
          adjustedVat,
      ),
    };
  }

  // ═══════════════════════════════════════════
  // TIERED COMMISSION
  // ═══════════════════════════════════════════
  /**
   * Tiered commission calculate করো (progressive)।
   */
  static calculateTiered(
    amount: number,
    tiers: readonly CommissionTier[],
    currency = 'BDT',
  ): { readonly total: number; readonly breakdown: readonly { tier: CommissionTier; amount: number }[] } {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new BusinessRuleError(
        'amount must be a non-negative finite number',
        'INVALID_AMOUNT',
        { amount },
      );
    }
    if (tiers.length === 0) {
      throw new BusinessRuleError(
        'At least one tier is required',
        'NO_TIERS',
      );
    }

    const sorted = [...tiers].sort((a, b) => a.minAmount - b.minAmount);
    const breakdown: { tier: CommissionTier; amount: number }[] = [];
    let total = 0;

    for (const tier of sorted) {
      if (amount <= tier.minAmount) continue;
      const upper = tier.maxAmount ?? Infinity;
      const bandMax = Math.min(amount, upper);
      const bandAmount = Math.max(0, bandMax - tier.minAmount);
      if (bandAmount <= 0) continue;
      const tierContribution = this.round(
        bandAmount * (tier.ratePercent / 100),
      );
      breakdown.push({ tier, amount: tierContribution });
      total += tierContribution;
    }

    return {
      total: this.round(total),
      breakdown,
    };
  }

  // ═══════════════════════════════════════════
  // COMPARISON / SIMULATION
  // ═══════════════════════════════════════════
  /**
   * দুইটি commission config compare করে better কোনটা।
   */
  static compare(
    a: VendorCommissionVO,
    b: VendorCommissionVO,
    ctx: CommissionContext,
  ): {
    readonly aPayout: number;
    readonly bPayout: number;
    readonly betterOption: 'a' | 'b' | 'tie';
    readonly difference: number;
  } {
    const aPayout = this.netPayout(a, ctx);
    const bPayout = this.netPayout(b, ctx);
    const diff = this.round(aPayout - bPayout);

    return {
      aPayout,
      bPayout,
      betterOption: Math.abs(diff) < 0.01 ? 'tie' : diff > 0 ? 'a' : 'b',
      difference: Math.abs(diff),
    };
  }

  /**
   * Flat percent vs. current config এর payout preview।
   */
  static simulatePercentChange(
    commission: VendorCommissionVO,
    newPercent: number,
    ctx: CommissionContext,
  ): {
    readonly currentPayout: number;
    readonly newPayout: number;
    readonly difference: number;
  } {
    const newRate = CommissionRateVO.create(newPercent);
    const currentPayout = this.netPayout(commission, ctx);

    // Build temporary override calculation
    const taxableAmount = this.computeTaxableAmount(ctx);
    const newCommission = newRate.apply(taxableAmount);
    const newVat = this.computeCommissionVat(newCommission);
    const newPayout = this.round(taxableAmount - newCommission - newVat);

    return {
      currentPayout,
      newPayout,
      difference: this.round(newPayout - currentPayout),
    };
  }

  // ═══════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════

  private static computeTaxableAmount(ctx: CommissionContext): number {
    // commission applies on (order - discount); shipping/tax excluded by default
    const discount = ctx.discountAmount ?? 0;
    const base = Math.max(0, ctx.orderAmount - discount);
    // Config: APPLY_ON_SHIPPING and APPLY_ON_TAX — default false, so excluded
    return base;
  }

  private static computeRawCommission(
    commission: VendorCommissionVO,
    taxableAmount: number,
    categoryId?: string,
  ): number {
    // Category override wins
    if (
      categoryId &&
      commission.categoryOverrides &&
      commission.categoryOverrides[categoryId] !== undefined
    ) {
      const pct = commission.categoryOverrides[categoryId]!;
      return this.round(taxableAmount * (pct / 100));
    }

    if (commission.type.isPercentage()) {
      return commission.rate.apply(taxableAmount);
    }
    if (commission.type.isFixed()) {
      return commission.fixedAmount ?? 0;
    }
    if (commission.type.isHybrid()) {
      return this.round(
        commission.rate.apply(taxableAmount) + (commission.fixedAmount ?? 0),
      );
    }
    if (commission.type.isTiered()) {
      // Simplification: treat as percentage of full amount
      return commission.rate.apply(taxableAmount);
    }
    if (commission.type.isCategoryBased()) {
      return commission.rate.apply(taxableAmount);
    }
    return 0;
  }

  private static computeCommissionVat(
    commissionAmount: number,
    currency = 'BDT',
  ): number {
    if (VAT_EXEMPT_CURRENCIES.has(currency.toUpperCase())) return 0;
    return this.round(commissionAmount * VAT_RATE);
  }

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }

  private static validateContext(ctx: CommissionContext): void {
    if (!Number.isFinite(ctx.orderAmount) || ctx.orderAmount < 0) {
      throw new BusinessRuleError(
        'orderAmount must be a non-negative finite number',
        'INVALID_ORDER_AMOUNT',
        { orderAmount: ctx.orderAmount },
      );
    }
    if (ctx.discountAmount !== undefined) {
      if (!Number.isFinite(ctx.discountAmount) || ctx.discountAmount < 0) {
        throw new BusinessRuleError(
          'discountAmount must be a non-negative finite number',
          'INVALID_DISCOUNT',
          { discountAmount: ctx.discountAmount },
        );
      }
      if (ctx.discountAmount > ctx.orderAmount) {
        throw new BusinessRuleError(
          'discountAmount cannot exceed orderAmount',
          'DISCOUNT_EXCEEDS_ORDER',
          { discountAmount: ctx.discountAmount, orderAmount: ctx.orderAmount },
        );
      }
    }
  }

  /**
   * Commission rate এর range validate করো।
   */
  static isRateWithinBounds(rate: number): boolean {
    return rate >= VENDOR_COMMISSION.MIN_PERCENT && rate <= VENDOR_COMMISSION.MAX_PERCENT;
  }

  /**
   * Commission এর percent value (যেকোনো type থেকে)।
   */
  static extractEffectivePercent(commission: VendorCommissionVO): number {
    if (commission.type.usesPercent()) return commission.rate.percent;
    return 0;
  }
}
