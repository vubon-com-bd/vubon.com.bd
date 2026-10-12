import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ChangeTeamMemberRoleCommand } from './change-team-member-role.command.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { VendorTeamMemberResponseDto } from '../../dtos/responses/vendor-team-member-response.dto.js';

@CommandHandler(ChangeTeamMemberRoleCommand)
export class ChangeTeamMemberRoleHandler
  implements ICommandHandler<ChangeTeamMemberRoleCommand, VendorTeamMemberResponseDto>
{
  constructor(@Inject(VENDOR_TEAM_SERVICE) private readonly service: IVendorTeamService) {}
  async execute(cmd: ChangeTeamMemberRoleCommand): Promise<VendorTeamMemberResponseDto> {
    return this.service.changeRole(cmd.vendorId, cmd.memberId, cmd.newRole, cmd.actorId);
  }
}
