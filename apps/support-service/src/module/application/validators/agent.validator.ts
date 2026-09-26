/**
 * AgentValidator — schema-based validation
 * @module support-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { SupportAgentSchema } from '@vubon/shared-schemas/support';

export class AgentValidator {
  validate(input: unknown): Readonly<Record<string, unknown>> {
    const result = SupportAgentSchema.partial().safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'agent',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid agent input',
        first?.field ?? 'agent',
        issues,
      );
    }
    return result.data;
  }
}
