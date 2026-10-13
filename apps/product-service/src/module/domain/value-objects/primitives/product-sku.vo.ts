/**
 * ProductSku Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSkuVO } from '@vubon/shared-kernel/domain/primitives';

export class ProductSkuVO extends BaseSkuVO {
  private constructor(value: string) { super(value); }

  protected static override minLength(): number { return 3; }
  protected static override maxLength(): number { return 64; }

  static create(raw: string): ProductSkuVO {
    return new ProductSkuVO(BaseSkuVO.validateRaw(raw));
  }

  static reconstitute(raw: string): ProductSkuVO { return new ProductSkuVO(raw); }
}
