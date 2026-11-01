/* istanbul ignore file -- pure event declarations */
/**
 * Preference Domain Events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const PREFERENCE_EVENT_TYPE = {
  CREATED: 'notification.preference.created',
  UPDATED: 'notification.preference.updated',
  QUIET_HOURS_CHANGED: 'notification.preference.quiet_hours_changed',
  CHANNEL_OPTED_OUT: 'notification.preference.channel_opted_out',
  CHANNEL_OPTED_IN: 'notification.preference.channel_opted_in',
  LOCKED: 'notification.preference.locked',
} as const;

export interface PreferenceCreatedPayload {
  readonly userId: string;
  readonly timezone: string;
  readonly locale: string;
  readonly createdAt: string;
}

export interface PreferenceUpdatedPayload {
  readonly userId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface QuietHoursChangedPayload {
  readonly userId: string;
  readonly enabled: boolean;
  readonly start?: number;
  readonly end?: number;
  readonly changedAt: string;
}

export interface ChannelOptedOutPayload {
  readonly userId: string;
  readonly channel: string;
  readonly category?: string;
  readonly optedOutAt: string;
}

export interface ChannelOptedInPayload {
  readonly userId: string;
  readonly channel: string;
  readonly category?: string;
  readonly optedInAt: string;
}

export interface PreferenceLockedPayload {
  readonly userId: string;
  readonly reason?: string;
  readonly lockedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: NOTIFICATION_AGGREGATE_TYPE.PREFERENCE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class PreferenceCreatedEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.CREATED,
  PreferenceCreatedPayload
> {
  constructor(p: EventParams<PreferenceCreatedPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.CREATED, p));
  }
}

export class PreferenceUpdatedEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.UPDATED,
  PreferenceUpdatedPayload
> {
  constructor(p: EventParams<PreferenceUpdatedPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.UPDATED, p));
  }
}

export class QuietHoursChangedEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.QUIET_HOURS_CHANGED,
  QuietHoursChangedPayload
> {
  constructor(p: EventParams<QuietHoursChangedPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.QUIET_HOURS_CHANGED, p));
  }
}

export class ChannelOptedOutEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.CHANNEL_OPTED_OUT,
  ChannelOptedOutPayload
> {
  constructor(p: EventParams<ChannelOptedOutPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.CHANNEL_OPTED_OUT, p));
  }
}

export class ChannelOptedInEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.CHANNEL_OPTED_IN,
  ChannelOptedInPayload
> {
  constructor(p: EventParams<ChannelOptedInPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.CHANNEL_OPTED_IN, p));
  }
}

export class PreferenceLockedEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.LOCKED,
  PreferenceLockedPayload
> {
  constructor(p: EventParams<PreferenceLockedPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.LOCKED, p));
  }
}
