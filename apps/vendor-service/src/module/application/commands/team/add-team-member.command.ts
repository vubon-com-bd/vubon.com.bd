import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.add-member';

  constructor(
    public readonly vendorId: string,
    public readonly userId: string,
    public readonly role: string,
    public readonly permissions?: readonly string[],
  ) {
    super();
  }
}
