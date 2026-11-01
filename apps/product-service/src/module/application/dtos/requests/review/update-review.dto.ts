/**
 * Update Review Request DTO
 * @module product-service/application/dtos/requests/review
 */
export interface UpdateReviewRequestDTO {
  readonly reviewId: string;
  readonly rating?: number;
  readonly title?: string;
  readonly comment?: string;
  readonly images?: readonly string[];
  readonly actorId?: string;
}
