/**
 * Update Team Member Request DTO
 * @module vendor-service/application/dtos/requests/team
 */
export interface UpdateTeamMemberRequestDTO {
  readonly memberId: string;
  readonly fullName?: string;
  readonly permissions?: readonly string[];
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
