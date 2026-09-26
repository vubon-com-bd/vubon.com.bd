import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type ProductRefId = BrandedId<'LogisticsProductRefId'>;

export class ProductIdVO extends BaseVO<ProductRefId> {
  private constructor(value: ProductRefId) {
    super(value);
  }

  static create(raw: string): ProductIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('ProductId cannot be empty');
    }
    return new ProductIdVO(raw as ProductRefId);
  }
}
