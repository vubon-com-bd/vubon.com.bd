import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidPostalCodeError } from '../../errors/address.errors';

export class PostalCodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PostalCodeVO {
    if (!/^\d{4}$/.test(raw)) {
      throw new InvalidPostalCodeError(raw);
    }
    return new PostalCodeVO(raw);
  }
}
