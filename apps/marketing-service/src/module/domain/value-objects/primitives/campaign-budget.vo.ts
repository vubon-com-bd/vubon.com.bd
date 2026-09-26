import { MoneyVO } from '@vubon/shared-kernel/domain/primitives/money.vo';
import type { CurrencyCode } from '@vubon/shared-types/common';

export class CampaignBudgetVO {
  private constructor(private readonly money: MoneyVO) {}

  static create(amount: number, currency: CurrencyCode = 'BDT' as CurrencyCode): CampaignBudgetVO {
    if (amount < 0) {
      throw new Error('CampaignBudget cannot be negative');
    }
    return new CampaignBudgetVO(MoneyVO.of(amount, currency));
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

  add(other: CampaignBudgetVO): CampaignBudgetVO {
    const sum = this.money.add(other.money_);
    return CampaignBudgetVO.create(sum.amount, sum.currency);
  }
}
