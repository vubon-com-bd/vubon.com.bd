import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ActivateUserCommand extends BaseCommand {
  readonly type = 'user.activate';

  constructor(public readonly userId: string) {
    super();
  }
}
