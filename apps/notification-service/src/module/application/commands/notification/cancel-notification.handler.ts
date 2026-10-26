import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelNotificationCommand } from './cancel-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

@CommandHandler(CancelNotificationCommand)
export class CancelNotificationHandler
  implements ICommandHandler<CancelNotificationCommand, NotificationResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly service: INotificationService,
  ) {}

  async execute(c: CancelNotificationCommand): Promise<NotificationResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}
