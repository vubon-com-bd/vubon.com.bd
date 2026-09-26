/**
 * ComplaintValidator — schema-based validation
 * @module support-service/application/validators
 *
 * Registry: uses @shared/schemas/support Zod schemas
 * Rule: no business logic, only validation
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ComplaintCreateInputSchema } from '@vubon/shared-schemas/support';
import type { FileComplaintRequestDTO } from '../dtos/requests/complaint/file-complaint.dto';

export class ComplaintValidator {
  validateFile(input: unknown): FileComplaintRequestDTO {
    const result = ComplaintCreateInputSchema.safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'complaint',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid complaint input',
        first?.field ?? 'complaint',
        issues,
      );
    }
    return result.data as FileComplaintRequestDTO;
  }
}
