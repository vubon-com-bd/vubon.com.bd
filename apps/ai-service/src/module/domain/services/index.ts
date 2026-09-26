// ═══════════════════════════════════════════════════════════════
// ai-service — Domain Services Barrel
// 32 pure domain services
// ═══════════════════════════════════════════════════════════════

// ─── Model (4) ────────────────────────────────────────────────
export { ModelSelectionService } from './model-selection.service';
export { ModelEvaluationService, type EvaluationResult } from './model-evaluation.service';
export { ModelVersioningService } from './model-versioning.service';
export { ModelAbTestingService, type AbTestSplit } from './model-ab-testing.service';

// ─── Recommendation (7) ───────────────────────────────────────
export { RecommendationScoringService, type ScoringInput } from './recommendation-scoring.service';
export { RecommendationStrategyService, type StrategyContext } from './recommendation-strategy.service';
export { CollaborativeFilteringService, type UserInteraction, type ScoredItem } from './collaborative-filtering.service';
export { ContentBasedFilteringService, type ItemFeatures } from './content-based-filtering.service';
export { HybridFilteringService } from './hybrid-filtering.service';
export { MatrixFactorizationService, type FactorVector } from './matrix-factorization.service';
export { LearningToRankService, type RankingFeatures } from './learning-to-rank.service';

// ─── Personalization (2) ──────────────────────────────────────
export { PersonalizationFactorsService, type SignalInput } from './personalization-factors.service';
export { UserProfileBuilderService, type InteractionRecord, type BuiltProfile } from './user-profile-builder.service';

// ─── Search (2) ───────────────────────────────────────────────
export { SemanticSearchService, type VectorDocument, type SearchMatch } from './semantic-search.service';
export { HybridSearchService, type KeywordMatch } from './hybrid-search.service';

// ─── Embedding (2) ────────────────────────────────────────────
export { EmbeddingGeneratorService, type EmbeddingInput, type GeneratedEmbedding } from './embedding-generator.service';
export { EmbeddingCacheService, type CacheEntry } from './embedding-cache.service';

// ─── Vector (2) ───────────────────────────────────────────────
export { VectorSimilarityService, type VectorInput, type SimilarityMatch } from './vector-similarity.service';
export { VectorIndexService, type IndexEntry, type IndexSearchResult } from './vector-index.service';

// ─── Analytics (4) ────────────────────────────────────────────
export { ClusteringService, type ClusterableItem, type Cluster } from './clustering.service';
export { ForecastingService, type TimeSeriesPoint, type ForecastPoint } from './forecasting.service';
export { AnomalyDetectionService, type DataPoint as AnomalyDataPoint, type Anomaly } from './anomaly-detection.service';
export { TrendDetectionService, type DataPoint as TrendDataPoint, type TrendResult, type TrendDirection } from './trend-detection.service';

// ─── Seasonality (1) ──────────────────────────────────────────
export { SeasonalityDetectionService, type SeasonalityResult } from './seasonality-detection.service';

// ─── Insight (1) ──────────────────────────────────────────────
export { InsightGeneratorService, type InsightInput, type GeneratedInsight } from './insight-generator.service';

// ─── Prompt/Completion (5) ────────────────────────────────────
export { PromptEngineService, type RenderInput, type RenderedPrompt } from './prompt-engine.service';
export { PromptTemplateService, type TemplateInput } from './prompt-template.service';
export { CompletionValidatorService, type CompletionInput, type ValidationResult } from './completion-validator.service';
export { TokenCounterService } from './token-counter.service';
export { ContextWindowService, type ContextMessage, type TrimmedContext } from './context-window.service';

// ─── Confidence (1) ───────────────────────────────────────────
export { ConfidenceCalculatorService, type ConfidenceInput } from './confidence-calculator.service';

// ─── Drift (1) ────────────────────────────────────────────────
export { ModelDriftDetectorService, type DriftInput, type DriftResult } from './model-drift-detector.service';
