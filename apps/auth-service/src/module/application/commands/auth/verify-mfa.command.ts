import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class VerifyMfaCommand extends BaseCommand {
  readonly type = 'auth.verify-mfa';

  constructor(
    public readonly userId: string,
    public readonly code: string,
  ) {
    super();
  }
}
