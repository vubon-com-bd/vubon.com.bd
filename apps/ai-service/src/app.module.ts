import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

// Kernel (already global: Prisma, Redis, Queue, EventBus, Guards, etc.)
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

// Infrastructure
import { InfrastructureModule } from './module/infrastructure/infrastructure.module';

// Feature modules
import {
  ProviderGatewaysModule,
  ModelModule,
  ProviderModule,
  FeatureModule,
  RecommendationModule,
  PersonalizationModule,
  AiSearchModule,
  RankingModule,
  EmbeddingModule,
  VectorModule,
  SimilarityModule,
  ClusterModule,
  ForecastModule,
  InsightModule,
  PromptModule,
  TrainingModule,
  AnalyticsModule,
} from './module/modules';

@Module({
  imports: [
    // Framework
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule,

    // Kernel (global: Prisma + Redis + Queue + EventBus + Guards + Interceptors)
    KernelCommonModule,

    // Infrastructure (adapters)
    InfrastructureModule,

    // Provider gateways (global)
    ProviderGatewaysModule.forRoot(),

    // Feature modules
    ModelModule,
    ProviderModule,
    FeatureModule,
    RecommendationModule,
    PersonalizationModule,
    AiSearchModule,
    RankingModule,
    EmbeddingModule,
    VectorModule,
    SimilarityModule,
    ClusterModule,
    ForecastModule,
    InsightModule,
    PromptModule,
    TrainingModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
