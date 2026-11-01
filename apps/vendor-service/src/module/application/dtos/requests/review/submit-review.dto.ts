/**
 * Submit Review Request DTO
 * @module vendor-service/application/dtos/requests/review
 */
export interface SubmitReviewRequestDTO {
  readonly vendorId: string;
  readonly userId: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly rating: number;
  readonly content: string;
  readonly title?: string;
  readonly isVerifiedPurchase?: boolean;
  readonly idempotencyKey?: string;
}
