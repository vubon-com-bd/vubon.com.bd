import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AffiliateIdVO } from '../primitives/affiliate-id.vo';
import { AffiliateCodeVO } from '../primitives/affiliate-code.vo';
import { AffiliateStatusVO } from '../primitives/affiliate-status.vo';
import { AffiliateCommissionVO } from '../primitives/affiliate-commission.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface AffiliateProps {
  readonly id: AffiliateIdVO;
  readonly userId: UserIdVO;
  readonly code: AffiliateCodeVO;
  readonly status: AffiliateStatusVO;
  readonly commission: AffiliateCommissionVO;
  readonly approvedAt: Date | null;
}

export class AffiliateVO extends BaseVO<AffiliateProps> {
  private constructor(props: AffiliateProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AffiliateProps): AffiliateVO {
    return new AffiliateVO(props);
  }

  get id(): AffiliateIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get code(): AffiliateCodeVO { return this.value.code; }
  get status(): AffiliateStatusVO { return this.value.status; }
  get commission(): AffiliateCommissionVO { return this.value.commission; }
  get approvedAt(): Date | null { return this.value.approvedAt; }
}
