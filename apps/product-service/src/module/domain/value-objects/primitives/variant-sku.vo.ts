/**
 * VariantSku Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseSkuVO } from '@vubon/shared-kernel/domain/primitives';
import { VARIANT } from '@vubon/shared-constants/business';

export class VariantSkuVO extends BaseSkuVO {
  private constructor(value: string) { super(value); }

  protected static override minLength(): number { return 2; }
  protected static override maxLength(): number { return VARIANT.SKU_MAX_LENGTH; }

  static create(raw: string): VariantSkuVO {
    return new VariantSkuVO(BaseSkuVO.validateRaw(raw));
  }

  static reconstitute(raw: string): VariantSkuVO { return new VariantSkuVO(raw); }
}
