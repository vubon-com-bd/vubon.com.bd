import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ForgotPasswordCommand extends BaseCommand {
  readonly type = 'auth.forgot-password';

  constructor(public readonly email: string) {
    super();
  }
}
