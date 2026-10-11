import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StarNotificationCommand } from './star-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@CommandHandler(StarNotificationCommand)
export class StarNotificationHandler
  implements ICommandHandler<StarNotificationCommand, NotificationResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: StarNotificationCommand): Promise<NotificationResponseDTO> {
    return this.service.star(c.dto);
  }
}
