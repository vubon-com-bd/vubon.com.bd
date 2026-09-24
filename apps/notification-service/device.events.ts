import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { DeviceIdVO } from '../value-objects/primitives/device-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

const AGGREGATE_TYPE = 'Device';

export class DeviceRegisteredEvent extends BaseDomainEvent<
  'device.registered',
  { deviceId: string; userId: string; platform: string }
> {
  constructor(
    aggregateId: string,
    deviceId: DeviceIdVO,
    userId: UserIdVO,
    platform: string,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'device.registered',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: {
        deviceId: deviceId.value,
        userId: userId.value,
        platform,
      },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DeviceUnregisteredEvent extends BaseDomainEvent<
  'device.unregistered',
  { deviceId: string; userId: string }
> {
  constructor(
    aggregateId: string,
    deviceId: DeviceIdVO,
    userId: UserIdVO,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'device.unregistered',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { deviceId: deviceId.value, userId: userId.value },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
