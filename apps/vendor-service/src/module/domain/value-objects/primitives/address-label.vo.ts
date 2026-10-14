/**
 * AddressLabel Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Human label for an address (e.g. "Head Office", "Warehouse-1").
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 2;
const MAX_LENGTH = 50;

export class AddressLabelVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressLabelVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('AddressLabel must be a string', 'label');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `AddressLabel must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'label',
      );
    }
    return new AddressLabelVO(normalized);
  }

  static reconstitute(raw: string): AddressLabelVO {
    return new AddressLabelVO(raw);
  }
}
