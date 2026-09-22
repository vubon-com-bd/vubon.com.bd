import { Module } from '@nestjs/common';

import { CommonModule } from './module/modules/common';
import { ProductModule } from './module/modules/product';
import { ProductVariantModule } from './module/modules/product-variant';
import { ProductAttributeModule } from './module/modules/product-attribute';
import { ProductInventoryModule } from './module/modules/product-inventory';
import { ProductPricingModule } from './module/modules/product-pricing';
import { ProductPricingRuleModule } from './module/modules/product-pricing-rule';
import { ProductCollectionModule } from './module/modules/product-collection';
import { ProductReviewModule } from './module/modules/product-review';
import { ProductMediaModule } from './module/modules/product-media';
import { BrandModule } from './module/modules/brand';
import { CategoryModule } from './module/modules/category';
import { PublicProductModule } from './module/modules/public-product';

@Module({
  imports: [
    // Global common (kernel modules aggregated)
    CommonModule,

    // Feature modules
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
})
export class AppModule {}
