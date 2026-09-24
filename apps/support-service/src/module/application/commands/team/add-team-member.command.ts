import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AddTeamMemberCommand extends BaseCommand {
  readonly type = 'support.team.member.add';

  constructor(
    public readonly teamId: string,
    public readonly agentId: string,
  ) {
    super();
  }
}
