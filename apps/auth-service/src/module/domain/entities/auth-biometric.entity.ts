import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { BiometricIdVO } from '../value-objects/primitives/biometric-id.vo';

export type BiometricType = 'fingerprint' | 'face' | 'voice' | 'iris';

export interface AuthBiometricEntityProps {
  readonly userId: UserIdVO;
  readonly biometricId: BiometricIdVO;
  readonly type: BiometricType;
  readonly isEnabled: boolean;
  readonly enrolledAt: Date | null;
  readonly lastUsedAt: Date | null;
}

export class AuthBiometricEntity extends BaseEntity<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _biometricId: BiometricIdVO;
  private readonly _type: BiometricType;
  private readonly _isEnabled: boolean;
  private readonly _enrolledAt: Date | null;
  private readonly _lastUsedAt: Date | null;

  private constructor(
    id: UserIdVO,
    props: AuthBiometricEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._biometricId = props.biometricId;
    this._type = props.type;
    this._isEnabled = props.isEnabled;
    this._enrolledAt = props.enrolledAt;
    this._lastUsedAt = props.lastUsedAt;
  }

  static create(props: AuthBiometricEntityProps): AuthBiometricEntity {
    const now = new Date().toISOString();
    return new AuthBiometricEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: AuthBiometricEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthBiometricEntity {
    return new AuthBiometricEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  enable(): AuthBiometricEntity {
    const now = new Date();
    return new AuthBiometricEntity(
      this.id,
      { ...this._toProps(), isEnabled: true, enrolledAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  disable(): AuthBiometricEntity {
    const now = new Date();
    return new AuthBiometricEntity(
      this.id,
      { ...this._toProps(), isEnabled: false },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  recordUsage(): AuthBiometricEntity {
    const now = new Date();
    return new AuthBiometricEntity(
      this.id,
      { ...this._toProps(), lastUsedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get biometricId(): BiometricIdVO { return this._biometricId; }
  get type(): BiometricType { return this._type; }
  get isEnabled(): boolean { return this._isEnabled; }
  get enrolledAt(): Date | null { return this._enrolledAt; }
  get lastUsedAt(): Date | null { return this._lastUsedAt; }

  private _toProps(): AuthBiometricEntityProps {
    return {
      userId: this._userId,
      biometricId: this._biometricId,
      type: this._type,
      isEnabled: this._isEnabled,
      enrolledAt: this._enrolledAt,
      lastUsedAt: this._lastUsedAt,
    };
  }
}
