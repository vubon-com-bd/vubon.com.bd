import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ResendNotificationCommandDTO } from '@application/dtos/requests/notification/index.js';

export class ResendNotificationCommand extends BaseCommand {
  readonly type = 'notification.notification.resend';

  constructor(
    public readonly dto: ResendNotificationCommandDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
