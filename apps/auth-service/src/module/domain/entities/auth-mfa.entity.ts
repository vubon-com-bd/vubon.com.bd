/**
 * AuthMfaEntity — MFA configuration for a user (aggregate)
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { MfaSecretVO } from '../value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../value-objects/primitives/mfa-status.vo';
import { MfaAlreadyEnabledError } from '../errors/mfa.errors';

export interface AuthMfaEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly type: MfaTypeVO;
  readonly status: MfaStatusVO;
  readonly secret?: MfaSecretVO;
  readonly enrolledAt?: number;
  readonly verifiedAt?: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthMfaEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _type: MfaTypeVO;
  private _status: MfaStatusVO;
  private _secret?: MfaSecretVO;
  private _enrolledAt?: number;
  private _verifiedAt?: number;

  private constructor(props: AuthMfaEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._secret = props.secret;
    this._enrolledAt = props.enrolledAt;
    this._verifiedAt = props.verifiedAt;
  }

  static create(props: AuthMfaEntityProps): AuthMfaEntity {
    return new AuthMfaEntity(props);
  }

  get type(): MfaTypeVO { return this._type; }
  get status(): MfaStatusVO { return this._status; }
  get secret(): MfaSecretVO | undefined { return this._secret; }

  isEnabled(): boolean { return this._status.isActive(); }

  beginEnrollment(at: number, secret?: MfaSecretVO): void {
    if (this.isEnabled()) {
      throw new MfaAlreadyEnabledError(this.userId);
    }
    this._secret = secret;
    this._enrolledAt = at;
    this._status = MfaStatusVO.of('pending');
  }

  confirmEnrollment(at: number): void {
    if (this._status.value !== 'pending') {
      throw new Error('MFA not pending enrollment');
    }
    this._verifiedAt = at;
    this._status = MfaStatusVO.enabled();
  }

  disable(): void {
    this._status = MfaStatusVO.disabled();
    this._secret = undefined;
    this._verifiedAt = undefined;
  }
}
