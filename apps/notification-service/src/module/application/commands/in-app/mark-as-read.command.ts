import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkNotificationReadCommandDTO } from '@application/dtos/requests/in-app/index.js';

export class MarkAsReadCommand extends BaseCommand {
  readonly type = 'notification.in_app.mark_as_read';
  constructor(public readonly dto: MarkNotificationReadCommandDTO, public readonly actorId?: string) { super(); }
}
