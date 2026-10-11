/**
 * WebhookSecret Value Object — used for HMAC signature verification
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 16;
const MAX = 256;

export class WebhookSecretVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookSecretVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Webhook secret must be a string', 'secret');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN || trimmed.length > MAX) {
      throw new ValidationError(
        `Webhook secret must be ${MIN}-${MAX} chars`,
        'secret',
      );
    }
    return new WebhookSecretVO(trimmed);
  }

  static reconstitute(raw: string): WebhookSecretVO {
    return new WebhookSecretVO(raw);
  }

  /** Never log the actual secret. */
  masked(): string {
    return '***';
  }
}
