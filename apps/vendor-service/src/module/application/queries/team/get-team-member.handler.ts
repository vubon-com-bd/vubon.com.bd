import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTeamMemberQuery } from './get-team-member.query.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { TeamMemberResponseDTO } from '../../dtos/responses/team-response.dto.js';

@QueryHandler(GetTeamMemberQuery)
export class GetTeamMemberHandler
  implements IQueryHandler<GetTeamMemberQuery, TeamMemberResponseDTO>
{
  constructor(
    @Inject(VENDOR_TEAM_SERVICE)
    private readonly service: IVendorTeamService,
  ) {}

  async execute(q: GetTeamMemberQuery): Promise<TeamMemberResponseDTO> {
    return this.service.getById(q.memberId);
  }
}
