/**
 * WebhookType Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type WebhookTypeValue = 'incoming' | 'outgoing';

const ALLOWED: readonly WebhookTypeValue[] = ['incoming', 'outgoing'];

export class WebhookTypeVO extends BaseTypeVO<WebhookTypeValue> {
  private constructor(value: WebhookTypeValue) {
    super(value);
  }

  static create(raw: string): WebhookTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Invalid webhook type', 'type');
    }
    const normalized = raw.trim().toLowerCase() as WebhookTypeValue;
    if (!ALLOWED.includes(normalized)) {
      throw new ValidationError(
        `Invalid webhook type "${normalized}". Allowed: ${ALLOWED.join(', ')}`,
        'type',
      );
    }
    return new WebhookTypeVO(normalized);
  }

  static reconstitute(raw: string): WebhookTypeVO {
    return new WebhookTypeVO(raw as WebhookTypeValue);
  }

  isIncoming(): boolean { return this.value === 'incoming'; }
  isOutgoing(): boolean { return this.value === 'outgoing'; }
}
