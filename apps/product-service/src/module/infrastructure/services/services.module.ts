/**
 * InfrastructureServicesModule — provides internal + external services.
 * @module product-service/infrastructure/services
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../persistence/prisma/repositories.module.js';
import { SearchModule } from '../persistence/search/search.module.js';

import {
  SkuGeneratorService,
  SKU_GENERATOR_SERVICE,
} from './internal/sku-generator.service.js';
import {
  SlugGeneratorService,
  SLUG_GENERATOR_SERVICE,
} from './internal/slug-generator.service.js';
import {
  PriceCalculatorService,
  PRICE_CALCULATOR_SERVICE,
} from './internal/price-calculator.service.js';
import {
  StockAvailabilityService,
  STOCK_AVAILABILITY_SERVICE,
} from './internal/stock-availability.service.js';
import {
  PublishValidatorService,
  PUBLISH_VALIDATOR_SERVICE,
} from './internal/publish-validator.service.js';
import {
  VariantMatrixService,
  VARIANT_MATRIX_SERVICE,
} from './internal/variant-matrix.service.js';
import {
  MediaProcessingService,
  MEDIA_PROCESSING_SERVICE,
} from './internal/media-processing.service.js';
import {
  ProductReferenceService,
  PRODUCT_REFERENCE_SERVICE,
} from './internal/product-reference.service.js';

import {
  StorageService,
  STORAGE_SERVICE,
} from './external/storage.service.js';
import {
  ImageProcessingService,
  IMAGE_PROCESSING_SERVICE,
} from './external/image-processing.service.js';
import {
  SearchIndexerService,
  SEARCH_INDEXER_SERVICE,
} from './external/search-indexer.service.js';
import {
  NotificationService,
  NOTIFICATION_SERVICE,
} from './external/notification.service.js';
import {
  EventPublisherService,
  EVENT_PUBLISHER_SERVICE,
} from './external/event-publisher.service.js';

const INTERNAL_PROVIDERS = [
  SkuGeneratorService,
  SlugGeneratorService,
  PriceCalculatorService,
  StockAvailabilityService,
  PublishValidatorService,
  VariantMatrixService,
  MediaProcessingService,
  ProductReferenceService,
  { provide: SKU_GENERATOR_SERVICE, useExisting: SkuGeneratorService },
  { provide: SLUG_GENERATOR_SERVICE, useExisting: SlugGeneratorService },
  { provide: PRICE_CALCULATOR_SERVICE, useExisting: PriceCalculatorService },
  { provide: STOCK_AVAILABILITY_SERVICE, useExisting: StockAvailabilityService },
  { provide: PUBLISH_VALIDATOR_SERVICE, useExisting: PublishValidatorService },
  { provide: VARIANT_MATRIX_SERVICE, useExisting: VariantMatrixService },
  { provide: MEDIA_PROCESSING_SERVICE, useExisting: MediaProcessingService },
  { provide: PRODUCT_REFERENCE_SERVICE, useExisting: ProductReferenceService },
];

const EXTERNAL_PROVIDERS = [
  StorageService,
  ImageProcessingService,
  SearchIndexerService,
  NotificationService,
  EventPublisherService,
  { provide: STORAGE_SERVICE, useExisting: StorageService },
  { provide: IMAGE_PROCESSING_SERVICE, useExisting: ImageProcessingService },
  { provide: SEARCH_INDEXER_SERVICE, useExisting: SearchIndexerService },
  { provide: NOTIFICATION_SERVICE, useExisting: NotificationService },
  { provide: EVENT_PUBLISHER_SERVICE, useExisting: EventPublisherService },
];

@Module({
  imports: [PrismaRepositoriesModule, SearchModule],
  providers: [...INTERNAL_PROVIDERS, ...EXTERNAL_PROVIDERS],
  exports: [...INTERNAL_PROVIDERS, ...EXTERNAL_PROVIDERS],
})
export class InfrastructureServicesModule {}
