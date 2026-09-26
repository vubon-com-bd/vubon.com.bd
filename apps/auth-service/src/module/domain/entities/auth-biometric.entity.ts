/**
 * AuthBiometricEntity — Biometric enrollment
 * @module auth-service/domain/entities
 *
 * NOTE: BiometricKind is defined in the composite VO (single source of
 * truth) and re-exported here for convenience.
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { BiometricIdVO } from '../value-objects/primitives/biometric-id.vo';
import type { BiometricKind } from '../value-objects/composites/auth-biometric.vo';

export type { BiometricKind };

export interface AuthBiometricEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly biometricId: BiometricIdVO;
  readonly kind: BiometricKind;
  readonly deviceId?: string;
  readonly enrolledAt: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthBiometricEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _biometricId: BiometricIdVO;
  private _kind: BiometricKind;
  private _deviceId?: string;
  private _enrolledAt: number;

  private constructor(props: AuthBiometricEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._biometricId = props.biometricId;
    this._kind = props.kind;
    this._deviceId = props.deviceId;
    this._enrolledAt = props.enrolledAt;
  }

  static create(props: AuthBiometricEntityProps): AuthBiometricEntity {
    return new AuthBiometricEntity(props);
  }

  get kind(): BiometricKind { return this._kind; }
  get biometricId(): BiometricIdVO { return this._biometricId; }
  get deviceId(): string | undefined { return this._deviceId; }
  get enrolledAt(): number { return this._enrolledAt; }

  isDeviceBound(): boolean { return this._deviceId !== undefined; }

  rebindTo(deviceId: string): void { this._deviceId = deviceId; }
}
