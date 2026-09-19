import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class VerifyEmailCommand extends BaseCommand {
  readonly type = 'auth.verify-email';

  constructor(
    public readonly userId: string,
    public readonly code: string,
  ) {
    super();
  }
}
