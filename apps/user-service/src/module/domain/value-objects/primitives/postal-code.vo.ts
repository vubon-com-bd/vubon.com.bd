/**
 * PostalCode Value Object (BD format: 4 digits)
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { USER_ADDRESS } from '@vubon/shared-constants/user';

export class PostalCodeVO extends BaseCodeVO {
  private static readonly LENGTH = USER_ADDRESS.POSTAL_CODE_LENGTH;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PostalCodeVO {
    if (typeof raw !== 'string') {
      throw new Error('Postal code must be a string');
    }
    const trimmed = raw.trim();
    if (!REGEX.POSTAL_BD.test(trimmed)) {
      throw new Error(`Invalid BD postal code: "${raw}" (must be 4 digits)`);
    }
    return new PostalCodeVO(trimmed);
  }

  static length(): number {
    return PostalCodeVO.LENGTH;
  }

  getAsNumber(): number {
    return parseInt(this.value, 10);
  }
}
