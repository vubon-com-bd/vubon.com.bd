import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateInAppCommand } from './create-in-app.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationSendResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

@CommandHandler(CreateInAppCommand)
export class CreateInAppHandler
  implements ICommandHandler<CreateInAppCommand, NotificationSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService,
  ) {}

  async execute(c: CreateInAppCommand): Promise<NotificationSendResponseDTO> {
    return this.service.send({
      userId: c.dto.userId,
      type: (c.dto.type ?? 'system') as never,
      category: 'system',
      channels: ['in_app'],
      subject: c.dto.title,
      body: c.dto.body,
      imageUrl: c.dto.imageUrl,
      iconUrl: c.dto.iconUrl,
      data: {
        position: c.dto.position,
        actions: c.dto.actions,
        displayDurationSeconds: c.dto.displayDurationSeconds,
        autoDismiss: c.dto.autoDismiss,
      },
    }, c.actorId);
  }
}
