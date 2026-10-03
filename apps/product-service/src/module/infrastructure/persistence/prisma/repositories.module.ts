/**
 * PrismaRepositoriesModule — binds all Prisma repository implementations
 * to their domain interface tokens.
 * @module product-service/infrastructure/persistence/prisma
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from '@vubon/shared-kernel/prisma';

import { ProductPrismaRepository } from './repositories/product.prisma-repository.js';
import { VariantPrismaRepository } from './repositories/variant.prisma-repository.js';
import { InventoryPrismaRepository } from './repositories/inventory.prisma-repository.js';
import { PricingPrismaRepository } from './repositories/pricing.prisma-repository.js';
import { ReviewPrismaRepository } from './repositories/review.prisma-repository.js';
import { BrandPrismaRepository } from './repositories/brand.prisma-repository.js';
import { CategoryPrismaRepository } from './repositories/category.prisma-repository.js';
import { CollectionPrismaRepository } from './repositories/collection.prisma-repository.js';
import { MediaPrismaRepository } from './repositories/media.prisma-repository.js';
import { AttributePrismaRepository } from './repositories/attribute.prisma-repository.js';

// Tokens
import { PRODUCT_REPOSITORY } from '../../../domain/repositories/product.repository.interface.js';
import { VARIANT_REPOSITORY } from '../../../domain/repositories/variant.repository.interface.js';
import { INVENTORY_REPOSITORY } from '../../../domain/repositories/inventory.repository.interface.js';
import { PRICING_REPOSITORY } from '../../../domain/repositories/pricing.repository.interface.js';
import { REVIEW_REPOSITORY } from '../../../domain/repositories/review.repository.interface.js';
import { BRAND_REPOSITORY } from '../../../domain/repositories/brand.repository.interface.js';
import { CATEGORY_REPOSITORY } from '../../../domain/repositories/category.repository.interface.js';
import { COLLECTION_REPOSITORY } from '../../../domain/repositories/collection.repository.interface.js';
import { MEDIA_REPOSITORY } from '../../../domain/repositories/media.repository.interface.js';
import { ATTRIBUTE_REPOSITORY } from '../../../domain/repositories/attribute.repository.interface.js';

const REPOSITORY_PROVIDERS = [
  { provide: PRODUCT_REPOSITORY, useClass: ProductPrismaRepository },
  { provide: VARIANT_REPOSITORY, useClass: VariantPrismaRepository },
  { provide: INVENTORY_REPOSITORY, useClass: InventoryPrismaRepository },
  { provide: PRICING_REPOSITORY, useClass: PricingPrismaRepository },
  { provide: REVIEW_REPOSITORY, useClass: ReviewPrismaRepository },
  { provide: BRAND_REPOSITORY, useClass: BrandPrismaRepository },
  { provide: CATEGORY_REPOSITORY, useClass: CategoryPrismaRepository },
  { provide: COLLECTION_REPOSITORY, useClass: CollectionPrismaRepository },
  { provide: MEDIA_REPOSITORY, useClass: MediaPrismaRepository },
  { provide: ATTRIBUTE_REPOSITORY, useClass: AttributePrismaRepository },
];

@Module({
  imports: [PrismaModule],
  providers: [...REPOSITORY_PROVIDERS],
  exports: [...REPOSITORY_PROVIDERS],
})
export class PrismaRepositoriesModule {}
