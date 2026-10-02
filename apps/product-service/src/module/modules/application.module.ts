/**
 * ApplicationModule — wires all CQRS handlers, services, and sagas.
 * @module product-service/modules
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ALL_COMMAND_HANDLERS } from '../application/commands/index.js';
import { ALL_QUERY_HANDLERS } from '../application/queries/index.js';
import { SAGA_PROVIDERS } from '../application/sagas/index.js';

// Services
import { ProductService } from '../application/services/impl/product.service.js';
import { VariantService } from '../application/services/impl/variant.service.js';
import { AttributeService } from '../application/services/impl/attribute.service.js';
import { InventoryService } from '../application/services/impl/inventory.service.js';
import { PricingService } from '../application/services/impl/pricing.service.js';
import { CollectionService } from '../application/services/impl/collection.service.js';
import { ReviewService } from '../application/services/impl/review.service.js';
import { BrandService } from '../application/services/impl/brand.service.js';
import { CategoryService } from '../application/services/impl/category.service.js';
import { MediaService } from '../application/services/impl/media.service.js';
import { ProductCatalogService } from '../application/services/impl/product-catalog.service.js';

// Service tokens
import { PRODUCT_SERVICE } from '../application/services/interfaces/product.service.interface.js';
import { VARIANT_SERVICE } from '../application/services/interfaces/variant.service.interface.js';
import { ATTRIBUTE_SERVICE } from '../application/services/interfaces/attribute.service.interface.js';
import { INVENTORY_SERVICE } from '../application/services/interfaces/inventory.service.interface.js';
import { PRICING_SERVICE } from '../application/services/interfaces/pricing.service.interface.js';
import { COLLECTION_SERVICE } from '../application/services/interfaces/collection.service.interface.js';
import { REVIEW_SERVICE } from '../application/services/interfaces/review.service.interface.js';
import { BRAND_SERVICE } from '../application/services/interfaces/brand.service.interface.js';
import { CATEGORY_SERVICE } from '../application/services/interfaces/category.service.interface.js';
import { MEDIA_SERVICE } from '../application/services/interfaces/media.service.interface.js';
import { PRODUCT_CATALOG_SERVICE } from '../application/services/interfaces/product-catalog.service.interface.js';

const COMMAND_HANDLERS = [...ALL_COMMAND_HANDLERS];
const QUERY_HANDLERS = [...ALL_QUERY_HANDLERS];
const SAGAS = [...SAGA_PROVIDERS];

const SERVICE_PROVIDERS = [
  // Implementations
  ProductService,
  VariantService,
  AttributeService,
  InventoryService,
  PricingService,
  CollectionService,
  ReviewService,
  BrandService,
  CategoryService,
  MediaService,
  ProductCatalogService,

  // Bind tokens to implementations
  { provide: PRODUCT_SERVICE, useExisting: ProductService },
  { provide: VARIANT_SERVICE, useExisting: VariantService },
  { provide: ATTRIBUTE_SERVICE, useExisting: AttributeService },
  { provide: INVENTORY_SERVICE, useExisting: InventoryService },
  { provide: PRICING_SERVICE, useExisting: PricingService },
  { provide: COLLECTION_SERVICE, useExisting: CollectionService },
  { provide: REVIEW_SERVICE, useExisting: ReviewService },
  { provide: BRAND_SERVICE, useExisting: BrandService },
  { provide: CATEGORY_SERVICE, useExisting: CategoryService },
  { provide: MEDIA_SERVICE, useExisting: MediaService },
  { provide: PRODUCT_CATALOG_SERVICE, useExisting: ProductCatalogService },
];

@Module({
  imports: [CqrsModule],
  providers: [
    ...SERVICE_PROVIDERS,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    ...SAGAS,
  ],
  exports: [
    ...SERVICE_PROVIDERS,
    CqrsModule,
  ],
})
export class ApplicationModule {}
