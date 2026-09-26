import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResendNotificationCommand } from './resend-notification.command';

import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { NotificationEntity } from '../../../domain/entities/notification.entity';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';
import { NotificationStatusVO } from '../../../domain/value-objects/primitives/notification-status.vo';
import { NotificationCreatedEvent } from '../../../domain/events/notification.events';

export interface ResendResult {
  readonly notificationId: string;
  readonly status: string;
}

@CommandHandler(ResendNotificationCommand)
export class ResendNotificationHandler
  extends BaseCommandHandler<ResendNotificationCommand, ResendResult>
  implements ICommandHandler<ResendNotificationCommand>
{
  readonly commandType = 'notification.resend';

  constructor(
    private readonly notificationRepo: NotificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ResendNotificationCommand): Promise<ResendResult> {
    const idVO = NotificationIdVO.create(command.notificationId);
    const entity = await this.notificationRepo.findById(idVO);

    if (!entity) {
      throw new Error(`Notification not found: ${command.notificationId}`);
    }

    // Rebuild entity with status reset to pending
    const reset = NotificationEntity.reconstitute(
      entity.id,
      {
        userId: entity.userId,
        type: entity.type,
        channel: entity.channel,
        status: NotificationStatusVO.create('pending'),
        priority: entity.priority,
        category: entity.category,
        readStatus: entity.readStatus,
        readAt: entity.readAt,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    const saved = await this.notificationRepo.save(reset);

    // Publish event — saga listens and enqueues
    await this.eventBus.publish(
      new NotificationCreatedEvent(
        saved.id.value,
        saved.id,
        saved.userId,
        0,
      ),
    );

    return {
      notificationId: saved.id.value,
      status: saved.status.value,
    };
  }
}
