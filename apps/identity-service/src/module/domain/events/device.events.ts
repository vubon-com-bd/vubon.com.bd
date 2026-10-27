/**
 * Device Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const DEVICE_EVENT_TYPE = {
  REGISTERED: 'identity.device.registered',
  TRUSTED: 'identity.device.trusted',
  UNTRUSTED: 'identity.device.untrusted',
  UNREGISTERED: 'identity.device.unregistered',
  SEEN: 'identity.device.seen',
} as const;

export interface DeviceRegisteredPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly type: string;
  readonly fingerprint: string;
  readonly registeredAt: string;
}

export interface DeviceTrustedPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly trustedAt: string;
  readonly trustedUntil: string;
}

export interface DeviceUnregisteredPayload {
  readonly deviceId: string;
  readonly userId: string;
  readonly unregisteredAt: string;
  readonly reason?: string;
}

export class DeviceRegisteredEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.REGISTERED,
  DeviceRegisteredPayload
> {
  constructor(p: BaseEventParams<DeviceRegisteredPayload>) {
    super(buildEventParams(DEVICE_EVENT_TYPE.REGISTERED, AUTH_AGGREGATE_TYPE.DEVICE, p));
  }
}

export class DeviceTrustedEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.TRUSTED,
  DeviceTrustedPayload
> {
  constructor(p: BaseEventParams<DeviceTrustedPayload>) {
    super(buildEventParams(DEVICE_EVENT_TYPE.TRUSTED, AUTH_AGGREGATE_TYPE.DEVICE, p));
  }
}

export class DeviceUnregisteredEvent extends BaseDomainEvent<
  typeof DEVICE_EVENT_TYPE.UNREGISTERED,
  DeviceUnregisteredPayload
> {
  constructor(p: BaseEventParams<DeviceUnregisteredPayload>) {
    super(buildEventParams(DEVICE_EVENT_TYPE.UNREGISTERED, AUTH_AGGREGATE_TYPE.DEVICE, p));
  }
}
