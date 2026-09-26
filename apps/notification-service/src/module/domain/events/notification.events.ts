import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

const AGGREGATE_TYPE = 'Notification';

export class NotificationCreatedEvent extends BaseDomainEvent<'notification.created', { notificationId: string; userId: string }> {
  constructor(aggregateId: string, notificationId: NotificationIdVO, userId: UserIdVO, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'notification.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { notificationId: notificationId.value, userId: userId.value },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class NotificationSentEvent extends BaseDomainEvent<'notification.sent', { notificationId: string; channel: string }> {
  constructor(aggregateId: string, notificationId: NotificationIdVO, channel: string, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'notification.sent',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { notificationId: notificationId.value, channel },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class NotificationDeliveredEvent extends BaseDomainEvent<'notification.delivered', { notificationId: string; deliveredAt: string }> {
  constructor(aggregateId: string, notificationId: NotificationIdVO, deliveredAt: Date, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'notification.delivered',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { notificationId: notificationId.value, deliveredAt: deliveredAt.toISOString() },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
