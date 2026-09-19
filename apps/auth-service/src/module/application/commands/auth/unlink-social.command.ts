import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UnlinkSocialCommand extends BaseCommand {
  readonly type = 'auth.unlink-social';

  constructor(
    public readonly userId: string,
    public readonly provider: string,
  ) {
    super();
  }
}
