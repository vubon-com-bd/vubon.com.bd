import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ArchiveNotificationRequestDTO } from '../../dtos/requests/notification/mark-read.dto.js';

export class ArchiveNotificationCommand extends BaseCommand {
  readonly type = 'notification.archive';
  constructor(public readonly dto: ArchiveNotificationRequestDTO) {
    super();
  }
}
