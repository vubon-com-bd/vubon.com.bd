/**
 * AppModule — Root module of product-service
 * @module product-service/modules
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@vubon/shared-kernel/prisma';

// Common
import { CommonModule } from './common/index.js';

// Feature modules
import { ProductModule } from './product/product.module.js';
import { ProductVariantModule } from './product-variant/product-variant.module.js';
import { ProductAttributeModule } from './product-attribute/product-attribute.module.js';
import { ProductInventoryModule } from './product-inventory/product-inventory.module.js';
import { ProductPricingModule } from './product-pricing/product-pricing.module.js';
import { ProductCollectionModule } from './product-collection/product-collection.module.js';
import { ProductReviewModule } from './product-review/product-review.module.js';
import { ProductMediaModule } from './product-media/product-media.module.js';
import { BrandModule } from './brand/brand.module.js';
import { CategoryModule } from './category/category.module.js';
import { PublicProductModule } from './public-product/public-product.module.js';
import { HealthModule } from './health/health.module.js';

// Infrastructure
import { QueuesWorkersModule } from '../infrastructure/queues-workers.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    CqrsModule.forRoot(),
    PrismaModule,

    CommonModule,

    // Feature modules
    ProductModule,
    ProductVariantModule,
    ProductAttributeModule,
    ProductInventoryModule,
    ProductPricingModule,
    ProductCollectionModule,
    ProductReviewModule,
    ProductMediaModule,
    BrandModule,
    CategoryModule,
    PublicProductModule,

    // Health checks
    HealthModule,

    // Background jobs
    QueuesWorkersModule,
  ],
})
export class AppModule {}
