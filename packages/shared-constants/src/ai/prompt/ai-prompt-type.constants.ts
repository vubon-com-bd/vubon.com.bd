/**
 * AI Prompt Type Constants
 * Types and classifications for AI prompts
 */

export const AI_PROMPT_TYPE = {
  // Prompt Domains
  DOMAINS: {
    GENERATIVE: 'generative',
    ANALYTICAL: 'analytical',
    CONVERSATIONAL: 'conversational',
    INSTRUCTIONAL: 'instructional',
    CREATIVE: 'creative',
    TECHNICAL: 'technical',
    BUSINESS: 'business',
    EDUCATIONAL: 'educational',
    MEDICAL: 'medical',
    LEGAL: 'legal',
    FINANCIAL: 'financial',
    SCIENTIFIC: 'scientific',
  } as const,

  // Prompt Sub-Types
  SUB_TYPES: {
    // Generative
    CONTENT_CREATION: 'content_creation',
    STORY_GENERATION: 'story_generation',
    POEM_GENERATION: 'poem_generation',
    SCRIPT_GENERATION: 'script_generation',
    CODE_GENERATION: 'code_generation',

    // Analytical
    DATA_ANALYSIS: 'data_analysis',
    TREND_ANALYSIS: 'trend_analysis',
    SENTIMENT_ANALYSIS: 'sentiment_analysis',
    PATTERN_ANALYSIS: 'pattern_analysis',
    ROOT_CAUSE: 'root_cause',

    // Conversational
    CHATBOT: 'chatbot',
    CUSTOMER_SUPPORT: 'customer_support',
    VIRTUAL_ASSISTANT: 'virtual_assistant',
    INTERVIEW: 'interview',
    NEGOTIATION: 'negotiation',

    // Instructional
    TUTORIAL: 'tutorial',
    HOW_TO: 'how_to',
    GUIDE: 'guide',
    STEP_BY_STEP: 'step_by_step',
    WORKFLOW: 'workflow',

    // Creative
    BRAINSTORMING: 'brainstorming',
    IDEATION: 'ideation',
    DESIGN: 'design',
    ART: 'art',
    MUSIC: 'music',

    // Technical
    DEBUGGING: 'debugging',
    OPTIMIZATION: 'optimization',
    DOCUMENTATION: 'documentation',
    TESTING: 'testing',
    REVIEW: 'review',
  } as const,

  // Prompt Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
    EXPERT: 'expert',
  } as const,

  // Prompt Tone
  TONES: {
    FORMAL: 'formal',
    INFORMAL: 'informal',
    NEUTRAL: 'neutral',
    FRIENDLY: 'friendly',
    PROFESSIONAL: 'professional',
    ACADEMIC: 'academic',
    CASUAL: 'casual',
    ENCOURAGING: 'encouraging',
    DIRECT: 'direct',
    PERSUASIVE: 'persuasive',
  } as const,

  // Prompt Language
  LANGUAGES: {
    BENGALI: 'bn',
    ENGLISH: 'en',
    HINDI: 'hi',
    URDU: 'ur',
    ARABIC: 'ar',
    CHINESE: 'zh',
    SPANISH: 'es',
    FRENCH: 'fr',
    GERMAN: 'de',
    JAPANESE: 'ja',
    KOREAN: 'ko',
    RUSSIAN: 'ru',
    PORTUGUESE: 'pt',
    ITALIAN: 'it',
    DUTCH: 'nl',
  } as const,

  // Prompt Persona
  PERSONAS: {
    EXPERT: 'expert',
    ASSISTANT: 'assistant',
    TEACHER: 'teacher',
    MENTOR: 'mentor',
    COACH: 'coach',
    ADVISOR: 'advisor',
    ANALYST: 'analyst',
    CREATOR: 'creator',
    CRITIC: 'critic',
    FRIEND: 'friend',
  } as const,
} as const;

export type AIPromptDomain = (typeof AI_PROMPT_TYPE.DOMAINS)[keyof typeof AI_PROMPT_TYPE.DOMAINS];
export type AIPromptSubType =
  (typeof AI_PROMPT_TYPE.SUB_TYPES)[keyof typeof AI_PROMPT_TYPE.SUB_TYPES];
export type AIPromptComplexity =
  (typeof AI_PROMPT_TYPE.COMPLEXITY)[keyof typeof AI_PROMPT_TYPE.COMPLEXITY];
export type AIPromptTone = (typeof AI_PROMPT_TYPE.TONES)[keyof typeof AI_PROMPT_TYPE.TONES];
export type AIPromptLanguage =
  (typeof AI_PROMPT_TYPE.LANGUAGES)[keyof typeof AI_PROMPT_TYPE.LANGUAGES];
export type AIPromptPersona =
  (typeof AI_PROMPT_TYPE.PERSONAS)[keyof typeof AI_PROMPT_TYPE.PERSONAS];

export function getAiPromptDomainLabel(domain: AIPromptDomain): string {
  const labels: Record<AIPromptDomain, string> = {
    [AI_PROMPT_TYPE.DOMAINS.GENERATIVE]: 'Generative',
    [AI_PROMPT_TYPE.DOMAINS.ANALYTICAL]: 'Analytical',
    [AI_PROMPT_TYPE.DOMAINS.CONVERSATIONAL]: 'Conversational',
    [AI_PROMPT_TYPE.DOMAINS.INSTRUCTIONAL]: 'Instructional',
    [AI_PROMPT_TYPE.DOMAINS.CREATIVE]: 'Creative',
    [AI_PROMPT_TYPE.DOMAINS.TECHNICAL]: 'Technical',
    [AI_PROMPT_TYPE.DOMAINS.BUSINESS]: 'Business',
    [AI_PROMPT_TYPE.DOMAINS.EDUCATIONAL]: 'Educational',
    [AI_PROMPT_TYPE.DOMAINS.MEDICAL]: 'Medical',
    [AI_PROMPT_TYPE.DOMAINS.LEGAL]: 'Legal',
    [AI_PROMPT_TYPE.DOMAINS.FINANCIAL]: 'Financial',
    [AI_PROMPT_TYPE.DOMAINS.SCIENTIFIC]: 'Scientific',
  };
  return labels[domain] || 'Unknown';
}

export function getAiPromptSubTypeLabel(subType: AIPromptSubType): string {
  const labels: Record<AIPromptSubType, string> = {
    [AI_PROMPT_TYPE.SUB_TYPES.CONTENT_CREATION]: 'Content Creation',
    [AI_PROMPT_TYPE.SUB_TYPES.STORY_GENERATION]: 'Story Generation',
    [AI_PROMPT_TYPE.SUB_TYPES.POEM_GENERATION]: 'Poem Generation',
    [AI_PROMPT_TYPE.SUB_TYPES.SCRIPT_GENERATION]: 'Script Generation',
    [AI_PROMPT_TYPE.SUB_TYPES.CODE_GENERATION]: 'Code Generation',
    [AI_PROMPT_TYPE.SUB_TYPES.DATA_ANALYSIS]: 'Data Analysis',
    [AI_PROMPT_TYPE.SUB_TYPES.TREND_ANALYSIS]: 'Trend Analysis',
    [AI_PROMPT_TYPE.SUB_TYPES.SENTIMENT_ANALYSIS]: 'Sentiment Analysis',
    [AI_PROMPT_TYPE.SUB_TYPES.PATTERN_ANALYSIS]: 'Pattern Analysis',
    [AI_PROMPT_TYPE.SUB_TYPES.ROOT_CAUSE]: 'Root Cause',
    [AI_PROMPT_TYPE.SUB_TYPES.CHATBOT]: 'Chatbot',
    [AI_PROMPT_TYPE.SUB_TYPES.CUSTOMER_SUPPORT]: 'Customer Support',
    [AI_PROMPT_TYPE.SUB_TYPES.VIRTUAL_ASSISTANT]: 'Virtual Assistant',
    [AI_PROMPT_TYPE.SUB_TYPES.INTERVIEW]: 'Interview',
    [AI_PROMPT_TYPE.SUB_TYPES.NEGOTIATION]: 'Negotiation',
    [AI_PROMPT_TYPE.SUB_TYPES.TUTORIAL]: 'Tutorial',
    [AI_PROMPT_TYPE.SUB_TYPES.HOW_TO]: 'How To',
    [AI_PROMPT_TYPE.SUB_TYPES.GUIDE]: 'Guide',
    [AI_PROMPT_TYPE.SUB_TYPES.STEP_BY_STEP]: 'Step by Step',
    [AI_PROMPT_TYPE.SUB_TYPES.WORKFLOW]: 'Workflow',
    [AI_PROMPT_TYPE.SUB_TYPES.BRAINSTORMING]: 'Brainstorming',
    [AI_PROMPT_TYPE.SUB_TYPES.IDEATION]: 'Ideation',
    [AI_PROMPT_TYPE.SUB_TYPES.DESIGN]: 'Design',
    [AI_PROMPT_TYPE.SUB_TYPES.ART]: 'Art',
    [AI_PROMPT_TYPE.SUB_TYPES.MUSIC]: 'Music',
    [AI_PROMPT_TYPE.SUB_TYPES.DEBUGGING]: 'Debugging',
    [AI_PROMPT_TYPE.SUB_TYPES.OPTIMIZATION]: 'Optimization',
    [AI_PROMPT_TYPE.SUB_TYPES.DOCUMENTATION]: 'Documentation',
    [AI_PROMPT_TYPE.SUB_TYPES.TESTING]: 'Testing',
    [AI_PROMPT_TYPE.SUB_TYPES.REVIEW]: 'Review',
  };
  return labels[subType] || 'Unknown';
}

export function getAiPromptComplexityLabel(complexity: AIPromptComplexity): string {
  const labels: Record<AIPromptComplexity, string> = {
    [AI_PROMPT_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [AI_PROMPT_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [AI_PROMPT_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [AI_PROMPT_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
    [AI_PROMPT_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown';
}

export function getAiPromptToneLabel(tone: AIPromptTone): string {
  const labels: Record<AIPromptTone, string> = {
    [AI_PROMPT_TYPE.TONES.FORMAL]: 'Formal',
    [AI_PROMPT_TYPE.TONES.INFORMAL]: 'Informal',
    [AI_PROMPT_TYPE.TONES.NEUTRAL]: 'Neutral',
    [AI_PROMPT_TYPE.TONES.FRIENDLY]: 'Friendly',
    [AI_PROMPT_TYPE.TONES.PROFESSIONAL]: 'Professional',
    [AI_PROMPT_TYPE.TONES.ACADEMIC]: 'Academic',
    [AI_PROMPT_TYPE.TONES.CASUAL]: 'Casual',
    [AI_PROMPT_TYPE.TONES.ENCOURAGING]: 'Encouraging',
    [AI_PROMPT_TYPE.TONES.DIRECT]: 'Direct',
    [AI_PROMPT_TYPE.TONES.PERSUASIVE]: 'Persuasive',
  };
  return labels[tone] || 'Unknown';
}

export function getAiPromptLanguageLabel(language: AIPromptLanguage): string {
  const labels: Record<AIPromptLanguage, string> = {
    [AI_PROMPT_TYPE.LANGUAGES.BENGALI]: 'Bengali',
    [AI_PROMPT_TYPE.LANGUAGES.ENGLISH]: 'English',
    [AI_PROMPT_TYPE.LANGUAGES.HINDI]: 'Hindi',
    [AI_PROMPT_TYPE.LANGUAGES.URDU]: 'Urdu',
    [AI_PROMPT_TYPE.LANGUAGES.ARABIC]: 'Arabic',
    [AI_PROMPT_TYPE.LANGUAGES.CHINESE]: 'Chinese',
    [AI_PROMPT_TYPE.LANGUAGES.SPANISH]: 'Spanish',
    [AI_PROMPT_TYPE.LANGUAGES.FRENCH]: 'French',
    [AI_PROMPT_TYPE.LANGUAGES.GERMAN]: 'German',
    [AI_PROMPT_TYPE.LANGUAGES.JAPANESE]: 'Japanese',
    [AI_PROMPT_TYPE.LANGUAGES.KOREAN]: 'Korean',
    [AI_PROMPT_TYPE.LANGUAGES.RUSSIAN]: 'Russian',
    [AI_PROMPT_TYPE.LANGUAGES.PORTUGUESE]: 'Portuguese',
    [AI_PROMPT_TYPE.LANGUAGES.ITALIAN]: 'Italian',
    [AI_PROMPT_TYPE.LANGUAGES.DUTCH]: 'Dutch',
  };
  return labels[language] || 'Unknown';
}

export function getAiPromptPersonaLabel(persona: AIPromptPersona): string {
  const labels: Record<AIPromptPersona, string> = {
    [AI_PROMPT_TYPE.PERSONAS.EXPERT]: 'Expert',
    [AI_PROMPT_TYPE.PERSONAS.ASSISTANT]: 'Assistant',
    [AI_PROMPT_TYPE.PERSONAS.TEACHER]: 'Teacher',
    [AI_PROMPT_TYPE.PERSONAS.MENTOR]: 'Mentor',
    [AI_PROMPT_TYPE.PERSONAS.COACH]: 'Coach',
    [AI_PROMPT_TYPE.PERSONAS.ADVISOR]: 'Advisor',
    [AI_PROMPT_TYPE.PERSONAS.ANALYST]: 'Analyst',
    [AI_PROMPT_TYPE.PERSONAS.CREATOR]: 'Creator',
    [AI_PROMPT_TYPE.PERSONAS.CRITIC]: 'Critic',
    [AI_PROMPT_TYPE.PERSONAS.FRIEND]: 'Friend',
  };
  return labels[persona] || 'Unknown';
}

export function getAiPromptComplexityScore(complexity: AIPromptComplexity): number {
  const scores: Record<AIPromptComplexity, number> = {
    [AI_PROMPT_TYPE.COMPLEXITY.SIMPLE]: 1,
    [AI_PROMPT_TYPE.COMPLEXITY.MODERATE]: 3,
    [AI_PROMPT_TYPE.COMPLEXITY.COMPLEX]: 5,
    [AI_PROMPT_TYPE.COMPLEXITY.VERY_COMPLEX]: 8,
    [AI_PROMPT_TYPE.COMPLEXITY.EXPERT]: 10,
  };
  return scores[complexity] || 1;
}
