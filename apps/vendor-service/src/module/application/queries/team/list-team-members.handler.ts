import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListTeamMembersQuery } from './list-team-members.query.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { VendorTeamMemberPublicDto } from '../../dtos/responses/vendor-team-member-response.dto.js';

@QueryHandler(ListTeamMembersQuery)
export class ListTeamMembersHandler
  implements IQueryHandler<ListTeamMembersQuery, readonly VendorTeamMemberPublicDto[]>
{
  constructor(@Inject(VENDOR_TEAM_SERVICE) private readonly service: IVendorTeamService) {}
  async execute(query: ListTeamMembersQuery): Promise<readonly VendorTeamMemberPublicDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
