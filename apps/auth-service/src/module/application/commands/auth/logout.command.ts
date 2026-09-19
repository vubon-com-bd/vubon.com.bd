import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class LogoutCommand extends BaseCommand {
  readonly type = 'auth.logout';

  constructor(public readonly sessionId: string) {
    super();
  }
}
