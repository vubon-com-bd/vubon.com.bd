import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductEntity } from '../entities/product.entity';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo';
import { ProductSlugVO } from '../value-objects/primitives/product-slug.vo';
import { ProductSkuVO } from '../value-objects/primitives/product-sku.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { CategoryIdVO } from '../value-objects/primitives/category-id.vo';
import { BrandIdVO } from '../value-objects/primitives/brand-id.vo';

export interface ProductRepository extends BaseRepository<ProductEntity, ProductIdVO> {
  findBySlug(slug: ProductSlugVO): Promise<ProductEntity | null>;
  findBySku(sku: ProductSkuVO): Promise<ProductEntity | null>;
  existsBySlug(slug: ProductSlugVO): Promise<boolean>;
  existsBySku(sku: ProductSkuVO): Promise<boolean>;
  findByVendor(vendorId: VendorIdVO): Promise<readonly ProductEntity[]>;
  findByCategory(categoryId: CategoryIdVO): Promise<readonly ProductEntity[]>;
  findByBrand(brandId: BrandIdVO): Promise<readonly ProductEntity[]>;
  findPublished(): Promise<readonly ProductEntity[]>;
  countByCategory(categoryId: CategoryIdVO): Promise<number>;
}
