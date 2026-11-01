/**
 * WebhookUrl Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidWebhookUrlError } from '@domain/errors/webhook.errors.js';

const MAX_LENGTH = 2048;

export class WebhookUrlVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookUrlVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidWebhookUrlError('cannot be empty');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new InvalidWebhookUrlError(`exceeds ${MAX_LENGTH} chars`);
    }
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      throw new InvalidWebhookUrlError('must be a valid URL');
    }
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw new InvalidWebhookUrlError(`protocol "${parsed.protocol}" not allowed`);
    }
    if (parsed.protocol === 'http:' && parsed.hostname !== 'localhost') {
      throw new InvalidWebhookUrlError('http: only allowed for localhost');
    }
    return new WebhookUrlVO(trimmed);
  }

  static reconstitute(raw: string): WebhookUrlVO {
    return new WebhookUrlVO(raw);
  }

  get isHttps(): boolean { return new URL(this.value).protocol === 'https:'; }
  get hostname(): string { return new URL(this.value).hostname; }
}
