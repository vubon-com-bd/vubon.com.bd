import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeactivateUserCommand extends BaseCommand {
  readonly type = 'user.deactivate';

  constructor(
    public readonly userId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
