// ═══════════════════════════════════════════════════════════════
// ai-service — Service Implementations Barrel
// 38 service implementations
// ═══════════════════════════════════════════════════════════════

// Model
export { ModelService } from './model.service';
export { ModelMetadataService } from './model-metadata.service';
export { ModelMetricsService } from './model-metrics.service';
export { ModelArtifactService } from './model-artifact.service';

// Provider / Feature
export { ProviderService } from './provider.service';
export { ProviderConfigService } from './provider-config.service';
export { FeatureService } from './feature.service';
export { FeatureFlagService } from './feature-flag.service';

// Recommendation / Personalization
export { RecommendationService } from './recommendation.service';
export { RecommendationContextService } from './recommendation-context.service';
export { RecommendationResultService } from './recommendation-result.service';
export { PersonalizationService } from './personalization.service';
export { PersonalizationProfileService } from './personalization-profile.service';

// Search / Ranking
export { AiSearchService } from './ai-search.service';
export { SearchResultService } from './search-result.service';
export { RankingService } from './ranking.service';
export { RankingResultService } from './ranking-result.service';

// Training
export { TrainingService } from './training.service';
export { TrainingConfigService } from './training-config.service';
export { TrainingJobService } from './training-job.service';

// Embedding / Vector
export { EmbeddingService } from './embedding.service';
export { EmbeddingBatchService } from './embedding-batch.service';
export { VectorService } from './vector.service';
export { VectorIndexService } from './vector-index.service';

// Similarity / Cluster
export { SimilarityService } from './similarity.service';
export { SimilarityResultService } from './similarity-result.service';
export { ClusterService } from './cluster.service';
export { ClusterResultService } from './cluster-result.service';

// Forecast
export { ForecastService } from './forecast.service';
export { ForecastResultService } from './forecast-result.service';

// Insight
export { InsightService } from './insight.service';
export { InsightResultService } from './insight-result.service';

// Prompt / Completion
export { PromptService } from './prompt.service';
export { PromptTemplateService } from './prompt-template.service';
export { CompletionService } from './completion.service';

// Analytics
export { AiAnalyticsService } from './ai-analytics.service';
export { AnalyticsReportService } from './analytics-report.service';
