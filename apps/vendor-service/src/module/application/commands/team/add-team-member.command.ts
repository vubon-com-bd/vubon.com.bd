/**
 * AddTeamMemberCommand
 * @module vendor-service/application/commands/team
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddTeamMemberCommandDTO } from '../../dtos/requests/team/index.js';

export class AddTeamMemberCommand extends BaseCommand {
  readonly type = 'vendor.team.add_member';
  constructor(
    public readonly dto: AddTeamMemberCommandDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
