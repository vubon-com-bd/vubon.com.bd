import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';

const AGGREGATE_TYPE = 'Notification';

export class NotificationReadEvent extends BaseDomainEvent<
  'notification.read',
  { notificationId: string; readAt: string }
> {
  constructor(
    aggregateId: string,
    notificationId: NotificationIdVO,
    readAt: Date,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'notification.read',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { notificationId: notificationId.value, readAt: readAt.toISOString() },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class NotificationDismissedEvent extends BaseDomainEvent<
  'notification.dismissed',
  { notificationId: string }
> {
  constructor(
    aggregateId: string,
    notificationId: NotificationIdVO,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'notification.dismissed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { notificationId: notificationId.value },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
