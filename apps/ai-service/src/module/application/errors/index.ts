// Model
export {
  ModelNotFoundError,
  ModelNotDeployableError,
  ModelOperationFailedError,
  ModelAlreadyExistsError,
} from './model.errors';

// Training
export {
  TrainingNotFoundError,
  TrainingInProgressError,
  InsufficientTrainingDataError,
  TrainingFailedError,
} from './training.errors';

// Recommendation
export {
  RecommendationNotFoundError,
  NoRecommendationsError,
  InsufficientHistoryError,
} from './recommendation.errors';

// Embedding
export {
  EmbeddingFailedError,
  DimensionMismatchError,
  BatchTooLargeError,
} from './embedding.errors';

// Vector
export {
  VectorNotFoundError,
  VectorIndexNotReadyError,
  VectorSearchFailedError,
} from './vector.errors';

// Prompt
export {
  PromptNotFoundError,
  PromptTooLongError,
  ContentFilteredError,
  CompletionFailedError,
} from './prompt.errors';

// Provider
export {
  ProviderNotFoundError,
  ProviderUnavailableError,
  ProviderTimeoutError,
  ProviderRateLimitError,
  ProviderAuthError,
} from './provider.errors';

// Cluster (NEW)
export {
  ClusteringFailedError,
  InsufficientClusterDataError,
  InvalidKError,
} from './cluster.errors';

// Search (NEW)
export {
  SearchFailedError,
  InvalidQueryError,
} from './search.errors';
export {
  ForecastNotFoundError,
  ForecastFailedError,
  InsufficientDataForForecastError,
} from './forecast.errors';

export {
  InsightNotFoundError,
  InsightGenerationFailedError,
  AnomalyDetectionFailedError,
} from './insight.errors';
