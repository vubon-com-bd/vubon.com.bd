/**
 * Remove Team Member Request DTO
 * @module vendor-service/application/dtos/requests/team
 */
export interface RemoveTeamMemberRequestDTO {
  readonly memberId: string;
  readonly reason?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
