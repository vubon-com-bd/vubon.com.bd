import { Module } from '@nestjs/common';

// Kernel modules (global)
import {
  PrismaModule,
  RedisModule,
  QueueModule,
  EmailModule,
  SmsModule,
  PushModule,
} from '@vubon/shared-kernel/infrastructure';

// Prisma (app-level)
import { PrismaModule as AppPrismaModule } from './persistence/prisma/prisma.module';

// Repositories
import {
  ModelPrismaRepository,
  ModelMetadataPrismaRepository,
  ModelMetricsPrismaRepository,
  ModelArtifactPrismaRepository,
  ProviderPrismaRepository,
  ProviderConfigPrismaRepository,
  FeaturePrismaRepository,
  FeatureFlagPrismaRepository,
  RecommendationPrismaRepository,
  RecommendationContextPrismaRepository,
  RecommendationResultPrismaRepository,
  PersonalizationPrismaRepository,
  PersonalizationProfilePrismaRepository,
  AiSearchPrismaRepository,
  SearchResultPrismaRepository,
  RankingPrismaRepository,
  RankingResultPrismaRepository,
  AiAnalyticsPrismaRepository,
  AnalyticsReportPrismaRepository,
  TrainingPrismaRepository,
  TrainingConfigPrismaRepository,
  EmbeddingPrismaRepository,
  VectorPrismaRepository,
  VectorIndexPrismaRepository,
  SimilarityPrismaRepository,
  ClusterPrismaRepository,
  ForecastPrismaRepository,
  InsightPrismaRepository,
  PromptPrismaRepository,
  PromptTemplatePrismaRepository,
  CompletionPrismaRepository,
} from './persistence/prisma/repositories';

import {
  ModelCacheRepository,
  RecommendationCacheRepository,
  PersonalizationCacheRepository,
  EmbeddingCacheRepository,
  CompletionCacheRepository,
} from './persistence/cache/repositories';

// Vector DB
import { VectorDbModule } from './vector-db/vector-db.module';

// ML Providers
import { MlProvidersModule } from './ml-providers/ml-providers.module';

// Services
import {
  UserClient,
  ProductClient,
  OrderClient,
  VendorClient,
  CartClient,
  SearchClient,
  NotificationClient,
  AnalyticsClient,
} from './services/external';

import {
  TokenCounterService,
  EmbeddingGeneratorService,
  EmbeddingCacheService,
  ModelLoaderService,
  ModelInferenceService,
  VectorIndexBuilderService,
  SimilarityCalculatorService,
  ClusteringEngineService,
  ForecastingEngineService,
  AnomalyDetectorService,
  PromptSanitizerService,
  ContentFilterService,
  FeatureStoreService,
  ModelMonitorService,
  DriftDetectorService,
} from './services/internal';

// Queues
import {
  TrainingQueue,
  EmbeddingQueue,
  VectorQueue,
  RecommendationQueue,
  PersonalizationQueue,
  ForecastQueue,
  InsightQueue,
  AnalyticsQueue,
} from './queues';

// Workers
import { WorkersModule } from './workers/workers.module';

// External
import { StorageModule } from './external/storage/storage.module';
import { FeatureStoreModule } from './external/feature-store/feature-store.module';
import { MlflowModule } from './external/ml-ops/mlflow.module';

const PRISMA_REPOSITORIES = [
  ModelPrismaRepository,
  ModelMetadataPrismaRepository,
  ModelMetricsPrismaRepository,
  ModelArtifactPrismaRepository,
  ProviderPrismaRepository,
  ProviderConfigPrismaRepository,
  FeaturePrismaRepository,
  FeatureFlagPrismaRepository,
  RecommendationPrismaRepository,
  RecommendationContextPrismaRepository,
  RecommendationResultPrismaRepository,
  PersonalizationPrismaRepository,
  PersonalizationProfilePrismaRepository,
  AiSearchPrismaRepository,
  SearchResultPrismaRepository,
  RankingPrismaRepository,
  RankingResultPrismaRepository,
  AiAnalyticsPrismaRepository,
  AnalyticsReportPrismaRepository,
  TrainingPrismaRepository,
  TrainingConfigPrismaRepository,
  EmbeddingPrismaRepository,
  VectorPrismaRepository,
  VectorIndexPrismaRepository,
  SimilarityPrismaRepository,
  ClusterPrismaRepository,
  ForecastPrismaRepository,
  InsightPrismaRepository,
  PromptPrismaRepository,
  PromptTemplatePrismaRepository,
  CompletionPrismaRepository,
];

const CACHE_REPOSITORIES = [
  ModelCacheRepository,
  RecommendationCacheRepository,
  PersonalizationCacheRepository,
  EmbeddingCacheRepository,
  CompletionCacheRepository,
];

const EXTERNAL_CLIENTS = [
  UserClient,
  ProductClient,
  OrderClient,
  VendorClient,
  CartClient,
  SearchClient,
  NotificationClient,
  AnalyticsClient,
];

const INTERNAL_SERVICES = [
  TokenCounterService,
  EmbeddingGeneratorService,
  EmbeddingCacheService,
  ModelLoaderService,
  ModelInferenceService,
  VectorIndexBuilderService,
  SimilarityCalculatorService,
  ClusteringEngineService,
  ForecastingEngineService,
  AnomalyDetectorService,
  PromptSanitizerService,
  ContentFilterService,
  FeatureStoreService,
  ModelMonitorService,
  DriftDetectorService,
];

const QUEUES = [
  TrainingQueue,
  EmbeddingQueue,
  VectorQueue,
  RecommendationQueue,
  PersonalizationQueue,
  ForecastQueue,
  InsightQueue,
  AnalyticsQueue,
];

@Module({
  imports: [
    // Kernel global
    PrismaModule,
    RedisModule,
    QueueModule,
    EmailModule,
    SmsModule,
    PushModule,

    // App-level
    AppPrismaModule,
    VectorDbModule,
    MlProvidersModule,
    WorkersModule,
    StorageModule,
    FeatureStoreModule,
    MlflowModule,
  ],
  providers: [
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...EXTERNAL_CLIENTS,
    ...INTERNAL_SERVICES,
    ...QUEUES,
  ],
  exports: [
    AppPrismaModule,
    VectorDbModule,
    MlProvidersModule,
    StorageModule,
    FeatureStoreModule,
    MlflowModule,
    ...PRISMA_REPOSITORIES,
    ...CACHE_REPOSITORIES,
    ...EXTERNAL_CLIENTS,
    ...INTERNAL_SERVICES,
    ...QUEUES,
  ],
})
export class InfrastructureModule {}
