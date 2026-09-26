/**
 * SurveyValidator — schema-based validation
 * @module support-service/application/validators
 *
 * Registry: uses @shared/schemas/support Zod schemas
 * Rule: no business logic, only validation
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { SurveyResponseSchema } from '@vubon/shared-schemas/support';
import type { RespondSurveyRequestDTO } from '../dtos/requests/survey/respond-survey.dto';

export class SurveyValidator {
  validateResponse(input: unknown): RespondSurveyRequestDTO {
    const result = SurveyResponseSchema.safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'survey',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid survey response',
        first?.field ?? 'survey',
        issues,
      );
    }
    return result.data as RespondSurveyRequestDTO;
  }
}
