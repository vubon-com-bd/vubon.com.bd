import { SubmitReviewRequestSchema } from '@vubon/shared-schemas/business/product';

export class ReviewValidator {
  static validateSubmit(input: unknown) {
    return SubmitReviewRequestSchema.parse(input);
  }
}
