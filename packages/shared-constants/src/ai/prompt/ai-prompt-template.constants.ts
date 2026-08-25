/**
 * AI Prompt Template Constants
 * Template definitions for AI prompts
 */

export const AI_PROMPT_TEMPLATE = {
  // Template Categories
  CATEGORIES: {
    SYSTEM: 'system',
    USER: 'user',
    FEW_SHOT: 'few_shot',
    COT: 'cot',
    REACT: 'react',
    SPECIALIZED: 'specialized',
    CUSTOM: 'custom',
  } as const,

  // Template Formats
  FORMATS: {
    STRING: 'string',
    MUSTACHE: 'mustache',
    HANDLEBARS: 'handlebars',
    JINJA: 'jinja',
    CUSTOM: 'custom',
  } as const,

  // Template Variables
  VARIABLES: {
    // System Variables
    SYSTEM_NAME: 'system_name',
    SYSTEM_ROLE: 'system_role',
    SYSTEM_CONTEXT: 'system_context',

    // User Variables
    USER_NAME: 'user_name',
    USER_QUERY: 'user_query',
    USER_INPUT: 'user_input',
    USER_HISTORY: 'user_history',

    // Context Variables
    CONTEXT_DATA: 'context_data',
    DOCUMENTS: 'documents',
    KNOWLEDGE: 'knowledge',
    EXAMPLES: 'examples',

    // Output Variables
    OUTPUT_FORMAT: 'output_format',
    OUTPUT_LENGTH: 'output_length',
    OUTPUT_STYLE: 'output_style',
  } as const,

  // Template Parameters
  PARAMETERS: {
    // Template-specific
    TEMPLATE_NAME: 'template_name',
    TEMPLATE_VERSION: 'template_version',
    TEMPLATE_AUTHOR: 'template_author',

    // Formatting
    FORMAT_TYPE: 'format_type',
    DELIMITER: 'delimiter',
    ESCAPE_CHAR: 'escape_char',

    // Behavior
    STRICT_MODE: 'strict_mode',
    PARTIALS: 'partials',
    HELPERS: 'helpers',
  } as const,

  // Template Metrics
  METRICS: {
    TOKEN_EFFICIENCY: 'token_efficiency',
    REUSABILITY: 'reusability',
    MAINTAINABILITY: 'maintainability',
    CLARITY: 'clarity',
    SPECIFICITY: 'specificity',
  } as const,
} as const;

export type AIPromptTemplateCategory =
  (typeof AI_PROMPT_TEMPLATE.CATEGORIES)[keyof typeof AI_PROMPT_TEMPLATE.CATEGORIES];

export type AIPromptTemplateFormat =
  (typeof AI_PROMPT_TEMPLATE.FORMATS)[keyof typeof AI_PROMPT_TEMPLATE.FORMATS];

export type AIPromptTemplateVariable =
  (typeof AI_PROMPT_TEMPLATE.VARIABLES)[keyof typeof AI_PROMPT_TEMPLATE.VARIABLES];

export type AIPromptTemplateParameter =
  (typeof AI_PROMPT_TEMPLATE.PARAMETERS)[keyof typeof AI_PROMPT_TEMPLATE.PARAMETERS];

export type AIPromptTemplateMetric =
  (typeof AI_PROMPT_TEMPLATE.METRICS)[keyof typeof AI_PROMPT_TEMPLATE.METRICS];

export function getAiPromptTemplateCategoryLabel(category: AIPromptTemplateCategory): string {
  const labels: Record<AIPromptTemplateCategory, string> = {
    [AI_PROMPT_TEMPLATE.CATEGORIES.SYSTEM]: 'System',
    [AI_PROMPT_TEMPLATE.CATEGORIES.USER]: 'User',
    [AI_PROMPT_TEMPLATE.CATEGORIES.FEW_SHOT]: 'Few Shot',
    [AI_PROMPT_TEMPLATE.CATEGORIES.COT]: 'Chain of Thought',
    [AI_PROMPT_TEMPLATE.CATEGORIES.REACT]: 'ReAct',
    [AI_PROMPT_TEMPLATE.CATEGORIES.SPECIALIZED]: 'Specialized',
    [AI_PROMPT_TEMPLATE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown';
}

export function getAiPromptTemplateFormatLabel(format: AIPromptTemplateFormat): string {
  const labels: Record<AIPromptTemplateFormat, string> = {
    [AI_PROMPT_TEMPLATE.FORMATS.STRING]: 'String',
    [AI_PROMPT_TEMPLATE.FORMATS.MUSTACHE]: 'Mustache',
    [AI_PROMPT_TEMPLATE.FORMATS.HANDLEBARS]: 'Handlebars',
    [AI_PROMPT_TEMPLATE.FORMATS.JINJA]: 'Jinja',
    [AI_PROMPT_TEMPLATE.FORMATS.CUSTOM]: 'Custom',
  };
  return labels[format] || 'Unknown';
}

export function getAiPromptTemplateVariableLabel(variable: AIPromptTemplateVariable): string {
  const labels: Record<AIPromptTemplateVariable, string> = {
    [AI_PROMPT_TEMPLATE.VARIABLES.SYSTEM_NAME]: 'System Name',
    [AI_PROMPT_TEMPLATE.VARIABLES.SYSTEM_ROLE]: 'System Role',
    [AI_PROMPT_TEMPLATE.VARIABLES.SYSTEM_CONTEXT]: 'System Context',
    [AI_PROMPT_TEMPLATE.VARIABLES.USER_NAME]: 'User Name',
    [AI_PROMPT_TEMPLATE.VARIABLES.USER_QUERY]: 'User Query',
    [AI_PROMPT_TEMPLATE.VARIABLES.USER_INPUT]: 'User Input',
    [AI_PROMPT_TEMPLATE.VARIABLES.USER_HISTORY]: 'User History',
    [AI_PROMPT_TEMPLATE.VARIABLES.CONTEXT_DATA]: 'Context Data',
    [AI_PROMPT_TEMPLATE.VARIABLES.DOCUMENTS]: 'Documents',
    [AI_PROMPT_TEMPLATE.VARIABLES.KNOWLEDGE]: 'Knowledge',
    [AI_PROMPT_TEMPLATE.VARIABLES.EXAMPLES]: 'Examples',
    [AI_PROMPT_TEMPLATE.VARIABLES.OUTPUT_FORMAT]: 'Output Format',
    [AI_PROMPT_TEMPLATE.VARIABLES.OUTPUT_LENGTH]: 'Output Length',
    [AI_PROMPT_TEMPLATE.VARIABLES.OUTPUT_STYLE]: 'Output Style',
  };
  return labels[variable] || 'Unknown';
}

export function getAiPromptTemplateParameterLabel(parameter: AIPromptTemplateParameter): string {
  const labels: Record<AIPromptTemplateParameter, string> = {
    [AI_PROMPT_TEMPLATE.PARAMETERS.TEMPLATE_NAME]: 'Template Name',
    [AI_PROMPT_TEMPLATE.PARAMETERS.TEMPLATE_VERSION]: 'Template Version',
    [AI_PROMPT_TEMPLATE.PARAMETERS.TEMPLATE_AUTHOR]: 'Template Author',
    [AI_PROMPT_TEMPLATE.PARAMETERS.FORMAT_TYPE]: 'Format Type',
    [AI_PROMPT_TEMPLATE.PARAMETERS.DELIMITER]: 'Delimiter',
    [AI_PROMPT_TEMPLATE.PARAMETERS.ESCAPE_CHAR]: 'Escape Character',
    [AI_PROMPT_TEMPLATE.PARAMETERS.STRICT_MODE]: 'Strict Mode',
    [AI_PROMPT_TEMPLATE.PARAMETERS.PARTIALS]: 'Partials',
    [AI_PROMPT_TEMPLATE.PARAMETERS.HELPERS]: 'Helpers',
  };
  return labels[parameter] || 'Unknown';
}

export function getAiPromptTemplateMetricLabel(metric: AIPromptTemplateMetric): string {
  const labels: Record<AIPromptTemplateMetric, string> = {
    [AI_PROMPT_TEMPLATE.METRICS.TOKEN_EFFICIENCY]: 'Token Efficiency',
    [AI_PROMPT_TEMPLATE.METRICS.REUSABILITY]: 'Reusability',
    [AI_PROMPT_TEMPLATE.METRICS.MAINTAINABILITY]: 'Maintainability',
    [AI_PROMPT_TEMPLATE.METRICS.CLARITY]: 'Clarity',
    [AI_PROMPT_TEMPLATE.METRICS.SPECIFICITY]: 'Specificity',
  };
  return labels[metric] || 'Unknown';
}
