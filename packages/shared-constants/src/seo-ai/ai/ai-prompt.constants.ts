/**
 * প্রম্পটের সর্বোচ্চ দৈর্ঘ্য (৪০০০ ক্যারেক্টার)
 */
export const AI_PROMPT_MAX_LENGTH = 4000 as const;

/**
 * ডিফল্ট টেম্পারেচার (০.৭)
 */
export const AI_PROMPT_DEFAULT_TEMPERATURE = 0.7 as const;

/**
 * ডিফল্ট টপ-পি (০.৯)
 */
export const AI_PROMPT_DEFAULT_TOP_P = 0.9 as const;

/**
 * ক্যাশ টাইম (১ ঘন্টা - মিলিসেকেন্ডে)
 */
export const AI_PROMPT_CACHE_TTL = 3600000 as const; // 1 hour

/**
 * প্রম্পট টাইপ এনাম
 */
export const AI_PROMPT_TYPE = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
  FUNCTION: 'function',
  CONTEXT: 'context',
  TEMPLATE: 'template',
} as const;

/**
 * AI_PROMPT_TYPE থেকে টাইপ
 */
export type AIPromptType = (typeof AI_PROMPT_TYPE)[keyof typeof AI_PROMPT_TYPE];

/**
 * প্রম্পট টাইপ লেবেল
 */
export const AI_PROMPT_TYPE_LABELS: Record<AIPromptType, string> = {
  [AI_PROMPT_TYPE.SYSTEM]: 'System',
  [AI_PROMPT_TYPE.USER]: 'User',
  [AI_PROMPT_TYPE.ASSISTANT]: 'Assistant',
  [AI_PROMPT_TYPE.FUNCTION]: 'Function',
  [AI_PROMPT_TYPE.CONTEXT]: 'Context',
  [AI_PROMPT_TYPE.TEMPLATE]: 'Template',
} as const;

/**
 * প্রম্পট টাইপ বিবরণ
 */
export const AI_PROMPT_TYPE_DESCRIPTIONS: Record<AIPromptType, string> = {
  [AI_PROMPT_TYPE.SYSTEM]: 'System instruction for the AI model',
  [AI_PROMPT_TYPE.USER]: 'User input or query',
  [AI_PROMPT_TYPE.ASSISTANT]: 'AI assistant response or message',
  [AI_PROMPT_TYPE.FUNCTION]: 'Function call or tool usage prompt',
  [AI_PROMPT_TYPE.CONTEXT]: 'Contextual information for the prompt',
  [AI_PROMPT_TYPE.TEMPLATE]: 'Pre-defined prompt template',
} as const;

/**
 * প্রম্পট রোল এনাম
 */
export const AI_PROMPT_ROLE = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
  TOOL: 'tool',
  FUNCTION: 'function',
} as const;

/**
 * AI_PROMPT_ROLE থেকে টাইপ
 */
export type AIPromptRole = (typeof AI_PROMPT_ROLE)[keyof typeof AI_PROMPT_ROLE];

/**
 * প্রম্পট রোল লেবেল
 */
export const AI_PROMPT_ROLE_LABELS: Record<AIPromptRole, string> = {
  [AI_PROMPT_ROLE.SYSTEM]: 'System',
  [AI_PROMPT_ROLE.USER]: 'User',
  [AI_PROMPT_ROLE.ASSISTANT]: 'Assistant',
  [AI_PROMPT_ROLE.TOOL]: 'Tool',
  [AI_PROMPT_ROLE.FUNCTION]: 'Function',
} as const;

/**
 * প্রম্পট ফরম্যাট এনাম
 */
export const AI_PROMPT_FORMAT = {
  JSON: 'json',
  TEXT: 'text',
  MARKDOWN: 'markdown',
  XML: 'xml',
  YAML: 'yaml',
  STRUCTURED: 'structured',
} as const;

/**
 * AI_PROMPT_FORMAT থেকে টাইপ
 */
export type AIPromptFormat = (typeof AI_PROMPT_FORMAT)[keyof typeof AI_PROMPT_FORMAT];

/**
 * প্রম্পট ফরম্যাট লেবেল
 */
export const AI_PROMPT_FORMAT_LABELS: Record<AIPromptFormat, string> = {
  [AI_PROMPT_FORMAT.JSON]: 'JSON',
  [AI_PROMPT_FORMAT.TEXT]: 'Text',
  [AI_PROMPT_FORMAT.MARKDOWN]: 'Markdown',
  [AI_PROMPT_FORMAT.XML]: 'XML',
  [AI_PROMPT_FORMAT.YAML]: 'YAML',
  [AI_PROMPT_FORMAT.STRUCTURED]: 'Structured',
} as const;

/**
 * প্রম্পট কনফিগারেশন
 */
export interface AIPromptConfig {
  maxLength: number;
  temperature: number;
  topP: number;
  cacheTTL: number;
  type: AIPromptType;
  format: AIPromptFormat;
  enableStreaming: boolean;
  enableCache: boolean;
  enableRetry: boolean;
  maxRetries: number;
}

/**
 * প্রম্পট ডিফল্ট কনফিগারেশন
 */
export const AI_PROMPT_DEFAULT_CONFIG: AIPromptConfig = {
  maxLength: AI_PROMPT_MAX_LENGTH,
  temperature: AI_PROMPT_DEFAULT_TEMPERATURE,
  topP: AI_PROMPT_DEFAULT_TOP_P,
  cacheTTL: AI_PROMPT_CACHE_TTL,
  type: AI_PROMPT_TYPE.SYSTEM,
  format: AI_PROMPT_FORMAT.TEXT,
  enableStreaming: true,
  enableCache: true,
  enableRetry: true,
  maxRetries: 3,
} as const;

/**
 * প্রম্পট প্যারামিটার
 */
export interface AIPromptParameters {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  stopSequences?: string[];
  frequencyPenalty?: number;
  presencePenalty?: number;
  seed?: number;
  responseFormat?: AIPromptFormat;
}

/**
 * প্রম্পট মেসেজ
 */
export interface AIPromptMessage {
  role: AIPromptRole;
  content: string;
  name?: string;
  functionCall?: {
    name: string;
    arguments: string;
  };
  toolCalls?: {
    id: string;
    type: string;
    function: {
      name: string;
      arguments: string;
    };
  }[];
}

/**
 * প্রম্পট কনটেক্সট
 */
export interface AIPromptContext {
  id?: string;
  type: AIPromptType;
  metadata: Record<string, unknown>;
  variables: Record<string, unknown>;
  messages: AIPromptMessage[];
  systemPrompt?: string;
  userPrompt?: string;
}

/**
 * প্রম্পট রেসপন্স
 */
export interface AIPromptResponse {
  id: string;
  content: string;
  role: AIPromptRole;
  type: AIPromptType;
  format: AIPromptFormat;
  messages: AIPromptMessage[];
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: string;
  metadata: Record<string, unknown>;
  timestamp: Date;
}

/**
 * প্রম্পট টেমপ্লেট
 */
export interface AIPromptTemplate {
  id: string;
  name: string;
  description?: string;
  type: AIPromptType;
  format: AIPromptFormat;
  template: string;
  variables: string[];
  defaultValues: Record<string, unknown>;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * প্রম্পট ফিল্টার
 */
export interface AIPromptFilter {
  type?: AIPromptType;
  role?: AIPromptRole;
  format?: AIPromptFormat;
  search?: string;
  limit?: number;
  offset?: number;
}

/**
 * প্রম্পট টাইপ গ্রুপ
 */
export const AI_PROMPT_TYPE_GROUPS = {
  CONTEXT: [AI_PROMPT_TYPE.SYSTEM, AI_PROMPT_TYPE.CONTEXT] as const,
  INTERACTION: [AI_PROMPT_TYPE.USER, AI_PROMPT_TYPE.ASSISTANT] as const,
  FUNCTION: [AI_PROMPT_TYPE.FUNCTION] as const,
  TEMPLATE: [AI_PROMPT_TYPE.TEMPLATE] as const,
} as const;

/**
 * প্রম্পট টাইপ গ্রুপ লেবেল
 */
export const AI_PROMPT_TYPE_GROUP_LABELS = {
  CONTEXT: 'Context',
  INTERACTION: 'Interaction',
  FUNCTION: 'Function',
  TEMPLATE: 'Template',
} as const;

/**
 * প্রম্পট রোল গ্রুপ
 */
export const AI_PROMPT_ROLE_GROUPS = {
  SYSTEM: [AI_PROMPT_ROLE.SYSTEM] as const,
  PARTICIPANTS: [AI_PROMPT_ROLE.USER, AI_PROMPT_ROLE.ASSISTANT] as const,
  TOOLS: [AI_PROMPT_ROLE.TOOL, AI_PROMPT_ROLE.FUNCTION] as const,
} as const;

/**
 * প্রম্পট রোল গ্রুপ লেবেল
 */
export const AI_PROMPT_ROLE_GROUP_LABELS = {
  SYSTEM: 'System',
  PARTICIPANTS: 'Participants',
  TOOLS: 'Tools',
} as const;

/**
 * প্রম্পট ফরম্যাট গ্রুপ
 */
export const AI_PROMPT_FORMAT_GROUPS = {
  SIMPLE: [AI_PROMPT_FORMAT.TEXT] as const,
  STRUCTURED: [AI_PROMPT_FORMAT.JSON, AI_PROMPT_FORMAT.XML, AI_PROMPT_FORMAT.YAML] as const,
  RICH: [AI_PROMPT_FORMAT.MARKDOWN, AI_PROMPT_FORMAT.STRUCTURED] as const,
} as const;

/**
 * প্রম্পট ফরম্যাট গ্রুপ লেবেল
 */
export const AI_PROMPT_FORMAT_GROUP_LABELS = {
  SIMPLE: 'Simple',
  STRUCTURED: 'Structured',
  RICH: 'Rich',
} as const;
