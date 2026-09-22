import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class ProductIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('ProductId', 'cannot be empty');
    }
    return new ProductIdVO(raw);
  }
}
