import { NotificationEntity } from '../entities/notification.entity';
import { NotificationTypeVO } from '../value-objects/primitives/notification-type.vo';
import { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo';
import { NotificationStatusVO } from '../value-objects/primitives/notification-status.vo';
import { NotificationPriorityVO } from '../value-objects/primitives/notification-priority.vo';
import { NotificationCategoryVO } from '../value-objects/primitives/notification-category.vo';
import { ReadStatusVO } from '../value-objects/primitives/read-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface BuildNotificationInput {
  readonly userId: UserIdVO;
  readonly type: NotificationTypeVO;
  readonly channel: NotificationChannelVO;
  readonly priority: NotificationPriorityVO;
  readonly category: NotificationCategoryVO;
}

export class NotificationBuilderService {
  build(input: BuildNotificationInput): NotificationEntity {
    return NotificationEntity.create({
      userId: input.userId,
      type: input.type,
      channel: input.channel,
      status: NotificationStatusVO.create('pending'),
      priority: input.priority,
      category: input.category,
      readStatus: ReadStatusVO.create('unread'),
      readAt: null,
    });
  }
}
