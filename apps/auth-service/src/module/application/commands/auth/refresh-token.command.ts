import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RefreshTokenCommand extends BaseCommand {
  readonly type = 'auth.refresh-token';

  constructor(public readonly refreshToken: string) {
    super();
  }
}
