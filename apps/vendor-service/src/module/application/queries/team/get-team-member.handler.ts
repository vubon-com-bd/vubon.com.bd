import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetTeamMemberQuery } from './get-team-member.query.js';
import {
  VENDOR_TEAM_SERVICE,
  type IVendorTeamService,
} from '../../services/interfaces/vendor-team.service.interface.js';
import type { VendorTeamMemberResponseDto } from '../../dtos/responses/vendor-team-member-response.dto.js';

@QueryHandler(GetTeamMemberQuery)
export class GetTeamMemberHandler
  implements IQueryHandler<GetTeamMemberQuery, VendorTeamMemberResponseDto>
{
  constructor(@Inject(VENDOR_TEAM_SERVICE) private readonly service: IVendorTeamService) {}
  async execute(query: GetTeamMemberQuery): Promise<VendorTeamMemberResponseDto> {
    return this.service.getMember(query.vendorId, query.memberId);
  }
}
