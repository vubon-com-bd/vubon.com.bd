import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RegisterCommand extends BaseCommand {
  readonly type = 'auth.register';

  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly confirmPassword: string,
    public readonly acceptTerms: true,
    public readonly acceptMarketing: boolean = false,
    public readonly phone?: string,
    public readonly username?: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly deviceId?: string,
  ) {
    super();
  }
}
