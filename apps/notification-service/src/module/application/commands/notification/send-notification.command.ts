import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendNotificationRequestDTO } from '../../dtos/requests/notification/send-notification.dto.js';

export class SendNotificationCommand extends BaseCommand {
  readonly type = 'notification.send';
  constructor(
    public readonly dto: SendNotificationRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
