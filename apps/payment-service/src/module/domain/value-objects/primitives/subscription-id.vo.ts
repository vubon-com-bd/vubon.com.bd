/**
 * SubscriptionId Value Object
 * @module payment-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class SubscriptionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SubscriptionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SubscriptionId cannot be empty', 'subscriptionId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('SubscriptionId must be a valid UUID', 'subscriptionId');
    }
    return new SubscriptionIdVO(trimmed);
  }

  static reconstitute(raw: string): SubscriptionIdVO {
    return new SubscriptionIdVO(raw);
  }
}
