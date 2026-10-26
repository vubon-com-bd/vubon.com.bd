import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendBulkNotificationCommandDTO } from '@application/dtos/requests/notification/index.js';

export class SendBulkNotificationCommand extends BaseCommand {
  readonly type = 'notification.notification.send_bulk';

  constructor(
    public readonly dto: SendBulkNotificationCommandDTO,
    public readonly userId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
