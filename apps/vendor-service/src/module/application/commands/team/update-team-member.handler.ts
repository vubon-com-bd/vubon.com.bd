import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateTeamMemberCommand } from './update-team-member.command.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { TeamMemberResponseDTO } from '../../dtos/responses/team-response.dto.js';

@CommandHandler(UpdateTeamMemberCommand)
export class UpdateTeamMemberHandler
  implements ICommandHandler<UpdateTeamMemberCommand, TeamMemberResponseDTO>
{
  constructor(
    @Inject(VENDOR_TEAM_SERVICE)
    private readonly service: IVendorTeamService,
  ) {}

  async execute(c: UpdateTeamMemberCommand): Promise<TeamMemberResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
