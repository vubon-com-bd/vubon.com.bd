/**
 * PayoutCalculatorService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Compute payout fee by method
 *  - Compute net amount after fee
 *  - Compute expected payout date by tier
 *  - Batch multiple settlements into one payout
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';
import type { PayoutMethodValue } from '../value-objects/composites/vendor-payout.vo.js';
export type { PayoutMethodValue };

// ─── Fee configuration by method ──────────
interface FeeConfig {
  readonly flatFee: number;
  readonly percentFee: number;
  readonly minFee: number;
  readonly maxFee: number;
}

const FEE_CONFIG: Record<PayoutMethodValue, FeeConfig> = {
  bank_transfer: { flatFee: 25, percentFee: 0.5, minFee: 25, maxFee: 200 },
  mobile_banking: { flatFee: 10, percentFee: 1.0, minFee: 10, maxFee: 100 },
  paypal: { flatFee: 0, percentFee: 2.5, minFee: 50, maxFee: 500 },
  stripe: { flatFee: 0, percentFee: 2.0, minFee: 50, maxFee: 400 },
  wise: { flatFee: 0, percentFee: 1.5, minFee: 30, maxFee: 300 },
  payoneer: { flatFee: 0, percentFee: 1.8, minFee: 30, maxFee: 350 },
  cash: { flatFee: 0, percentFee: 0, minFee: 0, maxFee: 0 },
  cheque: { flatFee: 20, percentFee: 0, minFee: 20, maxFee: 20 },
};

// ─── Input / Output Types ─────────────────
export interface PayoutCalculationInput {
  readonly amount: number;
  readonly method: PayoutMethodValue;
  readonly currency?: string;
}

export interface PayoutCalculationResult {
  readonly grossAmount: number;
  readonly fee: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly method: PayoutMethodValue;
  readonly feePercent: number;
  readonly isFeeConstrained: boolean;
}

// ─── Cycle Days by Tier ───────────────────
const TIER_PAYOUT_DAYS: Record<string, number> = {
  bronze: 14,
  silver: 10,
  gold: 7,
  platinum: 5,
  diamond: 3,
};

export class PayoutCalculatorService {
  /**
   * Payout এর gross, fee, net calculate করো।
   */
  static calculate(input: PayoutCalculationInput): PayoutCalculationResult {
    this.validateInput(input);

    const config = FEE_CONFIG[input.method];
    if (!config) {
      throw new BusinessRuleError(
        `Unknown payout method: "${input.method}"`,
        'UNKNOWN_PAYOUT_METHOD',
        { method: input.method },
      );
    }

    const rawFee = config.flatFee + (input.amount * config.percentFee) / 100;
    let fee = this.round(rawFee);
    let isFeeConstrained = false;

    if (fee < config.minFee) {
      fee = config.minFee;
      isFeeConstrained = true;
    }
    if (fee > config.maxFee) {
      fee = config.maxFee;
      isFeeConstrained = true;
    }

    // Sanity: fee cannot exceed amount
    if (fee > input.amount) {
      fee = this.round(input.amount * 0.5);
      isFeeConstrained = true;
    }

    const netAmount = this.round(input.amount - fee);
    const feePercent = input.amount === 0
      ? 0
      : this.round((fee / input.amount) * 100);

    return {
      grossAmount: this.round(input.amount),
      fee,
      netAmount,
      currency: input.currency ?? 'BDT',
      method: input.method,
      feePercent,
      isFeeConstrained,
    };
  }

  /**
   * Net amount only (convenience)।
   */
  static netAmount(amount: number, method: PayoutMethodValue): number {
    return this.calculate({ amount, method }).netAmount;
  }

  /**
   * Fee only (convenience)।
   */
  static feeFor(amount: number, method: PayoutMethodValue): number {
    return this.calculate({ amount, method }).fee;
  }

  /**
   * Minimum amount to net at least X (reverse calculation)।
   */
  static amountForNetTarget(
    targetNet: number,
    method: PayoutMethodValue,
  ): number {
    if (!Number.isFinite(targetNet) || targetNet <= 0) {
      throw new BusinessRuleError(
        'targetNet must be a positive finite number',
        'INVALID_TARGET_NET',
        { targetNet },
      );
    }
    const config = FEE_CONFIG[method];
    if (!config) {
      throw new BusinessRuleError(
        `Unknown payout method: "${method}"`,
        'UNKNOWN_PAYOUT_METHOD',
        { method },
      );
    }
    // Solve: target = amount - fee
    // For percentFee = 0: amount = target + flatFee
    // For percentFee > 0: amount = (target + flatFee) / (1 - percentFee/100)
    if (config.percentFee === 0) {
      return this.round(targetNet + config.flatFee);
    }
    const ratio = 1 - config.percentFee / 100;
    return this.round((targetNet + config.flatFee) / ratio);
  }

  /**
   * Payout cycle days based on tier।
   */
  static getPayoutCycleDays(tier: string): number {
    return TIER_PAYOUT_DAYS[tier.toLowerCase()] ?? 14;
  }

  /**
   * Expected payout date (business days অফিস)
   * Simple: tier.payoutDays + processing days (3)
   */
  static expectedPayoutDate(tier: string, fromDate = new Date()): string {
    const days = this.getPayoutCycleDays(tier) + VENDOR_PAYOUT.PROCESSING_DAYS;
    const result = new Date(fromDate.getTime());
    result.setDate(result.getDate() + days);
    return result.toISOString();
  }

  /**
   * Batch settlements sum করো (payout request এর সময়)।
   */
  static batchAmounts(amounts: readonly number[]): {
    readonly total: number;
    readonly count: number;
    readonly average: number;
  } {
    if (amounts.length === 0) {
      return { total: 0, count: 0, average: 0 };
    }
    for (const a of amounts) {
      if (!Number.isFinite(a) || a < 0) {
        throw new BusinessRuleError(
          'All amounts must be non-negative finite numbers',
          'INVALID_BATCH_AMOUNT',
          { amount: a },
        );
      }
    }
    const total = this.round(amounts.reduce((s, a) => s + a, 0));
    return {
      total,
      count: amounts.length,
      average: this.round(total / amounts.length),
    };
  }

  /**
   * Method comparison — same amount different methods।
   */
  static compareMethods(
    amount: number,
    methods: readonly PayoutMethodValue[],
  ): readonly {
    readonly method: PayoutMethodValue;
    readonly fee: number;
    readonly netAmount: number;
    readonly feePercent: number;
  }[] {
    return methods.map((m) => {
      const r = this.calculate({ amount, method: m });
      return {
        method: m,
        fee: r.fee,
        netAmount: r.netAmount,
        feePercent: r.feePercent,
      };
    });
  }

  /**
   * Best method pick করো (lowest fee)।
   */
  static bestMethod(
    amount: number,
    methods: readonly PayoutMethodValue[],
  ): PayoutMethodValue {
    if (methods.length === 0) {
      throw new BusinessRuleError(
        'At least one method is required',
        'NO_METHODS',
      );
    }
    const compared = this.compareMethods(amount, methods);
    const sorted = [...compared].sort((a, b) => a.fee - b.fee);
    return sorted[0]!.method;
  }

  // ═══════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }

  private static validateInput(input: PayoutCalculationInput): void {
    if (!Number.isFinite(input.amount) || input.amount < 0) {
      throw new BusinessRuleError(
        'amount must be a non-negative finite number',
        'INVALID_AMOUNT',
        { amount: input.amount },
      );
    }
    if (input.currency && input.currency.length !== 3) {
      throw new BusinessRuleError(
        'currency must be a 3-char ISO code',
        'INVALID_CURRENCY',
        { currency: input.currency },
      );
    }
  }
}
