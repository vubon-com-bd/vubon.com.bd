import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DismissCommand extends BaseCommand {
  readonly type = 'in-app.dismiss';

  constructor(public readonly notificationId: string) {
    super();
  }
}
