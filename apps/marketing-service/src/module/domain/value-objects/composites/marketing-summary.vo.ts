import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { CampaignIdVO } from '../primitives/campaign-id.vo';
import { PromotionIdVO } from '../primitives/promotion-id.vo';
import { LoyaltyIdVO } from '../primitives/loyalty-id.vo';
import { LeadIdVO } from '../primitives/lead-id.vo';

export interface MarketingSummaryProps {
  readonly userId: UserIdVO;
  readonly campaignIds: readonly CampaignIdVO[];
  readonly promotionIds: readonly PromotionIdVO[];
  readonly loyaltyId: LoyaltyIdVO | null;
  readonly leadIds: readonly LeadIdVO[];
}

export class MarketingSummaryVO extends BaseVO<MarketingSummaryProps> {
  private constructor(props: MarketingSummaryProps) {
    super(Object.freeze({
      ...props,
      campaignIds: Object.freeze([...props.campaignIds]),
      promotionIds: Object.freeze([...props.promotionIds]),
      leadIds: Object.freeze([...props.leadIds]),
    }));
  }

  static create(props: MarketingSummaryProps): MarketingSummaryVO {
    return new MarketingSummaryVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get campaignIds(): readonly CampaignIdVO[] { return this.value.campaignIds; }
  get promotionIds(): readonly PromotionIdVO[] { return this.value.promotionIds; }
  get loyaltyId(): LoyaltyIdVO | null { return this.value.loyaltyId; }
  get leadIds(): readonly LeadIdVO[] { return this.value.leadIds; }
}
