/**
 * Device domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { DEVICE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DEVICE_EVENT_TYPE = {
  REGISTERED: 'device.registered',
  TOKEN_REFRESHED: 'device.token_refreshed',
  UNREGISTERED: 'device.unregistered',
  BLOCKED: 'device.blocked',
  INVALIDATED: 'device.invalidated',
  REACTIVATED: 'device.reactivated',
} as const;

export interface DeviceRegisteredPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly type: string;
  readonly platform: string;
  readonly hasToken: boolean;
  readonly appVersion?: string;
  readonly osVersion?: string;
}

export interface DeviceTokenRefreshedPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly previousTokenMasked?: string;
  readonly newTokenMasked: string;
}

export interface DeviceUnregisteredPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly reason?: string;
}

export interface DeviceBlockedPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly reason: string;
  readonly blockedBy?: string;
}

export interface DeviceInvalidatedPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly reason: string;
}

export interface DeviceReactivatedPayload {
  readonly deviceId: string;
  readonly userId: string;
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
    aggregateType: DEVICE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DeviceRegisteredEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.REGISTERED,
  DeviceRegisteredPayload
> {
  constructor(p: EventParams<DeviceRegisteredPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.REGISTERED, p));
  }
}

export class DeviceTokenRefreshedEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.TOKEN_REFRESHED,
  DeviceTokenRefreshedPayload
> {
  constructor(p: EventParams<DeviceTokenRefreshedPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.TOKEN_REFRESHED, p));
  }
}

export class DeviceUnregisteredEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.UNREGISTERED,
  DeviceUnregisteredPayload
> {
  constructor(p: EventParams<DeviceUnregisteredPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.UNREGISTERED, p));
  }
}

export class DeviceBlockedEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.BLOCKED,
  DeviceBlockedPayload
> {
  constructor(p: EventParams<DeviceBlockedPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.BLOCKED, p));
  }
}

export class DeviceInvalidatedEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.INVALIDATED,
  DeviceInvalidatedPayload
> {
  constructor(p: EventParams<DeviceInvalidatedPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.INVALIDATED, p));
  }
}

export class DeviceReactivatedEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.REACTIVATED,
  DeviceReactivatedPayload
> {
  constructor(p: EventParams<DeviceReactivatedPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.REACTIVATED, p));
  }
}
