import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetryNotificationCommand } from './retry-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@CommandHandler(RetryNotificationCommand)
export class RetryNotificationHandler
  implements ICommandHandler<RetryNotificationCommand, NotificationResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: RetryNotificationCommand): Promise<NotificationResponseDTO> {
    return this.service.retry(c.dto, c.actorId);
  }
}
