/**
 * RuleValidator — schema-based validation
 * @module support-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { SupportRuleSchema } from '@vubon/shared-schemas/support';

export class RuleValidator {
  validate(input: unknown): Readonly<Record<string, unknown>> {
    const result = SupportRuleSchema.partial().safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'rule',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid rule input',
        first?.field ?? 'rule',
        issues,
      );
    }
    return result.data;
  }
}
