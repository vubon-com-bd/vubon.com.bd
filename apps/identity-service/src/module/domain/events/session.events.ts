/**
 * Session Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const SESSION_EVENT_TYPE = {
  CREATED: 'identity.session.created',
  REFRESHED: 'identity.session.refreshed',
  IDLE_TIMEOUT: 'identity.session.idle_timeout',
  EXPIRED: 'identity.session.expired',
  REVOKED: 'identity.session.revoked',
  LOGOUT: 'identity.session.logout',
} as const;

export interface SessionCreatedPayload {
  readonly sessionId: string;
  readonly authId: string;
  readonly userId: string;
  readonly deviceId?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly createdAt: string;
  readonly expiresAt: string;
}

export interface SessionRefreshedPayload {
  readonly sessionId: string;
  readonly refreshedAt: string;
  readonly newExpiresAt: string;
}

export interface SessionEndedPayload {
  readonly sessionId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly endedAt: string;
}

export class SessionCreatedEvent extends BaseDomainEvent<
  typeof SESSION_EVENT_TYPE.CREATED,
  SessionCreatedPayload
> {
  constructor(p: BaseEventParams<SessionCreatedPayload>) {
    super(buildEventParams(SESSION_EVENT_TYPE.CREATED, AUTH_AGGREGATE_TYPE.SESSION, p));
  }
}

export class SessionRefreshedEvent extends BaseDomainEvent<
  typeof SESSION_EVENT_TYPE.REFRESHED,
  SessionRefreshedPayload
> {
  constructor(p: BaseEventParams<SessionRefreshedPayload>) {
    super(buildEventParams(SESSION_EVENT_TYPE.REFRESHED, AUTH_AGGREGATE_TYPE.SESSION, p));
  }
}

export class SessionExpiredEvent extends BaseDomainEvent<
  typeof SESSION_EVENT_TYPE.EXPIRED,
  SessionEndedPayload
> {
  constructor(p: BaseEventParams<SessionEndedPayload>) {
    super(buildEventParams(SESSION_EVENT_TYPE.EXPIRED, AUTH_AGGREGATE_TYPE.SESSION, p));
  }
}

export class SessionRevokedEvent extends BaseDomainEvent<
  typeof SESSION_EVENT_TYPE.REVOKED,
  SessionEndedPayload
> {
  constructor(p: BaseEventParams<SessionEndedPayload>) {
    super(buildEventParams(SESSION_EVENT_TYPE.REVOKED, AUTH_AGGREGATE_TYPE.SESSION, p));
  }
}

export class SessionLogoutEvent extends BaseDomainEvent<
  typeof SESSION_EVENT_TYPE.LOGOUT,
  SessionEndedPayload
> {
  constructor(p: BaseEventParams<SessionEndedPayload>) {
    super(buildEventParams(SESSION_EVENT_TYPE.LOGOUT, AUTH_AGGREGATE_TYPE.SESSION, p));
  }
}
