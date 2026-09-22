import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateBioCommand extends BaseCommand {
  readonly type = 'user.profile.update-bio';

  constructor(
    public readonly userId: string,
    public readonly bio: string | null,
  ) {
    super();
  }
}
