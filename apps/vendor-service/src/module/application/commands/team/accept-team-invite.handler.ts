import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AcceptTeamInviteCommand } from './accept-team-invite.command.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { VendorTeamMemberResponseDto } from '../../dtos/responses/vendor-team-member-response.dto.js';

@CommandHandler(AcceptTeamInviteCommand)
export class AcceptTeamInviteHandler
  implements ICommandHandler<AcceptTeamInviteCommand, VendorTeamMemberResponseDto>
{
  constructor(@Inject(VENDOR_TEAM_SERVICE) private readonly service: IVendorTeamService) {}
  async execute(cmd: AcceptTeamInviteCommand): Promise<VendorTeamMemberResponseDto> {
    return this.service.acceptInvite(cmd.dto, cmd.actorId);
  }
}
