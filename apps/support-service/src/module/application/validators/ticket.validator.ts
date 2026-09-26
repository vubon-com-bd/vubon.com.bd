/**
 * TicketValidator — schema-based request validation
 * @module support-service/application/validators
 *
 * Registry: uses @shared/schemas/support Zod schemas
 * Rule: no business logic, only validation
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import {
  TicketCreateInputSchema,
  TicketListFilterSchema,
} from '@vubon/shared-schemas/support';
import type { CreateTicketRequestDTO } from '../dtos/requests/ticket/create-ticket.dto';

export class TicketValidator {
  validateCreate(input: unknown): CreateTicketRequestDTO {
    const result = TicketCreateInputSchema.safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'ticket',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid ticket creation input',
        first?.field ?? 'ticket',
        issues,
      );
    }
    return result.data as CreateTicketRequestDTO;
  }

  validateListFilter(input: unknown): Readonly<Record<string, unknown>> {
    const result = TicketListFilterSchema.safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'ticket',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid ticket filter',
        first?.field ?? 'ticket',
        issues,
      );
    }
    return result.data;
  }
}
