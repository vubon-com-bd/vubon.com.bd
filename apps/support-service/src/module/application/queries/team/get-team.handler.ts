/**
 * GetTeamHandler
 * @module support-service/application/queries/team
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetTeamQuery } from './get-team.query';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';
import type { TeamServiceInterface } from '../../services/interfaces/team.service.interface';

export class GetTeamHandler extends BaseQueryHandler<
  GetTeamQuery,
  TeamResponseDTO
> {
  readonly queryType = 'support.team.get';

  constructor(private readonly teamService: TeamServiceInterface) {
    super();
  }

  async execute(query: GetTeamQuery): Promise<TeamResponseDTO> {
    return this.teamService.getById(query.teamId);
  }
}
