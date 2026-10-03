/**
 * RejectReviewRequestDTO
 */
export interface RejectReviewRequestDTO {
  readonly reviewId: string;
  readonly reason: string;
  readonly moderatedBy: string;
}
