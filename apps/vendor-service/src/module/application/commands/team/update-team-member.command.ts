import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.update-member';

  constructor(
    public readonly memberId: string,
    public readonly role?: string,
    public readonly permissions?: readonly string[],
  ) {
    super();
  }
}
