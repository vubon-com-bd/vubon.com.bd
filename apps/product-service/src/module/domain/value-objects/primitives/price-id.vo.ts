import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class PriceIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PriceIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('price_id', 'PriceId cannot be empty');
    }
    return new PriceIdVO(raw);
  }
}
