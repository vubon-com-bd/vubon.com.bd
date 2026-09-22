import { SubmitReviewRequestSchema } from '@vubon/shared-schemas/business/product';

export class ReviewInterfaceValidator {
  static validateSubmit(input: unknown) {
    return SubmitReviewRequestSchema.parse(input);
  }
}
