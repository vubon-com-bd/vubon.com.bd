/**
 * ListTeamsHandler
 * @module support-service/application/queries/team
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListTeamsQuery } from './list-teams.query';
import type { TeamListResponseDTO } from '../../dtos/responses/team-list-response.dto';
import type { TeamServiceInterface } from '../../services/interfaces/team.service.interface';

export class ListTeamsHandler extends BaseQueryHandler<
  ListTeamsQuery,
  TeamListResponseDTO
> {
  readonly queryType = 'support.team.list';

  constructor(private readonly teamService: TeamServiceInterface) {
    super();
  }

  async execute(query: ListTeamsQuery): Promise<TeamListResponseDTO> {
    return this.teamService.list(query.page, query.limit);
  }
}
