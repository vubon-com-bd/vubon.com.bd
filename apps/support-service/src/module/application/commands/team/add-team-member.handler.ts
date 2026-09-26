/**
 * AddTeamMemberHandler
 * @module support-service/application/commands/team
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddTeamMemberCommand } from './add-team-member.command';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';
import type { TeamServiceInterface } from '../../services/interfaces/team.service.interface';

export class AddTeamMemberHandler extends BaseCommandHandler<
  AddTeamMemberCommand,
  TeamResponseDTO
> {
  readonly commandType = 'support.team.add_member';

  constructor(private readonly teamService: TeamServiceInterface) {
    super();
  }

  async execute(command: AddTeamMemberCommand): Promise<TeamResponseDTO> {
    return this.teamService.addMember(command.payload);
  }
}
