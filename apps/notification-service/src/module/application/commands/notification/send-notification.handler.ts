/**
 * SendNotificationHandler
 * @module notification-service/application/commands/notification
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendNotificationCommand } from './send-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '@application/services/interfaces/notification.service.interface.js';
import type { NotificationSendResponseDTO } from '@application/dtos/responses/notification-response.dto.js';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler
  implements ICommandHandler<SendNotificationCommand, NotificationSendResponseDTO>
{
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly service: INotificationService,
  ) {}

  async execute(c: SendNotificationCommand): Promise<NotificationSendResponseDTO> {
    return this.service.send(c.dto, c.actorId);
  }
}
