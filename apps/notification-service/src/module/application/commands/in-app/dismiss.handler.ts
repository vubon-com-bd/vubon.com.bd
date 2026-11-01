import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DismissInAppCommand } from './dismiss.command.js';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '@domain/repositories/notification.repository.interface.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

@CommandHandler(DismissInAppCommand)
export class DismissInAppHandler
  implements ICommandHandler<DismissInAppCommand, { readonly dismissed: boolean }>
{
  constructor(
    @Inject(NOTIFICATION_REPOSITORY) private readonly repo: NotificationRepository,
  ) {}

  async execute(c: DismissInAppCommand): Promise<{ readonly dismissed: boolean }> {
    const vo = NotificationIdVO.create(c.dto.notificationId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) return { dismissed: false };
    // Dismiss happens in read metadata — save
    await this.repo.save(entity);
    return { dismissed: true };
  }
}
