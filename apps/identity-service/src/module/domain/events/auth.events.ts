/**
 * Auth Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

// ─── Event Type Constants ───────────────────
export const AUTH_EVENT_TYPE = {
  CREATED: 'identity.auth.created',
  ACTIVATED: 'identity.auth.activated',
  DEACTIVATED: 'identity.auth.deactivated',
  LOCKED: 'identity.auth.locked',
  UNLOCKED: 'identity.auth.unlocked',
  REVOKED: 'identity.auth.revoked',
  EXPIRED: 'identity.auth.expired',
  STATUS_CHANGED: 'identity.auth.status_changed',
  EMAIL_VERIFIED: 'identity.auth.email_verified',
  PHONE_VERIFIED: 'identity.auth.phone_verified',
  MFA_ENABLED: 'identity.auth.mfa_enabled',
  MFA_DISABLED: 'identity.auth.mfa_disabled',
  PASSWORD_CHANGED: 'identity.auth.password_changed',
} as const;

// ─── Payload Interfaces ─────────────────────
export interface AuthCreatedPayload {
  readonly authId: string;
  readonly userId: string;
  readonly type: string;
  readonly provider: string;
  readonly identifier: string;
  readonly createdAt: string;
}

export interface AuthStatusChangedPayload {
  readonly authId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface AuthVerifiedPayload {
  readonly authId: string;
  readonly verifiedAt: string;
}

export interface AuthMfaPayload {
  readonly authId: string;
  readonly method: string;
  readonly changedAt: string;
}

export interface AuthPasswordChangedPayload {
  readonly authId: string;
  readonly userId: string;
  readonly changedAt: string;
  readonly changedBy?: string;
}

// ─── Concrete Events ────────────────────────
export class AuthCreatedEvent extends BaseDomainEvent<
  typeof AUTH_EVENT_TYPE.CREATED,
  AuthCreatedPayload
> {
  constructor(p: BaseEventParams<AuthCreatedPayload>) {
    super(buildEventParams(AUTH_EVENT_TYPE.CREATED, AUTH_AGGREGATE_TYPE.AUTH, p));
  }
}

export class AuthStatusChangedEvent extends BaseDomainEvent<
  typeof AUTH_EVENT_TYPE.STATUS_CHANGED,
  AuthStatusChangedPayload
> {
  constructor(p: BaseEventParams<AuthStatusChangedPayload>) {
    super(buildEventParams(AUTH_EVENT_TYPE.STATUS_CHANGED, AUTH_AGGREGATE_TYPE.AUTH, p));
  }
}

export class AuthEmailVerifiedEvent extends BaseDomainEvent<
  typeof AUTH_EVENT_TYPE.EMAIL_VERIFIED,
  AuthVerifiedPayload
> {
  constructor(p: BaseEventParams<AuthVerifiedPayload>) {
    super(buildEventParams(AUTH_EVENT_TYPE.EMAIL_VERIFIED, AUTH_AGGREGATE_TYPE.AUTH, p));
  }
}

export class AuthPhoneVerifiedEvent extends BaseDomainEvent<
  typeof AUTH_EVENT_TYPE.PHONE_VERIFIED,
  AuthVerifiedPayload
> {
  constructor(p: BaseEventParams<AuthVerifiedPayload>) {
    super(buildEventParams(AUTH_EVENT_TYPE.PHONE_VERIFIED, AUTH_AGGREGATE_TYPE.AUTH, p));
  }
}

export class AuthMfaEnabledEvent extends BaseDomainEvent<
  typeof AUTH_EVENT_TYPE.MFA_ENABLED,
  AuthMfaPayload
> {
  constructor(p: BaseEventParams<AuthMfaPayload>) {
    super(buildEventParams(AUTH_EVENT_TYPE.MFA_ENABLED, AUTH_AGGREGATE_TYPE.AUTH, p));
  }
}

export class AuthMfaDisabledEvent extends BaseDomainEvent<
  typeof AUTH_EVENT_TYPE.MFA_DISABLED,
  AuthMfaPayload
> {
  constructor(p: BaseEventParams<AuthMfaPayload>) {
    super(buildEventParams(AUTH_EVENT_TYPE.MFA_DISABLED, AUTH_AGGREGATE_TYPE.AUTH, p));
  }
}

export class AuthPasswordChangedEvent extends BaseDomainEvent<
  typeof AUTH_EVENT_TYPE.PASSWORD_CHANGED,
  AuthPasswordChangedPayload
> {
  constructor(p: BaseEventParams<AuthPasswordChangedPayload>) {
    super(buildEventParams(AUTH_EVENT_TYPE.PASSWORD_CHANGED, AUTH_AGGREGATE_TYPE.AUTH, p));
  }
}
