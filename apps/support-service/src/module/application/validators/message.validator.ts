/**
 * MessageValidator — schema-based validation
 * @module support-service/application/validators
 *
 * Registry: uses @shared/schemas/support Zod schemas
 * Rule: no business logic, only validation
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { SupportMessageInputSchema } from '@vubon/shared-schemas/support';
import type { SendMessageRequestDTO } from '../dtos/requests/message/send-message.dto';

export class MessageValidator {
  validateSend(input: unknown): SendMessageRequestDTO {
    const result = SupportMessageInputSchema.safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'message',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid message input',
        first?.field ?? 'message',
        issues,
      );
    }
    return result.data as SendMessageRequestDTO;
  }
}
