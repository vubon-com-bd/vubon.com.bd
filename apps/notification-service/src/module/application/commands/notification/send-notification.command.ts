/**
 * SendNotificationCommand
 * @module notification-service/application/commands/notification
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendNotificationCommandDTO } from '@application/dtos/requests/notification/index.js';

export class SendNotificationCommand extends BaseCommand {
  readonly type = 'notification.notification.send';

  constructor(
    public readonly dto: SendNotificationCommandDTO,
    public readonly userId: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
