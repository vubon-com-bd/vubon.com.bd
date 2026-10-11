import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteNotificationCommand } from './delete-notification.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

@CommandHandler(DeleteNotificationCommand)
export class DeleteNotificationHandler
  implements ICommandHandler<DeleteNotificationCommand, void>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: DeleteNotificationCommand): Promise<void> {
    await this.service.delete(c.dto, c.actorId);
  }
}
