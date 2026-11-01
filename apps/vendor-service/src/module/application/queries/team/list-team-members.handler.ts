import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTeamMembersQuery } from './list-team-members.query.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { TeamListResponseDTO } from '../../dtos/responses/team-response.dto.js';

@QueryHandler(ListTeamMembersQuery)
export class ListTeamMembersHandler
  implements IQueryHandler<ListTeamMembersQuery, TeamListResponseDTO>
{
  constructor(
    @Inject(VENDOR_TEAM_SERVICE)
    private readonly service: IVendorTeamService,
  ) {}

  async execute(q: ListTeamMembersQuery): Promise<TeamListResponseDTO> {
    return this.service.listByVendor(q.vendorId, q.options);
  }
}
