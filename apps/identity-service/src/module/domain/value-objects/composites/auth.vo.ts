/**
 * AuthVO — Composite of Auth identity
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { AuthTypeVO } from '../primitives/auth-type.vo.js';
import { AuthStatusVO } from '../primitives/auth-status.vo.js';
import { AuthProviderVO } from '../primitives/auth-provider.vo.js';
import { AuthMethodVO } from '../primitives/auth-method.vo.js';
import { IdentifierVO } from '../primitives/identifier.vo.js';

export interface AuthVOProps {
  readonly id: AuthIdVO;
  readonly userId: UserIdVO;
  readonly type: AuthTypeVO;
  readonly provider: AuthProviderVO;
  readonly method: AuthMethodVO;
  readonly status: AuthStatusVO;
  readonly identifier: IdentifierVO;
  readonly isEmailVerified: boolean;
  readonly isPhoneVerified: boolean;
  readonly isMfaEnabled: boolean;
  readonly failedAttempts: number;
  readonly lastLoginAt?: string;
  readonly lastLoginIp?: string;
  readonly lockedUntil?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class AuthVO extends BaseVO<AuthVOProps> {
  private constructor(props: AuthVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: AuthVOProps): AuthVO {
    const vo = new AuthVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: AuthVOProps): AuthVO {
    return new AuthVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.failedAttempts < 0) {
      throw new ValidationError('failedAttempts cannot be negative', 'failedAttempts');
    }
    if (v.isMfaEnabled && !v.isEmailVerified && !v.isPhoneVerified) {
      throw new ValidationError(
        'MFA can only be enabled when email or phone is verified',
        'isMfaEnabled',
      );
    }
  }

  // Getters
  get id(): AuthIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): AuthTypeVO { return this.value.type; }
  get provider(): AuthProviderVO { return this.value.provider; }
  get method(): AuthMethodVO { return this.value.method; }
  get status(): AuthStatusVO { return this.value.status; }
  get identifier(): IdentifierVO { return this.value.identifier; }
  get isEmailVerified(): boolean { return this.value.isEmailVerified; }
  get isPhoneVerified(): boolean { return this.value.isPhoneVerified; }
  get isMfaEnabled(): boolean { return this.value.isMfaEnabled; }
  get failedAttempts(): number { return this.value.failedAttempts; }
  get lastLoginAt(): string | undefined { return this.value.lastLoginAt; }
  get lastLoginIp(): string | undefined { return this.value.lastLoginIp; }
  get lockedUntil(): string | undefined { return this.value.lockedUntil; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // Business predicates
  isActive(): boolean { return this.status.isActive(); }
  isUsable(): boolean { return this.status.isUsable(); }
  isLocked(): boolean { return this.status.isLocked(); }
  isFederated(): boolean { return this.type.isFederated(); }
  isFullyVerified(): boolean { return this.isEmailVerified && this.isPhoneVerified; }
  hasAnyVerification(): boolean { return this.isEmailVerified || this.isPhoneVerified; }
  hasFailedAttempts(): boolean { return this.failedAttempts > 0; }
}
