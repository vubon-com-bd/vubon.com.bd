/**
 * AuthRecoveryCodeVO — Snapshot of a recovery code entry
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { RecoveryCodeVO } from '../primitives/recovery-code.vo.js';
import { RecoveryCodeStatusVO } from '../primitives/recovery-code-status.vo.js';

export interface AuthRecoveryCodeVOProps {
  readonly codeId: string;
  readonly userId: UserIdVO;
  readonly code: RecoveryCodeVO;
  readonly status: RecoveryCodeStatusVO;
  readonly createdAt: number;
  readonly usedAt?: number;
}

export class AuthRecoveryCodeVO extends BaseVO<AuthRecoveryCodeVOProps> {
  private constructor(props: AuthRecoveryCodeVOProps) {
    super(props);
  }

  static of(props: AuthRecoveryCodeVOProps): AuthRecoveryCodeVO {
    return new AuthRecoveryCodeVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get status(): RecoveryCodeStatusVO { return this.value.status; }

  isUsable(): boolean { return this.value.status.canBeUsed(); }
}
