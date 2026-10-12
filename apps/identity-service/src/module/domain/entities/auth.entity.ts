/**
 * AuthEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 *
 * Invariants:
 *   - Failed attempts cannot be negative
 *   - Locked status requires lockedUntil
 *   - Revoked/expired status is terminal
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { AuthTypeVO } from '../value-objects/primitives/auth-type.vo.js';
import { AuthStatusVO } from '../value-objects/primitives/auth-status.vo.js';
import { AuthProviderVO } from '../value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '../value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '../value-objects/primitives/identifier.vo.js';
import { IpAddressVO } from '../value-objects/primitives/ip-address.vo.js';

import {
  AuthCreatedEvent,
  AuthStatusChangedEvent,
  AuthEmailVerifiedEvent,
  AuthPhoneVerifiedEvent,
  AuthMfaEnabledEvent,
  AuthMfaDisabledEvent,
  AuthPasswordChangedEvent,
} from '../events/auth.events.js';

// ─── Props ──────────────────────────────────
export interface AuthEntityProps {
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
  readonly revokedAt?: string;
  readonly revokedReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

// ─── Entity ─────────────────────────────────
export class AuthEntity extends AggregateRoot<string> {
  private _type: AuthTypeVO;
  private _provider: AuthProviderVO;
  private _method: AuthMethodVO;
  private _status: AuthStatusVO;
  private _identifier: IdentifierVO;
  private _isEmailVerified: boolean;
  private _isPhoneVerified: boolean;
  private _isMfaEnabled: boolean;
  private _failedAttempts: number;
  private _lastLoginAt?: string;
  private _lastLoginIp?: string;
  private _lockedUntil?: string;
  private _revokedAt?: string;
  private _revokedReason?: string;

  private readonly _userId: UserIdVO;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: AuthEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._provider = props.provider;
    this._method = props.method;
    this._status = props.status;
    this._identifier = props.identifier;
    this._isEmailVerified = props.isEmailVerified;
    this._isPhoneVerified = props.isPhoneVerified;
    this._isMfaEnabled = props.isMfaEnabled;
    this._failedAttempts = props.failedAttempts;
    this._lastLoginAt = props.lastLoginAt;
    this._lastLoginIp = props.lastLoginIp;
    this._lockedUntil = props.lockedUntil;
    this._revokedAt = props.revokedAt;
    this._revokedReason = props.revokedReason;
    this._metadata = props.metadata;

    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (this._failedAttempts < 0) {
      throw new ValidationError('failedAttempts cannot be negative', 'failedAttempts');
    }
    if (this._status.isLocked() && !this._lockedUntil) {
      throw new ValidationError(
        'lockedUntil is required when status is locked',
        'lockedUntil',
      );
    }
    if (this._isMfaEnabled && !this._isEmailVerified && !this._isPhoneVerified) {
      throw new ValidationError(
        'MFA requires email or phone verification',
        'isMfaEnabled',
      );
    }
  }

  // ═══════════════ Getters ═══════════════
  get userId(): UserIdVO { return this._userId; }
  get type(): AuthTypeVO { return this._type; }
  get provider(): AuthProviderVO { return this._provider; }
  get method(): AuthMethodVO { return this._method; }
  get status(): AuthStatusVO { return this._status; }
  get identifier(): IdentifierVO { return this._identifier; }
  get isEmailVerified(): boolean { return this._isEmailVerified; }
  get isPhoneVerified(): boolean { return this._isPhoneVerified; }
  get isMfaEnabled(): boolean { return this._isMfaEnabled; }
  get failedAttempts(): number { return this._failedAttempts; }
  get lastLoginAt(): string | undefined { return this._lastLoginAt; }
  get lastLoginIp(): string | undefined { return this._lastLoginIp; }
  get lockedUntil(): string | undefined { return this._lockedUntil; }
  get revokedAt(): string | undefined { return this._revokedAt; }
  get revokedReason(): string | undefined { return this._revokedReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): AuthIdVO { return AuthIdVO.reconstitute(this.id); }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean { return this._status.isPending(); }
  isActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isLocked(): boolean { return this._status.isLocked(); }
  isUnverified(): boolean { return this._status.isUnverified(); }
  isRevoked(): boolean { return this._status.isRevoked(); }
  isExpired(): boolean { return this._status.isExpired(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isUsable(): boolean { return this._status.isUsable(); }
  isFederated(): boolean { return this._type.isFederated(); }

  canLogin(): boolean {
    return this._status.isActive() && !this.isLockedNow();
  }

  isLockedNow(nowMs: number = Date.now()): boolean {
    if (!this._lockedUntil) return false;
    return nowMs < Date.parse(this._lockedUntil);
  }

  // ═══════════════ Business Actions ═══════════════
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = AuthStatusVO.active();
    this._lockedUntil = undefined;
    this.emitStatusChange(from, 'active');
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(now: string = new Date().toISOString(), reason?: string): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = AuthStatusVO.inactive();
    this.emitStatusChange(from, 'inactive', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  lock(
    lockedUntil: string,
    reason: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('locked');
    const from = this._status.value;
    this._status = AuthStatusVO.locked();
    this._lockedUntil = lockedUntil;
    this.emitStatusChange(from, 'locked', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  unlock(now: string = new Date().toISOString()): void {
    if (!this.isLocked()) {
      throw new BusinessRuleError(
        'Auth is not locked',
        'AUTH_NOT_LOCKED',
        { authId: this.id },
      );
    }
    const from = this._status.value;
    this._status = AuthStatusVO.active();
    this._lockedUntil = undefined;
    this._failedAttempts = 0;
    this.emitStatusChange(from, 'active');
    this.touch(now);
    this.incrementVersion();
  }

  revoke(
    reason: string,
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot revoke auth in status "${this._status.value}"`,
        'AUTH_CANNOT_BE_REVOKED',
        { authId: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = AuthStatusVO.revoked();
    this._revokedAt = now;
    this._revokedReason = reason;
    this.emitStatusChange(from, 'revoked', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  recordFailedAttempt(now: string = new Date().toISOString()): void {
    this._failedAttempts += 1;
    this.touch(now);
    this.incrementVersion();
  }

  resetFailedAttempts(now: string = new Date().toISOString()): void {
    this._failedAttempts = 0;
    this.touch(now);
    this.incrementVersion();
  }

  recordLogin(
    ip: IpAddressVO | undefined,
    now: string = new Date().toISOString(),
  ): void {
    this._lastLoginAt = now;
    this._lastLoginIp = ip?.value;
    this._failedAttempts = 0;
    this.touch(now);
    this.incrementVersion();
  }

  markEmailVerified(now: string = new Date().toISOString()): void {
    if (this._isEmailVerified) return;
    this._isEmailVerified = true;
    this.addDomainEvent(
      new AuthEmailVerifiedEvent({
        aggregateId: this.id,
        payload: { authId: this.id, verifiedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markPhoneVerified(now: string = new Date().toISOString()): void {
    if (this._isPhoneVerified) return;
    this._isPhoneVerified = true;
    this.addDomainEvent(
      new AuthPhoneVerifiedEvent({
        aggregateId: this.id,
        payload: { authId: this.id, verifiedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  enableMfa(method: string, now: string = new Date().toISOString()): void {
    if (!this._isEmailVerified && !this._isPhoneVerified) {
      throw new BusinessRuleError(
        'Cannot enable MFA without email or phone verification',
        'MFA_REQUIRES_VERIFICATION',
        { authId: this.id },
      );
    }
    if (this._isMfaEnabled) {
      throw new BusinessRuleError(
        'MFA already enabled',
        'MFA_ALREADY_ENABLED',
        { authId: this.id },
      );
    }
    this._isMfaEnabled = true;
    this.addDomainEvent(
      new AuthMfaEnabledEvent({
        aggregateId: this.id,
        payload: { authId: this.id, method, changedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  disableMfa(method: string, now: string = new Date().toISOString()): void {
    if (!this._isMfaEnabled) {
      throw new BusinessRuleError(
        'MFA is not enabled',
        'MFA_NOT_ENABLED',
        { authId: this.id },
      );
    }
    this._isMfaEnabled = false;
    this.addDomainEvent(
      new AuthMfaDisabledEvent({
        aggregateId: this.id,
        payload: { authId: this.id, method, changedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  changePassword(changedBy: string | undefined, now: string = new Date().toISOString()): void {
    this.addDomainEvent(
      new AuthPasswordChangedEvent({
        aggregateId: this.id,
        payload: {
          authId: this.id,
          userId: this._userId.value,
          changedAt: now,
          changedBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid auth status transition: "${this._status.value}" → "${target}"`,
        'INVALID_AUTH_STATUS_TRANSITION',
        { from: this._status.value, to: target, authId: this.id },
      );
    }
  }

  private emitStatusChange(
    from: string,
    to: string,
    changedBy?: string,
    reason?: string,
  ): void {
    this.addDomainEvent(
      new AuthStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          authId: this.id,
          fromStatus: from,
          toStatus: to,
          changedBy,
          reason,
        },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: AuthIdVO;
    props: Omit<AuthEntityProps, 'status' | 'failedAttempts' | 'isEmailVerified' | 'isPhoneVerified' | 'isMfaEnabled'>;
    now: string;
  }): AuthEntity {
    const entity = new AuthEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: AuthStatusVO.pending(),
        failedAttempts: 0,
        isEmailVerified: false,
        isPhoneVerified: false,
        isMfaEnabled: false,
      },
    );

    entity.addDomainEvent(
      new AuthCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          authId: params.id.value,
          userId: params.props.userId.value,
          type: params.props.type.value,
          provider: params.props.provider.value,
          identifier: params.props.identifier.normalized,
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: AuthEntityProps;
    version?: number;
  }): AuthEntity {
    const entity = new AuthEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
