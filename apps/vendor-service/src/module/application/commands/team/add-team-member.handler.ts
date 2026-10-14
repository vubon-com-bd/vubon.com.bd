import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddTeamMemberCommand } from './add-team-member.command.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { TeamInviteResponseDTO } from '../../dtos/responses/team-response.dto.js';

@CommandHandler(AddTeamMemberCommand)
export class AddTeamMemberHandler
  implements ICommandHandler<AddTeamMemberCommand, TeamInviteResponseDTO>
{
  constructor(
    @Inject(VENDOR_TEAM_SERVICE)
    private readonly service: IVendorTeamService,
  ) {}

  async execute(c: AddTeamMemberCommand): Promise<TeamInviteResponseDTO> {
    return this.service.invite(c.dto, c.actorId);
  }
}
