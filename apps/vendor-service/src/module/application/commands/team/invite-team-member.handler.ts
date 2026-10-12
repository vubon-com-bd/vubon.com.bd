import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InviteTeamMemberCommand } from './invite-team-member.command.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';

@CommandHandler(InviteTeamMemberCommand)
export class InviteTeamMemberHandler
  implements ICommandHandler<InviteTeamMemberCommand, { inviteId: string; email: string; expiresAt: string }>
{
  constructor(@Inject(VENDOR_TEAM_SERVICE) private readonly service: IVendorTeamService) {}
  async execute(cmd: InviteTeamMemberCommand) {
    return this.service.invite(cmd.dto, cmd.actorId);
  }
}
