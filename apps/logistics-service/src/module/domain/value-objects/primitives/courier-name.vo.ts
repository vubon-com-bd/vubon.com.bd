/**
 * CourierName Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { COURIER_NAME } from '@vubon/shared-constants/logistics';

export type CourierNameValue =
  (typeof COURIER_NAME)[keyof typeof COURIER_NAME];

const VALID_NAMES: readonly string[] = Object.values(COURIER_NAME);
const MIN_LENGTH = 2;
const MAX_LENGTH = 100;

export class CourierNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CourierNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CourierName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `CourierName must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'name',
      );
    }
    return new CourierNameVO(normalized);
  }

  static reconstitute(raw: string): CourierNameVO {
    return new CourierNameVO(raw);
  }

  static isKnownCourier(value: string): boolean {
    return VALID_NAMES.includes(value.trim().toLowerCase());
  }

  isKnownCourier(): boolean {
    return VALID_NAMES.includes(this.value.toLowerCase());
  }
}
