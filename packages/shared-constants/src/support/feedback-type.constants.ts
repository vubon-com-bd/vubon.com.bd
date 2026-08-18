/**
 * ফিডব্যাকের বিভিন্ন টাইপ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ফিডব্যাক টাইপ
 */
export const FEEDBACK_TYPE = {
  PRODUCT: 'product',
  SERVICE: 'service',
  SUPPORT: 'support',
  DELIVERY: 'delivery',
  WEBSITE: 'website',
  APP: 'app',
  GENERAL: 'general',
  FEATURE_SUGGESTION: 'feature_suggestion',
  BUG_REPORT: 'bug_report',
  COMPLIMENT: 'compliment',
  COMPLAINT: 'complaint',
  USABILITY: 'usability',
  PERFORMANCE: 'performance',
  SECURITY: 'security',
  PRIVACY: 'privacy',
  DOCUMENTATION: 'documentation',
  BILLING: 'billing',
  CHECKOUT: 'checkout',
  REGISTRATION: 'registration',
  LOGIN: 'login',
  SEARCH: 'search',
  NOTIFICATION: 'notification',
  USER_EXPERIENCE: 'user_experience',
  TECHNICAL: 'technical',
} as const;

/**
 * ফিডব্যাক টাইপের ডিসপ্লে নাম
 */
export const FEEDBACK_TYPE_DISPLAY_NAMES = {
  [FEEDBACK_TYPE.PRODUCT]: 'পণ্য',
  [FEEDBACK_TYPE.SERVICE]: 'সার্ভিস',
  [FEEDBACK_TYPE.SUPPORT]: 'সাপোর্ট',
  [FEEDBACK_TYPE.DELIVERY]: 'ডেলিভারি',
  [FEEDBACK_TYPE.WEBSITE]: 'ওয়েবসাইট',
  [FEEDBACK_TYPE.APP]: 'অ্যাপ',
  [FEEDBACK_TYPE.GENERAL]: 'সাধারণ',
  [FEEDBACK_TYPE.FEATURE_SUGGESTION]: 'ফিচার পরামর্শ',
  [FEEDBACK_TYPE.BUG_REPORT]: 'বাগ রিপোর্ট',
  [FEEDBACK_TYPE.COMPLIMENT]: 'প্রশংসা',
  [FEEDBACK_TYPE.COMPLAINT]: 'অভিযোগ',
  [FEEDBACK_TYPE.USABILITY]: 'ব্যবহারযোগ্যতা',
  [FEEDBACK_TYPE.PERFORMANCE]: 'পারফরম্যান্স',
  [FEEDBACK_TYPE.SECURITY]: 'সিকিউরিটি',
  [FEEDBACK_TYPE.PRIVACY]: 'প্রাইভেসি',
  [FEEDBACK_TYPE.DOCUMENTATION]: 'ডকুমেন্টেশন',
  [FEEDBACK_TYPE.BILLING]: 'বিলিং',
  [FEEDBACK_TYPE.CHECKOUT]: 'চেকআউট',
  [FEEDBACK_TYPE.REGISTRATION]: 'রেজিস্ট্রেশন',
  [FEEDBACK_TYPE.LOGIN]: 'লগইন',
  [FEEDBACK_TYPE.SEARCH]: 'সার্চ',
  [FEEDBACK_TYPE.NOTIFICATION]: 'নোটিফিকেশন',
  [FEEDBACK_TYPE.USER_EXPERIENCE]: 'ব্যবহারকারী অভিজ্ঞতা',
  [FEEDBACK_TYPE.TECHNICAL]: 'প্রযুক্তিগত',
} as const;

/**
 * ফিডব্যাক টাইপের আইকন (অনুষঙ্গিক নাম)
 */
export const FEEDBACK_TYPE_ICONS = {
  [FEEDBACK_TYPE.PRODUCT]: 'package',
  [FEEDBACK_TYPE.SERVICE]: 'briefcase',
  [FEEDBACK_TYPE.SUPPORT]: 'headphones',
  [FEEDBACK_TYPE.DELIVERY]: 'truck',
  [FEEDBACK_TYPE.WEBSITE]: 'globe',
  [FEEDBACK_TYPE.APP]: 'smartphone',
  [FEEDBACK_TYPE.GENERAL]: 'help-circle',
  [FEEDBACK_TYPE.FEATURE_SUGGESTION]: 'lightbulb',
  [FEEDBACK_TYPE.BUG_REPORT]: 'bug',
  [FEEDBACK_TYPE.COMPLIMENT]: 'thumbs-up',
  [FEEDBACK_TYPE.COMPLAINT]: 'alert-triangle',
  [FEEDBACK_TYPE.USABILITY]: 'mouse-pointer',
  [FEEDBACK_TYPE.PERFORMANCE]: 'bar-chart',
  [FEEDBACK_TYPE.SECURITY]: 'shield',
  [FEEDBACK_TYPE.PRIVACY]: 'eye-off',
  [FEEDBACK_TYPE.DOCUMENTATION]: 'file-text',
  [FEEDBACK_TYPE.BILLING]: 'credit-card',
  [FEEDBACK_TYPE.CHECKOUT]: 'shopping-cart',
  [FEEDBACK_TYPE.REGISTRATION]: 'user-plus',
  [FEEDBACK_TYPE.LOGIN]: 'log-in',
  [FEEDBACK_TYPE.SEARCH]: 'search',
  [FEEDBACK_TYPE.NOTIFICATION]: 'bell',
  [FEEDBACK_TYPE.USER_EXPERIENCE]: 'smile',
  [FEEDBACK_TYPE.TECHNICAL]: 'cpu',
} as const;

/**
 * ফিডব্যাক টাইপের রঙের কোড (হেক্স)
 */
export const FEEDBACK_TYPE_COLORS = {
  [FEEDBACK_TYPE.PRODUCT]: '#e67e22',
  [FEEDBACK_TYPE.SERVICE]: '#1abc9c',
  [FEEDBACK_TYPE.SUPPORT]: '#3498db',
  [FEEDBACK_TYPE.DELIVERY]: '#f39c12',
  [FEEDBACK_TYPE.WEBSITE]: '#9b59b6',
  [FEEDBACK_TYPE.APP]: '#2ecc71',
  [FEEDBACK_TYPE.GENERAL]: '#95a5a6',
  [FEEDBACK_TYPE.FEATURE_SUGGESTION]: '#9b59b6',
  [FEEDBACK_TYPE.BUG_REPORT]: '#c0392b',
  [FEEDBACK_TYPE.COMPLIMENT]: '#2ecc71',
  [FEEDBACK_TYPE.COMPLAINT]: '#e74c3c',
  [FEEDBACK_TYPE.USABILITY]: '#3498db',
  [FEEDBACK_TYPE.PERFORMANCE]: '#e67e22',
  [FEEDBACK_TYPE.SECURITY]: '#c0392b',
  [FEEDBACK_TYPE.PRIVACY]: '#7f8c8d',
  [FEEDBACK_TYPE.DOCUMENTATION]: '#2980b9',
  [FEEDBACK_TYPE.BILLING]: '#27ae60',
  [FEEDBACK_TYPE.CHECKOUT]: '#e67e22',
  [FEEDBACK_TYPE.REGISTRATION]: '#2ecc71',
  [FEEDBACK_TYPE.LOGIN]: '#3498db',
  [FEEDBACK_TYPE.SEARCH]: '#95a5a6',
  [FEEDBACK_TYPE.NOTIFICATION]: '#f39c12',
  [FEEDBACK_TYPE.USER_EXPERIENCE]: '#9b59b6',
  [FEEDBACK_TYPE.TECHNICAL]: '#e74c3c',
} as const;

/**
 * ফিডব্যাক টাইপের ক্যাটাগরি
 */
export const FEEDBACK_TYPE_CATEGORIES = {
  [FEEDBACK_TYPE.PRODUCT]: 'product',
  [FEEDBACK_TYPE.SERVICE]: 'service',
  [FEEDBACK_TYPE.SUPPORT]: 'support',
  [FEEDBACK_TYPE.DELIVERY]: 'logistics',
  [FEEDBACK_TYPE.WEBSITE]: 'platform',
  [FEEDBACK_TYPE.APP]: 'platform',
  [FEEDBACK_TYPE.GENERAL]: 'general',
  [FEEDBACK_TYPE.FEATURE_SUGGESTION]: 'suggestion',
  [FEEDBACK_TYPE.BUG_REPORT]: 'issue',
  [FEEDBACK_TYPE.COMPLIMENT]: 'feedback',
  [FEEDBACK_TYPE.COMPLAINT]: 'issue',
  [FEEDBACK_TYPE.USABILITY]: 'ux',
  [FEEDBACK_TYPE.PERFORMANCE]: 'technical',
  [FEEDBACK_TYPE.SECURITY]: 'security',
  [FEEDBACK_TYPE.PRIVACY]: 'security',
  [FEEDBACK_TYPE.DOCUMENTATION]: 'knowledge',
  [FEEDBACK_TYPE.BILLING]: 'financial',
  [FEEDBACK_TYPE.CHECKOUT]: 'financial',
  [FEEDBACK_TYPE.REGISTRATION]: 'account',
  [FEEDBACK_TYPE.LOGIN]: 'account',
  [FEEDBACK_TYPE.SEARCH]: 'functionality',
  [FEEDBACK_TYPE.NOTIFICATION]: 'functionality',
  [FEEDBACK_TYPE.USER_EXPERIENCE]: 'ux',
  [FEEDBACK_TYPE.TECHNICAL]: 'technical',
} as const;

/**
 * ফিডব্যাক টাইপের ডিফল্ট প্রায়োরিটি
 */
export const FEEDBACK_TYPE_DEFAULT_PRIORITY = {
  [FEEDBACK_TYPE.PRODUCT]: 'medium',
  [FEEDBACK_TYPE.SERVICE]: 'medium',
  [FEEDBACK_TYPE.SUPPORT]: 'high',
  [FEEDBACK_TYPE.DELIVERY]: 'high',
  [FEEDBACK_TYPE.WEBSITE]: 'medium',
  [FEEDBACK_TYPE.APP]: 'medium',
  [FEEDBACK_TYPE.GENERAL]: 'low',
  [FEEDBACK_TYPE.FEATURE_SUGGESTION]: 'low',
  [FEEDBACK_TYPE.BUG_REPORT]: 'high',
  [FEEDBACK_TYPE.COMPLIMENT]: 'low',
  [FEEDBACK_TYPE.COMPLAINT]: 'high',
  [FEEDBACK_TYPE.USABILITY]: 'medium',
  [FEEDBACK_TYPE.PERFORMANCE]: 'high',
  [FEEDBACK_TYPE.SECURITY]: 'critical',
  [FEEDBACK_TYPE.PRIVACY]: 'high',
  [FEEDBACK_TYPE.DOCUMENTATION]: 'low',
  [FEEDBACK_TYPE.BILLING]: 'high',
  [FEEDBACK_TYPE.CHECKOUT]: 'high',
  [FEEDBACK_TYPE.REGISTRATION]: 'medium',
  [FEEDBACK_TYPE.LOGIN]: 'medium',
  [FEEDBACK_TYPE.SEARCH]: 'medium',
  [FEEDBACK_TYPE.NOTIFICATION]: 'medium',
  [FEEDBACK_TYPE.USER_EXPERIENCE]: 'medium',
  [FEEDBACK_TYPE.TECHNICAL]: 'high',
} as const;

/**
 * ফিডব্যাক টাইপের ডিফল্ট স্ট্যাটাস
 */
export const FEEDBACK_TYPE_DEFAULT_STATUS = {
  [FEEDBACK_TYPE.PRODUCT]: 'pending',
  [FEEDBACK_TYPE.SERVICE]: 'pending',
  [FEEDBACK_TYPE.SUPPORT]: 'pending',
  [FEEDBACK_TYPE.DELIVERY]: 'pending',
  [FEEDBACK_TYPE.WEBSITE]: 'pending',
  [FEEDBACK_TYPE.APP]: 'pending',
  [FEEDBACK_TYPE.GENERAL]: 'pending',
  [FEEDBACK_TYPE.FEATURE_SUGGESTION]: 'pending',
  [FEEDBACK_TYPE.BUG_REPORT]: 'pending',
  [FEEDBACK_TYPE.COMPLIMENT]: 'pending',
  [FEEDBACK_TYPE.COMPLAINT]: 'pending',
  [FEEDBACK_TYPE.USABILITY]: 'pending',
  [FEEDBACK_TYPE.PERFORMANCE]: 'pending',
  [FEEDBACK_TYPE.SECURITY]: 'pending',
  [FEEDBACK_TYPE.PRIVACY]: 'pending',
  [FEEDBACK_TYPE.DOCUMENTATION]: 'pending',
  [FEEDBACK_TYPE.BILLING]: 'pending',
  [FEEDBACK_TYPE.CHECKOUT]: 'pending',
  [FEEDBACK_TYPE.REGISTRATION]: 'pending',
  [FEEDBACK_TYPE.LOGIN]: 'pending',
  [FEEDBACK_TYPE.SEARCH]: 'pending',
  [FEEDBACK_TYPE.NOTIFICATION]: 'pending',
  [FEEDBACK_TYPE.USER_EXPERIENCE]: 'pending',
  [FEEDBACK_TYPE.TECHNICAL]: 'pending',
} as const;

/**
 * ফিডব্যাক টাইপের গ্রুপ
 */
export const FEEDBACK_TYPE_GROUPS = {
  PRODUCT: ['product', 'service', 'delivery'],
  PLATFORM: ['website', 'app'],
  FEEDBACK: ['general', 'compliment', 'complaint', 'feature_suggestion'],
  TECHNICAL: ['bug_report', 'performance', 'security', 'privacy', 'technical', 'usability'],
  ACCOUNT: ['registration', 'login', 'billing', 'checkout'],
  FUNCTIONALITY: ['search', 'notification', 'documentation'],
  UX: ['user_experience', 'usability'],
  SUPPORT: ['support'],
} as const;

export type FeedbackType = (typeof FEEDBACK_TYPE)[keyof typeof FEEDBACK_TYPE];
export type FeedbackTypeDisplayNames = typeof FEEDBACK_TYPE_DISPLAY_NAMES;
export type FeedbackTypeIcons = typeof FEEDBACK_TYPE_ICONS;
export type FeedbackTypeColors = typeof FEEDBACK_TYPE_COLORS;
export type FeedbackTypeCategories = typeof FEEDBACK_TYPE_CATEGORIES;
export type FeedbackTypeDefaultPriority = typeof FEEDBACK_TYPE_DEFAULT_PRIORITY;
export type FeedbackTypeDefaultStatus = typeof FEEDBACK_TYPE_DEFAULT_STATUS;
export type FeedbackTypeGroups = typeof FEEDBACK_TYPE_GROUPS;

export type FeedbackTypeGroup = keyof typeof FEEDBACK_TYPE_GROUPS;

export interface FeedbackTypeConfig {
  type: FeedbackType;
  displayName: string;
  icon: string;
  color: string;
  category: string;
  defaultPriority: 'low' | 'medium' | 'high' | 'critical';
  defaultStatus: string;
  group: FeedbackTypeGroup;
  description?: string;
}

/**
 * ফিডব্যাক টাইপ কনফিগারেশন অবজেক্ট
 */
export const FEEDBACK_TYPE_CONFIGS: Record<FeedbackType, FeedbackTypeConfig> = {
  [FEEDBACK_TYPE.PRODUCT]: {
    type: FEEDBACK_TYPE.PRODUCT,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.PRODUCT],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.PRODUCT],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.PRODUCT],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.PRODUCT],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.PRODUCT] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.PRODUCT],
    group: 'PRODUCT',
    description: 'পণ্য সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.SERVICE]: {
    type: FEEDBACK_TYPE.SERVICE,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.SERVICE],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.SERVICE],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.SERVICE],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.SERVICE],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.SERVICE] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.SERVICE],
    group: 'PRODUCT',
    description: 'সার্ভিস সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.SUPPORT]: {
    type: FEEDBACK_TYPE.SUPPORT,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.SUPPORT],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.SUPPORT],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.SUPPORT],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.SUPPORT],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.SUPPORT] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.SUPPORT],
    group: 'SUPPORT',
    description: 'সাপোর্ট সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.DELIVERY]: {
    type: FEEDBACK_TYPE.DELIVERY,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.DELIVERY],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.DELIVERY],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.DELIVERY],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.DELIVERY],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.DELIVERY] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.DELIVERY],
    group: 'PRODUCT',
    description: 'ডেলিভারি সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.WEBSITE]: {
    type: FEEDBACK_TYPE.WEBSITE,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.WEBSITE],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.WEBSITE],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.WEBSITE],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.WEBSITE],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.WEBSITE] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.WEBSITE],
    group: 'PLATFORM',
    description: 'ওয়েবসাইট সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.APP]: {
    type: FEEDBACK_TYPE.APP,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.APP],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.APP],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.APP],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.APP],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.APP] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.APP],
    group: 'PLATFORM',
    description: 'মোবাইল অ্যাপ সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.GENERAL]: {
    type: FEEDBACK_TYPE.GENERAL,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.GENERAL],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.GENERAL],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.GENERAL],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.GENERAL],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.GENERAL] as 'low',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.GENERAL],
    group: 'FEEDBACK',
    description: 'সাধারণ ফিডব্যাক',
  },
  [FEEDBACK_TYPE.FEATURE_SUGGESTION]: {
    type: FEEDBACK_TYPE.FEATURE_SUGGESTION,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.FEATURE_SUGGESTION],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.FEATURE_SUGGESTION],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.FEATURE_SUGGESTION],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.FEATURE_SUGGESTION],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.FEATURE_SUGGESTION] as 'low',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.FEATURE_SUGGESTION],
    group: 'FEEDBACK',
    description: 'নতুন ফিচারের জন্য পরামর্শ',
  },
  [FEEDBACK_TYPE.BUG_REPORT]: {
    type: FEEDBACK_TYPE.BUG_REPORT,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.BUG_REPORT],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.BUG_REPORT],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.BUG_REPORT],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.BUG_REPORT],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.BUG_REPORT] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.BUG_REPORT],
    group: 'TECHNICAL',
    description: 'বাগ বা ত্রুটি রিপোর্ট',
  },
  [FEEDBACK_TYPE.COMPLIMENT]: {
    type: FEEDBACK_TYPE.COMPLIMENT,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.COMPLIMENT],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.COMPLIMENT],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.COMPLIMENT],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.COMPLIMENT],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.COMPLIMENT] as 'low',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.COMPLIMENT],
    group: 'FEEDBACK',
    description: 'প্রশংসা বা ভালো লাগার মতামত',
  },
  [FEEDBACK_TYPE.COMPLAINT]: {
    type: FEEDBACK_TYPE.COMPLAINT,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.COMPLAINT],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.COMPLAINT],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.COMPLAINT],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.COMPLAINT],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.COMPLAINT] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.COMPLAINT],
    group: 'FEEDBACK',
    description: 'অভিযোগ বা অসন্তোষ প্রকাশ',
  },
  [FEEDBACK_TYPE.USABILITY]: {
    type: FEEDBACK_TYPE.USABILITY,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.USABILITY],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.USABILITY],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.USABILITY],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.USABILITY],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.USABILITY] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.USABILITY],
    group: 'UX',
    description: 'ব্যবহারযোগ্যতা সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.PERFORMANCE]: {
    type: FEEDBACK_TYPE.PERFORMANCE,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.PERFORMANCE],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.PERFORMANCE],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.PERFORMANCE],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.PERFORMANCE],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.PERFORMANCE] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.PERFORMANCE],
    group: 'TECHNICAL',
    description: 'পারফরম্যান্স সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.SECURITY]: {
    type: FEEDBACK_TYPE.SECURITY,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.SECURITY],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.SECURITY],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.SECURITY],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.SECURITY],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.SECURITY] as 'critical',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.SECURITY],
    group: 'TECHNICAL',
    description: 'সিকিউরিটি সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.PRIVACY]: {
    type: FEEDBACK_TYPE.PRIVACY,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.PRIVACY],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.PRIVACY],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.PRIVACY],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.PRIVACY],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.PRIVACY] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.PRIVACY],
    group: 'TECHNICAL',
    description: 'প্রাইভেসি সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.DOCUMENTATION]: {
    type: FEEDBACK_TYPE.DOCUMENTATION,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.DOCUMENTATION],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.DOCUMENTATION],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.DOCUMENTATION],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.DOCUMENTATION],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.DOCUMENTATION] as 'low',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.DOCUMENTATION],
    group: 'FUNCTIONALITY',
    description: 'ডকুমেন্টেশন সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.BILLING]: {
    type: FEEDBACK_TYPE.BILLING,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.BILLING],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.BILLING],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.BILLING],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.BILLING],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.BILLING] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.BILLING],
    group: 'ACCOUNT',
    description: 'বিলিং সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.CHECKOUT]: {
    type: FEEDBACK_TYPE.CHECKOUT,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.CHECKOUT],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.CHECKOUT],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.CHECKOUT],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.CHECKOUT],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.CHECKOUT] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.CHECKOUT],
    group: 'ACCOUNT',
    description: 'চেকআউট সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.REGISTRATION]: {
    type: FEEDBACK_TYPE.REGISTRATION,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.REGISTRATION],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.REGISTRATION],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.REGISTRATION],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.REGISTRATION],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.REGISTRATION] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.REGISTRATION],
    group: 'ACCOUNT',
    description: 'রেজিস্ট্রেশন সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.LOGIN]: {
    type: FEEDBACK_TYPE.LOGIN,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.LOGIN],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.LOGIN],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.LOGIN],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.LOGIN],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.LOGIN] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.LOGIN],
    group: 'ACCOUNT',
    description: 'লগইন সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.SEARCH]: {
    type: FEEDBACK_TYPE.SEARCH,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.SEARCH],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.SEARCH],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.SEARCH],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.SEARCH],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.SEARCH] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.SEARCH],
    group: 'FUNCTIONALITY',
    description: 'সার্চ সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.NOTIFICATION]: {
    type: FEEDBACK_TYPE.NOTIFICATION,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.NOTIFICATION],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.NOTIFICATION],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.NOTIFICATION],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.NOTIFICATION],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.NOTIFICATION] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.NOTIFICATION],
    group: 'FUNCTIONALITY',
    description: 'নোটিফিকেশন সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.USER_EXPERIENCE]: {
    type: FEEDBACK_TYPE.USER_EXPERIENCE,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.USER_EXPERIENCE],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.USER_EXPERIENCE],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.USER_EXPERIENCE],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.USER_EXPERIENCE],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.USER_EXPERIENCE] as 'medium',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.USER_EXPERIENCE],
    group: 'UX',
    description: 'ব্যবহারকারী অভিজ্ঞতা সম্পর্কিত ফিডব্যাক',
  },
  [FEEDBACK_TYPE.TECHNICAL]: {
    type: FEEDBACK_TYPE.TECHNICAL,
    displayName: FEEDBACK_TYPE_DISPLAY_NAMES[FEEDBACK_TYPE.TECHNICAL],
    icon: FEEDBACK_TYPE_ICONS[FEEDBACK_TYPE.TECHNICAL],
    color: FEEDBACK_TYPE_COLORS[FEEDBACK_TYPE.TECHNICAL],
    category: FEEDBACK_TYPE_CATEGORIES[FEEDBACK_TYPE.TECHNICAL],
    defaultPriority: FEEDBACK_TYPE_DEFAULT_PRIORITY[FEEDBACK_TYPE.TECHNICAL] as 'high',
    defaultStatus: FEEDBACK_TYPE_DEFAULT_STATUS[FEEDBACK_TYPE.TECHNICAL],
    group: 'TECHNICAL',
    description: 'প্রযুক্তিগত বিষয় সম্পর্কিত ফিডব্যাক',
  },
};

/**
 * ফিডব্যাক টাইপ গ্রুপ কনফিগারেশন
 */
export const FEEDBACK_TYPE_GROUP_CONFIGS: Record<
  FeedbackTypeGroup,
  {
    group: FeedbackTypeGroup;
    displayName: string;
    icon: string;
    color: string;
    types: readonly FeedbackType[];
    description?: string;
  }
> = {
  PRODUCT: {
    group: 'PRODUCT',
    displayName: 'পণ্য ও সার্ভিস',
    icon: 'package',
    color: '#e67e22',
    types: ['product', 'service', 'delivery'] as const,
    description: 'পণ্য, সার্ভিস এবং ডেলিভারি সম্পর্কিত ফিডব্যাক',
  },
  PLATFORM: {
    group: 'PLATFORM',
    displayName: 'প্ল্যাটফর্ম',
    icon: 'globe',
    color: '#9b59b6',
    types: ['website', 'app'] as const,
    description: 'ওয়েবসাইট ও অ্যাপ সম্পর্কিত ফিডব্যাক',
  },
  FEEDBACK: {
    group: 'FEEDBACK',
    displayName: 'মতামত',
    icon: 'message-square',
    color: '#95a5a6',
    types: ['general', 'compliment', 'complaint', 'feature_suggestion'] as const,
    description: 'সাধারণ মতামত, প্রশংসা, অভিযোগ ও পরামর্শ',
  },
  TECHNICAL: {
    group: 'TECHNICAL',
    displayName: 'প্রযুক্তিগত',
    icon: 'cpu',
    color: '#e74c3c',
    types: ['bug_report', 'performance', 'security', 'privacy', 'technical', 'usability'] as const,
    description: 'প্রযুক্তিগত বিষয়, বাগ, পারফরম্যান্স ও সিকিউরিটি',
  },
  ACCOUNT: {
    group: 'ACCOUNT',
    displayName: 'অ্যাকাউন্ট',
    icon: 'user',
    color: '#2ecc71',
    types: ['registration', 'login', 'billing', 'checkout'] as const,
    description: 'অ্যাকাউন্ট, রেজিস্ট্রেশন, লগইন ও বিলিং সংক্রান্ত ফিডব্যাক',
  },
  FUNCTIONALITY: {
    group: 'FUNCTIONALITY',
    displayName: 'ফাংশনালিটি',
    icon: 'zap',
    color: '#3498db',
    types: ['search', 'notification', 'documentation'] as const,
    description: 'সার্চ, নোটিফিকেশন ও ডকুমেন্টেশন সম্পর্কিত ফিডব্যাক',
  },
  UX: {
    group: 'UX',
    displayName: 'ব্যবহারকারী অভিজ্ঞতা',
    icon: 'smile',
    color: '#9b59b6',
    types: ['user_experience', 'usability'] as const,
    description: 'ব্যবহারকারী অভিজ্ঞতা ও ব্যবহারযোগ্যতা সম্পর্কিত ফিডব্যাক',
  },
  SUPPORT: {
    group: 'SUPPORT',
    displayName: 'সাপোর্ট',
    icon: 'headphones',
    color: '#3498db',
    types: ['support'] as const,
    description: 'সাপোর্ট সার্ভিস সম্পর্কিত ফিডব্যাক',
  },
};

/**
 * ফিডব্যাক টাইপ স্ট্যাটাস
 */
export const FEEDBACK_TYPE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DEPRECATED: 'deprecated',
} as const;

export type FeedbackTypeStatus = (typeof FEEDBACK_TYPE_STATUS)[keyof typeof FEEDBACK_TYPE_STATUS];
