import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateTeamMemberRequestDTO } from '../../dtos/requests/team/index.js';

export class UpdateTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.update_member';
  constructor(
    public readonly dto: UpdateTeamMemberRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
