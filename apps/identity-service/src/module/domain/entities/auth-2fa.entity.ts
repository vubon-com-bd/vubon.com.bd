/**
 * AuthTwoFactorEntity — AggregateRoot
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { TwoFactorMethodVO } from '../value-objects/primitives/twofa-method.vo.js';
import { TwoFactorStatusVO } from '../value-objects/primitives/twofa-status.vo.js';

export interface AuthTwoFactorEntityProps {
  readonly authId: AuthIdVO;
  readonly primaryMethod: TwoFactorMethodVO;
  readonly backupMethods: readonly TwoFactorMethodVO[];
  status: TwoFactorStatusVO;
  secret?: string;
  verified: boolean;
  verifiedAt?: string;
  enabledAt?: string;
  disabledAt?: string;
  failedAttempts: number;
  maxAttempts: number;
}

export class AuthTwoFactorEntity extends AggregateRoot<string> {
  private props: AuthTwoFactorEntityProps;

  private constructor(id: string, createdAt: string, updatedAt: string, props: AuthTwoFactorEntityProps) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  get authId(): AuthIdVO { return this.props.authId; }
  get primaryMethod(): TwoFactorMethodVO { return this.props.primaryMethod; }
  get backupMethods(): readonly TwoFactorMethodVO[] { return this.props.backupMethods; }
  get status(): TwoFactorStatusVO { return this.props.status; }
  get secret(): string | undefined { return this.props.secret; }
  get verified(): boolean { return this.props.verified; }
  get verifiedAt(): string | undefined { return this.props.verifiedAt; }
  get enabledAt(): string | undefined { return this.props.enabledAt; }
  get disabledAt(): string | undefined { return this.props.disabledAt; }
  get failedAttempts(): number { return this.props.failedAttempts; }
  get maxAttempts(): number { return this.props.maxAttempts; }

  isEnabled(): boolean { return this.props.status.isEnabled() && this.props.verified; }
  isOperational(): boolean { return this.isEnabled(); }

  markVerified(now: string = new Date().toISOString()): void {
    if (this.props.verified) return;
    this.props = { ...this.props, verified: true, verifiedAt: now };
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  enable(now: string = new Date().toISOString()): void {
    if (!this.props.verified) {
      throw new BusinessRuleError(
        '2FA must be verified before enabling',
        'TWO_FACTOR_NOT_VERIFIED',
        { authId: this.props.authId.value },
      );
    }
    if (this.props.status.isEnabled()) return;
    this.props = { ...this.props, status: TwoFactorStatusVO.enabled(), enabledAt: now };
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  disable(now: string = new Date().toISOString()): void {
    if (!this.props.status.isEnabled()) return;
    this.props = { ...this.props, status: TwoFactorStatusVO.disabled(), disabledAt: now };
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  recordFailedAttempt(now: string = new Date().toISOString()): void {
    const next = this.props.failedAttempts + 1;
    if (next >= this.props.maxAttempts) {
      this.props = { ...this.props, failedAttempts: next, status: TwoFactorStatusVO.locked() };
    } else {
      this.props = { ...this.props, failedAttempts: next };
    }
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  resetFailedAttempts(): void {
    this.props = { ...this.props, failedAttempts: 0 };
  }

  static create(params: {
    id: string;
    authId: AuthIdVO;
    primaryMethod: TwoFactorMethodVO;
    backupMethods?: readonly TwoFactorMethodVO[];
    secret?: string;
    maxAttempts?: number;
    now: string;
  }): AuthTwoFactorEntity {
    return new AuthTwoFactorEntity(params.id, params.now, params.now, {
      authId: params.authId,
      primaryMethod: params.primaryMethod,
      backupMethods: params.backupMethods ?? [],
      status: TwoFactorStatusVO.pending(),
      secret: params.secret,
      verified: false,
      failedAttempts: 0,
      maxAttempts: params.maxAttempts ?? 5,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: AuthTwoFactorEntityProps;
    version?: number;
  }): AuthTwoFactorEntity {
    const entity = new AuthTwoFactorEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
