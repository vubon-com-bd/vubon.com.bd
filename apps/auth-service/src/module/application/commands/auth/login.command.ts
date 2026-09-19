import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class LoginCommand extends BaseCommand {
  readonly type = 'auth.login';

  constructor(
    public readonly identifier: string,
    public readonly password: string,
    public readonly rememberMe: boolean = false,
    public readonly deviceId?: string,
    public readonly mfaCode?: string,
  ) {
    super();
  }
}
