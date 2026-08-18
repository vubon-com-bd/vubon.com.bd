/**
 * টিকেটের ক্যাটাগরি সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিকেট ক্যাটাগরি
 */
export const TICKET_CATEGORY = {
  TECHNICAL: 'technical',
  BILLING: 'billing',
  ACCOUNT: 'account',
  PRODUCT: 'product',
  SERVICE: 'service',
  SHIPPING: 'shipping',
  RETURNS: 'returns',
  WARRANTY: 'warranty',
  GENERAL: 'general',
  OTHER: 'other',
} as const;

/**
 * টিকেট ক্যাটাগরির ডিসপ্লে নাম
 */
export const TICKET_CATEGORY_DISPLAY_NAMES = {
  [TICKET_CATEGORY.TECHNICAL]: 'প্রযুক্তিগত',
  [TICKET_CATEGORY.BILLING]: 'বিলিং',
  [TICKET_CATEGORY.ACCOUNT]: 'অ্যাকাউন্ট',
  [TICKET_CATEGORY.PRODUCT]: 'পণ্য',
  [TICKET_CATEGORY.SERVICE]: 'সার্ভিস',
  [TICKET_CATEGORY.SHIPPING]: 'শিপিং',
  [TICKET_CATEGORY.RETURNS]: 'রিটার্ন',
  [TICKET_CATEGORY.WARRANTY]: 'ওয়ারেন্টি',
  [TICKET_CATEGORY.GENERAL]: 'সাধারণ',
  [TICKET_CATEGORY.OTHER]: 'অন্যান্য',
} as const;

/**
 * টিকেট ক্যাটাগরির আইকন (অনুষঙ্গিক নাম)
 */
export const TICKET_CATEGORY_ICONS = {
  [TICKET_CATEGORY.TECHNICAL]: 'cpu',
  [TICKET_CATEGORY.BILLING]: 'credit-card',
  [TICKET_CATEGORY.ACCOUNT]: 'user',
  [TICKET_CATEGORY.PRODUCT]: 'package',
  [TICKET_CATEGORY.SERVICE]: 'briefcase',
  [TICKET_CATEGORY.SHIPPING]: 'truck',
  [TICKET_CATEGORY.RETURNS]: 'rotate-ccw',
  [TICKET_CATEGORY.WARRANTY]: 'shield',
  [TICKET_CATEGORY.GENERAL]: 'help-circle',
  [TICKET_CATEGORY.OTHER]: 'more-horizontal',
} as const;

/**
 * টিকেট ক্যাটাগরির রঙের কোড (হেক্স)
 */
export const TICKET_CATEGORY_COLORS = {
  [TICKET_CATEGORY.TECHNICAL]: '#3498db', // নীল
  [TICKET_CATEGORY.BILLING]: '#2ecc71', // সবুজ
  [TICKET_CATEGORY.ACCOUNT]: '#9b59b6', // বেগুনি
  [TICKET_CATEGORY.PRODUCT]: '#e67e22', // কমলা
  [TICKET_CATEGORY.SERVICE]: '#1abc9c', // টিল
  [TICKET_CATEGORY.SHIPPING]: '#f39c12', // হলুদ
  [TICKET_CATEGORY.RETURNS]: '#e74c3c', // লাল
  [TICKET_CATEGORY.WARRANTY]: '#2c3e50', // গাঢ় নীল
  [TICKET_CATEGORY.GENERAL]: '#95a5a6', // ধূসর
  [TICKET_CATEGORY.OTHER]: '#7f8c8d', // স্লেট
} as const;

/**
 * টিকেট ক্যাটাগরির বিবরণ
 */
export const TICKET_CATEGORY_DESCRIPTIONS = {
  [TICKET_CATEGORY.TECHNICAL]: 'প্রযুক্তিগত সমস্যা বা বাগ সংক্রান্ত',
  [TICKET_CATEGORY.BILLING]: 'বিলিং বা পেমেন্ট সংক্রান্ত',
  [TICKET_CATEGORY.ACCOUNT]: 'অ্যাকাউন্ট বা প্রোফাইল সংক্রান্ত',
  [TICKET_CATEGORY.PRODUCT]: 'পণ্য সম্পর্কিত প্রশ্ন বা সমস্যা',
  [TICKET_CATEGORY.SERVICE]: 'সার্ভিস সম্পর্কিত প্রশ্ন বা সমস্যা',
  [TICKET_CATEGORY.SHIPPING]: 'শিপিং বা ডেলিভারি সংক্রান্ত',
  [TICKET_CATEGORY.RETURNS]: 'রিটার্ন বা এক্সচেঞ্জ সংক্রান্ত',
  [TICKET_CATEGORY.WARRANTY]: 'ওয়ারেন্টি বা গ্যারান্টি সংক্রান্ত',
  [TICKET_CATEGORY.GENERAL]: 'সাধারণ প্রশ্ন বা তথ্য',
  [TICKET_CATEGORY.OTHER]: 'অন্যান্য বিষয়',
} as const;

/**
 * টিকেট ক্যাটাগরির সাব-ক্যাটাগরি
 */
export const TICKET_CATEGORY_SUB_CATEGORIES = {
  [TICKET_CATEGORY.TECHNICAL]: [
    'software_bug',
    'hardware_issue',
    'network_problem',
    'system_error',
    'performance_issue',
    'security_issue',
    'integration_problem',
    'database_error',
    'api_issue',
    'server_error',
  ] as const,
  [TICKET_CATEGORY.BILLING]: [
    'invoice_error',
    'payment_failed',
    'refund_request',
    'subscription_issue',
    'price_discrepancy',
    'billing_cycle_error',
    'tax_issue',
    'discount_not_applied',
    'payment_method_issue',
    'overcharge',
  ] as const,
  [TICKET_CATEGORY.ACCOUNT]: [
    'login_issue',
    'registration_problem',
    'profile_update',
    'password_reset',
    'email_verification',
    'account_security',
    'two_factor_authentication',
    'account_deletion',
    'data_privacy',
    'permission_issue',
  ] as const,
  [TICKET_CATEGORY.PRODUCT]: [
    'product_inquiry',
    'product_quality',
    'product_damage',
    'product_defect',
    'product_incompatibility',
    'product_misrepresentation',
    'product_availability',
    'product_pricing',
    'product_warranty',
    'product_return',
  ] as const,
  [TICKET_CATEGORY.SERVICE]: [
    'service_interruption',
    'service_quality',
    'service_delivery',
    'service_scheduling',
    'service_cancellation',
    'service_modification',
    'service_feedback',
    'service_renewal',
    'service_upgrade',
    'service_downgrade',
  ] as const,
  [TICKET_CATEGORY.SHIPPING]: [
    'delayed_delivery',
    'lost_package',
    'damaged_package',
    'wrong_address',
    'tracking_issue',
    'shipping_cost',
    'shipping_method',
    'international_shipping',
    'customs_issue',
    'delivery_confirmation',
  ] as const,
  [TICKET_CATEGORY.RETURNS]: [
    'return_request',
    'return_approval',
    'return_shipping',
    'return_inspection',
    'return_credit',
    'exchange_request',
    'exchange_approval',
    'exchange_shipping',
    'restocking_fee',
    'return_deadline',
  ] as const,
  [TICKET_CATEGORY.WARRANTY]: [
    'warranty_inquiry',
    'warranty_claim',
    'warranty_approval',
    'warranty_rejection',
    'warranty_transfer',
    'warranty_expiration',
    'extended_warranty',
    'warranty_coverage',
    'warranty_exclusion',
    'warranty_repair',
  ] as const,
  [TICKET_CATEGORY.GENERAL]: [
    'general_inquiry',
    'feedback',
    'suggestion',
    'complaint',
    'appreciation',
    'information_request',
    'documentation_request',
    'training_request',
    'demo_request',
    'partnership_inquiry',
  ] as const,
  [TICKET_CATEGORY.OTHER]: [
    'miscellaneous',
    'urgent_issue',
    'escalation',
    'management_request',
    'legal_issue',
    'compliance_issue',
    'emergency',
    'priority_request',
    'special_case',
    'unknown',
  ] as const,
} as const;

/**
 * টিকেট ক্যাটাগরির ডিফল্ট প্রায়োরিটি
 */
export const TICKET_CATEGORY_DEFAULT_PRIORITY = {
  [TICKET_CATEGORY.TECHNICAL]: 'high',
  [TICKET_CATEGORY.BILLING]: 'high',
  [TICKET_CATEGORY.ACCOUNT]: 'medium',
  [TICKET_CATEGORY.PRODUCT]: 'medium',
  [TICKET_CATEGORY.SERVICE]: 'medium',
  [TICKET_CATEGORY.SHIPPING]: 'high',
  [TICKET_CATEGORY.RETURNS]: 'medium',
  [TICKET_CATEGORY.WARRANTY]: 'low',
  [TICKET_CATEGORY.GENERAL]: 'low',
  [TICKET_CATEGORY.OTHER]: 'medium',
} as const;

/**
 * টিকেট ক্যাটাগরির প্রত্যাশিত রেসপন্স টাইম (মিনিটে)
 */
export const TICKET_CATEGORY_EXPECTED_RESPONSE_TIME = {
  [TICKET_CATEGORY.TECHNICAL]: 30,
  [TICKET_CATEGORY.BILLING]: 30,
  [TICKET_CATEGORY.ACCOUNT]: 60,
  [TICKET_CATEGORY.PRODUCT]: 60,
  [TICKET_CATEGORY.SERVICE]: 45,
  [TICKET_CATEGORY.SHIPPING]: 30,
  [TICKET_CATEGORY.RETURNS]: 45,
  [TICKET_CATEGORY.WARRANTY]: 120,
  [TICKET_CATEGORY.GENERAL]: 180,
  [TICKET_CATEGORY.OTHER]: 60,
} as const;

/**
 * টিকেট ক্যাটাগরির প্রয়োজনীয় দক্ষতা স্তর
 */
export const TICKET_CATEGORY_REQUIRED_SKILL_LEVEL = {
  [TICKET_CATEGORY.TECHNICAL]: 'senior',
  [TICKET_CATEGORY.BILLING]: 'mid',
  [TICKET_CATEGORY.ACCOUNT]: 'mid',
  [TICKET_CATEGORY.PRODUCT]: 'junior',
  [TICKET_CATEGORY.SERVICE]: 'mid',
  [TICKET_CATEGORY.SHIPPING]: 'junior',
  [TICKET_CATEGORY.RETURNS]: 'junior',
  [TICKET_CATEGORY.WARRANTY]: 'mid',
  [TICKET_CATEGORY.GENERAL]: 'junior',
  [TICKET_CATEGORY.OTHER]: 'mid',
} as const;

/**
 * টিকেট ক্যাটাগরির এসকালেশন লেভেল
 */
export const TICKET_CATEGORY_ESCALATION_LEVEL = {
  [TICKET_CATEGORY.TECHNICAL]: 3,
  [TICKET_CATEGORY.BILLING]: 3,
  [TICKET_CATEGORY.ACCOUNT]: 2,
  [TICKET_CATEGORY.PRODUCT]: 2,
  [TICKET_CATEGORY.SERVICE]: 2,
  [TICKET_CATEGORY.SHIPPING]: 3,
  [TICKET_CATEGORY.RETURNS]: 2,
  [TICKET_CATEGORY.WARRANTY]: 1,
  [TICKET_CATEGORY.GENERAL]: 1,
  [TICKET_CATEGORY.OTHER]: 2,
} as const;

/**
 * টিকেট ক্যাটাগরির এসকালেশন পাথ
 */
export const TICKET_CATEGORY_ESCALATION_PATH = {
  [TICKET_CATEGORY.TECHNICAL]: ['support_agent', 'technical_lead', 'cto'] as string[],
  [TICKET_CATEGORY.BILLING]: ['support_agent', 'finance_lead', 'finance_manager'] as string[],
  [TICKET_CATEGORY.ACCOUNT]: ['support_agent', 'account_lead'] as string[],
  [TICKET_CATEGORY.PRODUCT]: ['support_agent', 'product_lead'] as string[],
  [TICKET_CATEGORY.SERVICE]: ['support_agent', 'service_lead'] as string[],
  [TICKET_CATEGORY.SHIPPING]: ['support_agent', 'logistics_lead', 'logistics_manager'] as string[],
  [TICKET_CATEGORY.RETURNS]: ['support_agent', 'returns_lead'] as string[],
  [TICKET_CATEGORY.WARRANTY]: ['support_agent', 'warranty_lead'] as string[],
  [TICKET_CATEGORY.GENERAL]: ['support_agent'] as string[],
  [TICKET_CATEGORY.OTHER]: ['support_agent', 'support_lead'] as string[],
} as const;

/**
 * টিকেট ক্যাটাগরির নোটিফিকেশন সেটিংস
 */
export const TICKET_CATEGORY_NOTIFICATIONS = {
  [TICKET_CATEGORY.TECHNICAL]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_CATEGORY.BILLING]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_CATEGORY.ACCOUNT]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_CATEGORY.PRODUCT]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_CATEGORY.SERVICE]: {
    email: true,
    sms: false,
    push: true,
    slack: true,
  },
  [TICKET_CATEGORY.SHIPPING]: {
    email: true,
    sms: true,
    push: true,
    slack: true,
  },
  [TICKET_CATEGORY.RETURNS]: {
    email: true,
    sms: false,
    push: true,
    slack: false,
  },
  [TICKET_CATEGORY.WARRANTY]: {
    email: true,
    sms: false,
    push: false,
    slack: false,
  },
  [TICKET_CATEGORY.GENERAL]: {
    email: true,
    sms: false,
    push: false,
    slack: false,
  },
  [TICKET_CATEGORY.OTHER]: {
    email: true,
    sms: false,
    push: true,
    slack: true,
  },
} as const;

/**
 * টিকেট ক্যাটাগরির ডিফল্ট ট্যাগ
 */
export const TICKET_CATEGORY_DEFAULT_TAGS = {
  [TICKET_CATEGORY.TECHNICAL]: ['technical', 'bug', 'system', 'error', 'performance'],
  [TICKET_CATEGORY.BILLING]: ['billing', 'payment', 'invoice', 'subscription', 'refund'],
  [TICKET_CATEGORY.ACCOUNT]: ['account', 'profile', 'login', 'security', 'registration'],
  [TICKET_CATEGORY.PRODUCT]: ['product', 'quality', 'defect', 'inquiry', 'pricing'],
  [TICKET_CATEGORY.SERVICE]: ['service', 'quality', 'delivery', 'scheduling', 'feedback'],
  [TICKET_CATEGORY.SHIPPING]: ['shipping', 'delivery', 'tracking', 'logistics', 'damage'],
  [TICKET_CATEGORY.RETURNS]: ['return', 'exchange', 'refund', 'credit', 'restocking'],
  [TICKET_CATEGORY.WARRANTY]: ['warranty', 'guarantee', 'claim', 'coverage', 'repair'],
  [TICKET_CATEGORY.GENERAL]: ['general', 'inquiry', 'feedback', 'complaint', 'information'],
  [TICKET_CATEGORY.OTHER]: ['other', 'misc', 'escalation', 'urgent', 'special'],
} as const;

export type TicketCategory = (typeof TICKET_CATEGORY)[keyof typeof TICKET_CATEGORY];
export type TicketCategoryDisplayNames = typeof TICKET_CATEGORY_DISPLAY_NAMES;
export type TicketCategoryIcons = typeof TICKET_CATEGORY_ICONS;
export type TicketCategoryColors = typeof TICKET_CATEGORY_COLORS;
export type TicketCategoryDescriptions = typeof TICKET_CATEGORY_DESCRIPTIONS;
export type TicketCategorySubCategories = typeof TICKET_CATEGORY_SUB_CATEGORIES;
export type TicketCategoryDefaultPriority = typeof TICKET_CATEGORY_DEFAULT_PRIORITY;
export type TicketCategoryExpectedResponseTime = typeof TICKET_CATEGORY_EXPECTED_RESPONSE_TIME;
export type TicketCategoryRequiredSkillLevel = typeof TICKET_CATEGORY_REQUIRED_SKILL_LEVEL;
export type TicketCategoryEscalationLevel = typeof TICKET_CATEGORY_ESCALATION_LEVEL;
export type TicketCategoryEscalationPath = typeof TICKET_CATEGORY_ESCALATION_PATH;
export type TicketCategoryNotifications = typeof TICKET_CATEGORY_NOTIFICATIONS;
export type TicketCategoryDefaultTags = typeof TICKET_CATEGORY_DEFAULT_TAGS;

export type TicketSubCategory = (typeof TICKET_CATEGORY_SUB_CATEGORIES)[TicketCategory][number];

export interface TicketCategoryConfig {
  category: TicketCategory;
  displayName: string;
  icon: string;
  color: string;
  description: string;
  subCategories: readonly string[];
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
 * টিকেট ক্যাটাগরি কনফিগারেশন অবজেক্ট
 */
export const TICKET_CATEGORY_CONFIGS: Record<TicketCategory, TicketCategoryConfig> = {
  [TICKET_CATEGORY.TECHNICAL]: {
    category: TICKET_CATEGORY.TECHNICAL,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.TECHNICAL],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.TECHNICAL],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.TECHNICAL],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.TECHNICAL],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.TECHNICAL],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.TECHNICAL] as 'high',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.TECHNICAL],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.TECHNICAL] as 'senior',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.TECHNICAL],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.TECHNICAL],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.TECHNICAL],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.TECHNICAL],
  },
  [TICKET_CATEGORY.BILLING]: {
    category: TICKET_CATEGORY.BILLING,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.BILLING],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.BILLING],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.BILLING],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.BILLING],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.BILLING],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.BILLING] as 'high',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.BILLING],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.BILLING] as 'mid',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.BILLING],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.BILLING],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.BILLING],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.BILLING],
  },
  [TICKET_CATEGORY.ACCOUNT]: {
    category: TICKET_CATEGORY.ACCOUNT,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.ACCOUNT],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.ACCOUNT],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.ACCOUNT],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.ACCOUNT],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.ACCOUNT],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.ACCOUNT] as 'medium',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.ACCOUNT],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.ACCOUNT] as 'mid',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.ACCOUNT],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.ACCOUNT],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.ACCOUNT],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.ACCOUNT],
  },
  [TICKET_CATEGORY.PRODUCT]: {
    category: TICKET_CATEGORY.PRODUCT,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.PRODUCT],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.PRODUCT],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.PRODUCT],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.PRODUCT],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.PRODUCT],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.PRODUCT] as 'medium',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.PRODUCT],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.PRODUCT] as 'junior',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.PRODUCT],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.PRODUCT],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.PRODUCT],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.PRODUCT],
  },
  [TICKET_CATEGORY.SERVICE]: {
    category: TICKET_CATEGORY.SERVICE,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.SERVICE],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.SERVICE],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.SERVICE],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.SERVICE],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.SERVICE],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.SERVICE] as 'medium',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.SERVICE],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.SERVICE] as 'mid',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.SERVICE],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.SERVICE],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.SERVICE],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.SERVICE],
  },
  [TICKET_CATEGORY.SHIPPING]: {
    category: TICKET_CATEGORY.SHIPPING,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.SHIPPING],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.SHIPPING],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.SHIPPING],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.SHIPPING],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.SHIPPING],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.SHIPPING] as 'high',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.SHIPPING],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.SHIPPING] as 'junior',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.SHIPPING],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.SHIPPING],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.SHIPPING],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.SHIPPING],
  },
  [TICKET_CATEGORY.RETURNS]: {
    category: TICKET_CATEGORY.RETURNS,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.RETURNS],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.RETURNS],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.RETURNS],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.RETURNS],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.RETURNS],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.RETURNS] as 'medium',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.RETURNS],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.RETURNS] as 'junior',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.RETURNS],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.RETURNS],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.RETURNS],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.RETURNS],
  },
  [TICKET_CATEGORY.WARRANTY]: {
    category: TICKET_CATEGORY.WARRANTY,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.WARRANTY],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.WARRANTY],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.WARRANTY],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.WARRANTY],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.WARRANTY],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.WARRANTY] as 'low',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.WARRANTY],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.WARRANTY] as 'mid',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.WARRANTY],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.WARRANTY],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.WARRANTY],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.WARRANTY],
  },
  [TICKET_CATEGORY.GENERAL]: {
    category: TICKET_CATEGORY.GENERAL,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.GENERAL],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.GENERAL],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.GENERAL],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.GENERAL],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.GENERAL],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.GENERAL] as 'low',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.GENERAL],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.GENERAL] as 'junior',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.GENERAL],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.GENERAL],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.GENERAL],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.GENERAL],
  },
  [TICKET_CATEGORY.OTHER]: {
    category: TICKET_CATEGORY.OTHER,
    displayName: TICKET_CATEGORY_DISPLAY_NAMES[TICKET_CATEGORY.OTHER],
    icon: TICKET_CATEGORY_ICONS[TICKET_CATEGORY.OTHER],
    color: TICKET_CATEGORY_COLORS[TICKET_CATEGORY.OTHER],
    description: TICKET_CATEGORY_DESCRIPTIONS[TICKET_CATEGORY.OTHER],
    subCategories: TICKET_CATEGORY_SUB_CATEGORIES[TICKET_CATEGORY.OTHER],
    defaultPriority: TICKET_CATEGORY_DEFAULT_PRIORITY[TICKET_CATEGORY.OTHER] as 'medium',
    expectedResponseTimeMinutes: TICKET_CATEGORY_EXPECTED_RESPONSE_TIME[TICKET_CATEGORY.OTHER],
    requiredSkillLevel: TICKET_CATEGORY_REQUIRED_SKILL_LEVEL[TICKET_CATEGORY.OTHER] as 'mid',
    escalationLevel: TICKET_CATEGORY_ESCALATION_LEVEL[TICKET_CATEGORY.OTHER],
    escalationPath: TICKET_CATEGORY_ESCALATION_PATH[TICKET_CATEGORY.OTHER],
    notification: TICKET_CATEGORY_NOTIFICATIONS[TICKET_CATEGORY.OTHER],
    defaultTags: TICKET_CATEGORY_DEFAULT_TAGS[TICKET_CATEGORY.OTHER],
  },
};
