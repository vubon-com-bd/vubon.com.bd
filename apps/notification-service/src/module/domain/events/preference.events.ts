/**
 * Preference domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PREFERENCE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const PREFERENCE_EVENT_TYPE = {
  CREATED: 'preference.created',
  UPDATED: 'preference.updated',
  CHANNEL_TOGGLED: 'preference.channel_toggled',
  CATEGORY_TOGGLED: 'preference.category_toggled',
  QUIET_HOURS_UPDATED: 'preference.quiet_hours_updated',
  OPTED_OUT: 'preference.opted_out',
  OPTED_IN: 'preference.opted_in',
} as const;

export interface PreferenceCreatedPayload {
  readonly preferenceId: string;
  readonly userId: string;
}

export interface PreferenceUpdatedPayload {
  readonly preferenceId: string;
  readonly userId: string;
  readonly changedFields: readonly string[];
}

export interface PreferenceChannelToggledPayload {
  readonly preferenceId: string;
  readonly userId: string;
  readonly channel: string;
  readonly enabled: boolean;
}

export interface PreferenceCategoryToggledPayload {
  readonly preferenceId: string;
  readonly userId: string;
  readonly category: string;
  readonly enabled: boolean;
}

export interface PreferenceQuietHoursUpdatedPayload {
  readonly preferenceId: string;
  readonly userId: string;
  readonly startHour: number;
  readonly endHour: number;
  readonly timezone: string;
}

export interface PreferenceOptedOutPayload {
  readonly preferenceId: string;
  readonly userId: string;
  readonly scope: string;
  readonly reason?: string;
}

export interface PreferenceOptedInPayload {
  readonly preferenceId: string;
  readonly userId: string;
  readonly scope: string;
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
    aggregateType: PREFERENCE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
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

export class PreferenceChannelToggledEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.CHANNEL_TOGGLED,
  PreferenceChannelToggledPayload
> {
  constructor(p: EventParams<PreferenceChannelToggledPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.CHANNEL_TOGGLED, p));
  }
}

export class PreferenceCategoryToggledEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.CATEGORY_TOGGLED,
  PreferenceCategoryToggledPayload
> {
  constructor(p: EventParams<PreferenceCategoryToggledPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.CATEGORY_TOGGLED, p));
  }
}

export class PreferenceQuietHoursUpdatedEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.QUIET_HOURS_UPDATED,
  PreferenceQuietHoursUpdatedPayload
> {
  constructor(p: EventParams<PreferenceQuietHoursUpdatedPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.QUIET_HOURS_UPDATED, p));
  }
}

export class PreferenceOptedOutEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.OPTED_OUT,
  PreferenceOptedOutPayload
> {
  constructor(p: EventParams<PreferenceOptedOutPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.OPTED_OUT, p));
  }
}

export class PreferenceOptedInEvent extends BaseDomainEvent<
  typeof PREFERENCE_EVENT_TYPE.OPTED_IN,
  PreferenceOptedInPayload
> {
  constructor(p: EventParams<PreferenceOptedInPayload>) {
    super(buildParams(PREFERENCE_EVENT_TYPE.OPTED_IN, p));
  }
}
