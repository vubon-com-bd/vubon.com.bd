// ═══════════════════════════════════════════════════════════════
// ai-service — Domain Entities Barrel
// 38 entities (AggregateRoot + BaseEntity)
// ═══════════════════════════════════════════════════════════════

// ─── Model (4) ────────────────────────────────────────────────
export { ModelEntity, type ModelEntityProps } from './model.entity';
export { ModelMetadataEntity, type ModelMetadataEntityProps } from './model-metadata.entity';
export { ModelMetricsEntity, type ModelMetricsEntityProps } from './model-metrics.entity';
export { ModelArtifactEntity, type ModelArtifactEntityProps } from './model-artifact.entity';

// ─── Provider (2) ─────────────────────────────────────────────
export { ProviderEntity, type ProviderEntityProps } from './provider.entity';
export { ProviderConfigEntity, type ProviderConfigEntityProps } from './provider-config.entity';

// ─── Feature (2) ──────────────────────────────────────────────
export { FeatureEntity, type FeatureEntityProps } from './feature.entity';
export { FeatureFlagEntity, type FeatureFlagEntityProps } from './feature-flag.entity';

// ─── Recommendation (3) ───────────────────────────────────────
export { RecommendationEntity, type RecommendationEntityProps } from './recommendation.entity';
export {
  RecommendationContextEntity,
  type RecommendationContextEntityProps,
} from './recommendation-context.entity';
export {
  RecommendationResultEntity,
  type RecommendationResultEntityProps,
} from './recommendation-result.entity';

// ─── Personalization (2) ──────────────────────────────────────
export {
  PersonalizationEntity,
  type PersonalizationEntityProps,
} from './personalization.entity';
export {
  PersonalizationProfileEntity,
  type PersonalizationProfileEntityProps,
} from './personalization-profile.entity';

// ─── Search (2) ───────────────────────────────────────────────
export { AiSearchEntity, type AiSearchEntityProps } from './ai-search.entity';
export { SearchResultEntity, type SearchResultEntityProps } from './search-result.entity';

// ─── Ranking (2) ──────────────────────────────────────────────
export { RankingEntity, type RankingEntityProps } from './ranking.entity';
export { RankingResultEntity, type RankingResultEntityProps } from './ranking-result.entity';

// ─── Analytics (2) ────────────────────────────────────────────
export { AiAnalyticsEntity, type AiAnalyticsEntityProps } from './ai-analytics.entity';
export {
  AnalyticsReportEntity,
  type AnalyticsReportEntityProps,
} from './analytics-report.entity';

// ─── Training (3) ─────────────────────────────────────────────
export { TrainingEntity, type TrainingEntityProps } from './training.entity';
export { TrainingConfigEntity, type TrainingConfigEntityProps } from './training-config.entity';
export { TrainingJobEntity, type TrainingJobEntityProps } from './training-job.entity';

// ─── Embedding (2) ────────────────────────────────────────────
export { EmbeddingEntity, type EmbeddingEntityProps } from './embedding.entity';
export {
  EmbeddingBatchEntity,
  type EmbeddingBatchEntityProps,
} from './embedding-batch.entity';

// ─── Vector (2) ───────────────────────────────────────────────
export { VectorEntity, type VectorEntityProps } from './vector.entity';
export { VectorIndexEntity, type VectorIndexEntityProps } from './vector-index.entity';

// ─── Similarity (2) ───────────────────────────────────────────
export { SimilarityEntity, type SimilarityEntityProps } from './similarity.entity';
export {
  SimilarityResultEntity,
  type SimilarityResultEntityProps,
} from './similarity-result.entity';

// ─── Cluster (2) ──────────────────────────────────────────────
export { ClusterEntity, type ClusterEntityProps } from './cluster.entity';
export { ClusterResultEntity, type ClusterResultEntityProps } from './cluster-result.entity';

// ─── Forecast (2) ─────────────────────────────────────────────
export { ForecastEntity, type ForecastEntityProps } from './forecast.entity';
export { ForecastResultEntity, type ForecastResultEntityProps } from './forecast-result.entity';

// ─── Insight (2) ──────────────────────────────────────────────
export { InsightEntity, type InsightEntityProps } from './insight.entity';
export { InsightResultEntity, type InsightResultEntityProps } from './insight-result.entity';

// ─── Prompt (2) ───────────────────────────────────────────────
export { PromptEntity, type PromptEntityProps } from './prompt.entity';
export { PromptTemplateEntity, type PromptTemplateEntityProps } from './prompt-template.entity';

// ─── Completion (1) ───────────────────────────────────────────
export { CompletionEntity, type CompletionEntityProps } from './completion.entity';

// ─── AI Summary (1) ───────────────────────────────────────────
export { AiSummaryEntity, type AiSummaryEntityProps } from './ai-summary.entity';
