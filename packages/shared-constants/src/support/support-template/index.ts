/**
 * Support Template Constants Index
 * Export all support template constants and types for easy importing
 */

// Support Template Constants
export {
  SUPPORT_TEMPLATE,
  supportTemplateGetTypeLabel,
  supportTemplateGetStatusLabel,
  supportTemplateGetCategoryLabel,
  supportTemplateGetFormatLabel,
  supportTemplateIsActive,
  supportTemplateGetVariableLabel,
} from './support-template.constants';

export type {
  SupportTemplateType,
  SupportTemplateStatus,
  SupportTemplateCategory,
  SupportTemplateFormat,
  SupportTemplateVariable,
} from './support-template.constants';

// Support Template Type Constants
export {
  SUPPORT_TEMPLATE_TYPE,
  supportTemplateTypeGetCategoryLabel,
  supportTemplateTypeGetScopeLabel,
  supportTemplateTypeGetLanguageLabel,
  supportTemplateTypeGetPriorityLabel,
  supportTemplateTypeGetComplexityLabel,
} from './support-template-type.constants';

export type {
  SupportTemplateTypeCategory,
  SupportTemplateTypeScope,
  SupportTemplateTypeLanguage,
  SupportTemplateTypePriority,
  SupportTemplateTypeComplexity,
} from './support-template-type.constants';
