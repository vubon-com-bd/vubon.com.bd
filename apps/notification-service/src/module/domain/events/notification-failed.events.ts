import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';

const AGGREGATE_TYPE = 'Notification';

export class NotificationFailedEvent extends BaseDomainEvent<'notification.failed', { notificationId: string; reason: string }> {
  constructor(aggregateId: string, notificationId: NotificationIdVO, reason: string, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'notification.failed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { notificationId: notificationId.value, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class NotificationBouncedEvent extends BaseDomainEvent<'notification.bounced', { notificationId: string; bounceType: string }> {
  constructor(aggregateId: string, notificationId: NotificationIdVO, bounceType: string, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'notification.bounced',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { notificationId: notificationId.value, bounceType },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
