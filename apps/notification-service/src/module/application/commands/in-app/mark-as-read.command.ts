import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class MarkAsReadCommand extends BaseCommand {
  readonly type = 'in-app.mark-read';

  constructor(public readonly notificationIds: readonly string[]) {
    super();
  }
}
