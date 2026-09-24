import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendNotificationCommand } from './send-notification.command';

import type { NotificationServiceInterface } from '../../services/interfaces/notification.service.interface';
import type { UserClient } from '../../../infrastructure/services/external/user.client';

import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto';
import { NotificationEntity } from '../../../domain/entities/notification.entity';
import { NotificationTypeVO } from '../../../domain/value-objects/primitives/notification-type.vo';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo';
import { NotificationStatusVO } from '../../../domain/value-objects/primitives/notification-status.vo';
import { NotificationPriorityVO } from '../../../domain/value-objects/primitives/notification-priority.vo';
import { NotificationCategoryVO } from '../../../domain/value-objects/primitives/notification-category.vo';
import { ReadStatusVO } from '../../../domain/value-objects/primitives/read-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { NotificationCreatedEvent } from '../../../domain/events/notification.events';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler
  extends BaseCommandHandler<SendNotificationCommand, NotificationResponseDTO>
  implements ICommandHandler<SendNotificationCommand>
{
  readonly commandType = 'notification.send';

  constructor(
    private readonly notificationService: NotificationServiceInterface,
    private readonly userClient: UserClient,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SendNotificationCommand): Promise<NotificationResponseDTO> {
    const user = await this.userClient.getById(command.userId);
    if (!user) {
      throw new Error(`User not found: ${command.userId}`);
    }

    const entity = NotificationEntity.create({
      userId: UserIdVO.create(command.userId),
      type: NotificationTypeVO.create(command.notificationType),
      channel: NotificationChannelVO.create(command.channel),
      status: NotificationStatusVO.create('pending'),
      priority: command.priority
        ? NotificationPriorityVO.create(command.priority)
        : NotificationPriorityVO.create('normal'),
      category: NotificationCategoryVO.create(command.category),
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

    return this.toDTO(saved);
  }

  private toDTO(entity: NotificationEntity): NotificationResponseDTO {
    return {
      id: entity.id.value,
      type: entity.type.value as NotificationResponseDTO['type'],
      category: entity.category.value as NotificationResponseDTO['category'],
      channel: entity.channel.value as NotificationResponseDTO['channel'],
      priority: entity.priority.value as NotificationResponseDTO['priority'],
      status: entity.status.value as NotificationResponseDTO['status'],
      title: '',
      body: '',
      createdAt: entity.createdAt,
      read: entity.isRead
        ? { status: 'read' as const }
        : { status: 'unread' as const },
    };
  }
}
