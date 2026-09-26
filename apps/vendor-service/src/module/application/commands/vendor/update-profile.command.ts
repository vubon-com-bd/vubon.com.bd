import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateProfileCommand extends BaseCommand {
  readonly type = 'vendor.update-profile';

  constructor(
    public readonly vendorId: string,
    public readonly displayName?: string,
    public readonly bio?: string,
    public readonly avatarUrl?: string,
  ) {
    super();
  }
}
