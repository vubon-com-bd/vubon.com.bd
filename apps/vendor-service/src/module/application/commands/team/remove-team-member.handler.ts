import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveTeamMemberCommand } from './remove-team-member.command.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';

@CommandHandler(RemoveTeamMemberCommand)
export class RemoveTeamMemberHandler
  implements ICommandHandler<RemoveTeamMemberCommand, { readonly success: true }>
{
  constructor(
    @Inject(VENDOR_TEAM_SERVICE)
    private readonly service: IVendorTeamService,
  ) {}

  async execute(c: RemoveTeamMemberCommand): Promise<{ readonly success: true }> {
    return this.service.remove(c.dto, c.actorId);
  }
}
