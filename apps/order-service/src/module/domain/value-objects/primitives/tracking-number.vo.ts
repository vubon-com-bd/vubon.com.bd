/**
 * TrackingNumber Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import {
  TRACKING_NUMBER_REGEX,
  TRACKING_NUMBER_PREFIX,
  TRACKING_NUMBER_MIN_LENGTH,
  TRACKING_NUMBER_MAX_LENGTH,
} from '@vubon/shared-constants/business/order';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class TrackingNumberVO extends BaseCodeVO {
  private constructor(value: string) { super(value); }

  static create(raw: string): TrackingNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('Tracking number cannot be empty', 'trackingNumber');
    }
    const trimmed = raw.trim();
    if (
      trimmed.length < TRACKING_NUMBER_MIN_LENGTH ||
      trimmed.length > TRACKING_NUMBER_MAX_LENGTH
    ) {
      throw new ValidationError(
        `Tracking number must be ${TRACKING_NUMBER_MIN_LENGTH}-${TRACKING_NUMBER_MAX_LENGTH} chars`,
        'trackingNumber',
      );
    }
    if (!TRACKING_NUMBER_REGEX.test(trimmed)) {
      throw new ValidationError(
        `Invalid tracking number format. Expected: ${TRACKING_NUMBER_PREFIX}-XXXXXXXX`,
        'trackingNumber',
      );
    }
    return new TrackingNumberVO(trimmed);
  }

  static reconstitute(raw: string): TrackingNumberVO {
    return new TrackingNumberVO(raw);
  }
}
