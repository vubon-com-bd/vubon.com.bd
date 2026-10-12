import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ChangeTeamMemberRoleCommand extends BaseCommand {
  readonly type = 'vendor.team.change_role';
  constructor(
    public readonly vendorId: string,
    public readonly memberId: string,
    public readonly newRole: string,
    public readonly actorId?: string,
  ) { super(); }
}
