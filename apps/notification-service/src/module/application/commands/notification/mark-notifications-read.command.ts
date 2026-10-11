import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkNotificationsReadRequestDTO } from '../../dtos/requests/notification/mark-read.dto.js';

export class MarkNotificationsReadCommand extends BaseCommand {
  readonly type = 'notification.mark_many_read';
  constructor(public readonly dto: MarkNotificationsReadRequestDTO) {
    super();
  }
}
