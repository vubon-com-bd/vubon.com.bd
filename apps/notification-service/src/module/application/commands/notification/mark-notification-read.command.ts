import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkNotificationReadRequestDTO } from '../../dtos/requests/notification/mark-read.dto.js';

export class MarkNotificationReadCommand extends BaseCommand {
  readonly type = 'notification.mark_read';
  constructor(public readonly dto: MarkNotificationReadRequestDTO) {
    super();
  }
}
