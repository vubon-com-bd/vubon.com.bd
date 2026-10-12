import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InviteTeamMemberRequestDto } from '../../dtos/requests/invite-team-member.dto.js';

export class InviteTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.invite';
  constructor(
    public readonly dto: InviteTeamMemberRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
