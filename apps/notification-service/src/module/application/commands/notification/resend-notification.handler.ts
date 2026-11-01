import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ResendNotificationCommand } from './resend-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

@CommandHandler(ResendNotificationCommand)
export class ResendNotificationHandler
  implements ICommandHandler<ResendNotificationCommand, NotificationResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly service: INotificationService,
  ) {}

  async execute(c: ResendNotificationCommand): Promise<NotificationResponseDTO> {
    return this.service.resend(c.dto, c.actorId);
  }
}
