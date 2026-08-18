/**
 * টিকেটের বিভিন্ন টাইপ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট টাইপ
 */
export const TICKET_TYPE = {
  QUESTION: 'question',
  ISSUE: 'issue',
  FEATURE_REQUEST: 'feature_request',
  BUG_REPORT: 'bug_report',
  FEEDBACK: 'feedback',
  COMPLAINT: 'complaint',
  SUPPORT_REQUEST: 'support_request',
  ORDER_ISSUE: 'order_issue',
  PAYMENT_ISSUE: 'payment_issue',
  DELIVERY_ISSUE: 'delivery_issue',
  RETURN_REQUEST: 'return_request',
  REFUND_REQUEST: 'refund_request',
} as const;

/**
 * টিকেট টাইপের ডিসপ্লে নাম
 */
export const TICKET_TYPE_DISPLAY_NAMES = {
  [TICKET_TYPE.QUESTION]: 'প্রশ্ন',
  [TICKET_TYPE.ISSUE]: 'সমস্যা',
  [TICKET_TYPE.FEATURE_REQUEST]: 'ফিচার রিকোয়েস্ট',
  [TICKET_TYPE.BUG_REPORT]: 'বাগ রিপোর্ট',
  [TICKET_TYPE.FEEDBACK]: 'মতামত',
  [TICKET_TYPE.COMPLAINT]: 'অভিযোগ',
  [TICKET_TYPE.SUPPORT_REQUEST]: 'সাপোর্ট রিকোয়েস্ট',
  [TICKET_TYPE.ORDER_ISSUE]: 'অর্ডার সমস্যা',
  [TICKET_TYPE.PAYMENT_ISSUE]: 'পেমেন্ট সমস্যা',
  [TICKET_TYPE.DELIVERY_ISSUE]: 'ডেলিভারি সমস্যা',
  [TICKET_TYPE.RETURN_REQUEST]: 'রিটার্ন রিকোয়েস্ট',
  [TICKET_TYPE.REFUND_REQUEST]: 'রিফান্ড রিকোয়েস্ট',
} as const;

/**
 * টিকেট টাইপের আইকন (অনুষঙ্গিক নাম)
 */
export const TICKET_TYPE_ICONS = {
  [TICKET_TYPE.QUESTION]: 'help-circle',
  [TICKET_TYPE.ISSUE]: 'alert-circle',
  [TICKET_TYPE.FEATURE_REQUEST]: 'star',
  [TICKET_TYPE.BUG_REPORT]: 'bug',
  [TICKET_TYPE.FEEDBACK]: 'message-square',
  [TICKET_TYPE.COMPLAINT]: 'alert-triangle',
  [TICKET_TYPE.SUPPORT_REQUEST]: 'headphones',
  [TICKET_TYPE.ORDER_ISSUE]: 'shopping-bag',
  [TICKET_TYPE.PAYMENT_ISSUE]: 'credit-card',
  [TICKET_TYPE.DELIVERY_ISSUE]: 'truck',
  [TICKET_TYPE.RETURN_REQUEST]: 'rotate-ccw',
  [TICKET_TYPE.REFUND_REQUEST]: 'dollar-sign',
} as const;

/**
 * টিকেট টাইপের রঙের কোড (হেক্স)
 */
export const TICKET_TYPE_COLORS = {
  [TICKET_TYPE.QUESTION]: '#3498db', // নীল
  [TICKET_TYPE.ISSUE]: '#e74c3c', // লাল
  [TICKET_TYPE.FEATURE_REQUEST]: '#2ecc71', // সবুজ
  [TICKET_TYPE.BUG_REPORT]: '#e67e22', // কমলা
  [TICKET_TYPE.FEEDBACK]: '#9b59b6', // বেগুনি
  [TICKET_TYPE.COMPLAINT]: '#c0392b', // গাঢ় লাল
  [TICKET_TYPE.SUPPORT_REQUEST]: '#1abc9c', // টিল
  [TICKET_TYPE.ORDER_ISSUE]: '#f39c12', // হলুদ
  [TICKET_TYPE.PAYMENT_ISSUE]: '#d35400', // গাঢ় কমলা
  [TICKET_TYPE.DELIVERY_ISSUE]: '#2980b9', // গাঢ় নীল
  [TICKET_TYPE.RETURN_REQUEST]: '#8e44ad', // বেগুনি
  [TICKET_TYPE.REFUND_REQUEST]: '#27ae60', // সবুজ
} as const;

/**
 * টিকেট টাইপের বিবরণ
 */
export const TICKET_TYPE_DESCRIPTIONS = {
  [TICKET_TYPE.QUESTION]: 'সাধারণ প্রশ্ন বা তথ্য জানতে চাই',
  [TICKET_TYPE.ISSUE]: 'সিস্টেম বা সার্ভিসে সমস্যা',
  [TICKET_TYPE.FEATURE_REQUEST]: 'নতুন ফিচার বা উন্নতির প্রস্তাব',
  [TICKET_TYPE.BUG_REPORT]: 'সফটওয়্যার বা সিস্টেমের বাগ রিপোর্ট',
  [TICKET_TYPE.FEEDBACK]: 'সার্ভিস বা পণ্য সম্পর্কে মতামত',
  [TICKET_TYPE.COMPLAINT]: 'সার্ভিস বা পণ্য নিয়ে অভিযোগ',
  [TICKET_TYPE.SUPPORT_REQUEST]: 'সাপোর্ট টিমের সাহায্য চাই',
  [TICKET_TYPE.ORDER_ISSUE]: 'অর্ডার সংক্রান্ত সমস্যা',
  [TICKET_TYPE.PAYMENT_ISSUE]: 'পেমেন্ট সংক্রান্ত সমস্যা',
  [TICKET_TYPE.DELIVERY_ISSUE]: 'ডেলিভারি সংক্রান্ত সমস্যা',
  [TICKET_TYPE.RETURN_REQUEST]: 'পণ্য রিটার্ন করতে চাই',
  [TICKET_TYPE.REFUND_REQUEST]: 'টাকা রিফান্ড করতে চাই',
} as const;

/**
 * টিকেট টাইপের ক্যাটাগরি
 */
export const TICKET_TYPE_CATEGORIES = {
  [TICKET_TYPE.QUESTION]: 'information',
  [TICKET_TYPE.ISSUE]: 'technical',
  [TICKET_TYPE.FEATURE_REQUEST]: 'improvement',
  [TICKET_TYPE.BUG_REPORT]: 'technical',
  [TICKET_TYPE.FEEDBACK]: 'feedback',
  [TICKET_TYPE.COMPLAINT]: 'feedback',
  [TICKET_TYPE.SUPPORT_REQUEST]: 'support',
  [TICKET_TYPE.ORDER_ISSUE]: 'order',
  [TICKET_TYPE.PAYMENT_ISSUE]: 'payment',
  [TICKET_TYPE.DELIVERY_ISSUE]: 'delivery',
  [TICKET_TYPE.RETURN_REQUEST]: 'order',
  [TICKET_TYPE.REFUND_REQUEST]: 'payment',
} as const;

/**
 * টিকেট টাইপের ডিফল্ট প্রায়োরিটি
 */
export const TICKET_TYPE_DEFAULT_PRIORITY = {
  [TICKET_TYPE.QUESTION]: 'low',
  [TICKET_TYPE.ISSUE]: 'high',
  [TICKET_TYPE.FEATURE_REQUEST]: 'medium',
  [TICKET_TYPE.BUG_REPORT]: 'critical',
  [TICKET_TYPE.FEEDBACK]: 'low',
  [TICKET_TYPE.COMPLAINT]: 'high',
  [TICKET_TYPE.SUPPORT_REQUEST]: 'medium',
  [TICKET_TYPE.ORDER_ISSUE]: 'high',
  [TICKET_TYPE.PAYMENT_ISSUE]: 'critical',
  [TICKET_TYPE.DELIVERY_ISSUE]: 'high',
  [TICKET_TYPE.RETURN_REQUEST]: 'medium',
  [TICKET_TYPE.REFUND_REQUEST]: 'high',
} as const;

/**
 * টিকেট টাইপের প্রত্যাশিত রেসপন্স টাইম (মিনিটে)
 */
export const TICKET_TYPE_EXPECTED_RESPONSE_TIME = {
  [TICKET_TYPE.QUESTION]: 120,
  [TICKET_TYPE.ISSUE]: 30,
  [TICKET_TYPE.FEATURE_REQUEST]: 240,
  [TICKET_TYPE.BUG_REPORT]: 15,
  [TICKET_TYPE.FEEDBACK]: 360,
  [TICKET_TYPE.COMPLAINT]: 60,
  [TICKET_TYPE.SUPPORT_REQUEST]: 45,
  [TICKET_TYPE.ORDER_ISSUE]: 30,
  [TICKET_TYPE.PAYMENT_ISSUE]: 15,
  [TICKET_TYPE.DELIVERY_ISSUE]: 30,
  [TICKET_TYPE.RETURN_REQUEST]: 60,
  [TICKET_TYPE.REFUND_REQUEST]: 30,
} as const;

/**
 * টিকেট টাইপের প্রয়োজনীয় দক্ষতা স্তর
 */
export const TICKET_TYPE_REQUIRED_SKILL_LEVEL = {
  [TICKET_TYPE.QUESTION]: 'junior',
  [TICKET_TYPE.ISSUE]: 'senior',
  [TICKET_TYPE.FEATURE_REQUEST]: 'mid',
  [TICKET_TYPE.BUG_REPORT]: 'expert',
  [TICKET_TYPE.FEEDBACK]: 'junior',
  [TICKET_TYPE.COMPLAINT]: 'senior',
  [TICKET_TYPE.SUPPORT_REQUEST]: 'mid',
  [TICKET_TYPE.ORDER_ISSUE]: 'mid',
  [TICKET_TYPE.PAYMENT_ISSUE]: 'senior',
  [TICKET_TYPE.DELIVERY_ISSUE]: 'mid',
  [TICKET_TYPE.RETURN_REQUEST]: 'junior',
  [TICKET_TYPE.REFUND_REQUEST]: 'senior',
} as const;

/**
 * টিকেট টাইপের এসকালেশন লেভেল
 */
export const TICKET_TYPE_ESCALATION_LEVEL = {
  [TICKET_TYPE.QUESTION]: 1,
  [TICKET_TYPE.ISSUE]: 3,
  [TICKET_TYPE.FEATURE_REQUEST]: 2,
  [TICKET_TYPE.BUG_REPORT]: 4,
  [TICKET_TYPE.FEEDBACK]: 1,
  [TICKET_TYPE.COMPLAINT]: 3,
  [TICKET_TYPE.SUPPORT_REQUEST]: 2,
  [TICKET_TYPE.ORDER_ISSUE]: 2,
  [TICKET_TYPE.PAYMENT_ISSUE]: 3,
  [TICKET_TYPE.DELIVERY_ISSUE]: 2,
  [TICKET_TYPE.RETURN_REQUEST]: 2,
  [TICKET_TYPE.REFUND_REQUEST]: 3,
} as const;

/**
 * টিকেট টাইপের এসকালেশন পাথ
 */
export const TICKET_TYPE_ESCALATION_PATH = {
  [TICKET_TYPE.QUESTION]: ['support_agent'] as string[],
  [TICKET_TYPE.ISSUE]: ['support_agent', 'support_lead', 'support_manager'] as string[],
  [TICKET_TYPE.FEATURE_REQUEST]: ['support_agent', 'product_manager'] as string[],
  [TICKET_TYPE.BUG_REPORT]: ['support_agent', 'support_lead', 'support_manager', 'cto'] as string[],
  [TICKET_TYPE.FEEDBACK]: ['support_agent', 'product_manager'] as string[],
  [TICKET_TYPE.COMPLAINT]: ['support_agent', 'support_lead', 'support_manager'] as string[],
  [TICKET_TYPE.SUPPORT_REQUEST]: ['support_agent', 'support_lead'] as string[],
  [TICKET_TYPE.ORDER_ISSUE]: ['support_agent', 'order_manager'] as string[],
  [TICKET_TYPE.PAYMENT_ISSUE]: ['support_agent', 'finance_manager'] as string[],
  [TICKET_TYPE.DELIVERY_ISSUE]: ['support_agent', 'logistics_manager'] as string[],
  [TICKET_TYPE.RETURN_REQUEST]: ['support_agent', 'order_manager'] as string[],
  [TICKET_TYPE.REFUND_REQUEST]: ['support_agent', 'finance_manager'] as string[],
} as const;

/**
 * টিকেট টাইপের নোটিফিকেশন সেটিংস
 */
export const TICKET_TYPE_NOTIFICATIONS = {
  [TICKET_TYPE.QUESTION]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_TYPE.ISSUE]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.FEATURE_REQUEST]: {
    email: true,
    sms: false,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.BUG_REPORT]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.FEEDBACK]: {
    email: true,
    sms: false,
    push: false,
    slack: true,
  },
  [TICKET_TYPE.COMPLAINT]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.SUPPORT_REQUEST]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.ORDER_ISSUE]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.PAYMENT_ISSUE]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.DELIVERY_ISSUE]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.RETURN_REQUEST]: {
    email: true,
    sms: false,
    push: true,
    slack: true,
  },
  [TICKET_TYPE.REFUND_REQUEST]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
} as const;

/**
 * টিকেট টাইপের ডিফল্ট ট্যাগ
 */
export const TICKET_TYPE_DEFAULT_TAGS = {
  [TICKET_TYPE.QUESTION]: ['general', 'information'],
  [TICKET_TYPE.ISSUE]: ['technical', 'problem'],
  [TICKET_TYPE.FEATURE_REQUEST]: ['improvement', 'new-feature'],
  [TICKET_TYPE.BUG_REPORT]: ['bug', 'technical'],
  [TICKET_TYPE.FEEDBACK]: ['feedback', 'experience'],
  [TICKET_TYPE.COMPLAINT]: ['complaint', 'dissatisfaction'],
  [TICKET_TYPE.SUPPORT_REQUEST]: ['support', 'help'],
  [TICKET_TYPE.ORDER_ISSUE]: ['order', 'ecommerce'],
  [TICKET_TYPE.PAYMENT_ISSUE]: ['payment', 'financial'],
  [TICKET_TYPE.DELIVERY_ISSUE]: ['delivery', 'logistics'],
  [TICKET_TYPE.RETURN_REQUEST]: ['return', 'exchange'],
  [TICKET_TYPE.REFUND_REQUEST]: ['refund', 'financial'],
} as const;

export type TicketType = (typeof TICKET_TYPE)[keyof typeof TICKET_TYPE];
export type TicketTypeDisplayNames = typeof TICKET_TYPE_DISPLAY_NAMES;
export type TicketTypeIcons = typeof TICKET_TYPE_ICONS;
export type TicketTypeColors = typeof TICKET_TYPE_COLORS;
export type TicketTypeDescriptions = typeof TICKET_TYPE_DESCRIPTIONS;
export type TicketTypeCategories = typeof TICKET_TYPE_CATEGORIES;
export type TicketTypeDefaultPriority = typeof TICKET_TYPE_DEFAULT_PRIORITY;
export type TicketTypeExpectedResponseTime = typeof TICKET_TYPE_EXPECTED_RESPONSE_TIME;
export type TicketTypeRequiredSkillLevel = typeof TICKET_TYPE_REQUIRED_SKILL_LEVEL;
export type TicketTypeEscalationLevel = typeof TICKET_TYPE_ESCALATION_LEVEL;
export type TicketTypeEscalationPath = typeof TICKET_TYPE_ESCALATION_PATH;
export type TicketTypeNotifications = typeof TICKET_TYPE_NOTIFICATIONS;
export type TicketTypeDefaultTags = typeof TICKET_TYPE_DEFAULT_TAGS;

export interface TicketTypeConfig {
  type: TicketType;
  displayName: string;
  icon: string;
  color: string;
  description: string;
  category: string;
  defaultPriority: 'low' | 'medium' | 'high' | 'critical';
  expectedResponseTimeMinutes: number;
  requiredSkillLevel: 'junior' | 'mid' | 'senior' | 'expert';
  escalationLevel: number;
  escalationPath: readonly string[];
  notification: {
    email: boolean;
    sms: boolean;
    push: boolean;
    slack: boolean;
  };
  defaultTags: readonly string[];
}

/**
 * টিকেট টাইপ কনফিগারেশন অবজেক্ট
 */
export const TICKET_TYPE_CONFIGS: Record<TicketType, TicketTypeConfig> = {
  [TICKET_TYPE.QUESTION]: {
    type: TICKET_TYPE.QUESTION,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.QUESTION],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.QUESTION],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.QUESTION],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.QUESTION],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.QUESTION],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.QUESTION] as 'low',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.QUESTION],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.QUESTION] as 'junior',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.QUESTION],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.QUESTION],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.QUESTION],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.QUESTION],
  },
  [TICKET_TYPE.ISSUE]: {
    type: TICKET_TYPE.ISSUE,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.ISSUE],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.ISSUE],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.ISSUE],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.ISSUE],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.ISSUE],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.ISSUE] as 'high',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.ISSUE],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.ISSUE] as 'senior',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.ISSUE],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.ISSUE],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.ISSUE],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.ISSUE],
  },
  [TICKET_TYPE.FEATURE_REQUEST]: {
    type: TICKET_TYPE.FEATURE_REQUEST,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.FEATURE_REQUEST],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.FEATURE_REQUEST],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.FEATURE_REQUEST],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.FEATURE_REQUEST],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.FEATURE_REQUEST],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.FEATURE_REQUEST] as 'medium',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.FEATURE_REQUEST],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.FEATURE_REQUEST] as 'mid',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.FEATURE_REQUEST],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.FEATURE_REQUEST],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.FEATURE_REQUEST],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.FEATURE_REQUEST],
  },
  [TICKET_TYPE.BUG_REPORT]: {
    type: TICKET_TYPE.BUG_REPORT,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.BUG_REPORT],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.BUG_REPORT],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.BUG_REPORT],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.BUG_REPORT],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.BUG_REPORT],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.BUG_REPORT] as 'critical',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.BUG_REPORT],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.BUG_REPORT] as 'expert',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.BUG_REPORT],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.BUG_REPORT],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.BUG_REPORT],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.BUG_REPORT],
  },
  [TICKET_TYPE.FEEDBACK]: {
    type: TICKET_TYPE.FEEDBACK,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.FEEDBACK],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.FEEDBACK],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.FEEDBACK],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.FEEDBACK],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.FEEDBACK],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.FEEDBACK] as 'low',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.FEEDBACK],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.FEEDBACK] as 'junior',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.FEEDBACK],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.FEEDBACK],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.FEEDBACK],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.FEEDBACK],
  },
  [TICKET_TYPE.COMPLAINT]: {
    type: TICKET_TYPE.COMPLAINT,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.COMPLAINT],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.COMPLAINT],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.COMPLAINT],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.COMPLAINT],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.COMPLAINT],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.COMPLAINT] as 'high',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.COMPLAINT],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.COMPLAINT] as 'senior',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.COMPLAINT],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.COMPLAINT],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.COMPLAINT],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.COMPLAINT],
  },
  [TICKET_TYPE.SUPPORT_REQUEST]: {
    type: TICKET_TYPE.SUPPORT_REQUEST,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.SUPPORT_REQUEST],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.SUPPORT_REQUEST],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.SUPPORT_REQUEST],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.SUPPORT_REQUEST],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.SUPPORT_REQUEST],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.SUPPORT_REQUEST] as 'medium',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.SUPPORT_REQUEST],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.SUPPORT_REQUEST] as 'mid',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.SUPPORT_REQUEST],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.SUPPORT_REQUEST],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.SUPPORT_REQUEST],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.SUPPORT_REQUEST],
  },
  [TICKET_TYPE.ORDER_ISSUE]: {
    type: TICKET_TYPE.ORDER_ISSUE,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.ORDER_ISSUE],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.ORDER_ISSUE],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.ORDER_ISSUE],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.ORDER_ISSUE],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.ORDER_ISSUE],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.ORDER_ISSUE] as 'high',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.ORDER_ISSUE],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.ORDER_ISSUE] as 'mid',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.ORDER_ISSUE],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.ORDER_ISSUE],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.ORDER_ISSUE],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.ORDER_ISSUE],
  },
  [TICKET_TYPE.PAYMENT_ISSUE]: {
    type: TICKET_TYPE.PAYMENT_ISSUE,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.PAYMENT_ISSUE],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.PAYMENT_ISSUE],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.PAYMENT_ISSUE],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.PAYMENT_ISSUE],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.PAYMENT_ISSUE],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.PAYMENT_ISSUE] as 'critical',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.PAYMENT_ISSUE],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.PAYMENT_ISSUE] as 'senior',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.PAYMENT_ISSUE],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.PAYMENT_ISSUE],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.PAYMENT_ISSUE],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.PAYMENT_ISSUE],
  },
  [TICKET_TYPE.DELIVERY_ISSUE]: {
    type: TICKET_TYPE.DELIVERY_ISSUE,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.DELIVERY_ISSUE],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.DELIVERY_ISSUE],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.DELIVERY_ISSUE],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.DELIVERY_ISSUE],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.DELIVERY_ISSUE],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.DELIVERY_ISSUE] as 'high',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.DELIVERY_ISSUE],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.DELIVERY_ISSUE] as 'mid',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.DELIVERY_ISSUE],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.DELIVERY_ISSUE],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.DELIVERY_ISSUE],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.DELIVERY_ISSUE],
  },
  [TICKET_TYPE.RETURN_REQUEST]: {
    type: TICKET_TYPE.RETURN_REQUEST,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.RETURN_REQUEST],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.RETURN_REQUEST],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.RETURN_REQUEST],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.RETURN_REQUEST],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.RETURN_REQUEST],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.RETURN_REQUEST] as 'medium',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.RETURN_REQUEST],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.RETURN_REQUEST] as 'junior',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.RETURN_REQUEST],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.RETURN_REQUEST],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.RETURN_REQUEST],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.RETURN_REQUEST],
  },
  [TICKET_TYPE.REFUND_REQUEST]: {
    type: TICKET_TYPE.REFUND_REQUEST,
    displayName: TICKET_TYPE_DISPLAY_NAMES[TICKET_TYPE.REFUND_REQUEST],
    icon: TICKET_TYPE_ICONS[TICKET_TYPE.REFUND_REQUEST],
    color: TICKET_TYPE_COLORS[TICKET_TYPE.REFUND_REQUEST],
    description: TICKET_TYPE_DESCRIPTIONS[TICKET_TYPE.REFUND_REQUEST],
    category: TICKET_TYPE_CATEGORIES[TICKET_TYPE.REFUND_REQUEST],
    defaultPriority: TICKET_TYPE_DEFAULT_PRIORITY[TICKET_TYPE.REFUND_REQUEST] as 'high',
    expectedResponseTimeMinutes: TICKET_TYPE_EXPECTED_RESPONSE_TIME[TICKET_TYPE.REFUND_REQUEST],
    requiredSkillLevel: TICKET_TYPE_REQUIRED_SKILL_LEVEL[TICKET_TYPE.REFUND_REQUEST] as 'senior',
    escalationLevel: TICKET_TYPE_ESCALATION_LEVEL[TICKET_TYPE.REFUND_REQUEST],
    escalationPath: TICKET_TYPE_ESCALATION_PATH[TICKET_TYPE.REFUND_REQUEST],
    notification: TICKET_TYPE_NOTIFICATIONS[TICKET_TYPE.REFUND_REQUEST],
    defaultTags: TICKET_TYPE_DEFAULT_TAGS[TICKET_TYPE.REFUND_REQUEST],
  },
};
