// ═══════════════════════════════════════════════════════════════
// ai-service — Domain Primitives VOs Barrel
// 66 value objects (17 ID + 3 Name + 9 Status + 16 Type
//                  + 12 Code + 4 Quantity + 5 Reference)
// ═══════════════════════════════════════════════════════════════

// ─── ID VOs (17) ───────────────────────────────────────────────
export { ModelIdVO } from './model-id.vo';
export { ModelProviderIdVO } from './model-provider-id.vo';
export { FeatureIdVO } from './feature-id.vo';
export { RecommendationIdVO } from './recommendation-id.vo';
export { PersonalizationIdVO } from './personalization-id.vo';
export { AiSearchIdVO } from './ai-search-id.vo';
export { RankingIdVO } from './ranking-id.vo';
export { AiAnalyticsIdVO } from './ai-analytics-id.vo';
export { TrainingIdVO } from './training-id.vo';
export { EmbeddingIdVO } from './embedding-id.vo';
export { VectorIdVO } from './vector-id.vo';
export { SimilarityIdVO } from './similarity-id.vo';
export { ClusterIdVO } from './cluster-id.vo';
export { ForecastIdVO } from './forecast-id.vo';
export { InsightIdVO } from './insight-id.vo';
export { PromptIdVO } from './prompt-id.vo';
export { CompletionIdVO } from './completion-id.vo';

// ─── Name VOs (3) ──────────────────────────────────────────────
export { ModelNameVO } from './model-name.vo';
export { ProviderNameVO } from './provider-name.vo';
export { FeatureNameVO } from './feature-name.vo';

// ─── Status VOs (9) ────────────────────────────────────────────
export { ModelStatusVO } from './model-status.vo';
export { FeatureStatusVO } from './feature-status.vo';
export { TrainingStatusVO } from './training-status.vo';
export { RecommendationStatusVO } from './recommendation-status.vo';
export { PersonalizationStatusVO } from './personalization-status.vo';
export { SearchStatusVO } from './search-status.vo';
export { EmbeddingStatusVO } from './embedding-status.vo';
export { VectorStatusVO } from './vector-status.vo';
export { InsightStatusVO } from './insight-status.vo';

// ─── Type VOs (16) ─────────────────────────────────────────────
export { ModelTypeVO } from './model-type.vo';
export { RecommendationTypeVO } from './recommendation-type.vo';
export { RecommendationStrategyVO } from './recommendation-strategy.vo';
export { PersonalizationTypeVO } from './personalization-type.vo';
export { PersonalizationSignalVO } from './personalization-signal.vo';
export { SearchTypeVO } from './search-type.vo';
export { SearchModelVO } from './search-model.vo';
export { RankingAlgorithmVO } from './ranking-algorithm.vo';
export { RankingFeatureVO } from './ranking-feature.vo';
export { AnalyticsTypeVO } from './analytics-type.vo';
export { AnalyticsMetricVO } from './analytics-metric.vo';
export { TrainingTypeVO } from './training-type.vo';
export { EmbeddingTypeVO } from './embedding-type.vo';
export { EmbeddingModelVO } from './embedding-model.vo';
export { VectorTypeVO } from './vector-type.vo';
export { VectorIndexTypeVO } from './vector-index-type.vo';

// ─── Code VOs (12) ─────────────────────────────────────────────
export { ModelVersionVO } from './model-version.vo';
export { ProviderEndpointVO } from './provider-endpoint.vo';
export { RecommendationScoreVO } from './recommendation-score.vo';
export { SimilarityThresholdVO } from './similarity-threshold.vo';
export { InsightConfidenceVO } from './insight-confidence.vo';
export { PromptTemplateVO } from './prompt-template.vo';
export { CompletionTextVO } from './completion-text.vo';
export { AnalyticsValueVO } from './analytics-value.vo';
export { ProviderApiKeyRefVO } from './provider-api-key-ref.vo';
export { VectorNameVO } from './vector-name.vo';
export { CacheKeyVO } from './cache-key.vo';
export { IdempotencyKeyVO } from './idempotency-key.vo';

// ─── Quantity VOs (4) ──────────────────────────────────────────
export { EmbeddingDimensionVO } from './embedding-dimension.vo';
export { VectorDimensionVO } from './vector-dimension.vo';
export { ForecastHorizonVO } from './forecast-horizon.vo';
export { PromptTokenCountVO } from './prompt-token-count.vo';

// ─── Reference VOs (5) ─────────────────────────────────────────
export { UserIdVO } from './user-id.vo';
export { ProductIdVO } from './product-id.vo';
export { OrderIdVO } from './order-id.vo';
export { VendorIdVO } from './vendor-id.vo';
export { SessionIdVO } from './session-id.vo';
