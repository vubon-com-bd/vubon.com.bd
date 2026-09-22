import { Module } from '@nestjs/common';

import { PrismaModule } from './persistence/prisma/prisma.module';

import {
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
} from './persistence/prisma/repositories';

import {
  ProductCacheRepository,
  ProductVariantCacheRepository,
  ProductPricingCacheRepository,
  ProductReviewCacheRepository,
} from './persistence/cache/repositories';

import {
  SkuGeneratorService,
  SlugGeneratorService,
  PriceCalculatorService,
  InventoryTrackerService,
  RatingCalculatorService,
  MediaProcessorService,
  VariantMatrixService,
} from './services/internal';

import {
  StorageService,
  ImageOptimizerService,
  SearchEngineService,
  NotificationService,
} from './services/external';

import {
  ProductQueue,
  InventoryQueue,
  SearchIndexQueue,
  MediaQueue,
  AnalyticsQueue,
} from './queues';

import {
  ProductIndexerWorker,
  InventorySyncWorker,
  PriceSyncWorker,
  ReviewModerationWorker,
  MediaProcessorWorker,
  AnalyticsProcessorWorker,
} from './workers';

const REPOSITORIES = [
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

const CACHE_REPOSITORIES = [
  ProductCacheRepository,
  ProductVariantCacheRepository,
  ProductPricingCacheRepository,
  ProductReviewCacheRepository,
];

const INTERNAL_SERVICES = [
  SkuGeneratorService,
  SlugGeneratorService,
  PriceCalculatorService,
  InventoryTrackerService,
  RatingCalculatorService,
  MediaProcessorService,
  VariantMatrixService,
];

const EXTERNAL_SERVICES = [
  StorageService,
  ImageOptimizerService,
  SearchEngineService,
  NotificationService,
];

const QUEUES = [ProductQueue, InventoryQueue, SearchIndexQueue, MediaQueue, AnalyticsQueue];

const WORKERS = [
  ProductIndexerWorker,
  InventorySyncWorker,
  PriceSyncWorker,
  ReviewModerationWorker,
  MediaProcessorWorker,
  AnalyticsProcessorWorker,
];

@Module({
  imports: [PrismaModule],
  providers: [
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
    ...WORKERS,
  ],
  exports: [
    PrismaModule,
    ...REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...INTERNAL_SERVICES,
    ...EXTERNAL_SERVICES,
    ...QUEUES,
  ],
})
export class InfrastructureModule {}
