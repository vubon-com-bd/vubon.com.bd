import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTeamMemberQuery } from './get-team-member.query';
import type { VendorTeamRepository } from '../../../domain/repositories/vendor-team.repository.interface';
import { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { TeamMemberResponseDto } from '../../dtos/responses/team-response.dto';

@QueryHandler(GetTeamMemberQuery)
export class GetTeamMemberHandler
  extends BaseQueryHandler<GetTeamMemberQuery, TeamMemberResponseDto>
  implements IQueryHandler<GetTeamMemberQuery>
{
  readonly queryType = 'vendor.team.get-member';

  constructor(private readonly teamRepo: VendorTeamRepository) {
    super();
  }

  async execute(query: GetTeamMemberQuery): Promise<TeamMemberResponseDto> {
    const m = await this.teamRepo.findById(TeamMemberIdVO.create(query.memberId));
    if (!m) throw new VendorNotFoundAppError(query.memberId);

    return {
      id: m.id.value,
      vendorId: m.vendorId.value,
      userId: m.userId.value,
      role: m.role.value,
      permissions: m.permissions.map((p) => p.value),
      invitedAt: m.invitedAt.toISOString(),
      joinedAt: m.joinedAt?.toISOString() ?? null,
    };
  }
}
