import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkAllReadRequestDTO } from '../../dtos/requests/notification/mark-read.dto.js';

export class MarkAllReadCommand extends BaseCommand {
  readonly type = 'notification.mark_all_read';
  constructor(public readonly dto: MarkAllReadRequestDTO) {
    super();
  }
}
