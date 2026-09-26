import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class CategoryPathVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CategoryPathVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new InvalidValueError('category_path', 'Category path cannot be empty');
    }
    if (!/^[a-z0-9\-_/]+$/.test(trimmed)) {
      throw new InvalidValueError('category_path', `Invalid category path: ${raw}`);
    }
    return new CategoryPathVO(trimmed);
  }
}
