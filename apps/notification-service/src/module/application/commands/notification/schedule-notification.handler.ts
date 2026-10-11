import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ScheduleNotificationCommand } from './schedule-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationSendResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@CommandHandler(ScheduleNotificationCommand)
export class ScheduleNotificationHandler
  implements ICommandHandler<ScheduleNotificationCommand, NotificationSendResponseDTO>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: ScheduleNotificationCommand): Promise<NotificationSendResponseDTO> {
    return this.service.schedule(c.dto, c.actorId);
  }
}
