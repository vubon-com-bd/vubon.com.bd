/**
 * Variant Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductVariantEntity } from '../entities/product-variant.entity.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { VariantSkuVO } from '../value-objects/primitives/variant-sku.vo.js';

export const VARIANT_REPOSITORY = Symbol('VARIANT_REPOSITORY');

export interface VariantRepository extends BaseRepository<ProductVariantEntity, string> {
  findByIdVO(id: VariantIdVO): Promise<ProductVariantEntity | null>;
  findByProductId(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]>;
  findBySku(sku: VariantSkuVO): Promise<ProductVariantEntity | null>;
  existsBySku(sku: VariantSkuVO): Promise<boolean>;
  findAvailableByProductId(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]>;
  countByProductId(productId: ProductIdVO): Promise<number>;
  deleteByProductId(productId: ProductIdVO): Promise<number>;
  findByIds(ids: readonly string[]): Promise<readonly ProductVariantEntity[]>;
}
