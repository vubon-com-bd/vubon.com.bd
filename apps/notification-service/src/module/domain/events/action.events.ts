import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { ActionIdVO } from '../value-objects/primitives/action-id.vo';

const AGGREGATE_TYPE = 'Notification';

export class NotificationActionEvent extends BaseDomainEvent<'notification.action', { notificationId: string; actionId: string; actionType: string }> {
  constructor(aggregateId: string, notificationId: NotificationIdVO, actionId: ActionIdVO, actionType: string, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'notification.action',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { notificationId: notificationId.value, actionId: actionId.value, actionType },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
