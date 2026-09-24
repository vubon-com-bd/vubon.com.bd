import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateInAppCommand } from './create-in-app.command';
import type { InAppResponseDTO } from '../../dtos/responses/in-app-response.dto';
import { NotificationEntity } from '../../../domain/entities/notification.entity';
import { NotificationTypeVO } from '../../../domain/value-objects/primitives/notification-type.vo';
import { NotificationChannelVO } from '../../../domain/value-objects/primitives/notification-channel.vo';
import { NotificationStatusVO } from '../../../domain/value-objects/primitives/notification-status.vo';
import { NotificationPriorityVO } from '../../../domain/value-objects/primitives/notification-priority.vo';
import { NotificationCategoryVO } from '../../../domain/value-objects/primitives/notification-category.vo';
import { ReadStatusVO } from '../../../domain/value-objects/primitives/read-status.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { NotificationCreatedEvent } from '../../../domain/events/notification.events';
import type { NotificationServiceInterface } from '../../services/interfaces/notification.service.interface';

@CommandHandler(CreateInAppCommand)
export class CreateInAppHandler
  extends BaseCommandHandler<CreateInAppCommand, InAppResponseDTO>
  implements ICommandHandler<CreateInAppCommand>
{
  readonly commandType = 'in-app.create';

  constructor(
    private readonly notificationService: NotificationServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateInAppCommand): Promise<InAppResponseDTO> {
    const entity = NotificationEntity.create({
      userId: UserIdVO.create(command.userId),
      type: NotificationTypeVO.create('system'),
      channel: NotificationChannelVO.create('in_app'),
      status: NotificationStatusVO.create('pending'),
      priority: NotificationPriorityVO.create('normal'),
      category: NotificationCategoryVO.create('system'),
      readStatus: ReadStatusVO.create('unread'),
      readAt: null,
    });

    const saved = await this.notificationService.persist(entity);

    await this.eventBus.publish(
      new NotificationCreatedEvent(saved.id.value, saved.id, saved.userId, 0),
    );

    return {
      id: saved.id.value,
      userId: saved.userId.value,
      title: command.title,
      body: command.body,
      position: command.position ?? 'top',
      createdAt: saved.createdAt,
      read: false,
    };
  }
}
