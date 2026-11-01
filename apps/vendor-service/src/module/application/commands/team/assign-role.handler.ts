import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignRoleCommand } from './assign-role.command.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { TeamMemberResponseDTO } from '../../dtos/responses/team-response.dto.js';

@CommandHandler(AssignRoleCommand)
export class AssignRoleHandler
  implements ICommandHandler<AssignRoleCommand, TeamMemberResponseDTO>
{
  constructor(
    @Inject(VENDOR_TEAM_SERVICE)
    private readonly service: IVendorTeamService,
  ) {}

  async execute(c: AssignRoleCommand): Promise<TeamMemberResponseDTO> {
    return this.service.assignRole(c.dto, c.actorId);
  }
}
