/**
 * AI Prompt Template Constants
 * Templates and patterns for AI prompts
 */

export const AI_PROMPT_TEMPLATE = {
  // Template Categories
  CATEGORIES: {
    SYSTEM: 'system',
    USER: 'user',
    FEW_SHOT: 'few_shot',
    CHAIN_OF_THOUGHT: 'chain_of_thought',
    REACT: 'react',
    INSTRUCTION: 'instruction',
    QUESTION: 'question',
    CONTEXT: 'context',
    FORMAT: 'format',
    EXAMPLES: 'examples',
    CONSTRAINTS: 'constraints',
    OBJECTIVES: 'objectives',
  } as const,

  // Template Types
  TYPES: {
    // System Templates
    SYSTEM_DEFAULT: 'system_default',
    SYSTEM_ASSISTANT: 'system_assistant',
    SYSTEM_EXPERT: 'system_expert',
    SYSTEM_CODER: 'system_coder',
    SYSTEM_ANALYST: 'system_analyst',
    SYSTEM_CREATIVE: 'system_creative',
    SYSTEM_TEACHER: 'system_teacher',
    SYSTEM_MENTOR: 'system_mentor',

    // User Templates
    USER_QUESTION: 'user_question',
    USER_REQUEST: 'user_request',
    USER_COMMAND: 'user_command',
    USER_FEEDBACK: 'user_feedback',
    USER_CLARIFICATION: 'user_clarification',

    // Few-shot Templates
    FEW_SHOT_CLASSIFICATION: 'few_shot_classification',
    FEW_SHOT_GENERATION: 'few_shot_generation',
    FEW_SHOT_EXTRACTION: 'few_shot_extraction',
    FEW_SHOT_TRANSLATION: 'few_shot_translation',
    FEW_SHOT_SUMMARIZATION: 'few_shot_summarization',

    // Chain of Thought Templates
    COT_STEP_BY_STEP: 'cot_step_by_step',
    COT_EXPLAIN: 'cot_explain',
    COT_REASON: 'cot_reason',
    COT_VERIFY: 'cot_verify',
    COT_ALTERNATIVE: 'cot_alternative',

    // ReAct Templates
    REACT_THOUGHT: 'react_thought',
    REACT_ACTION: 'react_action',
    REACT_OBSERVATION: 'react_observation',
    REACT_REFLECTION: 'react_reflection',

    // Instruction Templates
    INSTRUCTION_STEP: 'instruction_step',
    INSTRUCTION_WORKFLOW: 'instruction_workflow',
    INSTRUCTION_GUIDE: 'instruction_guide',
    INSTRUCTION_TUTORIAL: 'instruction_tutorial',

    // Context Templates
    CONTEXT_BACKGROUND: 'context_background',
    CONTEXT_SCENARIO: 'context_scenario',
    CONTEXT_HISTORY: 'context_history',
    CONTEXT_DOCUMENT: 'context_document',

    // Format Templates
    FORMAT_JSON: 'format_json',
    FORMAT_XML: 'format_xml',
    FORMAT_HTML: 'format_html',
    FORMAT_MARKDOWN: 'format_markdown',
    FORMAT_CSV: 'format_csv',
    FORMAT_TABLE: 'format_table',
    FORMAT_LIST: 'format_list',
    FORMAT_CODE: 'format_code',

    // Constraint Templates
    CONSTRAINT_LENGTH: 'constraint_length',
    CONSTRAINT_TONE: 'constraint_tone',
    CONSTRAINT_STYLE: 'constraint_style',
    CONSTRAINT_TOPIC: 'constraint_topic',
    CONSTRAINT_AUDIENCE: 'constraint_audience',

    // Objective Templates
    OBJECTIVE_CLARITY: 'objective_clarity',
    OBJECTIVE_ACCURACY: 'objective_accuracy',
    OBJECTIVE_COMPLETENESS: 'objective_completeness',
    OBJECTIVE_ENGAGEMENT: 'objective_engagement',
    OBJECTIVE_CONVERSION: 'objective_conversion',
  } as const,

  // Template Variables
  VARIABLES: {
    // User Input
    USER_INPUT: '{{user_input}}',
    USER_QUERY: '{{user_query}}',
    USER_MESSAGE: '{{user_message}}',
    USER_NAME: '{{user_name}}',

    // Context
    CONTEXT: '{{context}}',
    BACKGROUND: '{{background}}',
    HISTORY: '{{history}}',
    DOCUMENTS: '{{documents}}',

    // Content
    CONTENT: '{{content}}',
    TEXT: '{{text}}',
    DATA: '{{data}}',
    EXAMPLES: '{{examples}}',

    // Constraints
    MAX_LENGTH: '{{max_length}}',
    TONE: '{{tone}}',
    STYLE: '{{style}}',
    FORMAT: '{{format}}',

    // Metadata
    LANGUAGE: '{{language}}',
    DOMAIN: '{{domain}}',
    TOPIC: '{{topic}}',
    AUDIENCE: '{{audience}}',

    // System
    SYSTEM_INSTRUCTION: '{{system_instruction}}',
    TEMPERATURE: '{{temperature}}',
    MAX_TOKENS: '{{max_tokens}}',
    SEED: '{{seed}}',
  } as const,

  // Template Placeholders
  PLACEHOLDERS: {
    // System Placeholders
    SYSTEM_ROLE: '{system_role}',
    SYSTEM_GOAL: '{system_goal}',
    SYSTEM_PERSONA: '{system_persona}',
    SYSTEM_CAPABILITIES: '{system_capabilities}',
    SYSTEM_LIMITATIONS: '{system_limitations}',

    // User Placeholders
    USER_QUERY: '{user_query}',
    USER_INPUT: '{user_input}',
    USER_CONTEXT: '{user_context}',
    USER_PREFERENCE: '{user_preference}',

    // Content Placeholders
    CONTENT: '{content}',
    TEXT: '{text}',
    DATA: '{data}',
    EXAMPLES: '{examples}',
    OUTPUT: '{output}',

    // Format Placeholders
    FORMAT_SPEC: '{format_spec}',
    STRUCTURE: '{structure}',
    SCHEMA: '{schema}',

    // Constraint Placeholders
    MAX_WORDS: '{max_words}',
    MIN_WORDS: '{min_words}',
    TONE: '{tone}',
    STYLE: '{style}',
    AUDIENCE: '{audience}',

    // Meta Placeholders
    LANGUAGE: '{language}',
    DOMAIN: '{domain}',
    TOPIC: '{topic}',
    DATE: '{date}',
    TIME: '{time}',
  } as const,

  // Template Examples
  EXAMPLES: {
    // System Prompts
    SYSTEM_ASSISTANT: `You are a helpful AI assistant. Your goal is to provide accurate, relevant, and helpful responses to user queries. You are knowledgeable, friendly, and professional.`,

    SYSTEM_EXPERT: `You are a domain expert with deep knowledge in {domain}. You provide detailed, accurate, and well-reasoned responses. You cite sources when appropriate and acknowledge limitations of your knowledge.`,

    SYSTEM_CODER: `You are an expert software engineer. You write clean, efficient, and well-documented code. You explain your solutions clearly and consider edge cases, performance, and best practices.`,

    // User Prompts
    USER_QUESTION: `Question: {user_query}

Please provide a clear and comprehensive answer.`,

    USER_REQUEST: `Request: {user_request}

Please help me with this task.`,

    // Few-shot Templates
    FEW_SHOT_CLASSIFICATION: `Classify the following text into one of these categories: {categories}

Examples:
{examples}

Text: {text}

Category:`,

    // Chain of Thought
    COT_STEP_BY_STEP: `Let's solve this step by step:

1. First, let's understand the problem: {problem}
2. Next, let's identify what we know: {known}
3. Then, let's plan our approach: {approach}
4. Now, let's execute the plan: {execution}
5. Finally, let's verify our answer: {verification}

Answer: {answer}`,

    // Format Templates
    FORMAT_JSON: `Please provide your response in JSON format with the following structure:
{
  "field1": "value1",
  "field2": "value2"
}

Response:`,
  } as const,

  // Template Parameters
  PARAMETERS: {
    TEMPLATE_NAME: 'template_name',
    TEMPLATE_VERSION: 'template_version',
    TEMPLATE_AUTHOR: 'template_author',
    TEMPLATE_DESCRIPTION: 'template_description',
    TEMPLATE_CATEGORY: 'template_category',
    TEMPLATE_TYPE: 'template_type',
    TEMPLATE_VARIABLES: 'template_variables',
    TEMPLATE_PLACEHOLDERS: 'template_placeholders',
    TEMPLATE_DEFAULT: 'template_default',
    TEMPLATE_VALIDATION: 'template_validation',
  } as const,

  // Template Status
  STATUSES: {
    DRAFT: 'draft',
    ACTIVE: 'active',
    DEPRECATED: 'deprecated',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Template Categories
export type AIPromptTemplateCategory =
  (typeof AI_PROMPT_TEMPLATE.CATEGORIES)[keyof typeof AI_PROMPT_TEMPLATE.CATEGORIES];

// Template Types
export type AIPromptTemplateType =
  (typeof AI_PROMPT_TEMPLATE.TYPES)[keyof typeof AI_PROMPT_TEMPLATE.TYPES];

// Template Variables
export type AIPromptTemplateVariable =
  (typeof AI_PROMPT_TEMPLATE.VARIABLES)[keyof typeof AI_PROMPT_TEMPLATE.VARIABLES];

// Template Placeholders
export type AIPromptTemplatePlaceholder =
  (typeof AI_PROMPT_TEMPLATE.PLACEHOLDERS)[keyof typeof AI_PROMPT_TEMPLATE.PLACEHOLDERS];

// Template Parameters
export type AIPromptTemplateParameter =
  (typeof AI_PROMPT_TEMPLATE.PARAMETERS)[keyof typeof AI_PROMPT_TEMPLATE.PARAMETERS];

// Template Status
export type AIPromptTemplateStatus =
  (typeof AI_PROMPT_TEMPLATE.STATUSES)[keyof typeof AI_PROMPT_TEMPLATE.STATUSES];

// Utility Functions
export function getPromptTemplateCategoryLabel(category: AIPromptTemplateCategory): string {
  const labels: Record<AIPromptTemplateCategory, string> = {
    [AI_PROMPT_TEMPLATE.CATEGORIES.SYSTEM]: 'System',
    [AI_PROMPT_TEMPLATE.CATEGORIES.USER]: 'User',
    [AI_PROMPT_TEMPLATE.CATEGORIES.FEW_SHOT]: 'Few Shot',
    [AI_PROMPT_TEMPLATE.CATEGORIES.CHAIN_OF_THOUGHT]: 'Chain of Thought',
    [AI_PROMPT_TEMPLATE.CATEGORIES.REACT]: 'ReAct',
    [AI_PROMPT_TEMPLATE.CATEGORIES.INSTRUCTION]: 'Instruction',
    [AI_PROMPT_TEMPLATE.CATEGORIES.QUESTION]: 'Question',
    [AI_PROMPT_TEMPLATE.CATEGORIES.CONTEXT]: 'Context',
    [AI_PROMPT_TEMPLATE.CATEGORIES.FORMAT]: 'Format',
    [AI_PROMPT_TEMPLATE.CATEGORIES.EXAMPLES]: 'Examples',
    [AI_PROMPT_TEMPLATE.CATEGORIES.CONSTRAINTS]: 'Constraints',
    [AI_PROMPT_TEMPLATE.CATEGORIES.OBJECTIVES]: 'Objectives',
  };
  return labels[category] || 'Unknown';
}

export function getPromptTemplateTypeLabel(type: AIPromptTemplateType): string {
  const labels: Record<AIPromptTemplateType, string> = {
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_DEFAULT]: 'System Default',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_ASSISTANT]: 'System Assistant',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_EXPERT]: 'System Expert',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_CODER]: 'System Coder',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_ANALYST]: 'System Analyst',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_CREATIVE]: 'System Creative',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_TEACHER]: 'System Teacher',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_MENTOR]: 'System Mentor',
    [AI_PROMPT_TEMPLATE.TYPES.USER_QUESTION]: 'User Question',
    [AI_PROMPT_TEMPLATE.TYPES.USER_REQUEST]: 'User Request',
    [AI_PROMPT_TEMPLATE.TYPES.USER_COMMAND]: 'User Command',
    [AI_PROMPT_TEMPLATE.TYPES.USER_FEEDBACK]: 'User Feedback',
    [AI_PROMPT_TEMPLATE.TYPES.USER_CLARIFICATION]: 'User Clarification',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_CLASSIFICATION]: 'Few Shot Classification',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_GENERATION]: 'Few Shot Generation',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_EXTRACTION]: 'Few Shot Extraction',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_TRANSLATION]: 'Few Shot Translation',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_SUMMARIZATION]: 'Few Shot Summarization',
    [AI_PROMPT_TEMPLATE.TYPES.COT_STEP_BY_STEP]: 'Step by Step',
    [AI_PROMPT_TEMPLATE.TYPES.COT_EXPLAIN]: 'Explain',
    [AI_PROMPT_TEMPLATE.TYPES.COT_REASON]: 'Reason',
    [AI_PROMPT_TEMPLATE.TYPES.COT_VERIFY]: 'Verify',
    [AI_PROMPT_TEMPLATE.TYPES.COT_ALTERNATIVE]: 'Alternative',
    [AI_PROMPT_TEMPLATE.TYPES.REACT_THOUGHT]: 'ReAct Thought',
    [AI_PROMPT_TEMPLATE.TYPES.REACT_ACTION]: 'ReAct Action',
    [AI_PROMPT_TEMPLATE.TYPES.REACT_OBSERVATION]: 'ReAct Observation',
    [AI_PROMPT_TEMPLATE.TYPES.REACT_REFLECTION]: 'ReAct Reflection',
    [AI_PROMPT_TEMPLATE.TYPES.INSTRUCTION_STEP]: 'Instruction Step',
    [AI_PROMPT_TEMPLATE.TYPES.INSTRUCTION_WORKFLOW]: 'Instruction Workflow',
    [AI_PROMPT_TEMPLATE.TYPES.INSTRUCTION_GUIDE]: 'Instruction Guide',
    [AI_PROMPT_TEMPLATE.TYPES.INSTRUCTION_TUTORIAL]: 'Instruction Tutorial',
    [AI_PROMPT_TEMPLATE.TYPES.CONTEXT_BACKGROUND]: 'Context Background',
    [AI_PROMPT_TEMPLATE.TYPES.CONTEXT_SCENARIO]: 'Context Scenario',
    [AI_PROMPT_TEMPLATE.TYPES.CONTEXT_HISTORY]: 'Context History',
    [AI_PROMPT_TEMPLATE.TYPES.CONTEXT_DOCUMENT]: 'Context Document',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_JSON]: 'Format JSON',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_XML]: 'Format XML',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_HTML]: 'Format HTML',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_MARKDOWN]: 'Format Markdown',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_CSV]: 'Format CSV',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_TABLE]: 'Format Table',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_LIST]: 'Format List',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_CODE]: 'Format Code',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_LENGTH]: 'Constraint Length',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_TONE]: 'Constraint Tone',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_STYLE]: 'Constraint Style',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_TOPIC]: 'Constraint Topic',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_AUDIENCE]: 'Constraint Audience',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_CLARITY]: 'Objective Clarity',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_ACCURACY]: 'Objective Accuracy',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_COMPLETENESS]: 'Objective Completeness',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_ENGAGEMENT]: 'Objective Engagement',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_CONVERSION]: 'Objective Conversion',
  };
  return labels[type] || 'Unknown';
}

export function getPromptTemplateVariableLabel(variable: AIPromptTemplateVariable): string {
  const labels: Record<AIPromptTemplateVariable, string> = {
    [AI_PROMPT_TEMPLATE.VARIABLES.USER_INPUT]: 'User Input',
    [AI_PROMPT_TEMPLATE.VARIABLES.USER_QUERY]: 'User Query',
    [AI_PROMPT_TEMPLATE.VARIABLES.USER_MESSAGE]: 'User Message',
    [AI_PROMPT_TEMPLATE.VARIABLES.USER_NAME]: 'User Name',
    [AI_PROMPT_TEMPLATE.VARIABLES.CONTEXT]: 'Context',
    [AI_PROMPT_TEMPLATE.VARIABLES.BACKGROUND]: 'Background',
    [AI_PROMPT_TEMPLATE.VARIABLES.HISTORY]: 'History',
    [AI_PROMPT_TEMPLATE.VARIABLES.DOCUMENTS]: 'Documents',
    [AI_PROMPT_TEMPLATE.VARIABLES.CONTENT]: 'Content',
    [AI_PROMPT_TEMPLATE.VARIABLES.TEXT]: 'Text',
    [AI_PROMPT_TEMPLATE.VARIABLES.DATA]: 'Data',
    [AI_PROMPT_TEMPLATE.VARIABLES.EXAMPLES]: 'Examples',
    [AI_PROMPT_TEMPLATE.VARIABLES.MAX_LENGTH]: 'Max Length',
    [AI_PROMPT_TEMPLATE.VARIABLES.TONE]: 'Tone',
    [AI_PROMPT_TEMPLATE.VARIABLES.STYLE]: 'Style',
    [AI_PROMPT_TEMPLATE.VARIABLES.FORMAT]: 'Format',
    [AI_PROMPT_TEMPLATE.VARIABLES.LANGUAGE]: 'Language',
    [AI_PROMPT_TEMPLATE.VARIABLES.DOMAIN]: 'Domain',
    [AI_PROMPT_TEMPLATE.VARIABLES.TOPIC]: 'Topic',
    [AI_PROMPT_TEMPLATE.VARIABLES.AUDIENCE]: 'Audience',
    [AI_PROMPT_TEMPLATE.VARIABLES.SYSTEM_INSTRUCTION]: 'System Instruction',
    [AI_PROMPT_TEMPLATE.VARIABLES.TEMPERATURE]: 'Temperature',
    [AI_PROMPT_TEMPLATE.VARIABLES.MAX_TOKENS]: 'Max Tokens',
    [AI_PROMPT_TEMPLATE.VARIABLES.SEED]: 'Seed',
  };
  return labels[variable] || 'Unknown';
}

export function getPromptTemplateStatusLabel(status: AIPromptTemplateStatus): string {
  const labels: Record<AIPromptTemplateStatus, string> = {
    [AI_PROMPT_TEMPLATE.STATUSES.DRAFT]: 'Draft',
    [AI_PROMPT_TEMPLATE.STATUSES.ACTIVE]: 'Active',
    [AI_PROMPT_TEMPLATE.STATUSES.DEPRECATED]: 'Deprecated',
    [AI_PROMPT_TEMPLATE.STATUSES.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function isTemplateActive(status: AIPromptTemplateStatus): boolean {
  return status === AI_PROMPT_TEMPLATE.STATUSES.ACTIVE;
}

export function isTemplateDeprecated(status: AIPromptTemplateStatus): boolean {
  return status === AI_PROMPT_TEMPLATE.STATUSES.DEPRECATED;
}

export function isTemplateAvailable(status: AIPromptTemplateStatus): boolean {
  const availableStatuses: AIPromptTemplateStatus[] = [
    AI_PROMPT_TEMPLATE.STATUSES.ACTIVE,
    AI_PROMPT_TEMPLATE.STATUSES.DRAFT,
  ];
  return availableStatuses.includes(status);
}

export function replacePlaceholders(template: string, values: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
  }
  return result;
}

export function getTemplateExample(templateType: AIPromptTemplateType): string {
  const examples: Record<AIPromptTemplateType, string> = {
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_DEFAULT]: 'You are a helpful AI assistant.',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_ASSISTANT]: AI_PROMPT_TEMPLATE.EXAMPLES.SYSTEM_ASSISTANT,
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_EXPERT]: AI_PROMPT_TEMPLATE.EXAMPLES.SYSTEM_EXPERT,
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_CODER]: AI_PROMPT_TEMPLATE.EXAMPLES.SYSTEM_CODER,
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_ANALYST]:
      'You are a data analyst. You interpret data, identify patterns, and provide actionable insights.',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_CREATIVE]:
      'You are a creative writer. You generate engaging and original content.',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_TEACHER]:
      'You are a teacher. You explain concepts clearly and patiently.',
    [AI_PROMPT_TEMPLATE.TYPES.SYSTEM_MENTOR]:
      'You are a mentor. You guide, encourage, and provide constructive feedback.',
    [AI_PROMPT_TEMPLATE.TYPES.USER_QUESTION]: AI_PROMPT_TEMPLATE.EXAMPLES.USER_QUESTION,
    [AI_PROMPT_TEMPLATE.TYPES.USER_REQUEST]: AI_PROMPT_TEMPLATE.EXAMPLES.USER_REQUEST,
    [AI_PROMPT_TEMPLATE.TYPES.USER_COMMAND]: 'Command: {user_command}\n\nExecuting:',
    [AI_PROMPT_TEMPLATE.TYPES.USER_FEEDBACK]:
      'Feedback: {user_feedback}\n\nThank you for your feedback.',
    [AI_PROMPT_TEMPLATE.TYPES.USER_CLARIFICATION]:
      'Could you please clarify: {clarification_request}',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_CLASSIFICATION]:
      AI_PROMPT_TEMPLATE.EXAMPLES.FEW_SHOT_CLASSIFICATION,
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_GENERATION]:
      'Generate content based on these examples:\n{examples}\n\nNew content:',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_EXTRACTION]:
      'Extract information from the text below.\n\nExamples:\n{examples}\n\nText: {text}\n\nExtracted:',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_TRANSLATION]:
      'Translate the following text.\n\nExamples:\n{examples}\n\nText: {text}\n\nTranslation:',
    [AI_PROMPT_TEMPLATE.TYPES.FEW_SHOT_SUMMARIZATION]:
      'Summarize the following text.\n\nExamples:\n{examples}\n\nText: {text}\n\nSummary:',
    [AI_PROMPT_TEMPLATE.TYPES.COT_STEP_BY_STEP]: AI_PROMPT_TEMPLATE.EXAMPLES.COT_STEP_BY_STEP,
    [AI_PROMPT_TEMPLATE.TYPES.COT_EXPLAIN]:
      'Explain your reasoning step by step:\n\nProblem: {problem}\n\nReasoning:',
    [AI_PROMPT_TEMPLATE.TYPES.COT_REASON]:
      'Reason through this problem:\n\nProblem: {problem}\n\nLet me reason:',
    [AI_PROMPT_TEMPLATE.TYPES.COT_VERIFY]:
      'Verify the following reasoning:\n\nReasoning: {reasoning}\n\nVerification:',
    [AI_PROMPT_TEMPLATE.TYPES.COT_ALTERNATIVE]:
      'Consider alternative approaches:\n\nProblem: {problem}\n\nApproaches:',
    [AI_PROMPT_TEMPLATE.TYPES.REACT_THOUGHT]: 'Thought: {thought}',
    [AI_PROMPT_TEMPLATE.TYPES.REACT_ACTION]: 'Action: {action}',
    [AI_PROMPT_TEMPLATE.TYPES.REACT_OBSERVATION]: 'Observation: {observation}',
    [AI_PROMPT_TEMPLATE.TYPES.REACT_REFLECTION]: 'Reflection: {reflection}',
    [AI_PROMPT_TEMPLATE.TYPES.INSTRUCTION_STEP]: 'Step {step_number}: {step_instruction}',
    [AI_PROMPT_TEMPLATE.TYPES.INSTRUCTION_WORKFLOW]: 'Workflow: {workflow_description}',
    [AI_PROMPT_TEMPLATE.TYPES.INSTRUCTION_GUIDE]: 'Guide: {guide_content}',
    [AI_PROMPT_TEMPLATE.TYPES.INSTRUCTION_TUTORIAL]: 'Tutorial: {tutorial_content}',
    [AI_PROMPT_TEMPLATE.TYPES.CONTEXT_BACKGROUND]: 'Background: {background_info}',
    [AI_PROMPT_TEMPLATE.TYPES.CONTEXT_SCENARIO]: 'Scenario: {scenario_description}',
    [AI_PROMPT_TEMPLATE.TYPES.CONTEXT_HISTORY]: 'History: {conversation_history}',
    [AI_PROMPT_TEMPLATE.TYPES.CONTEXT_DOCUMENT]: 'Document: {document_content}',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_JSON]: AI_PROMPT_TEMPLATE.EXAMPLES.FORMAT_JSON,
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_XML]:
      'Please provide your response in XML format with the following structure:\n<root>\n  <field1>value1</field1>\n  <field2>value2</field2>\n</root>',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_HTML]: 'Please provide your response in HTML format.',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_MARKDOWN]: 'Please provide your response in Markdown format.',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_CSV]: 'Please provide your response in CSV format.',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_TABLE]: 'Please provide your response as a table.',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_LIST]: 'Please provide your response as a list.',
    [AI_PROMPT_TEMPLATE.TYPES.FORMAT_CODE]: 'Please provide your response as code.',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_LENGTH]:
      'Please limit your response to {max_words} words.',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_TONE]: 'Please maintain a {tone} tone.',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_STYLE]: 'Please use {style} style.',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_TOPIC]: 'Please stay within the topic: {topic}',
    [AI_PROMPT_TEMPLATE.TYPES.CONSTRAINT_AUDIENCE]:
      'Please tailor your response for {audience} audience.',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_CLARITY]:
      'Objective: Provide a clear and easy-to-understand response.',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_ACCURACY]:
      'Objective: Ensure all information is accurate and factually correct.',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_COMPLETENESS]:
      'Objective: Provide complete and comprehensive information.',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_ENGAGEMENT]:
      'Objective: Create engaging and interesting content.',
    [AI_PROMPT_TEMPLATE.TYPES.OBJECTIVE_CONVERSION]: 'Objective: Persuade and drive action.',
  };
  return examples[templateType] || '';
}
