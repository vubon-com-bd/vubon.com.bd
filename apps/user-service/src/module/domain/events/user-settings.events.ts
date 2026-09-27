/**
 * UserSettings domain events
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

export interface SettingsUpdatedPayload {
  readonly userId: string;
  readonly updatedKeys: readonly string[];
}

export class SettingsUpdatedEvent extends BaseDomainEvent<
  'settings.updated',
  SettingsUpdatedPayload
> {
  constructor(p: EventParams<SettingsUpdatedPayload>) {
    super({
      id: p.id,
      type: 'settings.updated',
      aggregateId: p.aggregateId,
      aggregateType: 'UserSettings',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

export interface SettingsResetPayload {
  readonly userId: string;
  readonly resetAt: string;
}

export class SettingsResetEvent extends BaseDomainEvent<
  'settings.reset',
  SettingsResetPayload
> {
  constructor(p: EventParams<SettingsResetPayload>) {
    super({
      id: p.id,
      type: 'settings.reset',
      aggregateId: p.aggregateId,
      aggregateType: 'UserSettings',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}
