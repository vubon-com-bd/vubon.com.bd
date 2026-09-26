import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductPricingEntity } from '../entities/product-pricing.entity';
import { PriceIdVO } from '../value-objects/primitives/price-id.vo';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';

export interface ProductPricingRepository
  extends BaseRepository<ProductPricingEntity, PriceIdVO> {
  findByProduct(productId: ProductIdVO): Promise<ProductPricingEntity | null>;
  deleteByProduct(productId: ProductIdVO): Promise<void>;
}
