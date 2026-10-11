/**
 * WebhookUrl Value Object — HTTPS-only callback URL
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX = 2048;

export class WebhookUrlVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookUrlVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Webhook URL must be a string', 'url');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Webhook URL cannot be empty', 'url');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Webhook URL exceeds ${MAX} chars`, 'url');
    }
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      throw new ValidationError(`Invalid webhook URL: ${trimmed}`, 'url');
    }
    if (parsed.protocol !== 'https:') {
      throw new ValidationError('Webhook URL must use HTTPS', 'url');
    }
    return new WebhookUrlVO(trimmed);
  }

  static reconstitute(raw: string): WebhookUrlVO {
    return new WebhookUrlVO(raw);
  }

  get host(): string {
    return new URL(this.value).host;
  }

  get scheme(): string {
    return new URL(this.value).protocol;
  }
}
