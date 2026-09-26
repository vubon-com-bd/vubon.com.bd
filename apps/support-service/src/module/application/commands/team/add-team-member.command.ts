/**
 * AddTeamMemberCommand
 * @module support-service/application/commands/team
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { AddTeamMemberRequestDTO } from '../../dtos/requests/team/add-team-member.dto';

export class AddTeamMemberCommand extends BaseCommand {
  readonly type = 'support.team.add_member';

  constructor(public readonly payload: AddTeamMemberRequestDTO) {
    super();
  }
}
