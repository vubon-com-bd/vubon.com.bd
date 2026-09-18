import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface UserKycProps {
  readonly userId: UserIdVO;
  readonly status: 'pending' | 'submitted' | 'verified' | 'rejected';
  readonly documentType: string;
  readonly documentNumber: string;
  readonly documentUrl: string;
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

  get userId(): UserIdVO { return this.value.userId; }
  get status(): UserKycProps['status'] { return this.value.status; }
  get documentType(): string { return this.value.documentType; }
  get documentNumber(): string { return this.value.documentNumber; }
  get documentUrl(): string { return this.value.documentUrl; }
  get submittedAt(): Date | null { return this.value.submittedAt; }
  get reviewedAt(): Date | null { return this.value.reviewedAt; }
  get rejectionReason(): string | null { return this.value.rejectionReason; }

  get isVerified(): boolean {
    return this.value.status === 'verified';
  }
}
