import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SocialCallbackCommand extends BaseCommand {
  readonly type = 'auth.social-callback';

  constructor(
    public readonly provider: string,
    public readonly code: string,
    public readonly state: string,
  ) {
    super();
  }
}
