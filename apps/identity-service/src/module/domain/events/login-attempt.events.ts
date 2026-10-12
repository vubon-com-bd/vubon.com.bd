/**
 * Login Attempt Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const LOGIN_ATTEMPT_EVENT_TYPE = {
  SUCCEEDED: 'login_attempt.succeeded',
  FAILED: 'login_attempt.failed',
  BLOCKED: 'login_attempt.blocked',
} as const;

export interface LoginAttemptSucceededPayload {
  readonly attemptId: string;
  readonly userId: string;
  readonly identifier: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly attemptedAt: string;
}

export interface LoginAttemptFailedPayload {
  readonly attemptId: string;
  readonly identifier: string;
  readonly reason: string;
  readonly failureCount: number;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly attemptedAt: string;
}

export interface LoginAttemptBlockedPayload {
  readonly attemptId: string;
  readonly identifier: string;
  readonly reason: string;
  readonly blockedAt: string;
}

export class LoginAttemptSucceededEvent extends BaseDomainEvent<
  typeof LOGIN_ATTEMPT_EVENT_TYPE.SUCCEEDED,
  LoginAttemptSucceededPayload
> {
  constructor(p: BaseEventParams<LoginAttemptSucceededPayload>) {
    super(buildEventParams(LOGIN_ATTEMPT_EVENT_TYPE.SUCCEEDED, AUTH_AGGREGATE_TYPE.LOGIN_ATTEMPT, p));
  }
}

export class LoginAttemptFailedEvent extends BaseDomainEvent<
  typeof LOGIN_ATTEMPT_EVENT_TYPE.FAILED,
  LoginAttemptFailedPayload
> {
  constructor(p: BaseEventParams<LoginAttemptFailedPayload>) {
    super(buildEventParams(LOGIN_ATTEMPT_EVENT_TYPE.FAILED, AUTH_AGGREGATE_TYPE.LOGIN_ATTEMPT, p));
  }
}

export class LoginAttemptBlockedEvent extends BaseDomainEvent<
  typeof LOGIN_ATTEMPT_EVENT_TYPE.BLOCKED,
  LoginAttemptBlockedPayload
> {
  constructor(p: BaseEventParams<LoginAttemptBlockedPayload>) {
    super(buildEventParams(LOGIN_ATTEMPT_EVENT_TYPE.BLOCKED, AUTH_AGGREGATE_TYPE.LOGIN_ATTEMPT, p));
  }
}
