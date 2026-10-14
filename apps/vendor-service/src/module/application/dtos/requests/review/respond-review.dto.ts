/**
 * Respond to Review Request DTO
 * @module vendor-service/application/dtos/requests/review
 */
export interface RespondReviewRequestDTO {
  readonly reviewId: string;
  readonly replyText: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
