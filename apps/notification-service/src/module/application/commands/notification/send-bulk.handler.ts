import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendBulkCommand } from './send-bulk.command';

import type { NotificationServiceInterface } from '../../services/interfaces/notification.service.interface';

import { NotificationEntity } from '../../../domain/entities/notification.entity';
import { NotificationTypeVO } from '../../../domain/value-objects/primitives/notification-type.vo';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo';
import { NotificationStatusVO } from '../../../domain/value-objects/primitives/notification-status.vo';
import { NotificationPriorityVO } from '../../../domain/value-objects/primitives/notification-priority.vo';
import { NotificationCategoryVO } from '../../../domain/value-objects/primitives/notification-category.vo';
import { ReadStatusVO } from '../../../domain/value-objects/primitives/read-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';

import { NotificationCreatedEvent } from '../../../domain/events/notification.events';

export interface SendBulkResult {
  readonly queued: number;
  readonly failed: number;
}

@CommandHandler(SendBulkCommand)
export class SendBulkHandler
  extends BaseCommandHandler<SendBulkCommand, SendBulkResult>
  implements ICommandHandler<SendBulkCommand>
{
  readonly commandType = 'notification.send-bulk';

  constructor(
    private readonly notificationService: NotificationServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SendBulkCommand): Promise<SendBulkResult> {
    const typeVO = NotificationTypeVO.create(command.notificationType);
    const channelVO = NotificationChannelVO.create(command.channel);
    const categoryVO = NotificationCategoryVO.create(command.category);

    let queued = 0;
    let failed = 0;

    for (const userId of command.userIds) {
      try {
        const entity = NotificationEntity.create({
          userId: UserIdVO.create(userId),
          type: typeVO,
          channel: channelVO,
          status: NotificationStatusVO.create('pending'),
          priority: NotificationPriorityVO.create('normal'),
          category: categoryVO,
          readStatus: ReadStatusVO.create('unread'),
          readAt: null,
        });

        const saved = await this.notificationService.persist(entity);

        await this.eventBus.publish(
          new NotificationCreatedEvent(
            saved.id.value,
            saved.id,
            saved.userId,
            0,
          ),
        );

        queued++;
      } catch {
        failed++;
      }
    }

    return { queued, failed };
  }
}
