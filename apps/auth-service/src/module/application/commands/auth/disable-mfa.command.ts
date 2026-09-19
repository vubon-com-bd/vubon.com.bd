import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DisableMfaCommand extends BaseCommand {
  readonly type = 'auth.disable-mfa';

  constructor(public readonly userId: string) {
    super();
  }
}
