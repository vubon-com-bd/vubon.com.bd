import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SocialLoginCommand extends BaseCommand {
  readonly type = 'auth.social-login';

  constructor(
    public readonly provider: string,
    public readonly providerUserId: string,
  ) {
    super();
  }
}
