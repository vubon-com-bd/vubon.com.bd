/**
 * Pricing Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductPricingEntity } from '../entities/product-pricing.entity.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';

export const PRICING_REPOSITORY = Symbol('PRICING_REPOSITORY');

export interface PricingRepository extends BaseRepository<ProductPricingEntity, string> {
  findByProductId(productId: ProductIdVO): Promise<ProductPricingEntity | null>;
  findByVariantId(variantId: VariantIdVO): Promise<ProductPricingEntity | null>;
  findAllByProductId(productId: ProductIdVO): Promise<readonly ProductPricingEntity[]>;
  findDiscounted(): Promise<readonly ProductPricingEntity[]>;
  deleteByProductId(productId: ProductIdVO): Promise<number>;
}
