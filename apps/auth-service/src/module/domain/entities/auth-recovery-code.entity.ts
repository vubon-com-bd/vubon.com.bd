/**
 * AuthRecoveryCodeEntity — One-time recovery code
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { RecoveryCodeVO } from '../value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../value-objects/primitives/recovery-code-status.vo';

export interface AuthRecoveryCodeEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly code: RecoveryCodeVO;
  readonly status: RecoveryCodeStatusVO;
  readonly usedAt?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthRecoveryCodeEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _code: RecoveryCodeVO;
  private _status: RecoveryCodeStatusVO;
  private _usedAt?: number;

  private constructor(props: AuthRecoveryCodeEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._code = props.code;
    this._status = props.status;
    this._usedAt = props.usedAt;
  }

  static create(props: AuthRecoveryCodeEntityProps): AuthRecoveryCodeEntity {
    return new AuthRecoveryCodeEntity(props);
  }

  // === Getters ===
  get code(): RecoveryCodeVO { return this._code; }
  get status(): RecoveryCodeStatusVO { return this._status; }
  get usedAt(): number | undefined { return this._usedAt; }

  // === Business logic ===
  isUsable(): boolean { return this._status.canBeUsed(); }

  use(at: number): void {
    if (!this.isUsable()) throw new Error('Recovery code already used');
    this._usedAt = at;
    this._status = RecoveryCodeStatusVO.of('used');
  }
}
