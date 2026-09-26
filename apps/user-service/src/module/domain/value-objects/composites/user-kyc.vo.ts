import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { KycIdVO } from '../primitives/kyc-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { KycDocumentVO } from '../primitives/kyc-document.vo';
import { KycStatusVO } from '../primitives/kyc-status.vo';

export interface UserKycProps {
  readonly id: KycIdVO;
  readonly userId: UserIdVO;
  readonly document: KycDocumentVO;
  readonly status: KycStatusVO;
  readonly submittedAt: Date | null;
  readonly reviewedAt: Date | null;
  readonly rejectionReason: string | null;
}

export class UserKycVO extends BaseVO<UserKycProps> {
  private constructor(props: UserKycProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserKycProps): UserKycVO {
    return new UserKycVO(props);
  }

  get id(): KycIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get document(): KycDocumentVO { return this.value.document; }
  get status(): KycStatusVO { return this.value.status; }
  get submittedAt(): Date | null { return this.value.submittedAt; }
  get reviewedAt(): Date | null { return this.value.reviewedAt; }
  get rejectionReason(): string | null { return this.value.rejectionReason; }

  get isVerified(): boolean {
    return this.value.status.isVerified();
  }
}
