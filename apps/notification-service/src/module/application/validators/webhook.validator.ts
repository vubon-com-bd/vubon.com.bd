/**
 * WebhookValidator — Zod schema-based validation
 * @module notification-service/application/validators
 */
import { ZodError } from 'zod';
import { WebhookSchema } from '@vubon/shared-schemas/platform/notification';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

function zodToAppError(err: ZodError, scope: string): ApplicationValidationError {
  const first = err.issues[0];
  const path = first?.path?.join('.') ?? '';
  return new ApplicationValidationError(
    `[${scope}] ${first?.message ?? 'Invalid input'}`,
    path || undefined,
    err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    })),
  );
}

export class WebhookValidator {
  static validateWebhook(input: unknown) {
    try {
      return WebhookSchema.parse(input);
    } catch (e) {
      if (e instanceof ZodError) throw zodToAppError(e, 'Webhook');
      throw e;
    }
  }

  static validateUrl(url: unknown): string {
    if (typeof url !== 'string') {
      throw new ApplicationValidationError('Webhook URL must be a string', 'url');
    }
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') {
        throw new ApplicationValidationError('Webhook URL must use HTTPS', 'url');
      }
      return url;
    } catch (err) {
      if (err instanceof ApplicationValidationError) throw err;
      throw new ApplicationValidationError(`Invalid webhook URL: ${url}`, 'url');
    }
  }
}
