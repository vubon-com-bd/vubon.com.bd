// ═══════════════════════════════════════════════════════════════
// ai-service — Composite VOs Barrel
// 40 composite value objects
// ═══════════════════════════════════════════════════════════════

// Model (4)
export { ModelVO, type ModelProps } from './model.vo';
export { ModelMetadataVO, type ModelMetadataProps } from './model-metadata.vo';
export { ModelMetricsVO, type ModelMetricsProps } from './model-metrics.vo';
export { ModelArtifactVO, type ModelArtifactProps } from './model-artifact.vo';

// Provider (2)
export { ProviderVO, type ProviderProps } from './provider.vo';
export { ProviderConfigVO, type ProviderConfigProps } from './provider-config.vo';

// Feature (2)
export { FeatureVO, type FeatureProps } from './feature.vo';
export { FeatureFlagVO, type FeatureFlagProps } from './feature-flag.vo';

// Recommendation (3)
export { RecommendationVO, type RecommendationProps } from './recommendation.vo';
export {
  RecommendationContextVO,
  type RecommendationContextProps,
} from './recommendation-context.vo';
export {
  RecommendationResultVO,
  type RecommendationResultProps,
  type RecommendationResultItemProps,
} from './recommendation-result.vo';

// Personalization (2)
export { PersonalizationVO, type PersonalizationProps } from './personalization.vo';
export {
  PersonalizationProfileVO,
  type PersonalizationProfileProps,
} from './personalization-profile.vo';

// Search (2)
export { AiSearchVO, type AiSearchProps } from './ai-search.vo';
export { SearchResultVO, type SearchResultProps, type SearchResultItemProps } from './search-result.vo';

// Ranking (2)
export { RankingVO, type RankingProps } from './ranking.vo';
export { RankingResultVO, type RankingResultProps, type RankedItemProps } from './ranking-result.vo';

// Analytics (2)
export { AiAnalyticsVO, type AiAnalyticsProps } from './ai-analytics.vo';
export {
  AnalyticsReportVO,
  type AnalyticsReportProps,
  type AnalyticsMetricEntryProps,
} from './analytics-report.vo';

// Training (3)
export { TrainingVO, type TrainingProps } from './training.vo';
export { TrainingConfigVO, type TrainingConfigProps } from './training-config.vo';
export { TrainingJobVO, type TrainingJobProps } from './training-job.vo';

// Embedding (2)
export { EmbeddingVO, type EmbeddingProps } from './embedding.vo';
export {
  EmbeddingBatchVO,
  type EmbeddingBatchProps,
  type EmbeddingBatchItemProps,
} from './embedding-batch.vo';

// Vector (2)
export { VectorVO, type VectorProps } from './vector.vo';
export { VectorIndexVO, type VectorIndexProps } from './vector-index.vo';

// Similarity (2)
export { SimilarityVO, type SimilarityProps } from './similarity.vo';
export {
  SimilarityResultVO,
  type SimilarityResultProps,
  type SimilarityMatchProps,
} from './similarity-result.vo';

// Cluster (2)
export { ClusterVO, type ClusterProps } from './cluster.vo';
export {
  ClusterResultVO,
  type ClusterResultProps,
  type ClusterEntryProps,
} from './cluster-result.vo';

// Forecast (2)
export { ForecastVO, type ForecastProps } from './forecast.vo';
export {
  ForecastResultVO,
  type ForecastResultProps,
  type ForecastDataPointProps,
} from './forecast-result.vo';

// Insight (2)
export { InsightVO, type InsightProps } from './insight.vo';
export {
  InsightResultVO,
  type InsightResultProps,
  type InsightFindingProps,
} from './insight-result.vo';

// Prompt (2)
export { PromptVO, type PromptProps } from './prompt.vo';
export { PromptTemplateVO_, type PromptTemplateProps } from './prompt-template.vo';

// Completion (1)
export { CompletionVO, type CompletionProps } from './completion.vo';

// AI Summary (1)
export { AiSummaryVO, type AiSummaryProps } from './ai-summary.vo';
