/**
 * Delete Review Request DTO
 * @module product-service/application/dtos/requests/review
 */
export interface DeleteReviewRequestDTO {
  readonly reviewId: string;
  readonly reason?: string;
  readonly actorId?: string;
}
