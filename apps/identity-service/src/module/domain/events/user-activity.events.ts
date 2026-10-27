/**
 * User Activity Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const USER_ACTIVITY_EVENT_TYPE = {
  RECORDED: 'identity.user.activity_recorded',
  SECURITY_EVENT: 'identity.user.security_event',
} as const;

export interface UserActivityRecordedPayload {
  readonly activityId: string;
  readonly userId: string;
  readonly type: string;
  readonly category: string;
  readonly occurredAt: string;
}

export interface UserSecurityEventPayload {
  readonly userId: string;
  readonly eventType: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly occurredAt: string;
}

export class UserActivityRecordedEvent extends BaseDomainEvent<
  typeof USER_ACTIVITY_EVENT_TYPE.RECORDED,
  UserActivityRecordedPayload
> {
  constructor(p: BaseEventParams<UserActivityRecordedPayload>) {
    super(buildEventParams(USER_ACTIVITY_EVENT_TYPE.RECORDED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserSecurityEventEvent extends BaseDomainEvent<
  typeof USER_ACTIVITY_EVENT_TYPE.SECURITY_EVENT,
  UserSecurityEventPayload
> {
  constructor(p: BaseEventParams<UserSecurityEventPayload>) {
    super(buildEventParams(USER_ACTIVITY_EVENT_TYPE.SECURITY_EVENT, AUTH_AGGREGATE_TYPE.USER, p));
  }
}
