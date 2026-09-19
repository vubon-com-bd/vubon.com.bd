import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SsoLoginCommand extends BaseCommand {
  readonly type = 'auth.sso-login';

  constructor(
    public readonly provider: string,
    public readonly externalId: string,
  ) {
    super();
  }
}
