/**
 * UpdateTeamRequestDTO
 * @module support-service/application/dtos/requests/team
 */
export interface UpdateTeamRequestDTO {
  readonly teamId: string;
  readonly name?: string;
  readonly description?: string;
  readonly maxTickets?: number;
}
