import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class LinkSocialCommand extends BaseCommand {
  readonly type = 'auth.link-social';

  constructor(
    public readonly userId: string,
    public readonly provider: string,
    public readonly providerUserId: string,
  ) {
    super();
  }
}
