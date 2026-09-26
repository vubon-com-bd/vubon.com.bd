import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidProductIdError } from '../../errors/vendor.errors';

export class ProductIdVO extends BaseIdVO {
  static create(value: string): ProductIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidProductIdError(value);
    }
    return new ProductIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
