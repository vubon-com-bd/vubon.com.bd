import type { SupportTeamEntity } from '../../../domain/entities/support-team.entity';
import type { TeamIdVO } from '../../../domain/value-objects/primitives/team-id.vo';
import type { CreateTeamRequestDTO } from '../../dtos/requests/team';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';

export interface TeamServiceInterface {
  create(input: CreateTeamRequestDTO): Promise<TeamResponseDTO>;
  findById(id: TeamIdVO): Promise<SupportTeamEntity | null>;
  addMember(teamId: TeamIdVO, agentId: string): Promise<void>;
}
