/**
 * AddTeamMemberRequestDTO
 * @module support-service/application/dtos/requests/team
 */
export interface AddTeamMemberRequestDTO {
  readonly teamId: string;
  readonly userId: string;
  readonly isLeader?: boolean;
}
