/**
 * Submit Review Request DTO
 * @module product-service/application/dtos/requests/review
 */
import type { SubmitReviewRequestSchemaType } from '@vubon/shared-schemas/business';

export type SubmitReviewRequestDTO = SubmitReviewRequestSchemaType;

export interface SubmitReviewCommandDTO extends SubmitReviewRequestDTO {
  readonly userId: string;
  readonly orderId?: string;
  readonly isVerifiedPurchase?: boolean;
  readonly actorId?: string;
  readonly idempotencyKey?: string;
}
