import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ArchiveNotificationCommand } from './archive-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@CommandHandler(ArchiveNotificationCommand)
export class ArchiveNotificationHandler
  implements ICommandHandler<ArchiveNotificationCommand, NotificationResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: ArchiveNotificationCommand): Promise<NotificationResponseDTO> {
    return this.service.archive(c.dto);
  }
}
