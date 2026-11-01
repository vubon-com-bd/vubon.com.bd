/**
 * Appeal Suspension Request DTO
 * @module vendor-service/application/dtos/requests/suspension
 */
export interface AppealSuspensionRequestDTO {
  readonly suspensionId: string;
  readonly appealNotes: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
