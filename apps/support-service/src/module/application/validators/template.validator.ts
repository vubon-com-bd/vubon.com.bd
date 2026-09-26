/**
 * TemplateValidator — schema-based validation
 * @module support-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { SupportTemplateSchema } from '@vubon/shared-schemas/support';

export class TemplateValidator {
  validate(input: unknown): Readonly<Record<string, unknown>> {
    const result = SupportTemplateSchema.partial().safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'template',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid template input',
        first?.field ?? 'template',
        issues,
      );
    }
    return result.data;
  }
}
