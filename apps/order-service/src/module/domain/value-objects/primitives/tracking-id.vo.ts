/**
 * TrackingId Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class TrackingIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): TrackingIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('TrackingId cannot be empty', 'trackingId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('TrackingId must be a valid UUID', 'trackingId');
    }
    return new TrackingIdVO(trimmed);
  }

  static reconstitute(raw: string): TrackingIdVO { return new TrackingIdVO(raw); }
}
