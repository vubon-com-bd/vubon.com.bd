/**
 * Memory Repositories Module — All 11 InMemory repos
 * @module product-service/infrastructure/persistence/memory
 */
import { Module } from '@nestjs/common';

// ─── InMemory Repositories ─────────────────────
import { InMemoryProductRepository } from './repositories/product.memory.repository.js';
import { InMemoryProductVariantRepository } from './repositories/product-variant.memory.repository.js';
import { InMemoryProductAttributeRepository } from './repositories/product-attribute.memory.repository.js';
import { InMemoryProductInventoryRepository } from './repositories/product-inventory.memory.repository.js';
import { InMemoryProductPricingRepository } from './repositories/product-pricing.memory.repository.js';
import { InMemoryProductPricingRuleRepository } from './repositories/product-pricing-rule.memory.repository.js';
import { InMemoryProductCollectionRepository } from './repositories/product-collection.memory.repository.js';
import { InMemoryProductReviewRepository } from './repositories/product-review.memory.repository.js';
import { InMemoryProductMediaRepository } from './repositories/product-media.memory.repository.js';
import { InMemoryBrandRepository } from './repositories/brand.memory.repository.js';
import { InMemoryCategoryRepository } from './repositories/category.memory.repository.js';

// ─── DI Tokens (from domain repositories) ─────
import { PRODUCT_REPOSITORY } from '../../../domain/repositories/product.repository.interface.js';
import { VARIANT_REPOSITORY } from '../../../domain/repositories/product-variant.repository.interface.js';
import { ATTRIBUTE_REPOSITORY } from '../../../domain/repositories/product-attribute.repository.interface.js';
import { INVENTORY_REPOSITORY } from '../../../domain/repositories/product-inventory.repository.interface.js';
import { PRICING_REPOSITORY } from '../../../domain/repositories/product-pricing.repository.interface.js';
import { PRICING_RULE_REPOSITORY } from '../../../domain/repositories/product-pricing-rule.repository.interface.js';
import { COLLECTION_REPOSITORY } from '../../../domain/repositories/product-collection.repository.interface.js';
import { REVIEW_REPOSITORY } from '../../../domain/repositories/product-review.repository.interface.js';
import { MEDIA_REPOSITORY } from '../../../domain/repositories/product-media.repository.interface.js';
import { BRAND_REPOSITORY } from '../../../domain/repositories/brand.repository.interface.js';
import { CATEGORY_REPOSITORY } from '../../../domain/repositories/category.repository.interface.js';

const REPOSITORIES = [
  // Class tokens
  InMemoryProductRepository,
  InMemoryProductVariantRepository,
  InMemoryProductAttributeRepository,
  InMemoryProductInventoryRepository,
  InMemoryProductPricingRepository,
  InMemoryProductPricingRuleRepository,
  InMemoryProductCollectionRepository,
  InMemoryProductReviewRepository,
  InMemoryProductMediaRepository,
  InMemoryBrandRepository,
  InMemoryCategoryRepository,

  // Symbol aliases (for @Inject(TOKEN))
  { provide: PRODUCT_REPOSITORY, useExisting: InMemoryProductRepository },
  { provide: VARIANT_REPOSITORY, useExisting: InMemoryProductVariantRepository },
  { provide: ATTRIBUTE_REPOSITORY, useExisting: InMemoryProductAttributeRepository },
  { provide: INVENTORY_REPOSITORY, useExisting: InMemoryProductInventoryRepository },
  { provide: PRICING_REPOSITORY, useExisting: InMemoryProductPricingRepository },
  { provide: PRICING_RULE_REPOSITORY, useExisting: InMemoryProductPricingRuleRepository },
  { provide: COLLECTION_REPOSITORY, useExisting: InMemoryProductCollectionRepository },
  { provide: REVIEW_REPOSITORY, useExisting: InMemoryProductReviewRepository },
  { provide: MEDIA_REPOSITORY, useExisting: InMemoryProductMediaRepository },
  { provide: BRAND_REPOSITORY, useExisting: InMemoryBrandRepository },
  { provide: CATEGORY_REPOSITORY, useExisting: InMemoryCategoryRepository },
];

@Module({
  providers: REPOSITORIES,
  exports: REPOSITORIES,
})
export class MemoryRepositoriesModule {}
