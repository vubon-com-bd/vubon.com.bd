import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RemoveTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.remove_member';
  constructor(
    public readonly vendorId: string,
    public readonly memberId: string,
    public readonly actorId?: string,
  ) { super(); }
}
