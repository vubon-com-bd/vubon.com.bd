import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkAllReadCommand } from './mark-all-read.command.js';
import {
  NOTIFICATION_SERVICE,
  type INotificationService,
} from '../../services/interfaces/notification.service.interface.js';

@CommandHandler(MarkAllReadCommand)
export class MarkAllReadHandler implements ICommandHandler<MarkAllReadCommand, number> {
  constructor(@Inject(NOTIFICATION_SERVICE) private readonly service: INotificationService) {}

  async execute(c: MarkAllReadCommand): Promise<number> {
    return this.service.markAllRead(c.dto);
  }
}
