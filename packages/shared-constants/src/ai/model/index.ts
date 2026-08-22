/**
 * AI Model Constants Index
 * Export all AI model constants and types for easy importing
 */

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
} from './ai-model.constants';

export type {
  AIModelVersion,
  AIModelCapability,
  AIModelSize,
  AIPerformanceTier,
  AIContextWindow,
  AIModelCost,
  AIModelQuality,
} from './ai-model.constants';

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
} from './ai-model-type.constants';

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
} from './ai-model-type.constants';

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
} from './ai-model-status.constants';

export type {
  AIModelStatusType,
  AIModelStatusCategory,
  AIModelStatusPriority,
  AIModelStatusColor,
} from './ai-model-status.constants';

// AI Model Provider Constants
export {
  AI_MODEL_PROVIDER,
  getProviderEndpoint,
  getProviderDefault,
  getProviderAuthType,
  getProviderPricingModel,
  getProviderRegion,
} from './ai-model-provider.constants';

export type {
  AIProviderType,
  AIProviderRegion,
  AIProviderEnvironment,
  AIProviderAuthType,
  AIProviderPricingModel,
  AIProviderDefault,
} from './ai-model-provider.constants';
