/**
 * AI Model Index
 * Export all AI model constants and types for easy importing
 */

// Export all constants from ai-model.constants
export {
  AI_MODEL,
  getAiModelContextWindow,
  getAiModelCost,
  calculateAiModelCost,
  getAiModelMaxTokens,
  isAiModelVisionCapable,
  isAiModelChatModel,
  getAiModelSize,
} from './ai-model.constants';

// Export all types from ai-model.constants
export type {
  AIModelVersion,
  AIModelCapability,
  AIModelSize,
  AIPerformanceTier,
  AIContextWindow,
  AIModelCost,
  AIModelQuality,
} from './ai-model.constants';

// Export all constants from ai-model-type.constants
export {
  AI_MODEL_TYPE,
  getAiModelMemoryRequirement,
  isAiModelLanguageModel,
  isAiModelVisionModel,
  isAiModelAudioModel,
  getAiModelFamilyFromArchitecture,
  isAiModelReady,
  isAiModelTraining,
  getAiModelQuantizationPrecision,
} from './ai-model-type.constants';

// Export all types from ai-model-type.constants
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

// Export all constants from ai-model-status.constants
export {
  AI_MODEL_STATUSES,
  AI_MODEL_STATUS,
  getAimodelstatusLabel,
  getAimodelstatusCategory,
  getAimodelstatusSeverity,
  getAimodelstatusColor,
  isAimodelstatusDeployed,
  isAimodelstatusActive,
  isAimodelstatusError,
  getAimodelstatusProgress,
} from './ai-model-status.constants';

// Export all types from ai-model-status.constants
export type {
  AIModelStatusType,
  AIModelStatusCategory,
  AIModelStatusPriority,
  AIModelStatusSeverity,
  AIModelStatusColor,
} from './ai-model-status.constants';

// Export all constants from ai-model-provider.constants
export {
  AI_MODEL_PROVIDER,
  getProviderEndpoint,
  getProviderDefault,
  getProviderAuthType,
  getProviderPricingModel,
  getProviderRegion,
} from './ai-model-provider.constants';

// Export all types from ai-model-provider.constants
export type {
  AIProviderType,
  AIProviderRegion,
  AIProviderEnvironment,
  AIProviderAuthType,
  AIProviderPricingModel,
  AIProviderDefault,
} from './ai-model-provider.constants';
