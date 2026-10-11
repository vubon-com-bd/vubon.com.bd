import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ScheduleNotificationRequestDTO } from '../../dtos/requests/notification/send-notification.dto.js';

export class ScheduleNotificationCommand extends BaseCommand {
  readonly type = 'notification.schedule';
  constructor(
    public readonly dto: ScheduleNotificationRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
