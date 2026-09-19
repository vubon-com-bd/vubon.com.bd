import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ResendVerificationCommand extends BaseCommand {
  readonly type = 'auth.resend-verification';

  constructor(public readonly email: string) {
    super();
  }
}
