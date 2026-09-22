import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PRODUCT_STATUS } from '@vubon/shared-constants/business/product';
import { InvalidValueError } from '../../errors/invalid-value.errors';

const VALID = new Set<string>(Object.values(PRODUCT_STATUS as Record<string, string>));

export class ProductStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ProductStatusVO {
    if (VALID.size > 0 && !VALID.has(raw)) {
      throw new InvalidValueError('product_status', `Invalid product status: ${raw}`);
    }
    return new ProductStatusVO(raw);
  }

  isDraft(): boolean { return this.value === 'draft'; }
  isPublished(): boolean { return this.value === 'published'; }
  isArchived(): boolean { return this.value === 'archived'; }
}
