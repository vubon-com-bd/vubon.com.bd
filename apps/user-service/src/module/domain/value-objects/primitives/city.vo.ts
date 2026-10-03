/**
 * City Value Object
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { USER_ADDRESS } from '@vubon/shared-constants/user';

export class CityVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = USER_ADDRESS.CITY_MAX_LENGTH;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CityVO {
    if (typeof raw !== 'string') {
      throw new Error('City must be a string');
    }
    const trimmed = raw.trim().replace(/\s+/g, ' ');
    if (trimmed.length < 2) {
      throw new Error('City name too short (min 2)');
    }
    if (trimmed.length > CityVO.MAX_LENGTH) {
      throw new Error(`City name too long (max ${CityVO.MAX_LENGTH})`);
    }
    if (!/^[\p{L}\s'.-]+$/u.test(trimmed)) {
      throw new Error('City name contains invalid characters');
    }
    return new CityVO(trimmed);
  }

  static maxLength(): number {
    return CityVO.MAX_LENGTH;
  }
}
