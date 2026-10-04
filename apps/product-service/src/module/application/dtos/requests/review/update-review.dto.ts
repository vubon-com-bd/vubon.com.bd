/**
 * UpdateReviewRequestDTO
 */
export interface UpdateReviewRequestDTO {
  readonly reviewId: string;
  readonly rating?: number;
  readonly title?: string;
  readonly comment?: string;
  readonly images?: readonly string[];
  readonly updatedBy: string;
}
