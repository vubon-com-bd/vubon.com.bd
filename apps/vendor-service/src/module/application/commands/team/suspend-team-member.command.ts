import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class SuspendTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.suspend_member';
  constructor(
    public readonly vendorId: string,
    public readonly memberId: string,
    public readonly actorId?: string,
  ) { super(); }
}
