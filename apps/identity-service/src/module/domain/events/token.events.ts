/**
 * Token Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const TOKEN_EVENT_TYPE = {
  ISSUED: 'token.issued',
  REFRESHED: 'token.refreshed',
  REVOKED: 'token.revoked',
  EXPIRED: 'token.expired',
  REUSED: 'token.reused',
  RESET_REQUESTED: 'token.reset_requested',
  RESET_COMPLETED: 'token.reset_completed',
  VERIFY_REQUESTED: 'token.verify_requested',
  VERIFY_COMPLETED: 'token.verify_completed',
} as const;

export interface TokenIssuedPayload {
  readonly tokenId: string;
  readonly userId: string;
  readonly sessionId: string;
  readonly tokenType: string;
  readonly issuedAt: string;
  readonly expiresAt: number;
}

export interface TokenRevokedPayload {
  readonly tokenId: string;
  readonly userId: string;
  readonly tokenType: string;
  readonly reason: string;
  readonly revokedAt: string;
}

export interface TokenReusedPayload {
  readonly tokenId: string;
  readonly userId: string;
  readonly originalIssuedAt: string;
  readonly detectedAt: string;
}

export class TokenIssuedEvent extends BaseDomainEvent<
  typeof TOKEN_EVENT_TYPE.ISSUED,
  TokenIssuedPayload
> {
  constructor(p: BaseEventParams<TokenIssuedPayload>) {
    super(buildEventParams(TOKEN_EVENT_TYPE.ISSUED, AUTH_AGGREGATE_TYPE.TOKEN, p));
  }
}

export class TokenRefreshedEvent extends BaseDomainEvent<
  typeof TOKEN_EVENT_TYPE.REFRESHED,
  TokenIssuedPayload
> {
  constructor(p: BaseEventParams<TokenIssuedPayload>) {
    super(buildEventParams(TOKEN_EVENT_TYPE.REFRESHED, AUTH_AGGREGATE_TYPE.TOKEN, p));
  }
}

export class TokenRevokedEvent extends BaseDomainEvent<
  typeof TOKEN_EVENT_TYPE.REVOKED,
  TokenRevokedPayload
> {
  constructor(p: BaseEventParams<TokenRevokedPayload>) {
    super(buildEventParams(TOKEN_EVENT_TYPE.REVOKED, AUTH_AGGREGATE_TYPE.TOKEN, p));
  }
}

export class TokenReusedEvent extends BaseDomainEvent<
  typeof TOKEN_EVENT_TYPE.REUSED,
  TokenReusedPayload
> {
  constructor(p: BaseEventParams<TokenReusedPayload>) {
    super(buildEventParams(TOKEN_EVENT_TYPE.REUSED, AUTH_AGGREGATE_TYPE.TOKEN, p));
  }
}
