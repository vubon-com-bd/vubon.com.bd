/**
 * ChatbotValidator — schema-based validation
 * @module support-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { ChatbotMessageSchema } from '@vubon/shared-schemas/support';

export class ChatbotValidator {
  validateMessage(input: unknown): Readonly<Record<string, unknown>> {
    const result = ChatbotMessageSchema.safeParse(input);
    if (!result.success) {
      const issues = result.error.issues.map((i) => ({
        field: i.path.join('.') || 'chatbot',
        message: i.message,
      }));
      const first = issues[0];
      throw new ApplicationValidationError(
        first?.message ?? 'Invalid chatbot message',
        first?.field ?? 'chatbot',
        issues,
      );
    }
    return result.data;
  }
}
