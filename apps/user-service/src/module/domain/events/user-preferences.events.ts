/**
 * UserPreferences domain events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

interface EventParams<TPayload> {
  readonly id: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

export interface PreferenceUpdatedPayload {
  readonly userId: string;
  readonly key: string;
  readonly value: string;
}

export class PreferenceUpdatedEvent extends BaseDomainEvent<
  'preference.updated',
  PreferenceUpdatedPayload
> {
  constructor(p: EventParams<PreferenceUpdatedPayload>) {
    super({
      id: p.id,
      type: 'preference.updated',
      aggregateId: p.aggregateId,
      aggregateType: 'UserPreferences',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface PreferencesResetPayload {
  readonly userId: string;
  readonly resetAt: string;
}

export class PreferencesResetEvent extends BaseDomainEvent<
  'preferences.reset',
  PreferencesResetPayload
> {
  constructor(p: EventParams<PreferencesResetPayload>) {
    super({
      id: p.id,
      type: 'preferences.reset',
      aggregateId: p.aggregateId,
      aggregateType: 'UserPreferences',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}
