/**
 * SubmitReviewRequestDTO
 */
import type { SubmitReviewRequestSchemaType } from '@vubon/shared-schemas/business/product';

export type SubmitReviewRequestDTO = SubmitReviewRequestSchemaType & {
  readonly userId: string;
  readonly isVerifiedPurchase?: boolean;
};
