/**
 * FeedbackValidator — schema-based validation
 * @module support-service/application/validators
 *
 * Registry: uses @shared/schemas/support Zod schemas
 * Rule: no business logic, only validation
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { FeedbackCreateInputSchema } from '@vubon/shared-schemas/support';
import type { SubmitFeedbackRequestDTO } from '../dtos/requests/feedback/submit-feedback.dto';

export class FeedbackValidator {
  validateSubmit(input: unknown): SubmitFeedbackRequestDTO {
    const result = FeedbackCreateInputSchema.safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'feedback',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid feedback input',
        first?.field ?? 'feedback',
        issues,
      );
    }
    return result.data as SubmitFeedbackRequestDTO;
  }
}
