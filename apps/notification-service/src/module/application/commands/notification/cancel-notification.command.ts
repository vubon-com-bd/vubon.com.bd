import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelNotificationCommandDTO } from '@application/dtos/requests/notification/index.js';

export class CancelNotificationCommand extends BaseCommand {
  readonly type = 'notification.notification.cancel';

  constructor(
    public readonly dto: CancelNotificationCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
