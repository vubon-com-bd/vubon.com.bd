import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendTeamMemberCommand } from './suspend-team-member.command.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { VendorTeamMemberResponseDto } from '../../dtos/responses/vendor-team-member-response.dto.js';

@CommandHandler(SuspendTeamMemberCommand)
export class SuspendTeamMemberHandler
  implements ICommandHandler<SuspendTeamMemberCommand, VendorTeamMemberResponseDto>
{
  constructor(@Inject(VENDOR_TEAM_SERVICE) private readonly service: IVendorTeamService) {}
  async execute(cmd: SuspendTeamMemberCommand): Promise<VendorTeamMemberResponseDto> {
    return this.service.suspendMember(cmd.vendorId, cmd.memberId, cmd.actorId);
  }
}
