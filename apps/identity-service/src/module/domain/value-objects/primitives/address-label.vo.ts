/**
 * AddressLabel Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { USER_ADDRESS } from '@vubon/shared-constants/user';

export class AddressLabelVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressLabelVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('AddressLabel must be a string', 'label');
    }
    const normalized = raw.trim();
    if (normalized.length === 0) {
      throw new ValidationError('AddressLabel cannot be empty', 'label');
    }
    if (normalized.length > USER_ADDRESS.LABEL_MAX_LENGTH) {
      throw new ValidationError(
        `AddressLabel exceeds max length (${USER_ADDRESS.LABEL_MAX_LENGTH})`,
        'label',
      );
    }
    return new AddressLabelVO(normalized);
  }

  static reconstitute(raw: string): AddressLabelVO {
    return new AddressLabelVO(raw);
  }

  get maxLength(): number { return USER_ADDRESS.LABEL_MAX_LENGTH; }
}
