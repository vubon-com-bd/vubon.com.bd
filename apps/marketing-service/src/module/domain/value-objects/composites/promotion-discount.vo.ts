import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PromotionDiscountTypeVO } from '../primitives/promotion-discount-type.vo';
import { CampaignBudgetVO } from '../primitives/campaign-budget.vo';

export interface PromotionDiscountProps {
  readonly discountType: PromotionDiscountTypeVO;
  readonly numericValue: number;
  readonly maxDiscount: CampaignBudgetVO | null;
  readonly minPurchase: CampaignBudgetVO | null;
}

export class PromotionDiscountVO extends BaseVO<PromotionDiscountProps> {
  private constructor(props: PromotionDiscountProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: PromotionDiscountProps): PromotionDiscountVO {
    return new PromotionDiscountVO(props);
  }

  get discountType(): PromotionDiscountTypeVO { return this.value.discountType; }
  get value_(): number { return this.value.numericValue; }
  get maxDiscount(): CampaignBudgetVO | null { return this.value.maxDiscount; }
  get minPurchase(): CampaignBudgetVO | null { return this.value.minPurchase; }
}
