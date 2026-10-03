/**
 * AddressLine Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { USER_ADDRESS } from '@vubon/shared-constants/user';

export class AddressLineVO extends BaseCodeVO {
  private static readonly MIN_LENGTH = USER_ADDRESS.LINE_MIN_LENGTH;
  private static readonly MAX_LENGTH = USER_ADDRESS.LINE_MAX_LENGTH;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AddressLineVO {
    if (typeof raw !== 'string') {
      throw new Error('Address line must be a string');
    }
    const trimmed = raw.trim().replace(/\s+/g, ' ');
    if (trimmed.length < AddressLineVO.MIN_LENGTH) {
      throw new Error(`Address line too short (min ${AddressLineVO.MIN_LENGTH})`);
    }
    if (trimmed.length > AddressLineVO.MAX_LENGTH) {
      throw new Error(`Address line too long (max ${AddressLineVO.MAX_LENGTH})`);
    }
    return new AddressLineVO(trimmed);
  }

  getWordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  static minLength(): number {
    return AddressLineVO.MIN_LENGTH;
  }

  static maxLength(): number {
    return AddressLineVO.MAX_LENGTH;
  }
}
