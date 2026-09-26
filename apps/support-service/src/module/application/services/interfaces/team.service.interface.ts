/**
 * TeamServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { CreateTeamRequestDTO } from '../../dtos/requests/team/create-team.dto';
import type { UpdateTeamRequestDTO } from '../../dtos/requests/team/update-team.dto';
import type { AddTeamMemberRequestDTO } from '../../dtos/requests/team/add-team-member.dto';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';
import type { TeamListResponseDTO } from '../../dtos/responses/team-list-response.dto';

export interface TeamServiceInterface {
  create(input: CreateTeamRequestDTO): Promise<TeamResponseDTO>;
  update(input: UpdateTeamRequestDTO): Promise<TeamResponseDTO>;
  addMember(input: AddTeamMemberRequestDTO): Promise<TeamResponseDTO>;
  getById(teamId: string): Promise<TeamResponseDTO>;
  list(page: number, limit: number): Promise<TeamListResponseDTO>;
}
