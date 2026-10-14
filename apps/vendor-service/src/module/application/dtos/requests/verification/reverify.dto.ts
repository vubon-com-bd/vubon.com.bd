/**
 * Reverify Request DTO
 * @module vendor-service/application/dtos/requests/verification
 */
export interface ReverifyRequestDTO {
  readonly verificationId: string;
  readonly reason?: string;
  readonly referenceId?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
