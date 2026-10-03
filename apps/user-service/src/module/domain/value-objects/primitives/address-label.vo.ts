/**
 * AddressLabel Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { USER_ADDRESS, USER_ADDRESS_TYPE } from '@vubon/shared-constants/user';

export class AddressLabelVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = USER_ADDRESS.LABEL_MAX_LENGTH;
  private static readonly ALLOWED_TYPES: ReadonlySet<string> = new Set(
    Object.values(USER_ADDRESS_TYPE)
  );

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressLabelVO {
    if (typeof raw !== 'string') {
      throw new Error('Address label must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('Address label cannot be empty');
    }
    if (trimmed.length > AddressLabelVO.MAX_LENGTH) {
      throw new Error(`Address label too long (max ${AddressLabelVO.MAX_LENGTH})`);
    }
    return new AddressLabelVO(trimmed);
  }

  static fromType(type: string): AddressLabelVO {
    if (!AddressLabelVO.ALLOWED_TYPES.has(type)) {
      throw new Error(`Invalid address type label: ${type}`);
    }
    return new AddressLabelVO(type);
  }

  isType(type: string): boolean {
    return this.value === type;
  }

  static maxLength(): number {
    return AddressLabelVO.MAX_LENGTH;
  }
}
