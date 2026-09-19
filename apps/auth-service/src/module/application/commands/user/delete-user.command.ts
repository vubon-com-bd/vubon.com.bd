import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteUserCommand extends BaseCommand {
  readonly type = 'user.delete';

  constructor(public readonly userId: string) {
    super();
  }
}
