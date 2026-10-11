import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RetryNotificationRequestDTO } from '../../dtos/requests/notification/update-notification.dto.js';

export class RetryNotificationCommand extends BaseCommand {
  readonly type = 'notification.retry';
  constructor(
    public readonly dto: RetryNotificationRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
