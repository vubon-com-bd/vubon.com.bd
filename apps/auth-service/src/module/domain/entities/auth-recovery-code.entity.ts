import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { RecoveryCodeVO } from '../value-objects/primitives/recovery-code.vo';
import { RecoveryCodeStatusVO } from '../value-objects/primitives/recovery-code-status.vo';

export interface AuthRecoveryCodeEntityProps {
  readonly userId: UserIdVO;
  readonly code: RecoveryCodeVO;
  readonly status: RecoveryCodeStatusVO;
  readonly usedAt: Date | null;
}

export class AuthRecoveryCodeEntity extends BaseEntity<string> {
  private readonly _userId: UserIdVO;
  private readonly _code: RecoveryCodeVO;
  private readonly _status: RecoveryCodeStatusVO;
  private readonly _usedAt: Date | null;

  private constructor(
    id: string,
    props: AuthRecoveryCodeEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._code = props.code;
    this._status = props.status;
    this._usedAt = props.usedAt;
  }

  static create(props: AuthRecoveryCodeEntityProps): AuthRecoveryCodeEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new AuthRecoveryCodeEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: AuthRecoveryCodeEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthRecoveryCodeEntity {
    return new AuthRecoveryCodeEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markUsed(): AuthRecoveryCodeEntity {
    const now = new Date();
    return new AuthRecoveryCodeEntity(
      this.id,
      {
        ...this._toProps(),
        status: RecoveryCodeStatusVO.create('used'),
        usedAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get code(): RecoveryCodeVO { return this._code; }
  get status(): RecoveryCodeStatusVO { return this._status; }
  get usedAt(): Date | null { return this._usedAt; }

  get isUsed(): boolean {
    return this._usedAt !== null || this._status.value === 'used';
  }

  private _toProps(): AuthRecoveryCodeEntityProps {
    return {
      userId: this._userId,
      code: this._code,
      status: this._status,
      usedAt: this._usedAt,
    };
  }
}
