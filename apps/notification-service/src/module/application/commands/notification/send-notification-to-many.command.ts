import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendNotificationToManyRequestDTO } from '../../dtos/requests/notification/send-notification.dto.js';

export class SendNotificationToManyCommand extends BaseCommand {
  readonly type = 'notification.send_to_many';
  constructor(
    public readonly dto: SendNotificationToManyRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
