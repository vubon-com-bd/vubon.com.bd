import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RecoverAccountCommand extends BaseCommand {
  readonly type = 'auth.recover-account';

  constructor(
    public readonly userId: string,
    public readonly code: string,
  ) {
    super();
  }
}
