import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DismissCommand } from './dismiss.command';
import type { NotificationRepository } from '../../../domain/repositories/notification.repository.interface';
import { NotificationIdVO } from '../../../domain/value-objects/primitives/notification-id.vo';

@CommandHandler(DismissCommand)
export class DismissHandler
  extends BaseCommandHandler<DismissCommand, void>
  implements ICommandHandler<DismissCommand>
{
  readonly commandType = 'in-app.dismiss';

  constructor(private readonly notificationRepo: NotificationRepository) {
    super();
  }

  async execute(command: DismissCommand): Promise<void> {
    const entity = await this.notificationRepo.findById(
      NotificationIdVO.create(command.notificationId),
    );
    if (!entity) {
      throw new Error(`Notification not found: ${command.notificationId}`);
    }
    await this.notificationRepo.delete(entity.id);
  }
}
