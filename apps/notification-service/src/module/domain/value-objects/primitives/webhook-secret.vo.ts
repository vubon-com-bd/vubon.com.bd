/**
 * WebhookSecret Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidWebhookSecretError } from '@domain/errors/webhook.errors.js';

const MIN_LENGTH = 16;
const MAX_LENGTH = 256;

export class WebhookSecretVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookSecretVO {
    if (typeof raw !== 'string') {
      throw new InvalidWebhookSecretError('must be a string');
    }
    if (raw.length < MIN_LENGTH) {
      throw new InvalidWebhookSecretError(`too short (min ${MIN_LENGTH})`);
    }
    if (raw.length > MAX_LENGTH) {
      throw new InvalidWebhookSecretError(`too long (max ${MAX_LENGTH})`);
    }
    return new WebhookSecretVO(raw);
  }

  static reconstitute(raw: string): WebhookSecretVO {
    return new WebhookSecretVO(raw);
  }

  get masked(): string {
    if (this.value.length <= 8) return '****';
    return `${this.value.slice(0, 4)}${'*'.repeat(this.value.length - 8)}${this.value.slice(-4)}`;
  }
}
