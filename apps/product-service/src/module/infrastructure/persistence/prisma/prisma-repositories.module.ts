/**
 * Prisma Repositories Module
 * @module product-service/infrastructure/persistence/prisma
 *
 * Provides both:
 *  - Class tokens (ProductPrismaRepository, ...) — for direct injection
 *  - Symbol tokens (PRODUCT_REPOSITORY, ...) — for @Inject(TOKEN) usage
 */
import { Module } from '@nestjs/common';
import { ProductPrismaModule } from './prisma.module.js';

// ─── Repository implementations ────────────────
import { ProductPrismaRepository } from './repositories/product.prisma.repository.js';
import { ProductVariantPrismaRepository } from './repositories/product-variant.prisma.repository.js';
import { ProductAttributePrismaRepository } from './repositories/product-attribute.prisma.repository.js';
import { ProductInventoryPrismaRepository } from './repositories/product-inventory.prisma.repository.js';
import { ProductPricingPrismaRepository } from './repositories/product-pricing.prisma.repository.js';
import { ProductPricingRulePrismaRepository } from './repositories/product-pricing-rule.prisma.repository.js';
import { ProductCollectionPrismaRepository } from './repositories/product-collection.prisma.repository.js';
import { ProductReviewPrismaRepository } from './repositories/product-review.prisma.repository.js';
import { ProductMediaPrismaRepository } from './repositories/product-media.prisma.repository.js';
import { BrandPrismaRepository } from './repositories/brand.prisma.repository.js';
import { CategoryPrismaRepository } from './repositories/category.prisma.repository.js';

// ─── Symbol tokens (from domain repositories) ──
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

const CLASS_PROVIDERS = [
  ProductPrismaRepository,
  ProductVariantPrismaRepository,
  ProductAttributePrismaRepository,
  ProductInventoryPrismaRepository,
  ProductPricingPrismaRepository,
  ProductPricingRulePrismaRepository,
  ProductCollectionPrismaRepository,
  ProductReviewPrismaRepository,
  ProductMediaPrismaRepository,
  BrandPrismaRepository,
  CategoryPrismaRepository,
];

const SYMBOL_ALIASES = [
  { provide: PRODUCT_REPOSITORY, useExisting: ProductPrismaRepository },
  { provide: VARIANT_REPOSITORY, useExisting: ProductVariantPrismaRepository },
  { provide: ATTRIBUTE_REPOSITORY, useExisting: ProductAttributePrismaRepository },
  { provide: INVENTORY_REPOSITORY, useExisting: ProductInventoryPrismaRepository },
  { provide: PRICING_REPOSITORY, useExisting: ProductPricingPrismaRepository },
  { provide: PRICING_RULE_REPOSITORY, useExisting: ProductPricingRulePrismaRepository },
  { provide: COLLECTION_REPOSITORY, useExisting: ProductCollectionPrismaRepository },
  { provide: REVIEW_REPOSITORY, useExisting: ProductReviewPrismaRepository },
  { provide: MEDIA_REPOSITORY, useExisting: ProductMediaPrismaRepository },
  { provide: BRAND_REPOSITORY, useExisting: BrandPrismaRepository },
  { provide: CATEGORY_REPOSITORY, useExisting: CategoryPrismaRepository },
];

@Module({
  imports: [ProductPrismaModule],
  providers: [...CLASS_PROVIDERS, ...SYMBOL_ALIASES],
  exports: [...CLASS_PROVIDERS, ...SYMBOL_ALIASES],
})
export class PrismaRepositoriesModule {}
