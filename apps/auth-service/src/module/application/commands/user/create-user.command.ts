import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateUserCommand extends BaseCommand {
  readonly type = 'user.create';

  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly acceptTerms: true,
    public readonly sendVerificationEmail: boolean = true,
    public readonly userType: string = 'customer',
    public readonly phone?: string,
    public readonly role?: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly username?: string,
  ) {
    super();
  }
}
