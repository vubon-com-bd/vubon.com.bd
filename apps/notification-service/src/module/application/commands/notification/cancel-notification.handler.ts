import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CancelNotificationCommand } from './cancel-notification.command';

import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { NotificationEntity } from '../../../domain/entities/notification.entity';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';
import { NotificationStatusVO } from '../../../domain/value-objects/primitives/notification-status.vo';

@CommandHandler(CancelNotificationCommand)
export class CancelNotificationHandler
  extends BaseCommandHandler<CancelNotificationCommand, void>
  implements ICommandHandler<CancelNotificationCommand>
{
  readonly commandType = 'notification.cancel';

  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CancelNotificationCommand): Promise<void> {
    const idVO = NotificationIdVO.create(command.notificationId);
    const entity = await this.notificationRepo.findById(idVO);

    if (!entity) {
      throw new Error(`Notification not found: ${command.notificationId}`);
    }

    if (entity.status.value === 'sent' || entity.status.value === 'delivered') {
      throw new Error('Cannot cancel a notification that has already been sent');
    }

    const cancelled = NotificationEntity.reconstitute(
      entity.id,
      {
        userId: entity.userId,
        type: entity.type,
        channel: entity.channel,
        status: NotificationStatusVO.create('cancelled'),
        priority: entity.priority,
        category: entity.category,
        readStatus: entity.readStatus,
        readAt: entity.readAt,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    await this.notificationRepo.save(cancelled);

    // Optional: publish cancellation event
    // await this.eventBus.publish(new NotificationCancelledEvent(...));
  }
}
