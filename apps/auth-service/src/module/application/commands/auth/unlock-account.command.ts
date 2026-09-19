import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UnlockAccountCommand extends BaseCommand {
  readonly type = 'auth.unlock-account';

  constructor(
    public readonly userId: string,
    public readonly reason: string,
  ) {
    super();
  }
}
