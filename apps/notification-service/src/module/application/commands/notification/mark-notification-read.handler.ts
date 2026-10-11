import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkNotificationReadCommand } from './mark-notification-read.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@CommandHandler(MarkNotificationReadCommand)
export class MarkNotificationReadHandler
  implements ICommandHandler<MarkNotificationReadCommand, NotificationResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: MarkNotificationReadCommand): Promise<NotificationResponseDTO> {
    return this.service.markRead(c.dto);
  }
}
