/**
 * WebhookId Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class WebhookIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WebhookIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('WebhookId cannot be empty', 'webhookId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('WebhookId must be a valid UUID', 'webhookId');
    }
    return new WebhookIdVO(trimmed);
  }

  static reconstitute(raw: string): WebhookIdVO {
    return new WebhookIdVO(raw);
  }
}
