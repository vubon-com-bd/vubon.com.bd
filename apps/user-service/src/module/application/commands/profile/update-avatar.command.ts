import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateAvatarCommand extends BaseCommand {
  readonly type = 'user.profile.update-avatar';

  constructor(
    public readonly userId: string,
    public readonly avatarUrl: string | null,
  ) {
    super();
  }
}
