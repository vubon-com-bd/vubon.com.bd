/**
 * ConversationValidator — schema-based validation
 * @module support-service/application/validators
 *
 * Registry: uses @shared/schemas/support Zod schemas
 * Rule: no business logic, only validation
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ConversationListFilterSchema } from '@vubon/shared-schemas/support';

export class ConversationValidator {
  validateListFilter(input: unknown): Readonly<Record<string, unknown>> {
    const result = ConversationListFilterSchema.safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'conversation',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid conversation filter',
        first?.field ?? 'conversation',
        issues,
      );
    }
    return result.data;
  }
}
