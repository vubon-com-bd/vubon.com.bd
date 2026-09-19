import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SsoCallbackCommand extends BaseCommand {
  readonly type = 'auth.sso-callback';

  constructor(
    public readonly provider: string,
    public readonly token: string,
  ) {
    super();
  }
}
