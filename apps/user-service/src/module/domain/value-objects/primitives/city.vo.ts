import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidCityError } from '../../errors/address.errors';

export class CityVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CityVO {
    const trimmed = raw.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      throw new InvalidCityError(raw);
    }
    return new CityVO(trimmed);
  }
}
