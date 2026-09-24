import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTeamQuery } from './get-team.query';
import type { SupportTeamRepository } from '../../../domain/repositories/support-team.repository.interface';
import { TeamIdVO } from '../../../domain/value-objects/primitives/team-id.vo';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';

@QueryHandler(GetTeamQuery)
export class GetTeamHandler
  extends BaseQueryHandler<GetTeamQuery, TeamResponseDTO>
  implements IQueryHandler<GetTeamQuery>
{
  readonly queryType = 'support.team.get';

  constructor(private readonly teamRepo: SupportTeamRepository) {
    super();
  }

  async execute(query: GetTeamQuery): Promise<TeamResponseDTO> {
    const t = await this.teamRepo.findById(TeamIdVO.create(query.teamId));
    if (!t) throw new Error(`Team not found: ${query.teamId}`);
    return {
      id: t.id.value,
      name: t.name.value,
      type: t.type.value,
      description: t.description,
      isActive: t.isActive,
      memberCount: t.members.length,
    };
  }
}
