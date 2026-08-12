/**
 * AI প্রম্পট টাইপ এনাম
 */
export const AI_PROMPT_TYPE = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
  FUNCTION: 'function',
  CONTEXT: 'context',
  INSTRUCTION: 'instruction',
  EXAMPLE: 'example',
  TEMPLATE: 'template',
  DYNAMIC: 'dynamic',
} as const;

/**
 * AI_PROMPT_TYPE থেকে টাইপ
 */
export type AIPromptTypeType = (typeof AI_PROMPT_TYPE)[keyof typeof AI_PROMPT_TYPE];

/**
 * প্রম্পট টাইপ লেবেল
 */
export const AI_PROMPT_TYPE_LABELS: Record<AIPromptTypeType, string> = {
  [AI_PROMPT_TYPE.SYSTEM]: 'System',
  [AI_PROMPT_TYPE.USER]: 'User',
  [AI_PROMPT_TYPE.ASSISTANT]: 'Assistant',
  [AI_PROMPT_TYPE.FUNCTION]: 'Function',
  [AI_PROMPT_TYPE.CONTEXT]: 'Context',
  [AI_PROMPT_TYPE.INSTRUCTION]: 'Instruction',
  [AI_PROMPT_TYPE.EXAMPLE]: 'Example',
  [AI_PROMPT_TYPE.TEMPLATE]: 'Template',
  [AI_PROMPT_TYPE.DYNAMIC]: 'Dynamic',
} as const;

/**
 * প্রম্পট টাইপ বিবরণ
 */
export const AI_PROMPT_TYPE_DESCRIPTIONS: Record<AIPromptTypeType, string> = {
  [AI_PROMPT_TYPE.SYSTEM]: 'System-level instruction defining AI behavior and constraints',
  [AI_PROMPT_TYPE.USER]: 'User input or query to the AI system',
  [AI_PROMPT_TYPE.ASSISTANT]: 'AI assistant response or generated content',
  [AI_PROMPT_TYPE.FUNCTION]: 'Function call or tool invocation prompt',
  [AI_PROMPT_TYPE.CONTEXT]: 'Contextual information providing background and references',
  [AI_PROMPT_TYPE.INSTRUCTION]: 'Specific instruction guiding the AI response',
  [AI_PROMPT_TYPE.EXAMPLE]: 'Example demonstrating expected output or behavior',
  [AI_PROMPT_TYPE.TEMPLATE]: 'Pre-defined reusable prompt template',
  [AI_PROMPT_TYPE.DYNAMIC]: 'Dynamically generated prompt based on context',
} as const;

/**
 * প্রম্পট টাইপ আইকন
 */
export const AI_PROMPT_TYPE_ICONS: Record<AIPromptTypeType, string> = {
  [AI_PROMPT_TYPE.SYSTEM]: '⚙️',
  [AI_PROMPT_TYPE.USER]: '👤',
  [AI_PROMPT_TYPE.ASSISTANT]: '🤖',
  [AI_PROMPT_TYPE.FUNCTION]: '🔧',
  [AI_PROMPT_TYPE.CONTEXT]: '📚',
  [AI_PROMPT_TYPE.INSTRUCTION]: '📋',
  [AI_PROMPT_TYPE.EXAMPLE]: '📝',
  [AI_PROMPT_TYPE.TEMPLATE]: '📄',
  [AI_PROMPT_TYPE.DYNAMIC]: '🔄',
} as const;

/**
 * প্রম্পট টাইপ কালার (হেক্স কোড)
 */
export const AI_PROMPT_TYPE_COLORS: Record<AIPromptTypeType, string> = {
  [AI_PROMPT_TYPE.SYSTEM]: '#8b5cf6', // Violet-500
  [AI_PROMPT_TYPE.USER]: '#3b82f6', // Blue-500
  [AI_PROMPT_TYPE.ASSISTANT]: '#22c55e', // Green-500
  [AI_PROMPT_TYPE.FUNCTION]: '#f59e0b', // Amber-500
  [AI_PROMPT_TYPE.CONTEXT]: '#06b6d4', // Cyan-500
  [AI_PROMPT_TYPE.INSTRUCTION]: '#ec4899', // Pink-500
  [AI_PROMPT_TYPE.EXAMPLE]: '#f472b6', // Pink-400
  [AI_PROMPT_TYPE.TEMPLATE]: '#64748b', // Slate-500
  [AI_PROMPT_TYPE.DYNAMIC]: '#f97316', // Orange-500
} as const;

/**
 * প্রম্পট টাইপ ক্যাটাগরি
 */
export const AI_PROMPT_TYPE_CATEGORIES = {
  SYSTEM: [AI_PROMPT_TYPE.SYSTEM, AI_PROMPT_TYPE.INSTRUCTION] as const,
  INTERACTION: [AI_PROMPT_TYPE.USER, AI_PROMPT_TYPE.ASSISTANT] as const,
  CONTEXT: [AI_PROMPT_TYPE.CONTEXT, AI_PROMPT_TYPE.EXAMPLE] as const,
  STRUCTURE: [AI_PROMPT_TYPE.FUNCTION, AI_PROMPT_TYPE.TEMPLATE, AI_PROMPT_TYPE.DYNAMIC] as const,
} as const;

/**
 * প্রম্পট টাইপ ক্যাটাগরি লেবেল
 */
export const AI_PROMPT_TYPE_CATEGORY_LABELS = {
  SYSTEM: 'System',
  INTERACTION: 'Interaction',
  CONTEXT: 'Context',
  STRUCTURE: 'Structure',
} as const;

/**
 * প্রম্পট টাইপ কমপ্লেক্সিটি (১-৫)
 */
export const AI_PROMPT_TYPE_COMPLEXITY: Record<AIPromptTypeType, number> = {
  [AI_PROMPT_TYPE.SYSTEM]: 4,
  [AI_PROMPT_TYPE.USER]: 1,
  [AI_PROMPT_TYPE.ASSISTANT]: 2,
  [AI_PROMPT_TYPE.FUNCTION]: 3,
  [AI_PROMPT_TYPE.CONTEXT]: 3,
  [AI_PROMPT_TYPE.INSTRUCTION]: 2,
  [AI_PROMPT_TYPE.EXAMPLE]: 2,
  [AI_PROMPT_TYPE.TEMPLATE]: 3,
  [AI_PROMPT_TYPE.DYNAMIC]: 5,
} as const;

/**
 * প্রম্পট টাইপ কনফিগারেশন
 */
export interface AIPromptTypeConfig {
  type: AIPromptTypeType;
  label: string;
  description: string;
  icon: string;
  color: string;
  category: keyof typeof AI_PROMPT_TYPE_CATEGORIES;
  complexity: number;
  isEditable: boolean;
  isSystemGenerated: boolean;
  requiresUserInput: boolean;
}

/**
 * প্রম্পট টাইপ মেটাডেটা
 */
export const AI_PROMPT_TYPE_METADATA: Record<AIPromptTypeType, AIPromptTypeConfig> = {
  [AI_PROMPT_TYPE.SYSTEM]: {
    type: AI_PROMPT_TYPE.SYSTEM,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.SYSTEM],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.SYSTEM],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.SYSTEM],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.SYSTEM],
    category: 'SYSTEM',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.SYSTEM],
    isEditable: true,
    isSystemGenerated: false,
    requiresUserInput: false,
  },
  [AI_PROMPT_TYPE.USER]: {
    type: AI_PROMPT_TYPE.USER,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.USER],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.USER],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.USER],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.USER],
    category: 'INTERACTION',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.USER],
    isEditable: true,
    isSystemGenerated: false,
    requiresUserInput: true,
  },
  [AI_PROMPT_TYPE.ASSISTANT]: {
    type: AI_PROMPT_TYPE.ASSISTANT,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.ASSISTANT],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.ASSISTANT],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.ASSISTANT],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.ASSISTANT],
    category: 'INTERACTION',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.ASSISTANT],
    isEditable: false,
    isSystemGenerated: true,
    requiresUserInput: false,
  },
  [AI_PROMPT_TYPE.FUNCTION]: {
    type: AI_PROMPT_TYPE.FUNCTION,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.FUNCTION],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.FUNCTION],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.FUNCTION],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.FUNCTION],
    category: 'STRUCTURE',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.FUNCTION],
    isEditable: true,
    isSystemGenerated: false,
    requiresUserInput: false,
  },
  [AI_PROMPT_TYPE.CONTEXT]: {
    type: AI_PROMPT_TYPE.CONTEXT,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.CONTEXT],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.CONTEXT],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.CONTEXT],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.CONTEXT],
    category: 'CONTEXT',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.CONTEXT],
    isEditable: true,
    isSystemGenerated: false,
    requiresUserInput: false,
  },
  [AI_PROMPT_TYPE.INSTRUCTION]: {
    type: AI_PROMPT_TYPE.INSTRUCTION,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.INSTRUCTION],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.INSTRUCTION],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.INSTRUCTION],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.INSTRUCTION],
    category: 'SYSTEM',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.INSTRUCTION],
    isEditable: true,
    isSystemGenerated: false,
    requiresUserInput: false,
  },
  [AI_PROMPT_TYPE.EXAMPLE]: {
    type: AI_PROMPT_TYPE.EXAMPLE,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.EXAMPLE],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.EXAMPLE],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.EXAMPLE],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.EXAMPLE],
    category: 'CONTEXT',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.EXAMPLE],
    isEditable: true,
    isSystemGenerated: false,
    requiresUserInput: false,
  },
  [AI_PROMPT_TYPE.TEMPLATE]: {
    type: AI_PROMPT_TYPE.TEMPLATE,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.TEMPLATE],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.TEMPLATE],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.TEMPLATE],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.TEMPLATE],
    category: 'STRUCTURE',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.TEMPLATE],
    isEditable: true,
    isSystemGenerated: false,
    requiresUserInput: false,
  },
  [AI_PROMPT_TYPE.DYNAMIC]: {
    type: AI_PROMPT_TYPE.DYNAMIC,
    label: AI_PROMPT_TYPE_LABELS[AI_PROMPT_TYPE.DYNAMIC],
    description: AI_PROMPT_TYPE_DESCRIPTIONS[AI_PROMPT_TYPE.DYNAMIC],
    icon: AI_PROMPT_TYPE_ICONS[AI_PROMPT_TYPE.DYNAMIC],
    color: AI_PROMPT_TYPE_COLORS[AI_PROMPT_TYPE.DYNAMIC],
    category: 'STRUCTURE',
    complexity: AI_PROMPT_TYPE_COMPLEXITY[AI_PROMPT_TYPE.DYNAMIC],
    isEditable: false,
    isSystemGenerated: true,
    requiresUserInput: true,
  },
} as const;

/**
 * প্রম্পট টাইপ সিরিয়ালাইজেশন অর্ডার
 */
export const AI_PROMPT_TYPE_ORDER: Record<AIPromptTypeType, number> = {
  [AI_PROMPT_TYPE.SYSTEM]: 0,
  [AI_PROMPT_TYPE.CONTEXT]: 1,
  [AI_PROMPT_TYPE.INSTRUCTION]: 2,
  [AI_PROMPT_TYPE.EXAMPLE]: 3,
  [AI_PROMPT_TYPE.USER]: 4,
  [AI_PROMPT_TYPE.FUNCTION]: 5,
  [AI_PROMPT_TYPE.TEMPLATE]: 6,
  [AI_PROMPT_TYPE.DYNAMIC]: 7,
  [AI_PROMPT_TYPE.ASSISTANT]: 8,
} as const;
