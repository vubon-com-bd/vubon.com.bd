/**
 * Approve Review Request DTO
 * @module product-service/application/dtos/requests/review
 */
export interface ApproveReviewRequestDTO {
  readonly reviewId: string;
  readonly approvedBy?: string;
  readonly actorId?: string;
}
