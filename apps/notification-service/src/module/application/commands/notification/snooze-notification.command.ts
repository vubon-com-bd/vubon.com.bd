import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SnoozeNotificationRequestDTO } from '../../dtos/requests/notification/mark-read.dto.js';

export class SnoozeNotificationCommand extends BaseCommand {
  readonly type = 'notification.snooze';
  constructor(public readonly dto: SnoozeNotificationRequestDTO) {
    super();
  }
}
