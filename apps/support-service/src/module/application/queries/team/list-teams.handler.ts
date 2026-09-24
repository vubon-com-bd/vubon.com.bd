import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTeamsQuery } from './list-teams.query';
import type { SupportTeamRepository } from '../../../domain/repositories/support-team.repository.interface';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';

@QueryHandler(ListTeamsQuery)
export class ListTeamsHandler
  extends BaseQueryHandler<ListTeamsQuery, readonly TeamResponseDTO[]>
  implements IQueryHandler<ListTeamsQuery>
{
  readonly queryType = 'support.team.list';

  constructor(private readonly teamRepo: SupportTeamRepository) {
    super();
  }

  async execute(_query: ListTeamsQuery): Promise<readonly TeamResponseDTO[]> {
    const teams = await this.teamRepo.findActive();
    return teams.map((t) => ({
      id: t.id.value,
      name: t.name.value,
      type: t.type.value,
      description: t.description,
      isActive: t.isActive,
      memberCount: t.members.length,
    }));
  }
}
