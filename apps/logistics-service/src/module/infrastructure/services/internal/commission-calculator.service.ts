/**
 * CommissionCalculatorService — Vendor + courier commission
 * @module logistics-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';

export interface CommissionInput {
  readonly baseAmount: number;
  readonly commissionRate: number;  // 0.00 → 1.00 (e.g., 0.05 = 5%)
  readonly fixedFee?: number;        // optional flat fee
  readonly minAmount?: number;       // floor
  readonly maxAmount?: number;       // cap
}

export interface CommissionResult {
  readonly commission: number;
  readonly netAmount: number;
  readonly rate: number;
  readonly fixedFee: number;
}

@Injectable()
export class CommissionCalculatorService {
  /**
   * Calculate commission on a base amount.
   * - Applies rate, adds fixed fee
   * - Enforces min/max caps
   * - Returns commission + net (post-commission) amount
   */
  calculate(input: CommissionInput): CommissionResult {
    const { baseAmount, commissionRate, fixedFee = 0, minAmount, maxAmount } = input;

    if (baseAmount < 0) throw new Error('baseAmount must be >= 0');
    if (commissionRate < 0 || commissionRate > 1) throw new Error('commissionRate must be 0..1');

    let commission = baseAmount * commissionRate + fixedFee;

    if (minAmount !== undefined && commission < minAmount) commission = minAmount;
    if (maxAmount !== undefined && commission > maxAmount) commission = maxAmount;

    // Cannot exceed base amount
    if (commission > baseAmount) commission = baseAmount;

    commission = this.round2(commission);
    const netAmount = this.round2(baseAmount - commission);

    return {
      commission,
      netAmount,
      rate: commissionRate,
      fixedFee,
    };
  }

  private round2(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
