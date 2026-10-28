/**
 * ProductAppModule — product-service root module
 * @module product-service/modules
 *
 * Wires:
 *  - ConfigModule.forRoot (global env)
 *  - CqrsModule.forRoot (global buses)
 *  - ProductCommonModule (kernel + infra globals)
 *  - HealthModule
 *  - 12 feature modules
 */
import { JwtStrategy } from '../infrastructure/security/jwt.strategy.js';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Common (global) ────────────────────────
import { ProductCommonModule } from './common/index.js';

// ─── Health ─────────────────────────────────
import { HealthModule } from './health/index.js';

// ─── Feature modules ────────────────────────
import { ProductModule } from './product/index.js';
import { ProductVariantModule } from './product-variant/index.js';
import { ProductAttributeModule } from './product-attribute/index.js';
import { ProductInventoryModule } from './product-inventory/index.js';
import { ProductPricingModule } from './product-pricing/index.js';
import { ProductPricingRuleModule } from './product-pricing-rule/index.js';
import { ProductCollectionModule } from './product-collection/index.js';
import { ProductReviewModule } from './product-review/index.js';
import { ProductMediaModule } from './product-media/index.js';
import { BrandModule } from './brand/index.js';
import { CategoryModule } from './category/index.js';
import { PublicProductModule } from './public-product/index.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // ─── Root config ────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '../../.env'],

    }),
    CqrsModule.forRoot(),

    // ─── Common (global) ────────────────────
    ProductCommonModule,

    // ─── Health ─────────────────────────────
    HealthModule,

    // ─── Feature modules ────────────────────
    ProductModule,
    ProductVariantModule,
    ProductAttributeModule,
    ProductInventoryModule,
    ProductPricingModule,
    ProductPricingRuleModule,
    ProductCollectionModule,
    ProductReviewModule,
    ProductMediaModule,
    BrandModule,
    CategoryModule,
    PublicProductModule,
  ],
  providers: [JwtStrategy],
})
export class ProductAppModule {}

// ─── Conventional alias for main.ts ─────────
export { ProductAppModule as AppModule };
