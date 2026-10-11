import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteNotificationRequestDTO } from '../../dtos/requests/notification/update-notification.dto.js';

export class DeleteNotificationCommand extends BaseCommand {
  readonly type = 'notification.delete';
  constructor(
    public readonly dto: DeleteNotificationRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
