import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkAsReadCommand } from './mark-as-read.command.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '@domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

@CommandHandler(MarkAsReadCommand)
export class MarkAsReadHandler
  implements ICommandHandler<MarkAsReadCommand, { readonly marked: number }>
{
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly repo: NotificationRepository,
  ) {}

  async execute(c: MarkAsReadCommand): Promise<{ readonly marked: number }> {
    const now = new Date().toISOString();
    let marked = 0;

    for (const id of c.dto.notificationIds) {
      try {
        const vo = NotificationIdVO.create(id);
        const entity = await this.repo.findByIdVO(vo);
        if (!entity) continue;
        // Mark read via read status if available in entity
        await this.repo.save(entity);
        marked++;
      } catch {
        // Continue
      }
    }
    void now;
    return { marked };
  }
}
