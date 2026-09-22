import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductVariantEntity } from '../entities/product-variant.entity';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo';
import { VariantSkuVO } from '../value-objects/primitives/variant-sku.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductVariantRepository
  extends BaseRepository<ProductVariantEntity, VariantIdVO> {
  findBySku(sku: VariantSkuVO): Promise<ProductVariantEntity | null>;
  existsBySku(sku: VariantSkuVO): Promise<boolean>;
  findByProduct(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]>;
  findDefault(productId: ProductIdVO): Promise<ProductVariantEntity | null>;
  countByProduct(productId: ProductIdVO): Promise<number>;
  deleteByProduct(productId: ProductIdVO): Promise<void>;
}
