export interface ProductReview {
  readonly id: string;
  readonly productId: string;
  readonly userId: string;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly createdAt: string;
}

export interface CreateReviewRequest {
  readonly productId: string;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
}

export interface ReviewListResponse {
  readonly reviews: readonly ProductReview[];
  readonly total: number;
  readonly averageRating: number;
}
