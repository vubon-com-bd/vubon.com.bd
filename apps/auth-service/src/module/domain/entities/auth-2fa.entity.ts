import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export type TwoFaMethod = 'totp' | 'sms' | 'email' | 'backup_code';

export interface Auth2FaEntityProps {
  readonly userId: UserIdVO;
  readonly isEnabled: boolean;
  readonly method: TwoFaMethod;
  readonly backupCodesRemaining: number;
  readonly enabledAt: Date | null;
}

export class Auth2FaEntity extends BaseEntity<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _isEnabled: boolean;
  private readonly _method: TwoFaMethod;
  private readonly _backupCodesRemaining: number;
  private readonly _enabledAt: Date | null;

  private constructor(
    id: UserIdVO,
    props: Auth2FaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._isEnabled = props.isEnabled;
    this._method = props.method;
    this._backupCodesRemaining = props.backupCodesRemaining;
    this._enabledAt = props.enabledAt;
  }

  static create(props: Auth2FaEntityProps): Auth2FaEntity {
    const now = new Date().toISOString();
    return new Auth2FaEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: Auth2FaEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): Auth2FaEntity {
    return new Auth2FaEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  enable(method: TwoFaMethod): Auth2FaEntity {
    const now = new Date();
    return new Auth2FaEntity(
      this.id,
      {
        ...this._toProps(),
        isEnabled: true,
        method,
        enabledAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  disable(): Auth2FaEntity {
    const now = new Date();
    return new Auth2FaEntity(
      this.id,
      { ...this._toProps(), isEnabled: false },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get isEnabled(): boolean { return this._isEnabled; }
  get method(): TwoFaMethod { return this._method; }
  get backupCodesRemaining(): number { return this._backupCodesRemaining; }
  get enabledAt(): Date | null { return this._enabledAt; }

  private _toProps(): Auth2FaEntityProps {
    return {
      userId: this._userId,
      isEnabled: this._isEnabled,
      method: this._method,
      backupCodesRemaining: this._backupCodesRemaining,
      enabledAt: this._enabledAt,
    };
  }
}
