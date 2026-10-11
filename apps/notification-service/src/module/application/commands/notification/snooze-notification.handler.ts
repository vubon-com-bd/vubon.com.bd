import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SnoozeNotificationCommand } from './snooze-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@CommandHandler(SnoozeNotificationCommand)
export class SnoozeNotificationHandler
  implements ICommandHandler<SnoozeNotificationCommand, NotificationResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: SnoozeNotificationCommand): Promise<NotificationResponseDTO> {
    return this.service.snooze(c.dto);
  }
}
