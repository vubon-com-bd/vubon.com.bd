/**
 * প্রম্পট টেমপ্লেট প্লেসহোল্ডার প্যাটার্নসমূহ
 */
export const AI_PROMPT_TEMPLATE_PLACEHOLDERS = {
  DOUBLE_BRACES: '{{variable}}',
  SINGLE_BRACE: '{variable}',
  PERCENT_SIGN: '%variable%',
  DOLLAR_SIGN: '$variable',
  AT_SIGN: '@variable',
  HASH_SIGN: '#variable#',
} as const;

/**
 * AI_PROMPT_TEMPLATE_PLACEHOLDERS থেকে টাইপ
 */
export type AIPromptTemplatePlaceholder =
  (typeof AI_PROMPT_TEMPLATE_PLACEHOLDERS)[keyof typeof AI_PROMPT_TEMPLATE_PLACEHOLDERS];

/**
 * প্রম্পট টেমপ্লেট প্লেসহোল্ডার প্যাটার্ন লেবেল
 */
export const AI_PROMPT_TEMPLATE_PLACEHOLDER_LABELS: Record<AIPromptTemplatePlaceholder, string> = {
  [AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES]: 'Double Braces ({{variable}})',
  [AI_PROMPT_TEMPLATE_PLACEHOLDERS.SINGLE_BRACE]: 'Single Brace ({variable})',
  [AI_PROMPT_TEMPLATE_PLACEHOLDERS.PERCENT_SIGN]: 'Percent Sign (%variable%)',
  [AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOLLAR_SIGN]: 'Dollar Sign ($variable)',
  [AI_PROMPT_TEMPLATE_PLACEHOLDERS.AT_SIGN]: 'At Sign (@variable)',
  [AI_PROMPT_TEMPLATE_PLACEHOLDERS.HASH_SIGN]: 'Hash Sign (#variable#)',
} as const;

/**
 * সর্বোচ্চ ভেরিয়েবল সংখ্যা (২০)
 */
export const AI_PROMPT_TEMPLATE_MAX_VARIABLES = 20 as const;

/**
 * ডিফল্ট প্রম্পট টেমপ্লেট
 */
export const AI_PROMPT_TEMPLATE_DEFAULT = `System: You are a helpful AI assistant.
Context: {{context}}
User: {{user_input}}
Assistant:` as const;

/**
 * প্রম্পট টেমপ্লেট ক্যাটাগরি এনাম
 */
export const AI_PROMPT_TEMPLATE_CATEGORY = {
  CHAT: 'chat',
  INSTRUCTION: 'instruction',
  ANALYSIS: 'analysis',
  CREATIVE: 'creative',
  CODING: 'coding',
  TRANSLATION: 'translation',
  SUMMARIZATION: 'summarization',
  CLASSIFICATION: 'classification',
  EXTRACTION: 'extraction',
  GENERATION: 'generation',
} as const;

/**
 * AI_PROMPT_TEMPLATE_CATEGORY থেকে টাইপ
 */
export type AIPromptTemplateCategory =
  (typeof AI_PROMPT_TEMPLATE_CATEGORY)[keyof typeof AI_PROMPT_TEMPLATE_CATEGORY];

/**
 * প্রম্পট টেমপ্লেট ক্যাটাগরি লেবেল
 */
export const AI_PROMPT_TEMPLATE_CATEGORY_LABELS: Record<AIPromptTemplateCategory, string> = {
  [AI_PROMPT_TEMPLATE_CATEGORY.CHAT]: 'Chat',
  [AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION]: 'Instruction',
  [AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS]: 'Analysis',
  [AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE]: 'Creative',
  [AI_PROMPT_TEMPLATE_CATEGORY.CODING]: 'Coding',
  [AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION]: 'Translation',
  [AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION]: 'Summarization',
  [AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION]: 'Classification',
  [AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION]: 'Extraction',
  [AI_PROMPT_TEMPLATE_CATEGORY.GENERATION]: 'Generation',
} as const;

/**
 * প্রম্পট টেমপ্লেট ক্যাটাগরি আইকন
 */
export const AI_PROMPT_TEMPLATE_CATEGORY_ICONS: Record<AIPromptTemplateCategory, string> = {
  [AI_PROMPT_TEMPLATE_CATEGORY.CHAT]: '💬',
  [AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION]: '📋',
  [AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS]: '📊',
  [AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE]: '🎨',
  [AI_PROMPT_TEMPLATE_CATEGORY.CODING]: '💻',
  [AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION]: '🌍',
  [AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION]: '📝',
  [AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION]: '🏷️',
  [AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION]: '🔍',
  [AI_PROMPT_TEMPLATE_CATEGORY.GENERATION]: '✨',
} as const;

/**
 * প্রম্পট টেমপ্লেট ক্যাটাগরি বিবরণ
 */
export const AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS: Record<AIPromptTemplateCategory, string> = {
  [AI_PROMPT_TEMPLATE_CATEGORY.CHAT]: 'Templates for conversational interactions',
  [AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION]: 'Templates for giving specific instructions',
  [AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS]: 'Templates for data and text analysis',
  [AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE]: 'Templates for creative content generation',
  [AI_PROMPT_TEMPLATE_CATEGORY.CODING]: 'Templates for code generation and programming tasks',
  [AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION]: 'Templates for language translation',
  [AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION]: 'Templates for summarizing content',
  [AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION]: 'Templates for classification tasks',
  [AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION]: 'Templates for information extraction',
  [AI_PROMPT_TEMPLATE_CATEGORY.GENERATION]: 'Templates for general content generation',
} as const;

/**
 * প্রম্পট টেমপ্লেট কনফিগারেশন
 */
export interface AIPromptTemplateConfig {
  category: AIPromptTemplateCategory;
  label: string;
  description: string;
  icon: string;
  defaultPlaceholder: AIPromptTemplatePlaceholder;
  maxVariables: number;
  variables: string[];
  template: string;
}

/**
 * প্রম্পট টেমপ্লেট ডিফল্ট টেমপ্লেটস
 */
export const AI_PROMPT_TEMPLATE_DEFAULT_TEMPLATES: Record<
  AIPromptTemplateCategory,
  AIPromptTemplateConfig
> = {
  [AI_PROMPT_TEMPLATE_CATEGORY.CHAT]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.CHAT,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.CHAT],
    description: AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.CHAT],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.CHAT],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['context', 'user_input', 'history'],
    template: `System: You are a helpful AI assistant.
{{context}}
User: {{user_input}}
Assistant:`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION],
    description: AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['instruction', 'input', 'output_format'],
    template: `Instruction: {{instruction}}
Input: {{input}}
Output: {{output_format}}`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS],
    description: AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['data', 'analysis_type', 'insights'],
    template: `Analyze the following data:
{{data}}
Analysis Type: {{analysis_type}}
Provide insights: {{insights}}`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE],
    description: AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['topic', 'style', 'tone', 'format'],
    template: `Create creative content about:
Topic: {{topic}}
Style: {{style}}
Tone: {{tone}}
Format: {{format}}`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.CODING]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.CODING,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.CODING],
    description: AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.CODING],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.CODING],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['language', 'task', 'code', 'constraints'],
    template: `Programming Language: {{language}}
Task: {{task}}
Code: {{code}}
Constraints: {{constraints}}`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION],
    description: AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['source_lang', 'target_lang', 'text', 'context'],
    template: `Translate from {{source_lang}} to {{target_lang}}:
Text: {{text}}
Context: {{context}}`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION],
    description:
      AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['content', 'length', 'focus', 'format'],
    template: `Summarize the following content:
{{content}}
Length: {{length}}
Focus: {{focus}}
Format: {{format}}`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION],
    description:
      AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['text', 'categories', 'confidence'],
    template: `Classify the following text:
{{text}}
Categories: {{categories}}
Confidence Score: {{confidence}}`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION],
    description: AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['source', 'extract_fields', 'format'],
    template: `Extract information from:
Source: {{source}}
Fields to extract: {{extract_fields}}
Output format: {{format}}`,
  },
  [AI_PROMPT_TEMPLATE_CATEGORY.GENERATION]: {
    category: AI_PROMPT_TEMPLATE_CATEGORY.GENERATION,
    label: AI_PROMPT_TEMPLATE_CATEGORY_LABELS[AI_PROMPT_TEMPLATE_CATEGORY.GENERATION],
    description: AI_PROMPT_TEMPLATE_CATEGORY_DESCRIPTIONS[AI_PROMPT_TEMPLATE_CATEGORY.GENERATION],
    icon: AI_PROMPT_TEMPLATE_CATEGORY_ICONS[AI_PROMPT_TEMPLATE_CATEGORY.GENERATION],
    defaultPlaceholder: AI_PROMPT_TEMPLATE_PLACEHOLDERS.DOUBLE_BRACES,
    maxVariables: AI_PROMPT_TEMPLATE_MAX_VARIABLES,
    variables: ['topic', 'length', 'style', 'audience'],
    template: `Generate content about:
Topic: {{topic}}
Length: {{length}}
Style: {{style}}
Audience: {{audience}}`,
  },
} as const;

/**
 * প্রম্পট টেমপ্লেট ফিল্টার
 */
export interface AIPromptTemplateFilter {
  category?: AIPromptTemplateCategory;
  search?: string;
  variables?: string[];
  limit?: number;
  offset?: number;
}

/**
 * প্রম্পট টেমপ্লেট রেসপন্স
 */
export interface AIPromptTemplateResponse<T = unknown> {
  templates: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

/**
 * প্রম্পট টেমপ্লেট ক্যাটাগরি গ্রুপ
 */
export const AI_PROMPT_TEMPLATE_CATEGORY_GROUPS = {
  INTERACTION: [AI_PROMPT_TEMPLATE_CATEGORY.CHAT, AI_PROMPT_TEMPLATE_CATEGORY.INSTRUCTION] as const,
  CONTENT: [
    AI_PROMPT_TEMPLATE_CATEGORY.CREATIVE,
    AI_PROMPT_TEMPLATE_CATEGORY.GENERATION,
    AI_PROMPT_TEMPLATE_CATEGORY.TRANSLATION,
    AI_PROMPT_TEMPLATE_CATEGORY.SUMMARIZATION,
  ] as const,
  ANALYSIS: [
    AI_PROMPT_TEMPLATE_CATEGORY.ANALYSIS,
    AI_PROMPT_TEMPLATE_CATEGORY.CLASSIFICATION,
    AI_PROMPT_TEMPLATE_CATEGORY.EXTRACTION,
  ] as const,
  TECHNICAL: [AI_PROMPT_TEMPLATE_CATEGORY.CODING] as const,
} as const;

/**
 * প্রম্পট টেমপ্লেট ক্যাটাগরি গ্রুপ লেবেল
 */
export const AI_PROMPT_TEMPLATE_CATEGORY_GROUP_LABELS = {
  INTERACTION: 'Interaction',
  CONTENT: 'Content',
  ANALYSIS: 'Analysis',
  TECHNICAL: 'Technical',
} as const;
