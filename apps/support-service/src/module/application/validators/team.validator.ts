/**
 * TeamValidator — schema-based validation
 * @module support-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { SupportTeamSchema } from '@vubon/shared-schemas/support';

export class TeamValidator {
  validate(input: unknown): Readonly<Record<string, unknown>> {
    const result = SupportTeamSchema.partial().safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'team',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid team input',
        first?.field ?? 'team',
        issues,
      );
    }
    return result.data;
  }
}
