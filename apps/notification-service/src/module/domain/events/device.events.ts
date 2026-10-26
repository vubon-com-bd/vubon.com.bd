/* istanbul ignore file -- pure event declarations */
/**
 * Device Domain Events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const DEVICE_EVENT_TYPE = {
  REGISTERED: 'device.registered',
  UNREGISTERED: 'device.unregistered',
  TOKEN_REFRESHED: 'device.token_refreshed',
  BLOCKED: 'device.blocked',
  ACTIVATED: 'device.activated',
  DEACTIVATED: 'device.deactivated',
} as const;

export interface DeviceRegisteredPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly type: string;
  readonly platform: string;
  readonly registeredAt: string;
}

export interface DeviceUnregisteredPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly unregisteredAt: string;
}

export interface DeviceTokenRefreshedPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly refreshedAt: string;
}

export interface DeviceBlockedPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly blockedAt: string;
}

export interface DeviceActivatedPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly activatedAt: string;
}

export interface DeviceDeactivatedPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly deactivatedAt: string;
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
    aggregateType: NOTIFICATION_AGGREGATE_TYPE.DEVICE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
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

export class DeviceUnregisteredEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.UNREGISTERED,
  DeviceUnregisteredPayload
> {
  constructor(p: EventParams<DeviceUnregisteredPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.UNREGISTERED, p));
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

export class DeviceBlockedEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.BLOCKED,
  DeviceBlockedPayload
> {
  constructor(p: EventParams<DeviceBlockedPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.BLOCKED, p));
  }
}

export class DeviceActivatedEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.ACTIVATED,
  DeviceActivatedPayload
> {
  constructor(p: EventParams<DeviceActivatedPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.ACTIVATED, p));
  }
}

export class DeviceDeactivatedEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.DEACTIVATED,
  DeviceDeactivatedPayload
> {
  constructor(p: EventParams<DeviceDeactivatedPayload>) {
    super(buildParams(DEVICE_EVENT_TYPE.DEACTIVATED, p));
  }
}
