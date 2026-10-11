import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkNotificationsReadCommand } from './mark-notifications-read.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

@CommandHandler(MarkNotificationsReadCommand)
export class MarkNotificationsReadHandler
  implements ICommandHandler<MarkNotificationsReadCommand, number>
{
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: MarkNotificationsReadCommand): Promise<number> {
    return this.service.markManyRead(c.dto);
  }
}
