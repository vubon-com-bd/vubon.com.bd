import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RemoveTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.remove-member';

  constructor(
    public readonly memberId: string,
    public readonly reason?: string,
  ) {
    super();
  }
}
