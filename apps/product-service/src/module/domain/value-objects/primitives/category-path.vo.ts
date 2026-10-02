/**
 * CategoryPath Value Object
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CATEGORY } from '@vubon/shared-constants/business/product';
import { CategoryDepthExceededError } from '../../errors/category.errors.js';

export class CategoryPathVO extends BaseVO<readonly string[]> {
  private constructor(value: readonly string[]) {
    super(Object.freeze([...value]));
  }

  static create(ids: readonly string[]): CategoryPathVO {
    if (!Array.isArray(ids)) {
      throw new Error('CategoryPath must be an array');
    }
    if (ids.length > CATEGORY.MAX_DEPTH) {
      throw new CategoryDepthExceededError(ids.length, CATEGORY.MAX_DEPTH);
    }
    return new CategoryPathVO(ids);
  }

  static root(): CategoryPathVO {
    return new CategoryPathVO([]);
  }

  static reconstitute(ids: readonly string[]): CategoryPathVO {
    return new CategoryPathVO(ids);
  }

  get depth(): number {
    return this.value.length;
  }

  append(id: string): CategoryPathVO {
    return CategoryPathVO.create([...this.value, id]);
  }

  contains(id: string): boolean {
    return this.value.includes(id);
  }
}
