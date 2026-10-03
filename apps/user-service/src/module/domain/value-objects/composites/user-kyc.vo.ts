/**
 * UserKycVO — Composite VO
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { KycIdVO } from '../primitives/kyc-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { KycDocumentVO } from '../primitives/kyc-document.vo.js';
import { KycStatusVO } from '../primitives/kyc-status.vo.js';
import { ActivityTimestampVO } from '../primitives/activity-timestamp.vo.js';

export interface UserKycVOProps {
  readonly id: KycIdVO;
  readonly userId: UserIdVO;
  readonly document: KycDocumentVO;
  readonly status: KycStatusVO;
  readonly submittedAt: ActivityTimestampVO | null;
  readonly verifiedAt: ActivityTimestampVO | null;
}

export class UserKycVO extends BaseVO<UserKycVOProps> {
  private constructor(props: UserKycVOProps) {
    super(props);
  }

  static create(props: UserKycVOProps): UserKycVO {
    if (!props.id) throw new Error('UserKycVO: id required');
    if (!props.userId) throw new Error('UserKycVO: userId required');
    return new UserKycVO(props);
  }

  get id(): KycIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get document(): KycDocumentVO { return this.value.document; }
  get status(): KycStatusVO { return this.value.status; }
  get submittedAt(): ActivityTimestampVO | null { return this.value.submittedAt; }
  get verifiedAt(): ActivityTimestampVO | null { return this.value.verifiedAt; }

  isVerified(): boolean {
    return this.value.status.isApproved() && this.value.verifiedAt !== null;
  }

  isPending(): boolean {
    return this.value.status.isPending();
  }

  wasSubmitted(): boolean {
    return this.value.submittedAt !== null;
  }
}
