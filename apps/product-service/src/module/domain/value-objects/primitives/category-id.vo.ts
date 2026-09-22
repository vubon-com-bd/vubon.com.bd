import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class CategoryIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CategoryIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('category_id', 'CategoryId cannot be empty');
    }
    return new CategoryIdVO(raw);
  }
}
