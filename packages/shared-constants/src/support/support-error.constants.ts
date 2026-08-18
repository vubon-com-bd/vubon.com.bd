/**
 * সাপোর্ট সিস্টেমের এরর কোড ও মেসেজ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সাপোর্ট এরর কোড
 */
export const SUPPORT_ERROR_CODE = {
  // টিকেট এরর
  TICKET_NOT_FOUND: 'TICKET_NOT_FOUND',
  TICKET_ALREADY_CLOSED: 'TICKET_ALREADY_CLOSED',
  TICKET_CANNOT_REOPEN: 'TICKET_CANNOT_REOPEN',
  INVALID_TICKET_STATUS: 'INVALID_TICKET_STATUS',
  TICKET_MERGE_FAILED: 'TICKET_MERGE_FAILED',
  TICKET_SPLIT_FAILED: 'TICKET_SPLIT_FAILED',
  DUPLICATE_TICKET: 'DUPLICATE_TICKET',
  TICKET_UPDATE_FAILED: 'TICKET_UPDATE_FAILED',
  TICKET_CREATION_FAILED: 'TICKET_CREATION_FAILED',
  TICKET_DELETION_FAILED: 'TICKET_DELETION_FAILED',

  // অ্যাসাইনমেন্ট এরর
  ASSIGNMENT_FAILED: 'ASSIGNMENT_FAILED',
  AGENT_NOT_FOUND: 'AGENT_NOT_FOUND',
  TEAM_NOT_FOUND: 'TEAM_NOT_FOUND',
  AGENT_UNAVAILABLE: 'AGENT_UNAVAILABLE',
  UNASSIGNMENT_FAILED: 'UNASSIGNMENT_FAILED',
  INVALID_ASSIGNMENT: 'INVALID_ASSIGNMENT',

  // এস্কেলেশন এরর
  ESCALATION_FAILED: 'ESCALATION_FAILED',
  INVALID_ESCALATION_LEVEL: 'INVALID_ESCALATION_LEVEL',
  ESCALATION_TIMEOUT: 'ESCALATION_TIMEOUT',
  ESCALATION_LEVEL_NOT_FOUND: 'ESCALATION_LEVEL_NOT_FOUND',

  // প্রায়োরিটি এরর
  INVALID_PRIORITY: 'INVALID_PRIORITY',
  PRIORITY_UPDATE_FAILED: 'PRIORITY_UPDATE_FAILED',

  // এসএলএ এরর
  SLA_BREACHED: 'SLA_BREACHED',
  INVALID_SLA_CONFIGURATION: 'INVALID_SLA_CONFIGURATION',
  SLA_UPDATE_FAILED: 'SLA_UPDATE_FAILED',
  SLA_NOT_FOUND: 'SLA_NOT_FOUND',

  // সার্ভে এরর
  SURVEY_EXPIRED: 'SURVEY_EXPIRED',
  SURVEY_NOT_FOUND: 'SURVEY_NOT_FOUND',
  SURVEY_ALREADY_RESPONDED: 'SURVEY_ALREADY_RESPONDED',
  SURVEY_CREATION_FAILED: 'SURVEY_CREATION_FAILED',
  SURVEY_UPDATE_FAILED: 'SURVEY_UPDATE_FAILED',

  // ফিডব্যাক এরর
  FEEDBACK_ALREADY_SUBMITTED: 'FEEDBACK_ALREADY_SUBMITTED',
  FEEDBACK_NOT_FOUND: 'FEEDBACK_NOT_FOUND',
  FEEDBACK_UPDATE_FAILED: 'FEEDBACK_UPDATE_FAILED',

  // কমপ্লেইন্ট এরর
  COMPLAINT_RESOLUTION_FAILED: 'COMPLAINT_RESOLUTION_FAILED',
  COMPLAINT_NOT_FOUND: 'COMPLAINT_NOT_FOUND',
  COMPLAINT_UPDATE_FAILED: 'COMPLAINT_UPDATE_FAILED',

  // চ্যাটবট এরর
  CHATBOT_INTENT_NOT_FOUND: 'CHATBOT_INTENT_NOT_FOUND',
  CHATBOT_ENTITY_NOT_FOUND: 'CHATBOT_ENTITY_NOT_FOUND',
  CHATBOT_RESPONSE_FAILED: 'CHATBOT_RESPONSE_FAILED',
  CHATBOT_TRAINING_FAILED: 'CHATBOT_TRAINING_FAILED',

  // নলেজ বেস এরর
  KNOWLEDGE_BASE_NOT_FOUND: 'KNOWLEDGE_BASE_NOT_FOUND',
  ARTICLE_NOT_FOUND: 'ARTICLE_NOT_FOUND',
  ARTICLE_CREATION_FAILED: 'ARTICLE_CREATION_FAILED',
  ARTICLE_UPDATE_FAILED: 'ARTICLE_UPDATE_FAILED',
  ARTICLE_DELETION_FAILED: 'ARTICLE_DELETION_FAILED',

  // FAQ এরর
  FAQ_NOT_FOUND: 'FAQ_NOT_FOUND',
  FAQ_CREATION_FAILED: 'FAQ_CREATION_FAILED',
  FAQ_UPDATE_FAILED: 'FAQ_UPDATE_FAILED',
  FAQ_DELETION_FAILED: 'FAQ_DELETION_FAILED',

  // ইমেইল এরর
  EMAIL_SEND_FAILED: 'EMAIL_SEND_FAILED',
  EMAIL_TEMPLATE_NOT_FOUND: 'EMAIL_TEMPLATE_NOT_FOUND',
  EMAIL_ATTACHMENT_FAILED: 'EMAIL_ATTACHMENT_FAILED',
  EMAIL_RATE_LIMIT_EXCEEDED: 'EMAIL_RATE_LIMIT_EXCEEDED',

  // এসএমএস এরর
  SMS_SEND_FAILED: 'SMS_SEND_FAILED',
  SMS_TEMPLATE_NOT_FOUND: 'SMS_TEMPLATE_NOT_FOUND',
  SMS_RATE_LIMIT_EXCEEDED: 'SMS_RATE_LIMIT_EXCEEDED',
  INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',

  // পুশ এরর
  PUSH_SEND_FAILED: 'PUSH_SEND_FAILED',
  PUSH_TEMPLATE_NOT_FOUND: 'PUSH_TEMPLATE_NOT_FOUND',
  PUSH_DEVICE_NOT_FOUND: 'PUSH_DEVICE_NOT_FOUND',
  PUSH_RATE_LIMIT_EXCEEDED: 'PUSH_RATE_LIMIT_EXCEEDED',

  // অটোমেশন এরর
  AUTOMATION_FAILED: 'AUTOMATION_FAILED',
  AUTOMATION_NOT_FOUND: 'AUTOMATION_NOT_FOUND',
  AUTOMATION_EXECUTION_FAILED: 'AUTOMATION_EXECUTION_FAILED',

  // রুল এরর
  RULE_EVALUATION_FAILED: 'RULE_EVALUATION_FAILED',
  RULE_NOT_FOUND: 'RULE_NOT_FOUND',
  RULE_EXECUTION_FAILED: 'RULE_EXECUTION_FAILED',

  // টেমপ্লেট এরর
  TEMPLATE_NOT_FOUND: 'TEMPLATE_NOT_FOUND',
  TEMPLATE_CREATION_FAILED: 'TEMPLATE_CREATION_FAILED',
  TEMPLATE_UPDATE_FAILED: 'TEMPLATE_UPDATE_FAILED',
  TEMPLATE_PUBLISH_FAILED: 'TEMPLATE_PUBLISH_FAILED',

  // স্ক্রিপ্ট এরর
  SCRIPT_EXECUTION_FAILED: 'SCRIPT_EXECUTION_FAILED',
  SCRIPT_NOT_FOUND: 'SCRIPT_NOT_FOUND',
  SCRIPT_VALIDATION_FAILED: 'SCRIPT_VALIDATION_FAILED',
  SCRIPT_TIMEOUT: 'SCRIPT_TIMEOUT',

  // শিডিউল এরর
  SCHEDULE_CONFLICT: 'SCHEDULE_CONFLICT',
  SCHEDULE_NOT_FOUND: 'SCHEDULE_NOT_FOUND',
  SCHEDULE_CREATION_FAILED: 'SCHEDULE_CREATION_FAILED',
  SCHEDULE_UPDATE_FAILED: 'SCHEDULE_UPDATE_FAILED',

  // অ্যানালিটিক্স এরর
  ANALYTICS_GENERATION_FAILED: 'ANALYTICS_GENERATION_FAILED',
  REPORT_GENERATION_FAILED: 'REPORT_GENERATION_FAILED',
  DATA_EXPORT_FAILED: 'DATA_EXPORT_FAILED',
  DATA_IMPORT_FAILED: 'DATA_IMPORT_FAILED',

  // সেটিংস এরর
  SETTINGS_UPDATE_FAILED: 'SETTINGS_UPDATE_FAILED',
  SETTINGS_LOAD_FAILED: 'SETTINGS_LOAD_FAILED',

  // লাইভ চ্যাট এরর
  LIVE_CHAT_SESSION_EXPIRED: 'LIVE_CHAT_SESSION_EXPIRED',
  LIVE_CHAT_NOT_FOUND: 'LIVE_CHAT_NOT_FOUND',
  LIVE_CHAT_TRANSFER_FAILED: 'LIVE_CHAT_TRANSFER_FAILED',

  // মেসেজ এরর
  MESSAGE_SEND_FAILED: 'MESSAGE_SEND_FAILED',
  MESSAGE_NOT_FOUND: 'MESSAGE_NOT_FOUND',

  // অ্যাটাচমেন্ট এরর
  ATTACHMENT_UPLOAD_FAILED: 'ATTACHMENT_UPLOAD_FAILED',
  ATTACHMENT_SIZE_EXCEEDED: 'ATTACHMENT_SIZE_EXCEEDED',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  ATTACHMENT_NOT_FOUND: 'ATTACHMENT_NOT_FOUND',

  // ডেটাবেস এরর
  DATABASE_ERROR: 'DATABASE_ERROR',
  CONNECTION_ERROR: 'CONNECTION_ERROR',
  QUERY_ERROR: 'QUERY_ERROR',

  // এক্সটার্নাল সার্ভিস এরর
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  INTEGRATION_ERROR: 'INTEGRATION_ERROR',
  WEBHOOK_FAILED: 'WEBHOOK_FAILED',

  // কনফিগারেশন এরর
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',
  MISSING_CONFIGURATION: 'MISSING_CONFIGURATION',

  // ভ্যালিডেশন এরর
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_LENGTH: 'INVALID_LENGTH',

  // অথেন্টিকেশন এরর
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',

  // রেট লিমিট এরর
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  DAILY_LIMIT_EXCEEDED: 'DAILY_LIMIT_EXCEEDED',

  // টাইমআউট এরর
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  OPERATION_TIMEOUT: 'OPERATION_TIMEOUT',

  // সিস্টেম এরর
  SYSTEM_ERROR: 'SYSTEM_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
} as const;

/**
 * সাপোর্ট এরর ক্যাটাগরি
 */
export const SUPPORT_ERROR_CATEGORIES = {
  TICKET: [
    'TICKET_NOT_FOUND',
    'TICKET_ALREADY_CLOSED',
    'TICKET_CANNOT_REOPEN',
    'INVALID_TICKET_STATUS',
    'TICKET_MERGE_FAILED',
    'TICKET_SPLIT_FAILED',
    'DUPLICATE_TICKET',
    'TICKET_UPDATE_FAILED',
    'TICKET_CREATION_FAILED',
    'TICKET_DELETION_FAILED',
  ],
  ASSIGNMENT: [
    'ASSIGNMENT_FAILED',
    'AGENT_NOT_FOUND',
    'TEAM_NOT_FOUND',
    'AGENT_UNAVAILABLE',
    'UNASSIGNMENT_FAILED',
    'INVALID_ASSIGNMENT',
  ],
  ESCALATION: [
    'ESCALATION_FAILED',
    'INVALID_ESCALATION_LEVEL',
    'ESCALATION_TIMEOUT',
    'ESCALATION_LEVEL_NOT_FOUND',
  ],
  PRIORITY: ['INVALID_PRIORITY', 'PRIORITY_UPDATE_FAILED'],
  SLA: ['SLA_BREACHED', 'INVALID_SLA_CONFIGURATION', 'SLA_UPDATE_FAILED', 'SLA_NOT_FOUND'],
  SURVEY: [
    'SURVEY_EXPIRED',
    'SURVEY_NOT_FOUND',
    'SURVEY_ALREADY_RESPONDED',
    'SURVEY_CREATION_FAILED',
    'SURVEY_UPDATE_FAILED',
  ],
  FEEDBACK: ['FEEDBACK_ALREADY_SUBMITTED', 'FEEDBACK_NOT_FOUND', 'FEEDBACK_UPDATE_FAILED'],
  COMPLAINT: ['COMPLAINT_RESOLUTION_FAILED', 'COMPLAINT_NOT_FOUND', 'COMPLAINT_UPDATE_FAILED'],
  CHATBOT: [
    'CHATBOT_INTENT_NOT_FOUND',
    'CHATBOT_ENTITY_NOT_FOUND',
    'CHATBOT_RESPONSE_FAILED',
    'CHATBOT_TRAINING_FAILED',
  ],
  KNOWLEDGE_BASE: [
    'KNOWLEDGE_BASE_NOT_FOUND',
    'ARTICLE_NOT_FOUND',
    'ARTICLE_CREATION_FAILED',
    'ARTICLE_UPDATE_FAILED',
    'ARTICLE_DELETION_FAILED',
  ],
  FAQ: ['FAQ_NOT_FOUND', 'FAQ_CREATION_FAILED', 'FAQ_UPDATE_FAILED', 'FAQ_DELETION_FAILED'],
  EMAIL: [
    'EMAIL_SEND_FAILED',
    'EMAIL_TEMPLATE_NOT_FOUND',
    'EMAIL_ATTACHMENT_FAILED',
    'EMAIL_RATE_LIMIT_EXCEEDED',
  ],
  SMS: [
    'SMS_SEND_FAILED',
    'SMS_TEMPLATE_NOT_FOUND',
    'SMS_RATE_LIMIT_EXCEEDED',
    'INVALID_PHONE_NUMBER',
  ],
  PUSH: [
    'PUSH_SEND_FAILED',
    'PUSH_TEMPLATE_NOT_FOUND',
    'PUSH_DEVICE_NOT_FOUND',
    'PUSH_RATE_LIMIT_EXCEEDED',
  ],
  AUTOMATION: ['AUTOMATION_FAILED', 'AUTOMATION_NOT_FOUND', 'AUTOMATION_EXECUTION_FAILED'],
  RULE: ['RULE_EVALUATION_FAILED', 'RULE_NOT_FOUND', 'RULE_EXECUTION_FAILED'],
  TEMPLATE: [
    'TEMPLATE_NOT_FOUND',
    'TEMPLATE_CREATION_FAILED',
    'TEMPLATE_UPDATE_FAILED',
    'TEMPLATE_PUBLISH_FAILED',
  ],
  SCRIPT: [
    'SCRIPT_EXECUTION_FAILED',
    'SCRIPT_NOT_FOUND',
    'SCRIPT_VALIDATION_FAILED',
    'SCRIPT_TIMEOUT',
  ],
  SCHEDULE: [
    'SCHEDULE_CONFLICT',
    'SCHEDULE_NOT_FOUND',
    'SCHEDULE_CREATION_FAILED',
    'SCHEDULE_UPDATE_FAILED',
  ],
  ANALYTICS: [
    'ANALYTICS_GENERATION_FAILED',
    'REPORT_GENERATION_FAILED',
    'DATA_EXPORT_FAILED',
    'DATA_IMPORT_FAILED',
  ],
  SETTINGS: ['SETTINGS_UPDATE_FAILED', 'SETTINGS_LOAD_FAILED'],
  LIVE_CHAT: ['LIVE_CHAT_SESSION_EXPIRED', 'LIVE_CHAT_NOT_FOUND', 'LIVE_CHAT_TRANSFER_FAILED'],
  MESSAGE: ['MESSAGE_SEND_FAILED', 'MESSAGE_NOT_FOUND'],
  ATTACHMENT: [
    'ATTACHMENT_UPLOAD_FAILED',
    'ATTACHMENT_SIZE_EXCEEDED',
    'INVALID_FILE_TYPE',
    'ATTACHMENT_NOT_FOUND',
  ],
  DATABASE: ['DATABASE_ERROR', 'CONNECTION_ERROR', 'QUERY_ERROR'],
  EXTERNAL: ['EXTERNAL_SERVICE_ERROR', 'INTEGRATION_ERROR', 'WEBHOOK_FAILED'],
  CONFIGURATION: ['CONFIGURATION_ERROR', 'MISSING_CONFIGURATION'],
  VALIDATION: [
    'VALIDATION_ERROR',
    'INVALID_INPUT',
    'MISSING_REQUIRED_FIELD',
    'INVALID_FORMAT',
    'INVALID_LENGTH',
  ],
  AUTHENTICATION: [
    'AUTHENTICATION_ERROR',
    'AUTHORIZATION_ERROR',
    'PERMISSION_DENIED',
    'INVALID_TOKEN',
    'TOKEN_EXPIRED',
    'INVALID_CREDENTIALS',
  ],
  RATE_LIMIT: ['RATE_LIMIT_EXCEEDED', 'DAILY_LIMIT_EXCEEDED'],
  TIMEOUT: ['TIMEOUT_ERROR', 'OPERATION_TIMEOUT'],
  SYSTEM: [
    'SYSTEM_ERROR',
    'UNKNOWN_ERROR',
    'INTERNAL_SERVER_ERROR',
    'SERVICE_UNAVAILABLE',
    'MAINTENANCE_MODE',
  ],
} as const;

/**
 * সাপোর্ট এরর সিভেরিটি
 */
export const SUPPORT_ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export type SupportErrorCode = (typeof SUPPORT_ERROR_CODE)[keyof typeof SUPPORT_ERROR_CODE];
export type SupportErrorCategory = keyof typeof SUPPORT_ERROR_CATEGORIES;
export type SupportErrorSeverity =
  (typeof SUPPORT_ERROR_SEVERITY)[keyof typeof SUPPORT_ERROR_SEVERITY];

export interface SupportErrorConfig {
  code: SupportErrorCode;
  message: string;
  description: string;
  category: SupportErrorCategory;
  severity: SupportErrorSeverity;
  httpStatus: number;
  retryable: boolean;
}

/**
 * সাপোর্ট এরর কনফিগারেশন
 */
export const SUPPORT_ERROR_CONFIGS: Record<SupportErrorCode, SupportErrorConfig> = {
  // টিকেট এরর
  [SUPPORT_ERROR_CODE.TICKET_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.TICKET_NOT_FOUND,
    message: 'টিকেট পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ টিকেট সিস্টেমে বিদ্যমান নেই',
    category: 'TICKET',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.TICKET_ALREADY_CLOSED]: {
    code: SUPPORT_ERROR_CODE.TICKET_ALREADY_CLOSED,
    message: 'টিকেট ইতিমধ্যে বন্ধ',
    description: 'টিকেটটি আগেই বন্ধ করা হয়েছে',
    category: 'TICKET',
    severity: 'low',
    httpStatus: 409,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.TICKET_CANNOT_REOPEN]: {
    code: SUPPORT_ERROR_CODE.TICKET_CANNOT_REOPEN,
    message: 'টিকেট পুনরায় খোলা সম্ভব নয়',
    description: 'টিকেটটি পুনরায় খোলার অনুমতি নেই',
    category: 'TICKET',
    severity: 'medium',
    httpStatus: 409,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.INVALID_TICKET_STATUS]: {
    code: SUPPORT_ERROR_CODE.INVALID_TICKET_STATUS,
    message: 'অবৈধ টিকেট স্ট্যাটাস',
    description: 'প্রদত্ত টিকেট স্ট্যাটাসটি বৈধ নয়',
    category: 'TICKET',
    severity: 'medium',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.TICKET_MERGE_FAILED]: {
    code: SUPPORT_ERROR_CODE.TICKET_MERGE_FAILED,
    message: 'টিকেট মার্জ ব্যর্থ',
    description: 'টিকেট মার্জ করার সময় একটি ত্রুটি ঘটেছে',
    category: 'TICKET',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.TICKET_SPLIT_FAILED]: {
    code: SUPPORT_ERROR_CODE.TICKET_SPLIT_FAILED,
    message: 'টিকেট বিভক্ত ব্যর্থ',
    description: 'টিকেট বিভক্ত করার সময় একটি ত্রুটি ঘটেছে',
    category: 'TICKET',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.DUPLICATE_TICKET]: {
    code: SUPPORT_ERROR_CODE.DUPLICATE_TICKET,
    message: 'ডুপ্লিকেট টিকেট',
    description: 'একই বিষয়ে একটি টিকেট ইতিমধ্যে বিদ্যমান',
    category: 'TICKET',
    severity: 'low',
    httpStatus: 409,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.TICKET_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.TICKET_UPDATE_FAILED,
    message: 'টিকেট আপডেট ব্যর্থ',
    description: 'টিকেট আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'TICKET',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.TICKET_CREATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.TICKET_CREATION_FAILED,
    message: 'টিকেট তৈরি ব্যর্থ',
    description: 'নতুন টিকেট তৈরি করার সময় একটি ত্রুটি ঘটেছে',
    category: 'TICKET',
    severity: 'critical',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.TICKET_DELETION_FAILED]: {
    code: SUPPORT_ERROR_CODE.TICKET_DELETION_FAILED,
    message: 'টিকেট মুছে ফেলা ব্যর্থ',
    description: 'টিকেট মুছে ফেলার সময় একটি ত্রুটি ঘটেছে',
    category: 'TICKET',
    severity: 'medium',
    httpStatus: 500,
    retryable: false,
  },

  // অ্যাসাইনমেন্ট এরর
  [SUPPORT_ERROR_CODE.ASSIGNMENT_FAILED]: {
    code: SUPPORT_ERROR_CODE.ASSIGNMENT_FAILED,
    message: 'অ্যাসাইনমেন্ট ব্যর্থ',
    description: 'টিকেট অ্যাসাইন করার সময় একটি ত্রুটি ঘটেছে',
    category: 'ASSIGNMENT',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.AGENT_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.AGENT_NOT_FOUND,
    message: 'এজেন্ট পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ এজেন্ট বিদ্যমান নেই',
    category: 'ASSIGNMENT',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.TEAM_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.TEAM_NOT_FOUND,
    message: 'টিম পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ টিম বিদ্যমান নেই',
    category: 'ASSIGNMENT',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.AGENT_UNAVAILABLE]: {
    code: SUPPORT_ERROR_CODE.AGENT_UNAVAILABLE,
    message: 'এজেন্ট উপলব্ধ নয়',
    description: 'এজেন্ট বর্তমানে উপলব্ধ নয়',
    category: 'ASSIGNMENT',
    severity: 'medium',
    httpStatus: 503,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.UNASSIGNMENT_FAILED]: {
    code: SUPPORT_ERROR_CODE.UNASSIGNMENT_FAILED,
    message: 'আনঅ্যাসাইনমেন্ট ব্যর্থ',
    description: 'টিকেট আনঅ্যাসাইন করার সময় একটি ত্রুটি ঘটেছে',
    category: 'ASSIGNMENT',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.INVALID_ASSIGNMENT]: {
    code: SUPPORT_ERROR_CODE.INVALID_ASSIGNMENT,
    message: 'অবৈধ অ্যাসাইনমেন্ট',
    description: 'প্রদত্ত অ্যাসাইনমেন্টটি বৈধ নয়',
    category: 'ASSIGNMENT',
    severity: 'medium',
    httpStatus: 400,
    retryable: false,
  },

  // এস্কেলেশন এরর
  [SUPPORT_ERROR_CODE.ESCALATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.ESCALATION_FAILED,
    message: 'এস্কেলেশন ব্যর্থ',
    description: 'টিকেট এস্কেলেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'ESCALATION',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.INVALID_ESCALATION_LEVEL]: {
    code: SUPPORT_ERROR_CODE.INVALID_ESCALATION_LEVEL,
    message: 'অবৈধ এস্কেলেশন লেভেল',
    description: 'প্রদত্ত এস্কেলেশন লেভেলটি বৈধ নয়',
    category: 'ESCALATION',
    severity: 'medium',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.ESCALATION_TIMEOUT]: {
    code: SUPPORT_ERROR_CODE.ESCALATION_TIMEOUT,
    message: 'এস্কেলেশন টাইমআউট',
    description: 'এস্কেলেশন প্রক্রিয়ার সময়সীমা অতিক্রম করেছে',
    category: 'ESCALATION',
    severity: 'medium',
    httpStatus: 408,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.ESCALATION_LEVEL_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.ESCALATION_LEVEL_NOT_FOUND,
    message: 'এস্কেলেশন লেভেল পাওয়া যায়নি',
    description: 'নির্দিষ্ট এস্কেলেশন লেভেল বিদ্যমান নেই',
    category: 'ESCALATION',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },

  // প্রায়োরিটি এরর
  [SUPPORT_ERROR_CODE.INVALID_PRIORITY]: {
    code: SUPPORT_ERROR_CODE.INVALID_PRIORITY,
    message: 'অবৈধ প্রায়োরিটি',
    description: 'প্রদত্ত প্রায়োরিটি মানটি বৈধ নয়',
    category: 'PRIORITY',
    severity: 'low',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.PRIORITY_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.PRIORITY_UPDATE_FAILED,
    message: 'প্রায়োরিটি আপডেট ব্যর্থ',
    description: 'প্রায়োরিটি আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'PRIORITY',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },

  // এসএলএ এরর
  [SUPPORT_ERROR_CODE.SLA_BREACHED]: {
    code: SUPPORT_ERROR_CODE.SLA_BREACHED,
    message: 'এসএলএ লঙ্ঘন',
    description: 'টিকেটের এসএলএ সময়সীমা লঙ্ঘন হয়েছে',
    category: 'SLA',
    severity: 'critical',
    httpStatus: 409,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.INVALID_SLA_CONFIGURATION]: {
    code: SUPPORT_ERROR_CODE.INVALID_SLA_CONFIGURATION,
    message: 'অবৈধ এসএলএ কনফিগারেশন',
    description: 'এসএলএ কনফিগারেশনটি বৈধ নয়',
    category: 'SLA',
    severity: 'high',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SLA_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.SLA_UPDATE_FAILED,
    message: 'এসএলএ আপডেট ব্যর্থ',
    description: 'এসএলএ আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SLA',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.SLA_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.SLA_NOT_FOUND,
    message: 'এসএলএ পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ এসএলএ বিদ্যমান নেই',
    category: 'SLA',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },

  // সার্ভে এরর
  [SUPPORT_ERROR_CODE.SURVEY_EXPIRED]: {
    code: SUPPORT_ERROR_CODE.SURVEY_EXPIRED,
    message: 'জরিপের মেয়াদ শেষ',
    description: 'জরিপটি ইতিমধ্যে মেয়াদোত্তীর্ণ হয়েছে',
    category: 'SURVEY',
    severity: 'low',
    httpStatus: 410,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SURVEY_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.SURVEY_NOT_FOUND,
    message: 'জরিপ পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ জরিপ বিদ্যমান নেই',
    category: 'SURVEY',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SURVEY_ALREADY_RESPONDED]: {
    code: SUPPORT_ERROR_CODE.SURVEY_ALREADY_RESPONDED,
    message: 'জরিপে ইতিমধ্যে উত্তর দেওয়া হয়েছে',
    description: 'এই জরিপে ইতিমধ্যে একটি প্রতিক্রিয়া দেওয়া হয়েছে',
    category: 'SURVEY',
    severity: 'low',
    httpStatus: 409,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SURVEY_CREATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.SURVEY_CREATION_FAILED,
    message: 'জরিপ তৈরি ব্যর্থ',
    description: 'নতুন জরিপ তৈরি করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SURVEY',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.SURVEY_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.SURVEY_UPDATE_FAILED,
    message: 'জরিপ আপডেট ব্যর্থ',
    description: 'জরিপ আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SURVEY',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },

  // ফিডব্যাক এরর
  [SUPPORT_ERROR_CODE.FEEDBACK_ALREADY_SUBMITTED]: {
    code: SUPPORT_ERROR_CODE.FEEDBACK_ALREADY_SUBMITTED,
    message: 'ফিডব্যাক ইতিমধ্যে জমা দেওয়া হয়েছে',
    description: 'এই টিকেটের জন্য ইতিমধ্যে ফিডব্যাক জমা দেওয়া হয়েছে',
    category: 'FEEDBACK',
    severity: 'low',
    httpStatus: 409,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.FEEDBACK_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.FEEDBACK_NOT_FOUND,
    message: 'ফিডব্যাক পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ ফিডব্যাক বিদ্যমান নেই',
    category: 'FEEDBACK',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.FEEDBACK_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.FEEDBACK_UPDATE_FAILED,
    message: 'ফিডব্যাক আপডেট ব্যর্থ',
    description: 'ফিডব্যাক আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'FEEDBACK',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },

  // কমপ্লেইন্ট এরর
  [SUPPORT_ERROR_CODE.COMPLAINT_RESOLUTION_FAILED]: {
    code: SUPPORT_ERROR_CODE.COMPLAINT_RESOLUTION_FAILED,
    message: 'অভিযোগ সমাধান ব্যর্থ',
    description: 'অভিযোগ সমাধান করার সময় একটি ত্রুটি ঘটেছে',
    category: 'COMPLAINT',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.COMPLAINT_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.COMPLAINT_NOT_FOUND,
    message: 'অভিযোগ পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ অভিযোগ বিদ্যমান নেই',
    category: 'COMPLAINT',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.COMPLAINT_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.COMPLAINT_UPDATE_FAILED,
    message: 'অভিযোগ আপডেট ব্যর্থ',
    description: 'অভিযোগ আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'COMPLAINT',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },

  // চ্যাটবট এরর
  [SUPPORT_ERROR_CODE.CHATBOT_INTENT_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.CHATBOT_INTENT_NOT_FOUND,
    message: 'চ্যাটবট ইনটেন্ট পাওয়া যায়নি',
    description: 'নির্দিষ্ট ইনটেন্ট চ্যাটবট সিস্টেমে বিদ্যমান নেই',
    category: 'CHATBOT',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.CHATBOT_ENTITY_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.CHATBOT_ENTITY_NOT_FOUND,
    message: 'চ্যাটবট এন্টিটি পাওয়া যায়নি',
    description: 'নির্দিষ্ট এন্টিটি চ্যাটবট সিস্টেমে বিদ্যমান নেই',
    category: 'CHATBOT',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.CHATBOT_RESPONSE_FAILED]: {
    code: SUPPORT_ERROR_CODE.CHATBOT_RESPONSE_FAILED,
    message: 'চ্যাটবট রেসপন্স ব্যর্থ',
    description: 'চ্যাটবট থেকে প্রতিক্রিয়া তৈরি করতে ব্যর্থ হয়েছে',
    category: 'CHATBOT',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.CHATBOT_TRAINING_FAILED]: {
    code: SUPPORT_ERROR_CODE.CHATBOT_TRAINING_FAILED,
    message: 'চ্যাটবট প্রশিক্ষণ ব্যর্থ',
    description: 'চ্যাটবট প্রশিক্ষণ প্রক্রিয়া ব্যর্থ হয়েছে',
    category: 'CHATBOT',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },

  // নলেজ বেস এরর
  [SUPPORT_ERROR_CODE.KNOWLEDGE_BASE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.KNOWLEDGE_BASE_NOT_FOUND,
    message: 'নলেজ বেস পাওয়া যায়নি',
    description: 'নির্দিষ্ট নলেজ বেস বিদ্যমান নেই',
    category: 'KNOWLEDGE_BASE',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.ARTICLE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.ARTICLE_NOT_FOUND,
    message: 'আর্টিকেল পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ আর্টিকেল বিদ্যমান নেই',
    category: 'KNOWLEDGE_BASE',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.ARTICLE_CREATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.ARTICLE_CREATION_FAILED,
    message: 'আর্টিকেল তৈরি ব্যর্থ',
    description: 'নতুন আর্টিকেল তৈরি করার সময় একটি ত্রুটি ঘটেছে',
    category: 'KNOWLEDGE_BASE',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.ARTICLE_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.ARTICLE_UPDATE_FAILED,
    message: 'আর্টিকেল আপডেট ব্যর্থ',
    description: 'আর্টিকেল আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'KNOWLEDGE_BASE',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.ARTICLE_DELETION_FAILED]: {
    code: SUPPORT_ERROR_CODE.ARTICLE_DELETION_FAILED,
    message: 'আর্টিকেল মুছে ফেলা ব্যর্থ',
    description: 'আর্টিকেল মুছে ফেলার সময় একটি ত্রুটি ঘটেছে',
    category: 'KNOWLEDGE_BASE',
    severity: 'medium',
    httpStatus: 500,
    retryable: false,
  },

  // FAQ এরর
  [SUPPORT_ERROR_CODE.FAQ_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.FAQ_NOT_FOUND,
    message: 'এফএকিউ পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ FAQ বিদ্যমান নেই',
    category: 'FAQ',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.FAQ_CREATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.FAQ_CREATION_FAILED,
    message: 'এফএকিউ তৈরি ব্যর্থ',
    description: 'নতুন FAQ তৈরি করার সময় একটি ত্রুটি ঘটেছে',
    category: 'FAQ',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.FAQ_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.FAQ_UPDATE_FAILED,
    message: 'এফএকিউ আপডেট ব্যর্থ',
    description: 'FAQ আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'FAQ',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.FAQ_DELETION_FAILED]: {
    code: SUPPORT_ERROR_CODE.FAQ_DELETION_FAILED,
    message: 'এফএকিউ মুছে ফেলা ব্যর্থ',
    description: 'FAQ মুছে ফেলার সময় একটি ত্রুটি ঘটেছে',
    category: 'FAQ',
    severity: 'medium',
    httpStatus: 500,
    retryable: false,
  },

  // ইমেইল এরর
  [SUPPORT_ERROR_CODE.EMAIL_SEND_FAILED]: {
    code: SUPPORT_ERROR_CODE.EMAIL_SEND_FAILED,
    message: 'ইমেইল প্রেরণ ব্যর্থ',
    description: 'ইমেইল প্রেরণ করার সময় একটি ত্রুটি ঘটেছে',
    category: 'EMAIL',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.EMAIL_TEMPLATE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.EMAIL_TEMPLATE_NOT_FOUND,
    message: 'ইমেইল টেমপ্লেট পাওয়া যায়নি',
    description: 'নির্দিষ্ট ইমেইল টেমপ্লেট বিদ্যমান নেই',
    category: 'EMAIL',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.EMAIL_ATTACHMENT_FAILED]: {
    code: SUPPORT_ERROR_CODE.EMAIL_ATTACHMENT_FAILED,
    message: 'ইমেইল অ্যাটাচমেন্ট ব্যর্থ',
    description: 'ইমেইলে অ্যাটাচমেন্ট যোগ করার সময় একটি ত্রুটি ঘটেছে',
    category: 'EMAIL',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.EMAIL_RATE_LIMIT_EXCEEDED]: {
    code: SUPPORT_ERROR_CODE.EMAIL_RATE_LIMIT_EXCEEDED,
    message: 'ইমেইল রেট লিমিট অতিক্রম',
    description: 'ইমেইল প্রেরণের রেট লিমিট অতিক্রম করা হয়েছে',
    category: 'EMAIL',
    severity: 'low',
    httpStatus: 429,
    retryable: true,
  },

  // এসএমএস এরর
  [SUPPORT_ERROR_CODE.SMS_SEND_FAILED]: {
    code: SUPPORT_ERROR_CODE.SMS_SEND_FAILED,
    message: 'এসএমএস প্রেরণ ব্যর্থ',
    description: 'এসএমএস প্রেরণ করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SMS',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.SMS_TEMPLATE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.SMS_TEMPLATE_NOT_FOUND,
    message: 'এসএমএস টেমপ্লেট পাওয়া যায়নি',
    description: 'নির্দিষ্ট এসএমএস টেমপ্লেট বিদ্যমান নেই',
    category: 'SMS',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SMS_RATE_LIMIT_EXCEEDED]: {
    code: SUPPORT_ERROR_CODE.SMS_RATE_LIMIT_EXCEEDED,
    message: 'এসএমএস রেট লিমিট অতিক্রম',
    description: 'এসএমএস প্রেরণের রেট লিমিট অতিক্রম করা হয়েছে',
    category: 'SMS',
    severity: 'low',
    httpStatus: 429,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.INVALID_PHONE_NUMBER]: {
    code: SUPPORT_ERROR_CODE.INVALID_PHONE_NUMBER,
    message: 'অবৈধ ফোন নম্বর',
    description: 'প্রদত্ত ফোন নম্বরটি বৈধ নয়',
    category: 'SMS',
    severity: 'medium',
    httpStatus: 400,
    retryable: false,
  },

  // পুশ এরর
  [SUPPORT_ERROR_CODE.PUSH_SEND_FAILED]: {
    code: SUPPORT_ERROR_CODE.PUSH_SEND_FAILED,
    message: 'পুশ প্রেরণ ব্যর্থ',
    description: 'পুশ নোটিফিকেশন প্রেরণ করার সময় একটি ত্রুটি ঘটেছে',
    category: 'PUSH',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.PUSH_TEMPLATE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.PUSH_TEMPLATE_NOT_FOUND,
    message: 'পুশ টেমপ্লেট পাওয়া যায়নি',
    description: 'নির্দিষ্ট পুশ টেমপ্লেট বিদ্যমান নেই',
    category: 'PUSH',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.PUSH_DEVICE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.PUSH_DEVICE_NOT_FOUND,
    message: 'পুশ ডিভাইস পাওয়া যায়নি',
    description: 'নির্দিষ্ট ডিভাইস নিবন্ধিত নেই',
    category: 'PUSH',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.PUSH_RATE_LIMIT_EXCEEDED]: {
    code: SUPPORT_ERROR_CODE.PUSH_RATE_LIMIT_EXCEEDED,
    message: 'পুশ রেট লিমিট অতিক্রম',
    description: 'পুশ নোটিফিকেশন প্রেরণের রেট লিমিট অতিক্রম করা হয়েছে',
    category: 'PUSH',
    severity: 'low',
    httpStatus: 429,
    retryable: true,
  },

  // অটোমেশন এরর
  [SUPPORT_ERROR_CODE.AUTOMATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.AUTOMATION_FAILED,
    message: 'অটোমেশন ব্যর্থ',
    description: 'অটোমেশন প্রক্রিয়া চলাকালীন একটি ত্রুটি ঘটেছে',
    category: 'AUTOMATION',
    severity: 'critical',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.AUTOMATION_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.AUTOMATION_NOT_FOUND,
    message: 'অটোমেশন পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ অটোমেশন বিদ্যমান নেই',
    category: 'AUTOMATION',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.AUTOMATION_EXECUTION_FAILED]: {
    code: SUPPORT_ERROR_CODE.AUTOMATION_EXECUTION_FAILED,
    message: 'অটোমেশন এক্সিকিউশন ব্যর্থ',
    description: 'অটোমেশন এক্সিকিউট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'AUTOMATION',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },

  // রুল এরর
  [SUPPORT_ERROR_CODE.RULE_EVALUATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.RULE_EVALUATION_FAILED,
    message: 'রুল ইভ্যালুয়েশন ব্যর্থ',
    description: 'রুল শর্ত মূল্যায়ন করার সময় একটি ত্রুটি ঘটেছে',
    category: 'RULE',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.RULE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.RULE_NOT_FOUND,
    message: 'রুল পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ রুল বিদ্যমান নেই',
    category: 'RULE',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.RULE_EXECUTION_FAILED]: {
    code: SUPPORT_ERROR_CODE.RULE_EXECUTION_FAILED,
    message: 'রুল এক্সিকিউশন ব্যর্থ',
    description: 'রুল এক্সিকিউট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'RULE',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },

  // টেমপ্লেট এরর
  [SUPPORT_ERROR_CODE.TEMPLATE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.TEMPLATE_NOT_FOUND,
    message: 'টেমপ্লেট পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ টেমপ্লেট বিদ্যমান নেই',
    category: 'TEMPLATE',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.TEMPLATE_CREATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.TEMPLATE_CREATION_FAILED,
    message: 'টেমপ্লেট তৈরি ব্যর্থ',
    description: 'নতুন টেমপ্লেট তৈরি করার সময় একটি ত্রুটি ঘটেছে',
    category: 'TEMPLATE',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.TEMPLATE_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.TEMPLATE_UPDATE_FAILED,
    message: 'টেমপ্লেট আপডেট ব্যর্থ',
    description: 'টেমপ্লেট আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'TEMPLATE',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.TEMPLATE_PUBLISH_FAILED]: {
    code: SUPPORT_ERROR_CODE.TEMPLATE_PUBLISH_FAILED,
    message: 'টেমপ্লেট প্রকাশ ব্যর্থ',
    description: 'টেমপ্লেট প্রকাশ করার সময় একটি ত্রুটি ঘটেছে',
    category: 'TEMPLATE',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },

  // স্ক্রিপ্ট এরর
  [SUPPORT_ERROR_CODE.SCRIPT_EXECUTION_FAILED]: {
    code: SUPPORT_ERROR_CODE.SCRIPT_EXECUTION_FAILED,
    message: 'স্ক্রিপ্ট এক্সিকিউশন ব্যর্থ',
    description: 'স্ক্রিপ্ট এক্সিকিউট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SCRIPT',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.SCRIPT_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.SCRIPT_NOT_FOUND,
    message: 'স্ক্রিপ্ট পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ স্ক্রিপ্ট বিদ্যমান নেই',
    category: 'SCRIPT',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SCRIPT_VALIDATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.SCRIPT_VALIDATION_FAILED,
    message: 'স্ক্রিপ্ট ভ্যালিডেশন ব্যর্থ',
    description: 'স্ক্রিপ্ট যাচাই করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SCRIPT',
    severity: 'medium',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SCRIPT_TIMEOUT]: {
    code: SUPPORT_ERROR_CODE.SCRIPT_TIMEOUT,
    message: 'স্ক্রিপ্ট টাইমআউট',
    description: 'স্ক্রিপ্ট এক্সিকিউশনের সময়সীমা অতিক্রম করেছে',
    category: 'SCRIPT',
    severity: 'high',
    httpStatus: 408,
    retryable: true,
  },

  // শিডিউল এরর
  [SUPPORT_ERROR_CODE.SCHEDULE_CONFLICT]: {
    code: SUPPORT_ERROR_CODE.SCHEDULE_CONFLICT,
    message: 'শিডিউল কনফ্লিক্ট',
    description: 'শিডিউল তৈরি করার সময় সময়ের দ্বন্দ্ব সৃষ্টি হয়েছে',
    category: 'SCHEDULE',
    severity: 'medium',
    httpStatus: 409,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SCHEDULE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.SCHEDULE_NOT_FOUND,
    message: 'শিডিউল পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ শিডিউল বিদ্যমান নেই',
    category: 'SCHEDULE',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.SCHEDULE_CREATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.SCHEDULE_CREATION_FAILED,
    message: 'শিডিউল তৈরি ব্যর্থ',
    description: 'নতুন শিডিউল তৈরি করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SCHEDULE',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.SCHEDULE_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.SCHEDULE_UPDATE_FAILED,
    message: 'শিডিউল আপডেট ব্যর্থ',
    description: 'শিডিউল আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SCHEDULE',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },

  // অ্যানালিটিক্স এরর
  [SUPPORT_ERROR_CODE.ANALYTICS_GENERATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.ANALYTICS_GENERATION_FAILED,
    message: 'অ্যানালিটিক্স তৈরি ব্যর্থ',
    description: 'অ্যানালিটিক্স তৈরি করার সময় একটি ত্রুটি ঘটেছে',
    category: 'ANALYTICS',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.REPORT_GENERATION_FAILED]: {
    code: SUPPORT_ERROR_CODE.REPORT_GENERATION_FAILED,
    message: 'রিপোর্ট তৈরি ব্যর্থ',
    description: 'রিপোর্ট তৈরি করার সময় একটি ত্রুটি ঘটেছে',
    category: 'ANALYTICS',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.DATA_EXPORT_FAILED]: {
    code: SUPPORT_ERROR_CODE.DATA_EXPORT_FAILED,
    message: 'ডেটা এক্সপোর্ট ব্যর্থ',
    description: 'ডেটা এক্সপোর্ট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'ANALYTICS',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.DATA_IMPORT_FAILED]: {
    code: SUPPORT_ERROR_CODE.DATA_IMPORT_FAILED,
    message: 'ডেটা ইমপোর্ট ব্যর্থ',
    description: 'ডেটা ইমপোর্ট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'ANALYTICS',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },

  // সেটিংস এরর
  [SUPPORT_ERROR_CODE.SETTINGS_UPDATE_FAILED]: {
    code: SUPPORT_ERROR_CODE.SETTINGS_UPDATE_FAILED,
    message: 'সেটিংস আপডেট ব্যর্থ',
    description: 'সেটিংস আপডেট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SETTINGS',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.SETTINGS_LOAD_FAILED]: {
    code: SUPPORT_ERROR_CODE.SETTINGS_LOAD_FAILED,
    message: 'সেটিংস লোড ব্যর্থ',
    description: 'সেটিংস লোড করার সময় একটি ত্রুটি ঘটেছে',
    category: 'SETTINGS',
    severity: 'critical',
    httpStatus: 500,
    retryable: true,
  },

  // লাইভ চ্যাট এরর
  [SUPPORT_ERROR_CODE.LIVE_CHAT_SESSION_EXPIRED]: {
    code: SUPPORT_ERROR_CODE.LIVE_CHAT_SESSION_EXPIRED,
    message: 'লাইভ চ্যাট সেশন মেয়াদোত্তীর্ণ',
    description: 'লাইভ চ্যাট সেশনের সময়সীমা শেষ হয়েছে',
    category: 'LIVE_CHAT',
    severity: 'medium',
    httpStatus: 410,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.LIVE_CHAT_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.LIVE_CHAT_NOT_FOUND,
    message: 'লাইভ চ্যাট পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ লাইভ চ্যাট বিদ্যমান নেই',
    category: 'LIVE_CHAT',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.LIVE_CHAT_TRANSFER_FAILED]: {
    code: SUPPORT_ERROR_CODE.LIVE_CHAT_TRANSFER_FAILED,
    message: 'লাইভ চ্যাট ট্রান্সফার ব্যর্থ',
    description: 'চ্যাট অন্য এজেন্টে ট্রান্সফার করার সময় একটি ত্রুটি ঘটেছে',
    category: 'LIVE_CHAT',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },

  // মেসেজ এরর
  [SUPPORT_ERROR_CODE.MESSAGE_SEND_FAILED]: {
    code: SUPPORT_ERROR_CODE.MESSAGE_SEND_FAILED,
    message: 'মেসেজ প্রেরণ ব্যর্থ',
    description: 'মেসেজ প্রেরণ করার সময় একটি ত্রুটি ঘটেছে',
    category: 'MESSAGE',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.MESSAGE_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.MESSAGE_NOT_FOUND,
    message: 'মেসেজ পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ মেসেজ বিদ্যমান নেই',
    category: 'MESSAGE',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },

  // অ্যাটাচমেন্ট এরর
  [SUPPORT_ERROR_CODE.ATTACHMENT_UPLOAD_FAILED]: {
    code: SUPPORT_ERROR_CODE.ATTACHMENT_UPLOAD_FAILED,
    message: 'অ্যাটাচমেন্ট আপলোড ব্যর্থ',
    description: 'অ্যাটাচমেন্ট আপলোড করার সময় একটি ত্রুটি ঘটেছে',
    category: 'ATTACHMENT',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.ATTACHMENT_SIZE_EXCEEDED]: {
    code: SUPPORT_ERROR_CODE.ATTACHMENT_SIZE_EXCEEDED,
    message: 'অ্যাটাচমেন্ট সাইজ সীমা অতিক্রম',
    description: 'অ্যাটাচমেন্ট ফাইলের আকার অনুমোদিত সীমা অতিক্রম করেছে',
    category: 'ATTACHMENT',
    severity: 'low',
    httpStatus: 413,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.INVALID_FILE_TYPE]: {
    code: SUPPORT_ERROR_CODE.INVALID_FILE_TYPE,
    message: 'অবৈধ ফাইল টাইপ',
    description: 'আপলোড করা ফাইলের টাইপ অনুমোদিত নয়',
    category: 'ATTACHMENT',
    severity: 'low',
    httpStatus: 415,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.ATTACHMENT_NOT_FOUND]: {
    code: SUPPORT_ERROR_CODE.ATTACHMENT_NOT_FOUND,
    message: 'অ্যাটাচমেন্ট পাওয়া যায়নি',
    description: 'নির্দিষ্ট আইডি সহ অ্যাটাচমেন্ট বিদ্যমান নেই',
    category: 'ATTACHMENT',
    severity: 'medium',
    httpStatus: 404,
    retryable: false,
  },

  // ডেটাবেস এরর
  [SUPPORT_ERROR_CODE.DATABASE_ERROR]: {
    code: SUPPORT_ERROR_CODE.DATABASE_ERROR,
    message: 'ডেটাবেস ত্রুটি',
    description: 'ডেটাবেস অপারেশন চলাকালীন একটি ত্রুটি ঘটেছে',
    category: 'DATABASE',
    severity: 'critical',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.CONNECTION_ERROR]: {
    code: SUPPORT_ERROR_CODE.CONNECTION_ERROR,
    message: 'সংযোগ ত্রুটি',
    description: 'ডেটাবেসের সাথে সংযোগ স্থাপন করতে ব্যর্থ হয়েছে',
    category: 'DATABASE',
    severity: 'critical',
    httpStatus: 503,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.QUERY_ERROR]: {
    code: SUPPORT_ERROR_CODE.QUERY_ERROR,
    message: 'কোয়েরি ত্রুটি',
    description: 'ডেটাবেস কোয়েরি এক্সিকিউট করার সময় একটি ত্রুটি ঘটেছে',
    category: 'DATABASE',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },

  // এক্সটার্নাল সার্ভিস এরর
  [SUPPORT_ERROR_CODE.EXTERNAL_SERVICE_ERROR]: {
    code: SUPPORT_ERROR_CODE.EXTERNAL_SERVICE_ERROR,
    message: 'বাহ্যিক সার্ভিস ত্রুটি',
    description: 'বাহ্যিক সার্ভিসের সাথে যোগাযোগ করতে ব্যর্থ হয়েছে',
    category: 'EXTERNAL',
    severity: 'high',
    httpStatus: 502,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.INTEGRATION_ERROR]: {
    code: SUPPORT_ERROR_CODE.INTEGRATION_ERROR,
    message: 'ইন্টিগ্রেশন ত্রুটি',
    description: 'ইন্টিগ্রেশনের সময় একটি ত্রুটি ঘটেছে',
    category: 'EXTERNAL',
    severity: 'high',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.WEBHOOK_FAILED]: {
    code: SUPPORT_ERROR_CODE.WEBHOOK_FAILED,
    message: 'ওয়েবহুক ব্যর্থ',
    description: 'ওয়েবহুক কল করার সময় একটি ত্রুটি ঘটেছে',
    category: 'EXTERNAL',
    severity: 'medium',
    httpStatus: 500,
    retryable: true,
  },

  // কনফিগারেশন এরর
  [SUPPORT_ERROR_CODE.CONFIGURATION_ERROR]: {
    code: SUPPORT_ERROR_CODE.CONFIGURATION_ERROR,
    message: 'কনফিগারেশন ত্রুটি',
    description: 'সিস্টেম কনফিগারেশনে একটি সমস্যা রয়েছে',
    category: 'CONFIGURATION',
    severity: 'critical',
    httpStatus: 500,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.MISSING_CONFIGURATION]: {
    code: SUPPORT_ERROR_CODE.MISSING_CONFIGURATION,
    message: 'কনফিগারেশন অনুপস্থিত',
    description: 'প্রয়োজনীয় কনফিগারেশন সেট করা নেই',
    category: 'CONFIGURATION',
    severity: 'critical',
    httpStatus: 500,
    retryable: false,
  },

  // ভ্যালিডেশন এরর
  [SUPPORT_ERROR_CODE.VALIDATION_ERROR]: {
    code: SUPPORT_ERROR_CODE.VALIDATION_ERROR,
    message: 'ভ্যালিডেশন ত্রুটি',
    description: 'ডেটা ভ্যালিডেশন চলাকালীন একটি ত্রুটি ঘটেছে',
    category: 'VALIDATION',
    severity: 'medium',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.INVALID_INPUT]: {
    code: SUPPORT_ERROR_CODE.INVALID_INPUT,
    message: 'অবৈধ ইনপুট',
    description: 'প্রদত্ত ইনপুটটি বৈধ নয়',
    category: 'VALIDATION',
    severity: 'low',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.MISSING_REQUIRED_FIELD]: {
    code: SUPPORT_ERROR_CODE.MISSING_REQUIRED_FIELD,
    message: 'প্রয়োজনীয় ফিল্ড অনুপস্থিত',
    description: 'একটি প্রয়োজনীয় ফিল্ড খালি রয়েছে',
    category: 'VALIDATION',
    severity: 'low',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.INVALID_FORMAT]: {
    code: SUPPORT_ERROR_CODE.INVALID_FORMAT,
    message: 'অবৈধ ফরম্যাট',
    description: 'প্রদত্ত ডেটার ফরম্যাটটি বৈধ নয়',
    category: 'VALIDATION',
    severity: 'low',
    httpStatus: 400,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.INVALID_LENGTH]: {
    code: SUPPORT_ERROR_CODE.INVALID_LENGTH,
    message: 'অবৈধ দৈর্ঘ্য',
    description: 'প্রদত্ত ডেটার দৈর্ঘ্য অনুমোদিত সীমার মধ্যে নয়',
    category: 'VALIDATION',
    severity: 'low',
    httpStatus: 400,
    retryable: false,
  },

  // অথেন্টিকেশন এরর
  [SUPPORT_ERROR_CODE.AUTHENTICATION_ERROR]: {
    code: SUPPORT_ERROR_CODE.AUTHENTICATION_ERROR,
    message: 'অথেন্টিকেশন ত্রুটি',
    description: 'ব্যবহারকারী যাচাই করতে ব্যর্থ হয়েছে',
    category: 'AUTHENTICATION',
    severity: 'high',
    httpStatus: 401,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.AUTHORIZATION_ERROR]: {
    code: SUPPORT_ERROR_CODE.AUTHORIZATION_ERROR,
    message: 'অথরাইজেশন ত্রুটি',
    description: 'এই অপারেশনের জন্য অনুমতি নেই',
    category: 'AUTHENTICATION',
    severity: 'high',
    httpStatus: 403,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.PERMISSION_DENIED]: {
    code: SUPPORT_ERROR_CODE.PERMISSION_DENIED,
    message: 'অনুমতি প্রত্যাখ্যান',
    description: 'এই কাজটি করার জন্য প্রয়োজনীয় অনুমতি নেই',
    category: 'AUTHENTICATION',
    severity: 'high',
    httpStatus: 403,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.INVALID_TOKEN]: {
    code: SUPPORT_ERROR_CODE.INVALID_TOKEN,
    message: 'অবৈধ টোকেন',
    description: 'প্রদত্ত টোকেনটি বৈধ নয়',
    category: 'AUTHENTICATION',
    severity: 'high',
    httpStatus: 401,
    retryable: false,
  },
  [SUPPORT_ERROR_CODE.TOKEN_EXPIRED]: {
    code: SUPPORT_ERROR_CODE.TOKEN_EXPIRED,
    message: 'টোকেন মেয়াদোত্তীর্ণ',
    description: 'টোকেনের মেয়াদ শেষ হয়ে গেছে',
    category: 'AUTHENTICATION',
    severity: 'medium',
    httpStatus: 401,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.INVALID_CREDENTIALS]: {
    code: SUPPORT_ERROR_CODE.INVALID_CREDENTIALS,
    message: 'অবৈধ লগইন তথ্য',
    description: 'প্রদত্ত লগইন তথ্যগুলো সঠিক নয়',
    category: 'AUTHENTICATION',
    severity: 'high',
    httpStatus: 401,
    retryable: false,
  },

  // রেট লিমিট এরর
  [SUPPORT_ERROR_CODE.RATE_LIMIT_EXCEEDED]: {
    code: SUPPORT_ERROR_CODE.RATE_LIMIT_EXCEEDED,
    message: 'রেট লিমিট অতিক্রম',
    description: 'অনেক বেশি অনুরোধ করা হয়েছে, অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন',
    category: 'RATE_LIMIT',
    severity: 'low',
    httpStatus: 429,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.DAILY_LIMIT_EXCEEDED]: {
    code: SUPPORT_ERROR_CODE.DAILY_LIMIT_EXCEEDED,
    message: 'দৈনিক সীমা অতিক্রম',
    description: 'আজকের জন্য দৈনিক অনুরোধ সীমা অতিক্রম করা হয়েছে',
    category: 'RATE_LIMIT',
    severity: 'low',
    httpStatus: 429,
    retryable: true,
  },

  // টাইমআউট এরর
  [SUPPORT_ERROR_CODE.TIMEOUT_ERROR]: {
    code: SUPPORT_ERROR_CODE.TIMEOUT_ERROR,
    message: 'টাইমআউট ত্রুটি',
    description: 'অপারেশনটি সম্পন্ন করতে সময়সীমা অতিক্রম করেছে',
    category: 'TIMEOUT',
    severity: 'medium',
    httpStatus: 408,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.OPERATION_TIMEOUT]: {
    code: SUPPORT_ERROR_CODE.OPERATION_TIMEOUT,
    message: 'অপারেশন টাইমআউট',
    description: 'অপারেশনটি সম্পন্ন করতে নির্ধারিত সময় অতিক্রম করেছে',
    category: 'TIMEOUT',
    severity: 'medium',
    httpStatus: 408,
    retryable: true,
  },

  // সিস্টেম এরর
  [SUPPORT_ERROR_CODE.SYSTEM_ERROR]: {
    code: SUPPORT_ERROR_CODE.SYSTEM_ERROR,
    message: 'সিস্টেম ত্রুটি',
    description: 'সিস্টেমে একটি অপ্রত্যাশিত ত্রুটি ঘটেছে',
    category: 'SYSTEM',
    severity: 'critical',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.UNKNOWN_ERROR]: {
    code: SUPPORT_ERROR_CODE.UNKNOWN_ERROR,
    message: 'অজানা ত্রুটি',
    description: 'একটি অজানা ত্রুটি ঘটেছে',
    category: 'SYSTEM',
    severity: 'critical',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.INTERNAL_SERVER_ERROR]: {
    code: SUPPORT_ERROR_CODE.INTERNAL_SERVER_ERROR,
    message: 'ইন্টারনাল সার্ভার ত্রুটি',
    description: 'সার্ভারে একটি অভ্যন্তরীণ ত্রুটি ঘটেছে',
    category: 'SYSTEM',
    severity: 'critical',
    httpStatus: 500,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.SERVICE_UNAVAILABLE]: {
    code: SUPPORT_ERROR_CODE.SERVICE_UNAVAILABLE,
    message: 'সার্ভিস উপলব্ধ নয়',
    description: 'সার্ভিসটি বর্তমানে উপলব্ধ নয়',
    category: 'SYSTEM',
    severity: 'critical',
    httpStatus: 503,
    retryable: true,
  },
  [SUPPORT_ERROR_CODE.MAINTENANCE_MODE]: {
    code: SUPPORT_ERROR_CODE.MAINTENANCE_MODE,
    message: 'মেইনটেন্যান্স মোড',
    description: 'সিস্টেমটি বর্তমানে মেইনটেন্যান্সের অধীনে রয়েছে',
    category: 'SYSTEM',
    severity: 'critical',
    httpStatus: 503,
    retryable: true,
  },
} as const;

/**
 * ডিফল্ট এরর মেসেজ
 */
export const DEFAULT_ERROR_MESSAGES = {
  [SUPPORT_ERROR_SEVERITY.LOW]: 'একটি ছোটখাটো ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
  [SUPPORT_ERROR_SEVERITY.MEDIUM]:
    'একটি মাঝারি ত্রুটি ঘটেছে। অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।',
  [SUPPORT_ERROR_SEVERITY.HIGH]:
    'একটি গুরুতর ত্রুটি ঘটেছে। অনুগ্রহ করে সাপোর্ট টিমের সাথে যোগাযোগ করুন।',
  [SUPPORT_ERROR_SEVERITY.CRITICAL]:
    'একটি মারাত্মক ত্রুটি ঘটেছে। অনুগ্রহ করে অবিলম্বে সাপোর্ট টিমের সাথে যোগাযোগ করুন।',
} as const;

export type SupportErrorSeverityLevel =
  (typeof SUPPORT_ERROR_SEVERITY)[keyof typeof SUPPORT_ERROR_SEVERITY];
export type DefaultErrorMessages = typeof DEFAULT_ERROR_MESSAGES;
