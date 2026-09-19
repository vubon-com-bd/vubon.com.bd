import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ResetPasswordCommand extends BaseCommand {
  readonly type = 'auth.reset-password';

  constructor(
    public readonly token: string,
    public readonly newPassword: string,
    public readonly confirmPassword: string,
  ) {
    super();
  }
}
