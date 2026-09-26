// ═══════════════════════════════════════════════════════════════
// ai-service — Domain Repository Interfaces Barrel
// 38 repository contracts
// ═══════════════════════════════════════════════════════════════

// ─── Model (4) ────────────────────────────────────────────────
export type { ModelRepository } from './model.repository.interface';
export type { ModelMetadataRepository } from './model-metadata.repository.interface';
export type { ModelMetricsRepository } from './model-metrics.repository.interface';
export type { ModelArtifactRepository } from './model-artifact.repository.interface';

// ─── Provider (2) ─────────────────────────────────────────────
export type { ProviderRepository } from './provider.repository.interface';
export type { ProviderConfigRepository } from './provider-config.repository.interface';

// ─── Feature (2) ──────────────────────────────────────────────
export type { FeatureRepository } from './feature.repository.interface';
export type { FeatureFlagRepository } from './feature-flag.repository.interface';

// ─── Recommendation (3) ───────────────────────────────────────
export type { RecommendationRepository } from './recommendation.repository.interface';
export type { RecommendationContextRepository } from './recommendation-context.repository.interface';
export type { RecommendationResultRepository } from './recommendation-result.repository.interface';

// ─── Personalization (2) ──────────────────────────────────────
export type { PersonalizationRepository } from './personalization.repository.interface';
export type { PersonalizationProfileRepository } from './personalization-profile.repository.interface';

// ─── Search (2) ───────────────────────────────────────────────
export type { AiSearchRepository } from './ai-search.repository.interface';
export type { SearchResultRepository } from './search-result.repository.interface';

// ─── Ranking (2) ──────────────────────────────────────────────
export type { RankingRepository } from './ranking.repository.interface';
export type { RankingResultRepository } from './ranking-result.repository.interface';

// ─── Analytics (2) ────────────────────────────────────────────
export type { AiAnalyticsRepository } from './ai-analytics.repository.interface';
export type { AnalyticsReportRepository } from './analytics-report.repository.interface';

// ─── Training (3) ─────────────────────────────────────────────
export type { TrainingRepository } from './training.repository.interface';
export type { TrainingConfigRepository } from './training-config.repository.interface';
export type { TrainingJobRepository } from './training-job.repository.interface';

// ─── Embedding (2) ────────────────────────────────────────────
export type { EmbeddingRepository } from './embedding.repository.interface';
export type { EmbeddingBatchRepository } from './embedding-batch.repository.interface';

// ─── Vector (2) ───────────────────────────────────────────────
export type { VectorRepository } from './vector.repository.interface';
export type { VectorIndexRepository } from './vector-index.repository.interface';

// ─── Similarity (2) ───────────────────────────────────────────
export type { SimilarityRepository } from './similarity.repository.interface';
export type { SimilarityResultRepository } from './similarity-result.repository.interface';

// ─── Cluster (2) ──────────────────────────────────────────────
export type { ClusterRepository } from './cluster.repository.interface';
export type { ClusterResultRepository } from './cluster-result.repository.interface';

// ─── Forecast (2) ─────────────────────────────────────────────
export type { ForecastRepository } from './forecast.repository.interface';
export type { ForecastResultRepository } from './forecast-result.repository.interface';

// ─── Insight (2) ──────────────────────────────────────────────
export type { InsightRepository } from './insight.repository.interface';
export type { InsightResultRepository } from './insight-result.repository.interface';

// ─── Prompt (2) ───────────────────────────────────────────────
export type { PromptRepository } from './prompt.repository.interface';
export type { PromptTemplateRepository } from './prompt-template.repository.interface';

// ─── Completion (1) ───────────────────────────────────────────
export type { CompletionRepository } from './completion.repository.interface';

// ─── AI Summary (1) ───────────────────────────────────────────
export type { AiSummaryRepository } from './ai-summary.repository.interface';
