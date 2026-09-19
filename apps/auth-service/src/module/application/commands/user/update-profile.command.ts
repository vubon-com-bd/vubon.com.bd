import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateProfileCommand extends BaseCommand {
  readonly type = 'user.update-profile';

  constructor(
    public readonly userId: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly bio?: string,
    public readonly avatarUrl?: string,
  ) {
    super();
  }
}
