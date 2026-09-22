import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CURRENCY } from '@vubon/shared-constants/common';
import { InvalidPayoutAmountError } from '../../errors/payout.errors';

export interface PayoutAmountProps {
  readonly amount: number;
  readonly currency: string;
}

const VALID_CURRENCIES = new Set<string>(Object.values(CURRENCY));

export class PayoutAmountVO extends BaseVO<PayoutAmountProps> {
  private constructor(props: PayoutAmountProps) {
    super(Object.freeze({ ...props }));
  }

  static create(amount: number, currency: string = 'BDT'): PayoutAmountVO {
    if (!Number.isFinite(amount) || amount < 0) {
      throw new InvalidPayoutAmountError(String(amount));
    }
    if (!VALID_CURRENCIES.has(currency)) {
      throw new InvalidPayoutAmountError(`invalid currency: ${currency}`);
    }
    const rounded = Math.round(amount * 100) / 100;
    return new PayoutAmountVO({ amount: rounded, currency });
  }

  get amount(): number {
    return this.value.amount;
  }

  get currency(): string {
    return this.value.currency;
  }

  add(other: PayoutAmountVO): PayoutAmountVO {
    this.assertSameCurrency(other);
    return PayoutAmountVO.create(this.amount + other.amount, this.currency);
  }

  subtract(other: PayoutAmountVO): PayoutAmountVO {
    this.assertSameCurrency(other);
    return PayoutAmountVO.create(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): PayoutAmountVO {
    return PayoutAmountVO.create(this.amount * factor, this.currency);
  }

  private assertSameCurrency(other: PayoutAmountVO): void {
    if (this.currency !== other.currency) {
      throw new InvalidPayoutAmountError(
        `currency mismatch: ${this.currency} vs ${other.currency}`,
      );
    }
  }
}
