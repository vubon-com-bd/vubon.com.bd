import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { RecoveryCodeVO } from '../primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../primitives/recovery-code-status.vo';

export interface AuthRecoveryCodeProps {
  readonly userId: UserIdVO;
  readonly code: RecoveryCodeVO;
  readonly status: RecoveryCodeStatusVO;
  readonly usedAt: Date | null;
  readonly createdAt: Date;
}

export class AuthRecoveryCodeVO extends BaseVO<AuthRecoveryCodeProps> {
  private constructor(props: AuthRecoveryCodeProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthRecoveryCodeProps): AuthRecoveryCodeVO {
    return new AuthRecoveryCodeVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get code(): RecoveryCodeVO { return this.value.code; }
  get status(): RecoveryCodeStatusVO { return this.value.status; }
  get usedAt(): Date | null { return this.value.usedAt; }
  get createdAt(): Date { return this.value.createdAt; }

  get isUsed(): boolean {
    return this.value.usedAt !== null || this.value.status.value === 'used';
  }
}
