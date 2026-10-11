import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateNotificationCommand } from './update-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@CommandHandler(UpdateNotificationCommand)
export class UpdateNotificationHandler
  implements ICommandHandler<UpdateNotificationCommand, NotificationResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: UpdateNotificationCommand): Promise<NotificationResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
