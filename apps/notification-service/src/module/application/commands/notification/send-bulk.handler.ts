import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendBulkNotificationCommand } from './send-bulk.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationSendResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

@CommandHandler(SendBulkNotificationCommand)
export class SendBulkNotificationHandler
  implements ICommandHandler<SendBulkNotificationCommand, NotificationSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly service: INotificationService,
  ) {}

  async execute(c: SendBulkNotificationCommand): Promise<NotificationSendResponseDTO> {
    return this.service.sendBulk(c.dto, c.actorId);
  }
}
