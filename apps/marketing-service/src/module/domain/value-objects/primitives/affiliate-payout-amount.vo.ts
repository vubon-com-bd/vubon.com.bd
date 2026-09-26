import { MoneyVO } from '@vubon/shared-kernel/domain/primitives/money.vo';
import type { CurrencyCode } from '@vubon/shared-types/common';

export class AffiliatePayoutAmountVO {
  private constructor(private readonly money: MoneyVO) {}

  static create(amount: number, currency: CurrencyCode = 'BDT' as CurrencyCode): AffiliatePayoutAmountVO {
    if (amount < 0) {
      throw new Error('AffiliatePayoutAmount cannot be negative');
    }
    return new AffiliatePayoutAmountVO(MoneyVO.of(amount, currency));
  }

  get amount(): number {
    return this.money.amount;
  }

  get currency(): CurrencyCode {
    return this.money.currency;
  }

  get money_(): MoneyVO {
    return this.money;
  }
}
