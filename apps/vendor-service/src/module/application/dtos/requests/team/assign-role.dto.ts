/**
 * Assign Role Request DTO
 * @module vendor-service/application/dtos/requests/team
 */
export interface AssignRoleRequestDTO {
  readonly memberId: string;
  readonly role: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
