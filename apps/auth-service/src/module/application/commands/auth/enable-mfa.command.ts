import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class EnableMfaCommand extends BaseCommand {
  readonly type = 'auth.enable-mfa';

  constructor(
    public readonly userId: string,
    public readonly method: string,
  ) {
    super();
  }
}
