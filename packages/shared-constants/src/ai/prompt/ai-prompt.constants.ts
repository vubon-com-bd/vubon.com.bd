/**
 * AI Prompt Constants
 * Configuration for AI prompts and prompt engineering
 */

export const AI_PROMPT = {
  // Prompt Types
  TYPES: {
    SYSTEM: 'system',
    USER: 'user',
    ASSISTANT: 'assistant',
    FUNCTION: 'function',
    TOOL: 'tool',
    FEW_SHOT: 'few_shot',
    ZERO_SHOT: 'zero_shot',
    CHAIN_OF_THOUGHT: 'chain_of_thought',
    REACT: 'react',
    REFLECTION: 'reflection',
    SELF_CONSISTENCY: 'self_consistency',
    TREE_OF_THOUGHTS: 'tree_of_thoughts',
    GRAPH_OF_THOUGHTS: 'graph_of_thoughts',
    AUTOMATIC_REASONING: 'automatic_reasoning',
    PROGRAM_AIDED: 'program_aided',
  } as const,

  // Prompt Status
  STATUSES: {
    DRAFT: 'draft',
    PENDING: 'pending',
    REVIEWING: 'reviewing',
    APPROVED: 'approved',
    PUBLISHED: 'published',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
    TESTING: 'testing',
    OPTIMIZING: 'optimizing',
    FAILED: 'failed',
  } as const,

  // Prompt Categories
  CATEGORIES: {
    GENERATION: 'generation',
    CLASSIFICATION: 'classification',
    EXTRACTION: 'extraction',
    SUMMARIZATION: 'summarization',
    TRANSLATION: 'translation',
    QUESTION_ANSWERING: 'question_answering',
    REASONING: 'reasoning',
    CODING: 'coding',
    CREATIVE: 'creative',
    ANALYTICAL: 'analytical',
    CONVERSATIONAL: 'conversational',
    INSTRUCTIONAL: 'instructional',
    EVALUATION: 'evaluation',
    FORMATTING: 'formatting',
  } as const,

  // Prompt Formats
  FORMATS: {
    TEXT: 'text',
    JSON: 'json',
    XML: 'xml',
    HTML: 'html',
    MARKDOWN: 'markdown',
    CSV: 'csv',
    YAML: 'yaml',
    SQL: 'sql',
    CODE: 'code',
    CHART: 'chart',
    DIAGRAM: 'diagram',
    TABLE: 'table',
    LIST: 'list',
    BULLET: 'bullet',
    NUMBERED: 'numbered',
  } as const,

  // Prompt Variables
  VARIABLES: {
    USER_INPUT: 'user_input',
    CONTEXT: 'context',
    HISTORY: 'history',
    DOCUMENTS: 'documents',
    QUERY: 'query',
    INTENT: 'intent',
    ENTITIES: 'entities',
    SENTIMENT: 'sentiment',
    LANGUAGE: 'language',
    LOCATION: 'location',
    TIME: 'time',
    USER_ID: 'user_id',
    SESSION_ID: 'session_id',
    DEVICE: 'device',
    PLATFORM: 'platform',
  } as const,

  // Prompt Templates
  TEMPLATES: {
    // System Prompts
    SYSTEM_DEFAULT: 'system_default',
    SYSTEM_ASSISTANT: 'system_assistant',
    SYSTEM_EXPERT: 'system_expert',
    SYSTEM_CODER: 'system_coder',

    // User Prompts
    USER_QUESTION: 'user_question',
    USER_REQUEST: 'user_request',
    USER_COMMAND: 'user_command',
    USER_FEEDBACK: 'user_feedback',

    // Few-shot Templates
    FEW_SHOT_EXAMPLES: 'few_shot_examples',
    FEW_SHOT_CLASSIFICATION: 'few_shot_classification',
    FEW_SHOT_GENERATION: 'few_shot_generation',

    // Chain of Thought
    COT_STEP_BY_STEP: 'cot_step_by_step',
    COT_EXPLAIN: 'cot_explain',
    COT_REASON: 'cot_reason',

    // Specialized
    REACT_TEMPLATE: 'react_template',
    SELF_CONSISTENCY_TEMPLATE: 'self_consistency_template',
    TREE_OF_THOUGHTS_TEMPLATE: 'tree_of_thoughts_template',
  } as const,

  // Prompt Parameters
  PARAMETERS: {
    TEMPERATURE: 'temperature',
    MAX_TOKENS: 'max_tokens',
    TOP_P: 'top_p',
    TOP_K: 'top_k',
    FREQUENCY_PENALTY: 'frequency_penalty',
    PRESENCE_PENALTY: 'presence_penalty',
    STOP_SEQUENCES: 'stop_sequences',
    SEED: 'seed',
    RESPONSE_FORMAT: 'response_format',
    TOOL_CHOICE: 'tool_choice',
  } as const,

  // Prompt Defaults
  DEFAULTS: {
    TEMPERATURE: 0.7,
    MAX_TOKENS: 2048,
    TOP_P: 1.0,
    TOP_K: 40,
    FREQUENCY_PENALTY: 0.0,
    PRESENCE_PENALTY: 0.0,
  } as const,

  // Prompt Limits
  LIMITS: {
    MIN_TEMPERATURE: 0.0,
    MAX_TEMPERATURE: 2.0,
    MIN_MAX_TOKENS: 1,
    MAX_MAX_TOKENS: 32768,
    MIN_TOP_P: 0.0,
    MAX_TOP_P: 1.0,
    MIN_TOP_K: 1,
    MAX_TOP_K: 100,
  } as const,

  // Prompt Metrics
  METRICS: {
    TOKEN_COUNT: 'token_count',
    CHARACTER_COUNT: 'character_count',
    WORD_COUNT: 'word_count',
    SENTENCE_COUNT: 'sentence_count',
    READABILITY: 'readability',
    CLARITY: 'clarity',
    RELEVANCE: 'relevance',
    SPECIFICITY: 'specificity',
    EFFECTIVENESS: 'effectiveness',
    EFFICIENCY: 'efficiency',
  } as const,
} as const;

// Prompt Types
export type AIPromptType = (typeof AI_PROMPT.TYPES)[keyof typeof AI_PROMPT.TYPES];

// Prompt Status
export type AIPromptStatus = (typeof AI_PROMPT.STATUSES)[keyof typeof AI_PROMPT.STATUSES];

// Prompt Categories
export type AIPromptCategory = (typeof AI_PROMPT.CATEGORIES)[keyof typeof AI_PROMPT.CATEGORIES];

// Prompt Formats
export type AIPromptFormat = (typeof AI_PROMPT.FORMATS)[keyof typeof AI_PROMPT.FORMATS];

// Prompt Variables
export type AIPromptVariable = (typeof AI_PROMPT.VARIABLES)[keyof typeof AI_PROMPT.VARIABLES];

// Prompt Templates
export type AIPromptTemplate = (typeof AI_PROMPT.TEMPLATES)[keyof typeof AI_PROMPT.TEMPLATES];

// Prompt Parameters
export type AIPromptParameter = (typeof AI_PROMPT.PARAMETERS)[keyof typeof AI_PROMPT.PARAMETERS];

// Prompt Defaults
export type AIPromptDefault = (typeof AI_PROMPT.DEFAULTS)[keyof typeof AI_PROMPT.DEFAULTS];

// Prompt Limits
export type AIPromptLimit = (typeof AI_PROMPT.LIMITS)[keyof typeof AI_PROMPT.LIMITS];

// Prompt Metrics
export type AIPromptMetric = (typeof AI_PROMPT.METRICS)[keyof typeof AI_PROMPT.METRICS];

// Utility Functions
export function getPromptTypeLabel(type: AIPromptType): string {
  const labels: Record<AIPromptType, string> = {
    [AI_PROMPT.TYPES.SYSTEM]: 'System',
    [AI_PROMPT.TYPES.USER]: 'User',
    [AI_PROMPT.TYPES.ASSISTANT]: 'Assistant',
    [AI_PROMPT.TYPES.FUNCTION]: 'Function',
    [AI_PROMPT.TYPES.TOOL]: 'Tool',
    [AI_PROMPT.TYPES.FEW_SHOT]: 'Few Shot',
    [AI_PROMPT.TYPES.ZERO_SHOT]: 'Zero Shot',
    [AI_PROMPT.TYPES.CHAIN_OF_THOUGHT]: 'Chain of Thought',
    [AI_PROMPT.TYPES.REACT]: 'ReAct',
    [AI_PROMPT.TYPES.REFLECTION]: 'Reflection',
    [AI_PROMPT.TYPES.SELF_CONSISTENCY]: 'Self Consistency',
    [AI_PROMPT.TYPES.TREE_OF_THOUGHTS]: 'Tree of Thoughts',
    [AI_PROMPT.TYPES.GRAPH_OF_THOUGHTS]: 'Graph of Thoughts',
    [AI_PROMPT.TYPES.AUTOMATIC_REASONING]: 'Automatic Reasoning',
    [AI_PROMPT.TYPES.PROGRAM_AIDED]: 'Program Aided',
  };
  return labels[type] || 'Unknown';
}

export function getPromptStatusLabel(status: AIPromptStatus): string {
  const labels: Record<AIPromptStatus, string> = {
    [AI_PROMPT.STATUSES.DRAFT]: 'Draft',
    [AI_PROMPT.STATUSES.PENDING]: 'Pending',
    [AI_PROMPT.STATUSES.REVIEWING]: 'Reviewing',
    [AI_PROMPT.STATUSES.APPROVED]: 'Approved',
    [AI_PROMPT.STATUSES.PUBLISHED]: 'Published',
    [AI_PROMPT.STATUSES.DEPRECATED]: 'Deprecated',
    [AI_PROMPT.STATUSES.ARCHIVED]: 'Archived',
    [AI_PROMPT.STATUSES.TESTING]: 'Testing',
    [AI_PROMPT.STATUSES.OPTIMIZING]: 'Optimizing',
    [AI_PROMPT.STATUSES.FAILED]: 'Failed',
  };
  return labels[status] || 'Unknown';
}

export function getPromptCategoryLabel(category: AIPromptCategory): string {
  const labels: Record<AIPromptCategory, string> = {
    [AI_PROMPT.CATEGORIES.GENERATION]: 'Generation',
    [AI_PROMPT.CATEGORIES.CLASSIFICATION]: 'Classification',
    [AI_PROMPT.CATEGORIES.EXTRACTION]: 'Extraction',
    [AI_PROMPT.CATEGORIES.SUMMARIZATION]: 'Summarization',
    [AI_PROMPT.CATEGORIES.TRANSLATION]: 'Translation',
    [AI_PROMPT.CATEGORIES.QUESTION_ANSWERING]: 'Question Answering',
    [AI_PROMPT.CATEGORIES.REASONING]: 'Reasoning',
    [AI_PROMPT.CATEGORIES.CODING]: 'Coding',
    [AI_PROMPT.CATEGORIES.CREATIVE]: 'Creative',
    [AI_PROMPT.CATEGORIES.ANALYTICAL]: 'Analytical',
    [AI_PROMPT.CATEGORIES.CONVERSATIONAL]: 'Conversational',
    [AI_PROMPT.CATEGORIES.INSTRUCTIONAL]: 'Instructional',
    [AI_PROMPT.CATEGORIES.EVALUATION]: 'Evaluation',
    [AI_PROMPT.CATEGORIES.FORMATTING]: 'Formatting',
  };
  return labels[category] || 'Unknown';
}

export function getPromptFormatLabel(format: AIPromptFormat): string {
  const labels: Record<AIPromptFormat, string> = {
    [AI_PROMPT.FORMATS.TEXT]: 'Text',
    [AI_PROMPT.FORMATS.JSON]: 'JSON',
    [AI_PROMPT.FORMATS.XML]: 'XML',
    [AI_PROMPT.FORMATS.HTML]: 'HTML',
    [AI_PROMPT.FORMATS.MARKDOWN]: 'Markdown',
    [AI_PROMPT.FORMATS.CSV]: 'CSV',
    [AI_PROMPT.FORMATS.YAML]: 'YAML',
    [AI_PROMPT.FORMATS.SQL]: 'SQL',
    [AI_PROMPT.FORMATS.CODE]: 'Code',
    [AI_PROMPT.FORMATS.CHART]: 'Chart',
    [AI_PROMPT.FORMATS.DIAGRAM]: 'Diagram',
    [AI_PROMPT.FORMATS.TABLE]: 'Table',
    [AI_PROMPT.FORMATS.LIST]: 'List',
    [AI_PROMPT.FORMATS.BULLET]: 'Bullet',
    [AI_PROMPT.FORMATS.NUMBERED]: 'Numbered',
  };
  return labels[format] || 'Unknown';
}

export function getPromptTemplateLabel(template: AIPromptTemplate): string {
  const labels: Record<AIPromptTemplate, string> = {
    [AI_PROMPT.TEMPLATES.SYSTEM_DEFAULT]: 'System Default',
    [AI_PROMPT.TEMPLATES.SYSTEM_ASSISTANT]: 'System Assistant',
    [AI_PROMPT.TEMPLATES.SYSTEM_EXPERT]: 'System Expert',
    [AI_PROMPT.TEMPLATES.SYSTEM_CODER]: 'System Coder',
    [AI_PROMPT.TEMPLATES.USER_QUESTION]: 'User Question',
    [AI_PROMPT.TEMPLATES.USER_REQUEST]: 'User Request',
    [AI_PROMPT.TEMPLATES.USER_COMMAND]: 'User Command',
    [AI_PROMPT.TEMPLATES.USER_FEEDBACK]: 'User Feedback',
    [AI_PROMPT.TEMPLATES.FEW_SHOT_EXAMPLES]: 'Few Shot Examples',
    [AI_PROMPT.TEMPLATES.FEW_SHOT_CLASSIFICATION]: 'Few Shot Classification',
    [AI_PROMPT.TEMPLATES.FEW_SHOT_GENERATION]: 'Few Shot Generation',
    [AI_PROMPT.TEMPLATES.COT_STEP_BY_STEP]: 'Step by Step',
    [AI_PROMPT.TEMPLATES.COT_EXPLAIN]: 'Explain',
    [AI_PROMPT.TEMPLATES.COT_REASON]: 'Reason',
    [AI_PROMPT.TEMPLATES.REACT_TEMPLATE]: 'ReAct',
    [AI_PROMPT.TEMPLATES.SELF_CONSISTENCY_TEMPLATE]: 'Self Consistency',
    [AI_PROMPT.TEMPLATES.TREE_OF_THOUGHTS_TEMPLATE]: 'Tree of Thoughts',
  };
  return labels[template] || 'Unknown';
}

export function getPromptParameterLabel(parameter: AIPromptParameter): string {
  const labels: Record<AIPromptParameter, string> = {
    [AI_PROMPT.PARAMETERS.TEMPERATURE]: 'Temperature',
    [AI_PROMPT.PARAMETERS.MAX_TOKENS]: 'Max Tokens',
    [AI_PROMPT.PARAMETERS.TOP_P]: 'Top P',
    [AI_PROMPT.PARAMETERS.TOP_K]: 'Top K',
    [AI_PROMPT.PARAMETERS.FREQUENCY_PENALTY]: 'Frequency Penalty',
    [AI_PROMPT.PARAMETERS.PRESENCE_PENALTY]: 'Presence Penalty',
    [AI_PROMPT.PARAMETERS.STOP_SEQUENCES]: 'Stop Sequences',
    [AI_PROMPT.PARAMETERS.SEED]: 'Seed',
    [AI_PROMPT.PARAMETERS.RESPONSE_FORMAT]: 'Response Format',
    [AI_PROMPT.PARAMETERS.TOOL_CHOICE]: 'Tool Choice',
  };
  return labels[parameter] || 'Unknown';
}

export function getPromptMetricLabel(metric: AIPromptMetric): string {
  const labels: Record<AIPromptMetric, string> = {
    [AI_PROMPT.METRICS.TOKEN_COUNT]: 'Token Count',
    [AI_PROMPT.METRICS.CHARACTER_COUNT]: 'Character Count',
    [AI_PROMPT.METRICS.WORD_COUNT]: 'Word Count',
    [AI_PROMPT.METRICS.SENTENCE_COUNT]: 'Sentence Count',
    [AI_PROMPT.METRICS.READABILITY]: 'Readability',
    [AI_PROMPT.METRICS.CLARITY]: 'Clarity',
    [AI_PROMPT.METRICS.RELEVANCE]: 'Relevance',
    [AI_PROMPT.METRICS.SPECIFICITY]: 'Specificity',
    [AI_PROMPT.METRICS.EFFECTIVENESS]: 'Effectiveness',
    [AI_PROMPT.METRICS.EFFICIENCY]: 'Efficiency',
  };
  return labels[metric] || 'Unknown';
}

export function isPromptActive(status: AIPromptStatus): boolean {
  const activeStatuses: AIPromptStatus[] = [
    AI_PROMPT.STATUSES.APPROVED,
    AI_PROMPT.STATUSES.PUBLISHED,
    AI_PROMPT.STATUSES.TESTING,
    AI_PROMPT.STATUSES.OPTIMIZING,
  ];
  return activeStatuses.includes(status);
}

export function isPromptAvailable(status: AIPromptStatus): boolean {
  const availableStatuses: AIPromptStatus[] = [
    AI_PROMPT.STATUSES.APPROVED,
    AI_PROMPT.STATUSES.PUBLISHED,
    AI_PROMPT.STATUSES.TESTING,
  ];
  return availableStatuses.includes(status);
}

export function isPromptDeprecated(status: AIPromptStatus): boolean {
  const deprecatedStatuses: AIPromptStatus[] = [
    AI_PROMPT.STATUSES.DEPRECATED,
    AI_PROMPT.STATUSES.ARCHIVED,
  ];
  return deprecatedStatuses.includes(status);
}

export function getDefaultTemperature(): number {
  return AI_PROMPT.DEFAULTS.TEMPERATURE;
}

export function getDefaultMaxTokens(): number {
  return AI_PROMPT.DEFAULTS.MAX_TOKENS;
}

export function getDefaultTopP(): number {
  return AI_PROMPT.DEFAULTS.TOP_P;
}

export function getDefaultTopK(): number {
  return AI_PROMPT.DEFAULTS.TOP_K;
}

export function getPromptLimit(key: keyof typeof AI_PROMPT.LIMITS): number {
  return AI_PROMPT.LIMITS[key] || 0;
}
