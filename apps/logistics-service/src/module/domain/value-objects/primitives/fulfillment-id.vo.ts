/**
 * FulfillmentId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class FulfillmentIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): FulfillmentIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('FulfillmentId cannot be empty', 'fulfillmentId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('FulfillmentId must be a valid UUID', 'fulfillmentId');
    }
    return new FulfillmentIdVO(trimmed);
  }

  static reconstitute(raw: string): FulfillmentIdVO { return new FulfillmentIdVO(raw); }
}
