import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelNotificationRequestDTO } from '../../dtos/requests/notification/update-notification.dto.js';

export class CancelNotificationCommand extends BaseCommand {
  readonly type = 'notification.cancel';
  constructor(
    public readonly dto: CancelNotificationRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
