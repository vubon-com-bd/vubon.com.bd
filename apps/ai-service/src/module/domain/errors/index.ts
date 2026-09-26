export {
  ModelNotFoundError,
  ModelNotDeployedError,
  ModelDeprecatedError,
} from './model.errors';

export {
  ProviderNotFoundError,
  ProviderUnavailableError,
  ProviderTimeoutError,
} from './provider.errors';

export { TrainingFailedError, InsufficientDataError } from './training.errors';

export {
  RecommendationFailedError,
  NoRecommendationsError,
} from './recommendation.errors';

export {
  PersonalizationFailedError,
  InsufficientHistoryError,
} from './personalization.errors';

export { SearchFailedError, InvalidQueryError } from './search.errors';

export {
  EmbeddingFailedError,
  DimensionMismatchError,
} from './embedding.errors';

export { VectorNotFoundError, IndexNotBuiltError } from './vector.errors';
export { SimilarityFailedError } from './similarity.errors';
export { ClusteringFailedError } from './cluster.errors';
export {
  ForecastFailedError,
  InsufficientDataForForecastError,
} from './forecast.errors';
export { InsightGenerationFailedError } from './insight.errors';
export {
  PromptTooLongError,
  RateLimitExceededError,
  ContentFilteredError,
} from './prompt.errors';
export {
  CompletionFailedError,
  TokenLimitExceededError,
} from './completion.errors';
