import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StarNotificationRequestDTO } from '../../dtos/requests/notification/mark-read.dto.js';

export class StarNotificationCommand extends BaseCommand {
  readonly type = 'notification.star';
  constructor(public readonly dto: StarNotificationRequestDTO) {
    super();
  }
}
