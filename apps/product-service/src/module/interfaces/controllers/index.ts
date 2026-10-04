// interfaces/controllers/index.ts
export * from './rest/index.js';

import { ProductController } from './rest/product.controller.js';
import { ProductVariantController } from './rest/product-variant.controller.js';
import { ProductAttributeController } from './rest/product-attribute.controller.js';
import { ProductInventoryController } from './rest/product-inventory.controller.js';
import { ProductPricingController } from './rest/product-pricing.controller.js';
import { ProductReviewController } from './rest/product-review.controller.js';
import { ProductMediaController } from './rest/product-media.controller.js';
import { ProductCollectionController } from './rest/product-collection.controller.js';
import { BrandController } from './rest/brand.controller.js';
import { CategoryController } from './rest/category.controller.js';
import { PublicProductController } from './rest/public-product.controller.js';

export const REST_CONTROLLERS = [
  ProductController,
  ProductVariantController,
  ProductAttributeController,
  ProductInventoryController,
  ProductPricingController,
  ProductReviewController,
  ProductMediaController,
  ProductCollectionController,
  BrandController,
  CategoryController,
  PublicProductController,
] as const;
