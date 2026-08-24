/**
 * Support Script Constants Index
 * Export all support script constants and types for easy importing
 */

// Support Script Constants
export {
  SUPPORT_SCRIPT,
  supportScriptGetTypeLabel,
  supportScriptGetStatusLabel,
  supportScriptGetCategoryLabel,
  supportScriptGetFormatLabel,
  supportScriptIsActive,
} from './support-script.constants';

export type {
  SupportScriptType,
  SupportScriptStatus,
  SupportScriptCategory,
  SupportScriptFormat,
} from './support-script.constants';

// Support Script Category Constants
export {
  SUPPORT_SCRIPT_CATEGORY,
  supportScriptCategoryGetLabel,
  supportScriptCategoryGetScopeLabel,
  supportScriptCategoryGetPriorityLabel,
  supportScriptCategoryGetColor,
  supportScriptCategoryGetIcon,
} from './support-script-category.constants';

export type {
  SupportScriptCategoryType,
  SupportScriptCategoryScope,
  SupportScriptCategoryPriority,
  SupportScriptCategoryColor,
  SupportScriptCategoryIcon,
} from './support-script-category.constants';
