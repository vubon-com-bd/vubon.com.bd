import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { MarkAsReadCommand } from './mark-as-read.command';
import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';

@CommandHandler(MarkAsReadCommand)
export class MarkAsReadHandler
  extends BaseCommandHandler<MarkAsReadCommand, { marked: number }>
  implements ICommandHandler<MarkAsReadCommand>
{
  readonly commandType = 'in-app.mark-read';

  constructor(private readonly notificationRepo: NotificationRepository) {
    super();
  }

  async execute(command: MarkAsReadCommand): Promise<{ marked: number }> {
    let marked = 0;
    for (const id of command.notificationIds) {
      const entity = await this.notificationRepo.findById(NotificationIdVO.create(id));
      if (!entity || entity.isRead) continue;
      const updated = entity.markAsRead();
      await this.notificationRepo.save(updated);
      marked++;
    }
    return { marked };
  }
}
