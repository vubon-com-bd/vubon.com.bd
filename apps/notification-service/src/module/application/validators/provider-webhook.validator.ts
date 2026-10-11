/**
 * ProviderWebhookValidator — validates inbound provider webhook payloads
 * @module notification-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

export class ProviderWebhookValidator {
  static validateProvider(provider: unknown): string {
    const allowed = ['sendgrid', 'twilio', 'ses', 'mailgun', 'fcm', 'apns'];
    if (typeof provider !== 'string' || !allowed.includes(provider)) {
      throw new ApplicationValidationError(
        `Unsupported provider "${String(provider)}". Allowed: ${allowed.join(', ')}`,
        'provider',
      );
    }
    return provider;
  }

  static validateBody(body: unknown): Readonly<Record<string, unknown>> {
    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
      throw new ApplicationValidationError(
        'Provider webhook body must be a plain object',
        'body',
      );
    }
    return body as Readonly<Record<string, unknown>>;
  }

  static validateHeaders(headers: unknown): Readonly<Record<string, string>> {
    if (headers === null || typeof headers !== 'object' || Array.isArray(headers)) {
      throw new ApplicationValidationError(
        'Provider webhook headers must be a plain object',
        'headers',
      );
    }
    return headers as Readonly<Record<string, string>>;
  }

  static validateSignature(signature: unknown, required: boolean): string | undefined {
    if (signature === undefined || signature === null) {
      if (required) {
        throw new ApplicationValidationError(
          'Provider webhook signature is required',
          'signature',
        );
      }
      return undefined;
    }
    if (typeof signature !== 'string' || signature.length === 0) {
      throw new ApplicationValidationError(
        'Provider webhook signature must be a non-empty string',
        'signature',
      );
    }
    return signature;
  }
}
