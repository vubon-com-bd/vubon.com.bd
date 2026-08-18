/**
 * সাপোর্ট রুলের বিভিন্ন টাইপ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রুল টাইপ
 */
export const RULE_TYPE = {
  ASSIGNMENT: 'assignment',
  ESCALATION: 'escalation',
  PRIORITY: 'priority',
  CATEGORIZATION: 'categorization',
  NOTIFICATION: 'notification',
  AUTOMATION: 'automation',
  ROUTING: 'routing',
  AUTO_RESPONSE: 'auto_response',
  SATISFACTION_SURVEY: 'satisfaction_survey',
  SLA_ENFORCEMENT: 'sla_enforcement',
  DUPLICATE_DETECTION: 'duplicate_detection',
  MERGE: 'merge',
  TAG: 'tag',
  WORKFLOW: 'workflow',
  VALIDATION: 'validation',
  SUSPICIOUS_DETECTION: 'suspicious_detection',
  SPAM_DETECTION: 'spam_detection',
  AUTO_CLOSE: 'auto_close',
  REMINDER: 'reminder',
  FOLLOW_UP: 'follow_up',
  ESCALATION_PREVENTION: 'escalation_prevention',
  PRIORITY_ESCALATION: 'priority_escalation',
  BATCH_PROCESSING: 'batch_processing',
  SCHEDULED_ACTION: 'scheduled_action',
  CONDITIONAL_UPDATE: 'conditional_update',
  TEMPLATE_APPLICATION: 'template_application',
} as const;

/**
 * রুল টাইপের ডিসপ্লে নাম
 */
export const RULE_TYPE_DISPLAY_NAMES = {
  [RULE_TYPE.ASSIGNMENT]: 'অ্যাসাইনমেন্ট',
  [RULE_TYPE.ESCALATION]: 'এস্কেলেশন',
  [RULE_TYPE.PRIORITY]: 'প্রায়োরিটি',
  [RULE_TYPE.CATEGORIZATION]: 'ক্যাটাগরিকরণ',
  [RULE_TYPE.NOTIFICATION]: 'নোটিফিকেশন',
  [RULE_TYPE.AUTOMATION]: 'অটোমেশন',
  [RULE_TYPE.ROUTING]: 'রাউটিং',
  [RULE_TYPE.AUTO_RESPONSE]: 'অটো-রেসপন্স',
  [RULE_TYPE.SATISFACTION_SURVEY]: 'সন্তুষ্টি জরিপ',
  [RULE_TYPE.SLA_ENFORCEMENT]: 'এসএলএ প্রয়োগ',
  [RULE_TYPE.DUPLICATE_DETECTION]: 'ডুপ্লিকেট সনাক্তকরণ',
  [RULE_TYPE.MERGE]: 'মার্জ',
  [RULE_TYPE.TAG]: 'ট্যাগ',
  [RULE_TYPE.WORKFLOW]: 'ওয়ার্কফ্লো',
  [RULE_TYPE.VALIDATION]: 'ভ্যালিডেশন',
  [RULE_TYPE.SUSPICIOUS_DETECTION]: 'সন্দেহজনক সনাক্তকরণ',
  [RULE_TYPE.SPAM_DETECTION]: 'স্প্যাম সনাক্তকরণ',
  [RULE_TYPE.AUTO_CLOSE]: 'অটো-ক্লোজ',
  [RULE_TYPE.REMINDER]: 'রিমাইন্ডার',
  [RULE_TYPE.FOLLOW_UP]: 'ফলো-আপ',
  [RULE_TYPE.ESCALATION_PREVENTION]: 'এস্কেলেশন প্রতিরোধ',
  [RULE_TYPE.PRIORITY_ESCALATION]: 'প্রায়োরিটি এস্কেলেশন',
  [RULE_TYPE.BATCH_PROCESSING]: 'ব্যাচ প্রসেসিং',
  [RULE_TYPE.SCHEDULED_ACTION]: 'নির্ধারিত অ্যাকশন',
  [RULE_TYPE.CONDITIONAL_UPDATE]: 'শর্তসাপেক্ষ আপডেট',
  [RULE_TYPE.TEMPLATE_APPLICATION]: 'টেমপ্লেট প্রয়োগ',
} as const;

/**
 * রুল টাইপের আইকন (অনুষঙ্গিক নাম)
 */
export const RULE_TYPE_ICONS = {
  [RULE_TYPE.ASSIGNMENT]: 'user-check',
  [RULE_TYPE.ESCALATION]: 'arrow-up-circle',
  [RULE_TYPE.PRIORITY]: 'flag',
  [RULE_TYPE.CATEGORIZATION]: 'folder',
  [RULE_TYPE.NOTIFICATION]: 'bell',
  [RULE_TYPE.AUTOMATION]: 'zap',
  [RULE_TYPE.ROUTING]: 'git-branch',
  [RULE_TYPE.AUTO_RESPONSE]: 'message-square',
  [RULE_TYPE.SATISFACTION_SURVEY]: 'smile',
  [RULE_TYPE.SLA_ENFORCEMENT]: 'clock',
  [RULE_TYPE.DUPLICATE_DETECTION]: 'copy',
  [RULE_TYPE.MERGE]: 'git-merge',
  [RULE_TYPE.TAG]: 'tag',
  [RULE_TYPE.WORKFLOW]: 'workflow',
  [RULE_TYPE.VALIDATION]: 'check-circle',
  [RULE_TYPE.SUSPICIOUS_DETECTION]: 'alert-triangle',
  [RULE_TYPE.SPAM_DETECTION]: 'shield-off',
  [RULE_TYPE.AUTO_CLOSE]: 'check-circle',
  [RULE_TYPE.REMINDER]: 'clock',
  [RULE_TYPE.FOLLOW_UP]: 'refresh-cw',
  [RULE_TYPE.ESCALATION_PREVENTION]: 'shield',
  [RULE_TYPE.PRIORITY_ESCALATION]: 'arrow-up',
  [RULE_TYPE.BATCH_PROCESSING]: 'layers',
  [RULE_TYPE.SCHEDULED_ACTION]: 'calendar',
  [RULE_TYPE.CONDITIONAL_UPDATE]: 'edit',
  [RULE_TYPE.TEMPLATE_APPLICATION]: 'file-text',
} as const;

/**
 * রুল টাইপের রঙের কোড (হেক্স)
 */
export const RULE_TYPE_COLORS = {
  [RULE_TYPE.ASSIGNMENT]: '#3498db',
  [RULE_TYPE.ESCALATION]: '#e74c3c',
  [RULE_TYPE.PRIORITY]: '#e67e22',
  [RULE_TYPE.CATEGORIZATION]: '#9b59b6',
  [RULE_TYPE.NOTIFICATION]: '#f39c12',
  [RULE_TYPE.AUTOMATION]: '#2ecc71',
  [RULE_TYPE.ROUTING]: '#1abc9c',
  [RULE_TYPE.AUTO_RESPONSE]: '#2980b9',
  [RULE_TYPE.SATISFACTION_SURVEY]: '#27ae60',
  [RULE_TYPE.SLA_ENFORCEMENT]: '#c0392b',
  [RULE_TYPE.DUPLICATE_DETECTION]: '#7f8c8d',
  [RULE_TYPE.MERGE]: '#8e44ad',
  [RULE_TYPE.TAG]: '#e67e22',
  [RULE_TYPE.WORKFLOW]: '#3498db',
  [RULE_TYPE.VALIDATION]: '#2ecc71',
  [RULE_TYPE.SUSPICIOUS_DETECTION]: '#e74c3c',
  [RULE_TYPE.SPAM_DETECTION]: '#95a5a6',
  [RULE_TYPE.AUTO_CLOSE]: '#27ae60',
  [RULE_TYPE.REMINDER]: '#f39c12',
  [RULE_TYPE.FOLLOW_UP]: '#3498db',
  [RULE_TYPE.ESCALATION_PREVENTION]: '#2ecc71',
  [RULE_TYPE.PRIORITY_ESCALATION]: '#e67e22',
  [RULE_TYPE.BATCH_PROCESSING]: '#34495e',
  [RULE_TYPE.SCHEDULED_ACTION]: '#9b59b6',
  [RULE_TYPE.CONDITIONAL_UPDATE]: '#2980b9',
  [RULE_TYPE.TEMPLATE_APPLICATION]: '#1abc9c',
} as const;

/**
 * রুল টাইপের ক্যাটাগরি
 */
export const RULE_TYPE_CATEGORIES = {
  [RULE_TYPE.ASSIGNMENT]: 'assignment',
  [RULE_TYPE.ESCALATION]: 'escalation',
  [RULE_TYPE.PRIORITY]: 'priority',
  [RULE_TYPE.CATEGORIZATION]: 'categorization',
  [RULE_TYPE.NOTIFICATION]: 'notification',
  [RULE_TYPE.AUTOMATION]: 'automation',
  [RULE_TYPE.ROUTING]: 'routing',
  [RULE_TYPE.AUTO_RESPONSE]: 'response',
  [RULE_TYPE.SATISFACTION_SURVEY]: 'survey',
  [RULE_TYPE.SLA_ENFORCEMENT]: 'sla',
  [RULE_TYPE.DUPLICATE_DETECTION]: 'detection',
  [RULE_TYPE.MERGE]: 'merge',
  [RULE_TYPE.TAG]: 'tagging',
  [RULE_TYPE.WORKFLOW]: 'workflow',
  [RULE_TYPE.VALIDATION]: 'validation',
  [RULE_TYPE.SUSPICIOUS_DETECTION]: 'detection',
  [RULE_TYPE.SPAM_DETECTION]: 'detection',
  [RULE_TYPE.AUTO_CLOSE]: 'closure',
  [RULE_TYPE.REMINDER]: 'reminder',
  [RULE_TYPE.FOLLOW_UP]: 'follow_up',
  [RULE_TYPE.ESCALATION_PREVENTION]: 'prevention',
  [RULE_TYPE.PRIORITY_ESCALATION]: 'escalation',
  [RULE_TYPE.BATCH_PROCESSING]: 'processing',
  [RULE_TYPE.SCHEDULED_ACTION]: 'scheduling',
  [RULE_TYPE.CONDITIONAL_UPDATE]: 'update',
  [RULE_TYPE.TEMPLATE_APPLICATION]: 'template',
} as const;

/**
 * রুল টাইপের ডিফল্ট প্রায়োরিটি
 */
export const RULE_TYPE_DEFAULT_PRIORITY = {
  [RULE_TYPE.ASSIGNMENT]: 100,
  [RULE_TYPE.ESCALATION]: 100,
  [RULE_TYPE.PRIORITY]: 100,
  [RULE_TYPE.CATEGORIZATION]: 80,
  [RULE_TYPE.NOTIFICATION]: 50,
  [RULE_TYPE.AUTOMATION]: 90,
  [RULE_TYPE.ROUTING]: 85,
  [RULE_TYPE.AUTO_RESPONSE]: 70,
  [RULE_TYPE.SATISFACTION_SURVEY]: 40,
  [RULE_TYPE.SLA_ENFORCEMENT]: 100,
  [RULE_TYPE.DUPLICATE_DETECTION]: 60,
  [RULE_TYPE.MERGE]: 75,
  [RULE_TYPE.TAG]: 50,
  [RULE_TYPE.WORKFLOW]: 95,
  [RULE_TYPE.VALIDATION]: 80,
  [RULE_TYPE.SUSPICIOUS_DETECTION]: 90,
  [RULE_TYPE.SPAM_DETECTION]: 85,
  [RULE_TYPE.AUTO_CLOSE]: 70,
  [RULE_TYPE.REMINDER]: 60,
  [RULE_TYPE.FOLLOW_UP]: 65,
  [RULE_TYPE.ESCALATION_PREVENTION]: 95,
  [RULE_TYPE.PRIORITY_ESCALATION]: 100,
  [RULE_TYPE.BATCH_PROCESSING]: 70,
  [RULE_TYPE.SCHEDULED_ACTION]: 75,
  [RULE_TYPE.CONDITIONAL_UPDATE]: 80,
  [RULE_TYPE.TEMPLATE_APPLICATION]: 60,
} as const;

/**
 * রুল টাইপ গ্রুপ
 */
export const RULE_TYPE_GROUPS = {
  ASSIGNMENT: ['assignment', 'routing'],
  ESCALATION: ['escalation', 'priority_escalation', 'escalation_prevention'],
  CLASSIFICATION: ['categorization', 'priority', 'tag'],
  COMMUNICATION: ['notification', 'auto_response', 'reminder', 'follow_up'],
  DETECTION: ['duplicate_detection', 'suspicious_detection', 'spam_detection'],
  WORKFLOW: ['automation', 'workflow', 'conditional_update', 'template_application'],
  CLOSURE: ['auto_close', 'merge'],
  SLA: ['sla_enforcement'],
  SURVEY: ['satisfaction_survey'],
  PROCESSING: ['batch_processing', 'scheduled_action'],
  VALIDATION: ['validation'],
} as const;

export type RuleType = (typeof RULE_TYPE)[keyof typeof RULE_TYPE];
export type RuleTypeDisplayNames = typeof RULE_TYPE_DISPLAY_NAMES;
export type RuleTypeIcons = typeof RULE_TYPE_ICONS;
export type RuleTypeColors = typeof RULE_TYPE_COLORS;
export type RuleTypeCategories = typeof RULE_TYPE_CATEGORIES;
export type RuleTypeDefaultPriority = typeof RULE_TYPE_DEFAULT_PRIORITY;
export type RuleTypeGroups = typeof RULE_TYPE_GROUPS;

export type RuleTypeGroup = keyof typeof RULE_TYPE_GROUPS;

export interface RuleTypeConfig {
  type: RuleType;
  displayName: string;
  icon: string;
  color: string;
  category: string;
  defaultPriority: number;
  group: RuleTypeGroup;
  description?: string;
}

/**
 * রুল টাইপ কনফিগারেশন অবজেক্ট
 */
export const RULE_TYPE_CONFIGS: Record<RuleType, RuleTypeConfig> = {
  [RULE_TYPE.ASSIGNMENT]: {
    type: RULE_TYPE.ASSIGNMENT,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.ASSIGNMENT],
    icon: RULE_TYPE_ICONS[RULE_TYPE.ASSIGNMENT],
    color: RULE_TYPE_COLORS[RULE_TYPE.ASSIGNMENT],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.ASSIGNMENT],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.ASSIGNMENT],
    group: 'ASSIGNMENT',
    description: 'টিকেট অ্যাসাইনমেন্ট রুল',
  },
  [RULE_TYPE.ESCALATION]: {
    type: RULE_TYPE.ESCALATION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.ESCALATION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.ESCALATION],
    color: RULE_TYPE_COLORS[RULE_TYPE.ESCALATION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.ESCALATION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.ESCALATION],
    group: 'ESCALATION',
    description: 'টিকেট এস্কেলেশন রুল',
  },
  [RULE_TYPE.PRIORITY]: {
    type: RULE_TYPE.PRIORITY,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.PRIORITY],
    icon: RULE_TYPE_ICONS[RULE_TYPE.PRIORITY],
    color: RULE_TYPE_COLORS[RULE_TYPE.PRIORITY],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.PRIORITY],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.PRIORITY],
    group: 'CLASSIFICATION',
    description: 'প্রায়োরিটি নির্ধারণ রুল',
  },
  [RULE_TYPE.CATEGORIZATION]: {
    type: RULE_TYPE.CATEGORIZATION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.CATEGORIZATION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.CATEGORIZATION],
    color: RULE_TYPE_COLORS[RULE_TYPE.CATEGORIZATION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.CATEGORIZATION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.CATEGORIZATION],
    group: 'CLASSIFICATION',
    description: 'ক্যাটাগরি নির্ধারণ রুল',
  },
  [RULE_TYPE.NOTIFICATION]: {
    type: RULE_TYPE.NOTIFICATION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.NOTIFICATION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.NOTIFICATION],
    color: RULE_TYPE_COLORS[RULE_TYPE.NOTIFICATION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.NOTIFICATION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.NOTIFICATION],
    group: 'COMMUNICATION',
    description: 'নোটিফিকেশন পাঠানোর রুল',
  },
  [RULE_TYPE.AUTOMATION]: {
    type: RULE_TYPE.AUTOMATION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.AUTOMATION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.AUTOMATION],
    color: RULE_TYPE_COLORS[RULE_TYPE.AUTOMATION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.AUTOMATION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.AUTOMATION],
    group: 'WORKFLOW',
    description: 'অটোমেশন রুল',
  },
  [RULE_TYPE.ROUTING]: {
    type: RULE_TYPE.ROUTING,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.ROUTING],
    icon: RULE_TYPE_ICONS[RULE_TYPE.ROUTING],
    color: RULE_TYPE_COLORS[RULE_TYPE.ROUTING],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.ROUTING],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.ROUTING],
    group: 'ASSIGNMENT',
    description: 'টিকেট রাউটিং রুল',
  },
  [RULE_TYPE.AUTO_RESPONSE]: {
    type: RULE_TYPE.AUTO_RESPONSE,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.AUTO_RESPONSE],
    icon: RULE_TYPE_ICONS[RULE_TYPE.AUTO_RESPONSE],
    color: RULE_TYPE_COLORS[RULE_TYPE.AUTO_RESPONSE],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.AUTO_RESPONSE],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.AUTO_RESPONSE],
    group: 'COMMUNICATION',
    description: 'অটো-রেসপন্স রুল',
  },
  [RULE_TYPE.SATISFACTION_SURVEY]: {
    type: RULE_TYPE.SATISFACTION_SURVEY,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.SATISFACTION_SURVEY],
    icon: RULE_TYPE_ICONS[RULE_TYPE.SATISFACTION_SURVEY],
    color: RULE_TYPE_COLORS[RULE_TYPE.SATISFACTION_SURVEY],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.SATISFACTION_SURVEY],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.SATISFACTION_SURVEY],
    group: 'SURVEY',
    description: 'সন্তুষ্টি জরিপ পাঠানোর রুল',
  },
  [RULE_TYPE.SLA_ENFORCEMENT]: {
    type: RULE_TYPE.SLA_ENFORCEMENT,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.SLA_ENFORCEMENT],
    icon: RULE_TYPE_ICONS[RULE_TYPE.SLA_ENFORCEMENT],
    color: RULE_TYPE_COLORS[RULE_TYPE.SLA_ENFORCEMENT],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.SLA_ENFORCEMENT],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.SLA_ENFORCEMENT],
    group: 'SLA',
    description: 'এসএলএ প্রয়োগ রুল',
  },
  [RULE_TYPE.DUPLICATE_DETECTION]: {
    type: RULE_TYPE.DUPLICATE_DETECTION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.DUPLICATE_DETECTION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.DUPLICATE_DETECTION],
    color: RULE_TYPE_COLORS[RULE_TYPE.DUPLICATE_DETECTION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.DUPLICATE_DETECTION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.DUPLICATE_DETECTION],
    group: 'DETECTION',
    description: 'ডুপ্লিকেট টিকেট সনাক্তকরণ রুল',
  },
  [RULE_TYPE.MERGE]: {
    type: RULE_TYPE.MERGE,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.MERGE],
    icon: RULE_TYPE_ICONS[RULE_TYPE.MERGE],
    color: RULE_TYPE_COLORS[RULE_TYPE.MERGE],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.MERGE],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.MERGE],
    group: 'CLOSURE',
    description: 'টিকেট মার্জ রুল',
  },
  [RULE_TYPE.TAG]: {
    type: RULE_TYPE.TAG,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.TAG],
    icon: RULE_TYPE_ICONS[RULE_TYPE.TAG],
    color: RULE_TYPE_COLORS[RULE_TYPE.TAG],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.TAG],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.TAG],
    group: 'CLASSIFICATION',
    description: 'ট্যাগ প্রয়োগ রুল',
  },
  [RULE_TYPE.WORKFLOW]: {
    type: RULE_TYPE.WORKFLOW,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.WORKFLOW],
    icon: RULE_TYPE_ICONS[RULE_TYPE.WORKFLOW],
    color: RULE_TYPE_COLORS[RULE_TYPE.WORKFLOW],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.WORKFLOW],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.WORKFLOW],
    group: 'WORKFLOW',
    description: 'ওয়ার্কফ্লো রুল',
  },
  [RULE_TYPE.VALIDATION]: {
    type: RULE_TYPE.VALIDATION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.VALIDATION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.VALIDATION],
    color: RULE_TYPE_COLORS[RULE_TYPE.VALIDATION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.VALIDATION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.VALIDATION],
    group: 'VALIDATION',
    description: 'টিকেট ভ্যালিডেশন রুল',
  },
  [RULE_TYPE.SUSPICIOUS_DETECTION]: {
    type: RULE_TYPE.SUSPICIOUS_DETECTION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.SUSPICIOUS_DETECTION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.SUSPICIOUS_DETECTION],
    color: RULE_TYPE_COLORS[RULE_TYPE.SUSPICIOUS_DETECTION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.SUSPICIOUS_DETECTION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.SUSPICIOUS_DETECTION],
    group: 'DETECTION',
    description: 'সন্দেহজনক কার্যকলাপ সনাক্তকরণ রুল',
  },
  [RULE_TYPE.SPAM_DETECTION]: {
    type: RULE_TYPE.SPAM_DETECTION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.SPAM_DETECTION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.SPAM_DETECTION],
    color: RULE_TYPE_COLORS[RULE_TYPE.SPAM_DETECTION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.SPAM_DETECTION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.SPAM_DETECTION],
    group: 'DETECTION',
    description: 'স্প্যাম টিকেট সনাক্তকরণ রুল',
  },
  [RULE_TYPE.AUTO_CLOSE]: {
    type: RULE_TYPE.AUTO_CLOSE,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.AUTO_CLOSE],
    icon: RULE_TYPE_ICONS[RULE_TYPE.AUTO_CLOSE],
    color: RULE_TYPE_COLORS[RULE_TYPE.AUTO_CLOSE],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.AUTO_CLOSE],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.AUTO_CLOSE],
    group: 'CLOSURE',
    description: 'অটো-ক্লোজ রুল',
  },
  [RULE_TYPE.REMINDER]: {
    type: RULE_TYPE.REMINDER,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.REMINDER],
    icon: RULE_TYPE_ICONS[RULE_TYPE.REMINDER],
    color: RULE_TYPE_COLORS[RULE_TYPE.REMINDER],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.REMINDER],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.REMINDER],
    group: 'COMMUNICATION',
    description: 'রিমাইন্ডার পাঠানোর রুল',
  },
  [RULE_TYPE.FOLLOW_UP]: {
    type: RULE_TYPE.FOLLOW_UP,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.FOLLOW_UP],
    icon: RULE_TYPE_ICONS[RULE_TYPE.FOLLOW_UP],
    color: RULE_TYPE_COLORS[RULE_TYPE.FOLLOW_UP],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.FOLLOW_UP],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.FOLLOW_UP],
    group: 'COMMUNICATION',
    description: 'ফলো-আপ রুল',
  },
  [RULE_TYPE.ESCALATION_PREVENTION]: {
    type: RULE_TYPE.ESCALATION_PREVENTION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.ESCALATION_PREVENTION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.ESCALATION_PREVENTION],
    color: RULE_TYPE_COLORS[RULE_TYPE.ESCALATION_PREVENTION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.ESCALATION_PREVENTION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.ESCALATION_PREVENTION],
    group: 'ESCALATION',
    description: 'এস্কেলেশন প্রতিরোধ রুল',
  },
  [RULE_TYPE.PRIORITY_ESCALATION]: {
    type: RULE_TYPE.PRIORITY_ESCALATION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.PRIORITY_ESCALATION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.PRIORITY_ESCALATION],
    color: RULE_TYPE_COLORS[RULE_TYPE.PRIORITY_ESCALATION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.PRIORITY_ESCALATION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.PRIORITY_ESCALATION],
    group: 'ESCALATION',
    description: 'প্রায়োরিটি এস্কেলেশন রুল',
  },
  [RULE_TYPE.BATCH_PROCESSING]: {
    type: RULE_TYPE.BATCH_PROCESSING,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.BATCH_PROCESSING],
    icon: RULE_TYPE_ICONS[RULE_TYPE.BATCH_PROCESSING],
    color: RULE_TYPE_COLORS[RULE_TYPE.BATCH_PROCESSING],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.BATCH_PROCESSING],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.BATCH_PROCESSING],
    group: 'PROCESSING',
    description: 'ব্যাচ প্রসেসিং রুল',
  },
  [RULE_TYPE.SCHEDULED_ACTION]: {
    type: RULE_TYPE.SCHEDULED_ACTION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.SCHEDULED_ACTION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.SCHEDULED_ACTION],
    color: RULE_TYPE_COLORS[RULE_TYPE.SCHEDULED_ACTION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.SCHEDULED_ACTION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.SCHEDULED_ACTION],
    group: 'PROCESSING',
    description: 'নির্ধারিত অ্যাকশন রুল',
  },
  [RULE_TYPE.CONDITIONAL_UPDATE]: {
    type: RULE_TYPE.CONDITIONAL_UPDATE,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.CONDITIONAL_UPDATE],
    icon: RULE_TYPE_ICONS[RULE_TYPE.CONDITIONAL_UPDATE],
    color: RULE_TYPE_COLORS[RULE_TYPE.CONDITIONAL_UPDATE],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.CONDITIONAL_UPDATE],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.CONDITIONAL_UPDATE],
    group: 'WORKFLOW',
    description: 'শর্তসাপেক্ষ আপডেট রুল',
  },
  [RULE_TYPE.TEMPLATE_APPLICATION]: {
    type: RULE_TYPE.TEMPLATE_APPLICATION,
    displayName: RULE_TYPE_DISPLAY_NAMES[RULE_TYPE.TEMPLATE_APPLICATION],
    icon: RULE_TYPE_ICONS[RULE_TYPE.TEMPLATE_APPLICATION],
    color: RULE_TYPE_COLORS[RULE_TYPE.TEMPLATE_APPLICATION],
    category: RULE_TYPE_CATEGORIES[RULE_TYPE.TEMPLATE_APPLICATION],
    defaultPriority: RULE_TYPE_DEFAULT_PRIORITY[RULE_TYPE.TEMPLATE_APPLICATION],
    group: 'WORKFLOW',
    description: 'টেমপ্লেট প্রয়োগ রুল',
  },
};

/**
 * রুল টাইপ গ্রুপ কনফিগারেশন
 */
export const RULE_TYPE_GROUP_CONFIGS: Record<
  RuleTypeGroup,
  {
    group: RuleTypeGroup;
    displayName: string;
    icon: string;
    color: string;
    types: readonly RuleType[];
    description?: string;
  }
> = {
  ASSIGNMENT: {
    group: 'ASSIGNMENT',
    displayName: 'অ্যাসাইনমেন্ট',
    icon: 'user-check',
    color: '#3498db',
    types: ['assignment', 'routing'] as const,
    description: 'টিকেট অ্যাসাইনমেন্ট ও রাউটিং রুল',
  },
  ESCALATION: {
    group: 'ESCALATION',
    displayName: 'এস্কেলেশন',
    icon: 'arrow-up-circle',
    color: '#e74c3c',
    types: ['escalation', 'priority_escalation', 'escalation_prevention'] as const,
    description: 'এস্কেলেশন সম্পর্কিত রুল',
  },
  CLASSIFICATION: {
    group: 'CLASSIFICATION',
    displayName: 'শ্রেণীবিভাগ',
    icon: 'folder',
    color: '#9b59b6',
    types: ['categorization', 'priority', 'tag'] as const,
    description: 'ক্যাটাগরি, প্রায়োরিটি ও ট্যাগ নির্ধারণ রুল',
  },
  COMMUNICATION: {
    group: 'COMMUNICATION',
    displayName: 'যোগাযোগ',
    icon: 'bell',
    color: '#f39c12',
    types: ['notification', 'auto_response', 'reminder', 'follow_up'] as const,
    description: 'যোগাযোগ সম্পর্কিত রুল',
  },
  DETECTION: {
    group: 'DETECTION',
    displayName: 'সনাক্তকরণ',
    icon: 'search',
    color: '#7f8c8d',
    types: ['duplicate_detection', 'suspicious_detection', 'spam_detection'] as const,
    description: 'সনাক্তকরণ সম্পর্কিত রুল',
  },
  WORKFLOW: {
    group: 'WORKFLOW',
    displayName: 'ওয়ার্কফ্লো',
    icon: 'workflow',
    color: '#2ecc71',
    types: ['automation', 'workflow', 'conditional_update', 'template_application'] as const,
    description: 'ওয়ার্কফ্লো ও অটোমেশন রুল',
  },
  CLOSURE: {
    group: 'CLOSURE',
    displayName: 'সমাপ্তি',
    icon: 'check-circle',
    color: '#27ae60',
    types: ['auto_close', 'merge'] as const,
    description: 'টিকেট সমাপ্তি সম্পর্কিত রুল',
  },
  SLA: {
    group: 'SLA',
    displayName: 'এসএলএ',
    icon: 'clock',
    color: '#c0392b',
    types: ['sla_enforcement'] as const,
    description: 'এসএলএ প্রয়োগ রুল',
  },
  SURVEY: {
    group: 'SURVEY',
    displayName: 'জরিপ',
    icon: 'smile',
    color: '#27ae60',
    types: ['satisfaction_survey'] as const,
    description: 'সন্তুষ্টি জরিপ সম্পর্কিত রুল',
  },
  PROCESSING: {
    group: 'PROCESSING',
    displayName: 'প্রক্রিয়াকরণ',
    icon: 'layers',
    color: '#34495e',
    types: ['batch_processing', 'scheduled_action'] as const,
    description: 'ব্যাচ প্রসেসিং ও নির্ধারিত অ্যাকশন রুল',
  },
  VALIDATION: {
    group: 'VALIDATION',
    displayName: 'যাচাইকরণ',
    icon: 'check-circle',
    color: '#2ecc71',
    types: ['validation'] as const,
    description: 'টিকেট ভ্যালিডেশন রুল',
  },
};

/**
 * রুল টাইপ স্ট্যাটাস
 */
export const RULE_TYPE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
} as const;

export type RuleTypeStatus = (typeof RULE_TYPE_STATUS)[keyof typeof RULE_TYPE_STATUS];
