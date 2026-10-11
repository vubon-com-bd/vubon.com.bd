import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateNotificationRequestDTO } from '../../dtos/requests/notification/update-notification.dto.js';

export class UpdateNotificationCommand extends BaseCommand {
  readonly type = 'notification.update';
  constructor(
    public readonly dto: UpdateNotificationRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
