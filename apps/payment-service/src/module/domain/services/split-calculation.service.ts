/**
 * SplitCalculationService
 * @module payment-service/domain/services
 *
 * Business rules:
 *   - Split percentages must total 100 (±0.01)
 *   - Fixed amounts must total the original amount
 *   - Equal split: last receiver takes rounding remainder
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import type { SplitTypeVO } from '@domain/primitives/split-type.vo';

export interface SplitReceiverInput {
  readonly receiverId: string;
  readonly percentage?: number;
  readonly fixedAmount?: number;
}

export interface SplitCalculationInput {
  readonly totalAmount: number;
  readonly currency: string;
  readonly type: SplitTypeVO;
  readonly receivers: readonly SplitReceiverInput[];
}

export interface SplitReceiverResult {
  readonly receiverId: string;
  readonly amount: number;
  readonly percentage: number;
  readonly currency: string;
}

export interface SplitCalculationResult {
  readonly totalAmount: number;
  readonly currency: string;
  readonly receivers: readonly SplitReceiverResult[];
}

export class SplitCalculationService {
  static calculate(input: SplitCalculationInput): SplitCalculationResult {
    const { totalAmount, currency, type, receivers } = input;

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      throw new ValidationError('totalAmount must be positive', 'totalAmount');
    }
    if (receivers.length < 2) {
      throw new ValidationError('At least 2 receivers required for split', 'receivers');
    }

    if (type.isPercentage()) return this.byPercentage(totalAmount, currency, receivers);
    if (type.isFixed()) return this.byFixed(totalAmount, currency, receivers);
    if (type.isEqual()) return this.byEqual(totalAmount, currency, receivers);
    return this.byCustom(totalAmount, currency, receivers);
  }

  private static byPercentage(
    total: number,
    currency: string,
    receivers: readonly SplitReceiverInput[],
  ): SplitCalculationResult {
    const sum = receivers.reduce((s, r) => s + (r.percentage ?? 0), 0);
    if (Math.abs(sum - 100) > 0.01) {
      throw new BusinessRuleError(
        `Split percentages must total 100 (got ${sum})`,
        'SPLIT_PERCENTAGE_SUM',
        { sum },
      );
    }
    const result = receivers.map((r) => {
      const pct = r.percentage ?? 0;
      return {
        receiverId: r.receiverId,
        amount: this.round((total * pct) / 100),
        percentage: pct,
        currency,
      };
    });
    return this.reconcile(total, currency, result);
  }

  private static byFixed(
    total: number,
    currency: string,
    receivers: readonly SplitReceiverInput[],
  ): SplitCalculationResult {
    const sum = receivers.reduce((s, r) => s + (r.fixedAmount ?? 0), 0);
    if (Math.abs(sum - total) > 0.01) {
      throw new BusinessRuleError(
        `Split fixed amounts (${sum}) must equal total (${total})`,
        'SPLIT_FIXED_SUM',
        { sum, total },
      );
    }
    return {
      totalAmount: total,
      currency,
      receivers: receivers.map((r) => ({
        receiverId: r.receiverId,
        amount: r.fixedAmount ?? 0,
        percentage: this.round(((r.fixedAmount ?? 0) / total) * 100),
        currency,
      })),
    };
  }

  private static byEqual(
    total: number,
    currency: string,
    receivers: readonly SplitReceiverInput[],
  ): SplitCalculationResult {
    const n = receivers.length;
    const per = this.round(total / n);
    const result = receivers.map((r) => ({
      receiverId: r.receiverId,
      amount: per,
      percentage: this.round(100 / n),
      currency,
    }));
    return this.reconcile(total, currency, result);
  }

  private static byCustom(
    total: number,
    currency: string,
    receivers: readonly SplitReceiverInput[],
  ): SplitCalculationResult {
    const result = receivers.map((r) => ({
      receiverId: r.receiverId,
      amount: r.fixedAmount ?? this.round((total * (r.percentage ?? 0)) / 100),
      percentage: r.percentage ?? this.round(((r.fixedAmount ?? 0) / total) * 100),
      currency,
    }));
    return this.reconcile(total, currency, result);
  }

  private static reconcile(
    total: number,
    currency: string,
    receivers: SplitReceiverResult[],
  ): SplitCalculationResult {
    const sum = receivers.reduce((s, r) => s + r.amount, 0);
    const diff = this.round(total - sum);
    if (Math.abs(diff) > 0 && receivers.length > 0) {
      const last = receivers[receivers.length - 1]!;
      (last as unknown as { amount: number }).amount = this.round(last.amount + diff);
    }
    return { totalAmount: total, currency, receivers };
  }

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
