/**
 * AutomationValidator — schema-based validation
 * @module support-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { SupportAutomationSchema } from '@vubon/shared-schemas/support';

export class AutomationValidator {
  validate(input: unknown): Readonly<Record<string, unknown>> {
    const result = SupportAutomationSchema.partial().safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'automation',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid automation input',
        first?.field ?? 'automation',
        issues,
      );
    }
    return result.data;
  }
}
