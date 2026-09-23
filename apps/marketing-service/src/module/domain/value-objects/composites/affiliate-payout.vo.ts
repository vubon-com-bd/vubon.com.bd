import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AffiliatePayoutIdVO } from '../primitives/affiliate-payout-id.vo';
import { AffiliatePayoutAmountVO } from '../primitives/affiliate-payout-amount.vo';
import { AffiliatePayoutStatusVO } from '../primitives/affiliate-payout-status.vo';
import { AffiliateIdVO } from '../primitives/affiliate-id.vo';

export interface AffiliatePayoutProps {
  readonly id: AffiliatePayoutIdVO;
  readonly affiliateId: AffiliateIdVO;
  readonly amount: AffiliatePayoutAmountVO;
  readonly status: AffiliatePayoutStatusVO;
  readonly processedAt: Date | null;
}

export class AffiliatePayoutVO extends BaseVO<AffiliatePayoutProps> {
  private constructor(props: AffiliatePayoutProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AffiliatePayoutProps): AffiliatePayoutVO {
    return new AffiliatePayoutVO(props);
  }

  get id(): AffiliatePayoutIdVO { return this.value.id; }
  get affiliateId(): AffiliateIdVO { return this.value.affiliateId; }
  get amount(): AffiliatePayoutAmountVO { return this.value.amount; }
  get status(): AffiliatePayoutStatusVO { return this.value.status; }
  get processedAt(): Date | null { return this.value.processedAt; }
}
