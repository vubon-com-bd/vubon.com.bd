import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UnsuspendUserCommand extends BaseCommand {
  readonly type = 'user.unsuspend';

  constructor(public readonly userId: string) {
    super();
  }
}
