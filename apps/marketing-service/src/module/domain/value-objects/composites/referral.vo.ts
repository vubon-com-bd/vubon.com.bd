import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReferralIdVO } from '../primitives/referral-id.vo';
import { ReferralCodeVO } from '../primitives/referral-code.vo';
import { ReferralStatusVO } from '../primitives/referral-status.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface ReferralProps {
  readonly id: ReferralIdVO;
  readonly referrerId: UserIdVO;
  readonly refereeId: UserIdVO | null;
  readonly code: ReferralCodeVO;
  readonly status: ReferralStatusVO;
  readonly convertedAt: Date | null;
}

export class ReferralVO extends BaseVO<ReferralProps> {
  private constructor(props: ReferralProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ReferralProps): ReferralVO {
    return new ReferralVO(props);
  }

  get id(): ReferralIdVO { return this.value.id; }
  get referrerId(): UserIdVO { return this.value.referrerId; }
  get refereeId(): UserIdVO | null { return this.value.refereeId; }
  get code(): ReferralCodeVO { return this.value.code; }
  get status(): ReferralStatusVO { return this.value.status; }
  get convertedAt(): Date | null { return this.value.convertedAt; }
}
