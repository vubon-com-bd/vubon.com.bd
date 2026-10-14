import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveTeamMemberRequestDTO } from '../../dtos/requests/team/index.js';

export class RemoveTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.remove_member';
  constructor(
    public readonly dto: RemoveTeamMemberRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
