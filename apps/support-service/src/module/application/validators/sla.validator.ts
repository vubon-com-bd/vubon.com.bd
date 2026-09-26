/**
 * SlaValidator — schema-based validation
 * @module support-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { SupportSlaSchema } from '@vubon/shared-schemas/support';
import type { CreateSlaRequestDTO } from '../dtos/requests/sla/create-sla.dto';

export class SlaValidator {
  validateCreate(input: unknown): CreateSlaRequestDTO {
    const result = SupportSlaSchema.partial().safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'sla',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid SLA input',
        first?.field ?? 'sla',
        issues,
      );
    }
    return result.data as CreateSlaRequestDTO;
  }
}
