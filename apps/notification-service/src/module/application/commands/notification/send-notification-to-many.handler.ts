import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendNotificationToManyCommand } from './send-notification-to-many.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';
import type { NotificationSendResponseDTO } from '../../dtos/responses/notification-response.dto.js';

@CommandHandler(SendNotificationToManyCommand)
export class SendNotificationToManyHandler
  implements
    ICommandHandler<SendNotificationToManyCommand, readonly NotificationSendResponseDTO[]>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: SendNotificationToManyCommand): Promise<readonly NotificationSendResponseDTO[]> {
    return this.service.sendToMany(c.dto, c.actorId);
  }
}
