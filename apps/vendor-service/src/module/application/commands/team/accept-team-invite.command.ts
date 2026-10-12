import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AcceptTeamInviteRequestDto } from '../../dtos/requests/accept-team-invite.dto.js';

export class AcceptTeamInviteCommand extends BaseCommand {
  readonly type = 'vendor.team.accept_invite';
  constructor(
    public readonly dto: AcceptTeamInviteRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
