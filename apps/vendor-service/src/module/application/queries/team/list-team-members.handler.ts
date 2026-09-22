import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTeamMembersQuery } from './list-team-members.query';
import type { VendorTeamRepository } from '../../../domain/repositories/vendor-team.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import type { TeamMemberResponseDto } from '../../dtos/responses/team-response.dto';

@QueryHandler(ListTeamMembersQuery)
export class ListTeamMembersHandler
  extends BaseQueryHandler<ListTeamMembersQuery, readonly TeamMemberResponseDto[]>
  implements IQueryHandler<ListTeamMembersQuery>
{
  readonly queryType = 'vendor.team.list-members';

  constructor(private readonly teamRepo: VendorTeamRepository) {
    super();
  }

  async execute(query: ListTeamMembersQuery): Promise<readonly TeamMemberResponseDto[]> {
    const items = await this.teamRepo.findByVendorId(
      VendorIdVO.create(query.vendorId),
    );
    return items.map((m) => ({
      id: m.id.value,
      vendorId: m.vendorId.value,
      userId: m.userId.value,
      role: m.role.value,
      permissions: m.permissions.map((p) => p.value),
      invitedAt: m.invitedAt.toISOString(),
      joinedAt: m.joinedAt?.toISOString() ?? null,
    }));
  }
}
