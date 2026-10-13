/**
 * ReviewValidator
 * @module product-service/application/validators
 */
import { ZodError } from 'zod';
import { SubmitReviewRequestSchema } from '@vubon/shared-schemas/business';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

export class ReviewValidator {
  static validateSubmit(input: unknown) {
    try {
      return SubmitReviewRequestSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Review.submit');
      throw e;
    }
  }
}
