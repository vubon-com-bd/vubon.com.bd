/**
 * AI Constants Index
 * Export all AI constants and types for easy importing
 */

// AI Error Constants
export {
  AI_ERROR,
  AI_ERROR_CODES,
  getErrorMessage,
  getErrorCategory,
  getErrorSeverity,
  getErrorHttpStatus,
  getErrorRecoveryAction,
  isRetryableError,
  shouldBackoff,
} from './ai-error.constants';

export type {
  AIErrorCategory,
  AIErrorCode,
  AIErrorSeverity,
  AIErrorRecovery,
} from './ai-error.constants';

// AI Main Constants
export {
  AI,
  getAIModelStatusLabel,
  getAIErrorLabel,
  getAIEndpoint,
  getAITimeout,
  getAIBatchSize,
  isModelDeployed,
  isModelActive,
  isModelFailed,
  getAIConfidenceLabel,
  getDefaultLearningRate,
} from './ai.constants';

export type {
  AIServiceType,
  AIProvider,
  AIModelType,
  AIModelStatus,
  AIConfidence,
  AIErrorType,
  AIEndpoint,
  AIFeature,
  AITimeout,
  AIBatchSize,
  AIEpoch,
} from './ai.constants';

// AI Model Constants
export {
  AI_MODEL,
  getContextWindow,
  getModelCost,
  calculateCost,
  getMaxTokens,
  isVisionCapable,
  isChatModel,
  getModelSize,
} from './model/ai-model.constants';

export type {
  AIModelVersion,
  AIModelCapability,
  AIModelSize,
  AIPerformanceTier,
  AIContextWindow,
  AIModelCost,
  AIModelQuality,
} from './model/ai-model.constants';

// AI Model Type Constants
export {
  AI_MODEL_TYPE,
  getMemoryRequirement,
  isLanguageModel,
  isVisionModel,
  isAudioModel,
  getFamilyFromArchitecture,
  isModelReady,
  isModelTraining,
  getQuantizationPrecision,
} from './model/ai-model-type.constants';

export type {
  AIModelArchitecture,
  AIModelTask,
  AIModelFamily,
  AIModelSpecialization,
  AIFineTuningType,
  AIModelFormat,
  AITrainingParadigm,
  AIModelState,
  AIModelLifecycleStage,
  AIQuantizationType,
  AIMemoryRequirement,
} from './model/ai-model-type.constants';

// AI Model Status Constants
export {
  AI_MODEL_STATUS,
  getStatusCategory,
  getStatusColor,
  getStatusPriority,
  isDeployedStatus,
  isActiveStatus,
  isErrorStatus,
  getStatusLabel,
} from './model/ai-model-status.constants';

export type {
  AIModelStatusType,
  AIModelStatusCategory,
  AIModelStatusPriority,
  AIModelStatusColor,
} from './model/ai-model-status.constants';

// AI Model Provider Constants
export {
  AI_MODEL_PROVIDER,
  getProviderEndpoint,
  getProviderDefault,
  getProviderAuthType,
  getProviderPricingModel,
  getProviderRegion,
} from './model/ai-model-provider.constants';

export type {
  AIProviderType,
  AIProviderRegion,
  AIProviderEnvironment,
  AIProviderAuthType,
  AIProviderPricingModel,
  AIProviderDefault,
} from './model/ai-model-provider.constants';

// AI Recommendation Constants
export {
  AI_RECOMMENDATION,
  getRecPriorityLabel,
  getRecStatusLabel,
  getRecommendationScopeLabel,
  getRecommendationMetricLabel,
  getRecommendationAlgorithmFamily,
  isRecDelivered,
  isRecActive,
  getDefaultRecommendationCount,
} from './recommendation';

export type {
  AIRecommendationType,
  AIRecommendationStrategy,
  AIRecommendationScope,
  AIRecommendationPriority,
  AIRecommendationStatus,
  AIRecommendationFeedbackType,
  AIRecommendationScoreType,
  AIRecommendationFilter,
  AIRecommendationAlgorithm,
  AIRecommendationMetric,
  AIRecommendationLimit,
  AIRecommendationTimeframe,
  AIRecommendationModel,
} from './recommendation';

// AI Recommendation Type Constants
export {
  AI_RECOMMENDATION_TYPE,
  getRecommendationTypeLabel,
  getRecommendationCategoryLabel,
  getRecommendationSourceLabel,
  getRecommendationPurposeLabel,
  getDefaultCountByPurpose,
} from './recommendation';

export type {
  AIRecommendationTypeType,
  AIRecommendationCategory,
  AIRecommendationSubType,
  AIRecommendationSource,
  AIRecommendationPurpose,
} from './recommendation';

// AI Recommendation Strategy Constants
export {
  AI_RECOMMENDATION_STRATEGY,
  getStrategyTypeLabel,
  getStrategyGoalLabel,
  getExecutionModeLabel,
  getEvaluationMethodLabel,
  getStrategyPriorityWeight,
  getRecommendedStrategyForGoal,
} from './recommendation';

export type {
  AIRecommendationStrategyType,
  AIRecommendationStrategyApproach,
  AIRecommendationStrategyGoal,
  AIRecommendationStrategyTradeOff,
  AIRecommendationExecutionMode,
  AIRecommendationEvaluationMethod,
} from './recommendation';

// AI Recommendation Status Constants
export {
  AI_RECOMMENDATION_STATUS,
  getRecStatusLabel2,
  getRecommendationStatusCategory,
  getRecommendationStatusSeverity,
  getRecommendationStatusColor,
  isRecActive2,
  isRecDelivered2,
  isRecommendationConverted,
  isRecommendationFailed,
  isRecommendationComplete,
} from './recommendation';

export type {
  AIRecommendationStatusType,
  AIRecommendationStatusCategory,
  AIRecommendationStatusSeverity,
  AIRecommendationStatusColor,
} from './recommendation';

// AI Recommendation Scope Constants
export {
  AI_RECOMMENDATION_SCOPE,
  getScopeLevelLabel,
  getScopeContextLabel,
  getScopeTypeLabel,
  getScopeRuleLabel,
  getScopePriorityValue,
  getScopeWeight,
  getDefaultRecommendationCountByScope,
} from './recommendation';

export type {
  AIRecommendationScopeLevel,
  AIRecommendationScopeContext,
  AIRecommendationScopeType,
  AIRecommendationScopeRule,
  AIRecommendationScopePriority,
  AIRecommendationScopeWeight,
} from './recommendation';

// AI Recommendation Priority Constants
export {
  AI_RECOMMENDATION_PRIORITY,
  getPriorityLevelLabel,
  getPriorityScore,
  getPriorityLevel,
  calculatePriorityScore,
  applyPriorityBoost,
  applyPriorityPenalty,
  getPriorityBoostLabel,
  getPriorityPenaltyLabel,
  getDecayFactor,
  getDefaultFactorWeights,
  getDefaultThresholds,
} from './recommendation';

export type {
  AIRecommendationPriorityLevel,
  AIRecommendationPriorityScore,
  AIRecommendationPriorityFactor,
  AIRecommendationPriorityWeight,
  AIRecommendationPriorityThreshold,
  AIRecommendationPriorityDecay,
  AIRecommendationPriorityBoost,
  AIRecommendationPriorityPenalty,
} from './recommendation';

// AI Personalization Constants
export {
  AI_PERSONALIZATION,
  AI_PERSONALIZATION_TYPE,
  AI_PERSONALIZATION_STATUS,
  AI_PERSONALIZATION_SCOPE,
  AI_PERSONALIZATION_STRATEGY,
  getPersonalizationTypeLabel,
  getPersonalizationStatusLabel,
  getPersonalizationScopeLabel,
  getPersonalizationStrategyLabel,
  getPersonalizationEventLabel,
  getPersonalizationMetricLabel,
  isPersonalizationActive,
  isPersonalizationComplete,
  isPersonalizationFailed,
  getPersonalizationWeight,
} from './personalization';

// AI Search Constants
export {
  AI_SEARCH,
  AI_SEARCH_TYPE,
  AI_SEARCH_STATUS,
  AI_SEARCH_STRATEGY,
  getSearchTypeLabel,
  getSearchStatusLabel,
  getSearchStrategyLabel,
  getSearchSortLabel,
  getSearchMetricLabel,
  getSearchModeLabel,
  isSearchActive,
  isSearchComplete,
  isSearchFailed,
  getDefaultSearchLimit,
  getMaxSearchLimit,
} from './search';

// AI Ranking Constants
export {
  AI_RANKING,
  AI_RANKING_TYPE,
  AI_RANKING_STRATEGY,
  AI_RANKING_STATUS,
  getRankingTypeLabel,
  getRankingStatusLabel,
  getRankingStrategyLabel,
  getRankingFactorLabel,
  getRankingMetricLabel,
  getRankingModeLabel,
  isRankingActive,
  isRankingComplete,
  isRankingFailed,
  getRankingWeight,
  getDefaultRankingLimit,
  calculateCombinedScore,
} from './ranking';

// AI Training Constants
export {
  AI_TRAINING,
  AI_TRAINING_TYPE,
  AI_TRAINING_STATUS,
  AI_TRAINING_PHASE,
  getTrainingTypeLabel,
  getTrainingStatusLabel,
  getTrainingPhaseLabel,
  getTrainingMetricLabel,
  getTrainingOptimizerLabel,
  getTrainingLossFunctionLabel,
  getTrainingFrameworkLabel,
  getTrainingHardwareLabel,
  isTrainingActive,
  isTrainingComplete,
  isTrainingFailed,
  getDefaultEpochs,
  getDefaultBatchSize as getTrainingDefaultBatchSize,
  getDefaultLearningRate as getTrainingDefaultLearningRate,
  getValidationSplit,
} from './training';

// AI Feature Constants
export {
  AI_FEATURE,
  AI_FEATURE_TYPES,
  AI_FEATURE_TYPE,
  AI_FEATURE_STATUS,
  getFeatureCategoryLabel,
  getFeatureTypeLabel,
  getFeatureStatusLabel,
  getFeatureLevelLabel,
  getFeatureAccessLabel,
  getFeatureDependencies,
  getFeatureMetricLabel,
  isFeatureActive,
  isFeatureAvailable,
  isFeatureDeprecated,
  getFeatureLevelPriority,
  getFeatureAccessPriority,
} from './feature';

// AI Prompt Constants
export {
  AI_PROMPT,
  AI_PROMPT_TYPE,
  AI_PROMPT_STATUS,
  AI_PROMPT_TEMPLATE,
  getPromptTypeLabel,
  getPromptStatusLabel,
  getPromptCategoryLabel,
  getPromptFormatLabel,
  getPromptTemplateLabel,
  getPromptParameterLabel,
  getPromptMetricLabel,
  isPromptActive,
  isPromptAvailable,
  isPromptDeprecated,
  getDefaultTemperature,
  getDefaultMaxTokens,
  getDefaultTopP,
  getDefaultTopK,
  getPromptLimit,
} from './prompt';

// AI Embedding Constants
export {
  AI_EMBEDDING,
  AI_EMBEDDING_MODELS,
  AI_EMBEDDING_DIMENSIONS,
  AI_EMBEDDING_TYPE,
  AI_EMBEDDING_STATUS,
  getEmbeddingTypeLabel,
  getEmbeddingStatusLabel,
  getEmbeddingModelLabel,
  getEmbeddingProviderLabel,
  getEmbeddingFormatLabel,
  getEmbeddingMetricLabel,
  getEmbeddingNormalizationLabel,
  getEmbeddingDimension,
  getEmbeddingProvider,
  isEmbeddingActive,
  isEmbeddingGenerating,
  isEmbeddingFailed,
  getDefaultEmbeddingModel,
  getDefaultBatchSize as getEmbeddingDefaultBatchSize,
  getMaxBatchSize,
  calculateCosineSimilarity,
  calculateEuclideanDistance,
  calculateDotProduct,
} from './embedding';

// AI Vector Constants
export {
  AI_VECTOR,
  AI_VECTOR_TYPE,
  AI_VECTOR_STATUS,
  getVectorTypeLabel,
  getVectorStatusLabel,
  getVectorDBTypeLabel,
  getVectorIndexTypeLabel,
  getVectorDistanceMetricLabel,
  getVectorStorageFormatLabel,
  getVectorOperationLabel,
  getVectorMetricLabel,
  getVectorNormalizationLabel,
  isVectorActive,
  isVectorGenerating,
  isVectorFailed,
  getDefaultDimension,
  getDefaultTopK as getVectorDefaultTopK,
  getDefaultBatchSize as getVectorDefaultBatchSize,
  getDefaultDistanceMetric,
  getDefaultIndexType,
  getIndexTypeCompatibility,
  getDistanceMetricForType,
} from './vector';

// AI Similarity Constants
export {
  AI_SIMILARITY,
  AI_SIMILARITY_TYPE,
  AI_SIMILARITY_STATUS,
  getSimilarityTypeLabel,
  getSimilarityStatusLabel,
  getSimilarityCategoryLabel,
  getSimilarityAlgorithmLabel,
  getSimilarityThresholdLabel,
  getSimilarityFormatLabel,
  getSimilarityNormalizationLabel,
  isSimilarityActive,
  isSimilarityCalculating,
  isSimilarityFailed,
  getDefaultThreshold,
  getDefaultTopK as getSimilarityDefaultTopK,
  getMaxTopK,
  normalizeScore,
  denormalizeScore,
  getSimilarityRange,
  getAlgorithmForType,
} from './similarity';

// AI Cluster Constants
export {
  AI_CLUSTER,
  AI_CLUSTER_TYPE,
  AI_CLUSTER_STATUS,
  getClusterTypeLabel,
  getClusterStatusLabel,
  getClusterCategoryLabel,
  getClusterAlgorithmLabel,
  getClusterMetricLabel,
  getClusterDistanceMetricLabel,
  getClusterQualityLabel,
  isClusterActive,
  isClusterProcessing,
  isClusterFailed,
  getDefaultClusters,
  getDefaultIterations,
  getDefaultEpsilon,
  getDefaultMinPts,
  getAlgorithmCategory,
  getQualityScore as getClusterQualityScore,
} from './cluster';

// AI Forecast Constants
export {
  AI_FORECAST,
  AI_FORECAST_TYPE,
  AI_FORECAST_STATUS,
  getForecastTypeLabel,
  getForecastStatusLabel,
  getForecastMethodLabel,
  getForecastHorizonLabel,
  getForecastFrequencyLabel,
  getForecastConfidenceLabel,
  getForecastQualityLabel,
  getForecastMetricLabel,
  getForecastOutputLabel,
  getForecastValidationLabel,
  isForecastActive,
  isForecastProcessing,
  isForecastFailed,
  getDefaultHorizon,
  getMaxHorizon,
  getDefaultSamples,
  getHorizonDays,
  getConfidenceScore as getForecastConfidenceScore,
  getQualityScore as getForecastQualityScore,
} from './forecast';

// AI Insight Constants
export {
  AI_INSIGHT,
  AI_INSIGHT_TYPE,
  AI_INSIGHT_STATUS,
  AI_INSIGHT_PRIORITY,
  AI_INSIGHT_PRIORITY_FACTORS,
  getInsightTypeLabel,
  getInsightStatusLabel,
  getInsightCategoryLabel,
  getInsightMethodLabel,
  getInsightPriorityLabel,
  getInsightConfidenceLabel,
  getInsightImpactLabel,
  getInsightQualityLabel,
  getInsightSourceLabel,
  getInsightFormatLabel,
  getInsightMetricLabel,
  isInsightActive,
  isInsightProcessing,
  isInsightFailed,
  getPriorityScore as getInsightPriorityScore,
  getConfidenceScore as getInsightConfidenceScore,
  getQualityScore as getInsightQualityScore,
  getImpactScore,
} from './insight';
