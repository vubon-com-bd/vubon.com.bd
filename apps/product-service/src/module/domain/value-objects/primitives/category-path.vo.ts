/**
 * CategoryPath Value Object
 * @module product-service/domain/value-objects/primitives
 *
 * Category tree path — root থেকে leaf পর্যন্ত IDs।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CATEGORY } from '@vubon/shared-constants/business';

export class CategoryPathVO extends BaseVO<readonly string[]> {
  private constructor(value: readonly string[]) {
    super(Object.freeze([...value]));
  }

  static create(ids: readonly string[]): CategoryPathVO {
    if (!Array.isArray(ids)) {
      throw new ValidationError('CategoryPath must be an array', 'path');
    }
    if (ids.length === 0) {
      throw new ValidationError('CategoryPath cannot be empty', 'path');
    }
    if (ids.length > CATEGORY.MAX_DEPTH) {
      throw new ValidationError(
        `CategoryPath depth exceeds max ${CATEGORY.MAX_DEPTH}`,
        'path',
      );
    }
    for (const id of ids) {
      if (typeof id !== 'string' || id.trim().length === 0) {
        throw new ValidationError('CategoryPath contains invalid id', 'path');
      }
    }
    return new CategoryPathVO(ids);
  }

  static reconstitute(ids: readonly string[]): CategoryPathVO {
    return new CategoryPathVO(ids);
  }

  get depth(): number { return this.value.length; }
  get rootId(): string | undefined { return this.value[0]; }
  get leafId(): string | undefined { return this.value[this.value.length - 1]; }

  contains(id: string): boolean { return this.value.includes(id); }
  append(id: string): CategoryPathVO { return CategoryPathVO.create([...this.value, id]); }
  parent(): CategoryPathVO | null {
    if (this.value.length <= 1) return null;
    return CategoryPathVO.create(this.value.slice(0, -1));
  }
}
