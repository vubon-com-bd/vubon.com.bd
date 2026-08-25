/**
 * AI Prompt Index
 * Export all AI prompt constants and types for easy importing
 */

// Export all constants from ai-prompt.constants
export {
  AI_PROMPT,
  getAiPromptTypeLabel,
  getAiPromptStatusLabel,
  getAiPromptCategoryLabel,
  getAiPromptFormatLabel,
  getAiPromptTemplateLabel,
  getAiPromptParameterLabel,
  getAiPromptMetricLabel,
  isAiPromptActive,
  isAiPromptAvailable,
  isAiPromptDeprecated,
  getAiPromptDefaultTemperature,
  getAiPromptDefaultMaxTokens,
  getAiPromptDefaultTopP,
  getAiPromptDefaultTopK,
  getAiPromptLimit,
} from './ai-prompt.constants';

// Export all types from ai-prompt.constants
export type {
  AIPromptType,
  AIPromptStatus,
  AIPromptCategory,
  AIPromptFormat,
  AIPromptVariable,
  AIPromptTemplate,
  AIPromptParameter,
  AIPromptDefault,
  AIPromptLimit,
  AIPromptMetric,
} from './ai-prompt.constants';

// Export all constants from ai-prompt-type.constants
export {
  AI_PROMPT_TYPE,
  getAiPromptDomainLabel,
  getAiPromptSubTypeLabel,
  getAiPromptComplexityLabel,
  getAiPromptToneLabel,
  getAiPromptLanguageLabel,
  getAiPromptPersonaLabel,
  getAiPromptComplexityScore,
} from './ai-prompt-type.constants';

// Export all types from ai-prompt-type.constants
export type {
  AIPromptDomain,
  AIPromptSubType,
  AIPromptComplexity,
  AIPromptTone,
  AIPromptLanguage,
  AIPromptPersona,
} from './ai-prompt-type.constants';

// Export all constants from ai-prompt-template.constants
export {
  AI_PROMPT_TEMPLATE,
  getAiPromptTemplateCategoryLabel,
  getAiPromptTemplateFormatLabel,
  getAiPromptTemplateVariableLabel,
  getAiPromptTemplateParameterLabel,
  getAiPromptTemplateMetricLabel,
} from './ai-prompt-template.constants';

// Export all types from ai-prompt-template.constants
export type {
  AIPromptTemplateCategory,
  AIPromptTemplateFormat,
  AIPromptTemplateVariable,
  AIPromptTemplateParameter,
  AIPromptTemplateMetric,
} from './ai-prompt-template.constants';

// Export all constants from ai-prompt-status.constants
export {
  AI_PROMPT_STATUS_TYPES,
  AI_PROMPT_STATUS,
  getAiPromptStatusLabel as getAiPromptStatusLabelDetailed,
  getAiPromptStatusCategory,
  getAiPromptStatusSeverity,
  getAiPromptStatusColor,
  isAiPromptInDevelopment,
  isAiPromptInTesting,
  isAiPromptInProduction,
  isAiPromptActiveStatus,
  getAiPromptStatusProgress,
} from './ai-prompt-status.constants';

// Export all types from ai-prompt-status.constants
export type {
  AIPromptStatusType,
  AIPromptStatusCategory,
  AIPromptStatusSeverity,
  AIPromptStatusColor,
} from './ai-prompt-status.constants';
