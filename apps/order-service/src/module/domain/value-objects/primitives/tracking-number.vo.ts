/**
 * TrackingNumber Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * Format: TRK-XXXXXXXX (8-20 alphanumeric, uppercase)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  TRACKING_NUMBER_REGEX,
  TRACKING_NUMBER_PREFIX,
  TRACKING_NUMBER_MIN_LENGTH,
  TRACKING_NUMBER_MAX_LENGTH,
} from '@vubon/shared-constants/business/order';

export class TrackingNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TrackingNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('TrackingNumber cannot be empty', 'trackingNumber');
    }
    const trimmed = raw.trim().toUpperCase();
    if (!TRACKING_NUMBER_REGEX.test(trimmed)) {
      throw new ValidationError(
        `TrackingNumber must match ${TRACKING_NUMBER_PREFIX}-XXXXXXXX format`,
        'trackingNumber',
      );
    }
    return new TrackingNumberVO(trimmed);
  }

  static generate(sequence: string): TrackingNumberVO {
    const normalized = sequence
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase()
      .slice(0, TRACKING_NUMBER_MAX_LENGTH);
    const padded = normalized.padEnd(TRACKING_NUMBER_MIN_LENGTH, '0');
    return new TrackingNumberVO(`${TRACKING_NUMBER_PREFIX}-${padded}`);
  }

  static reconstitute(raw: string): TrackingNumberVO {
    return new TrackingNumberVO(raw);
  }

  get carrier(): string {
    return this.value.replace(`${TRACKING_NUMBER_PREFIX}-`, '');
  }
}
