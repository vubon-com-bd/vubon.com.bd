/**
 * ফিডব্যাক সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ফিডব্যাক আইডি প্রিফিক্স
 */
export const FEEDBACK_ID_PREFIX = 'FB';

/**
 * ফিডব্যাক নম্বর ফরম্যাট
 */
export const FEEDBACK_NUMBER_FORMAT = 'FB-{category}-{sequence}';

/**
 * ফিডব্যাক রেটিং স্কেল (1-5)
 */
export const FEEDBACK_RATING_SCALE_5 = {
  MIN: 1,
  MAX: 5,
} as const;

/**
 * ফিডব্যাক রেটিং স্কেল (1-10)
 */
export const FEEDBACK_RATING_SCALE_10 = {
  MIN: 1,
  MAX: 10,
} as const;

/**
 * ডিফল্ট ফিডব্যাক রেটিং স্কেল
 */
export const DEFAULT_FEEDBACK_RATING_SCALE = FEEDBACK_RATING_SCALE_5;

/**
 * ফিডব্যাক ডেডলাইন (দিনে)
 */
export const FEEDBACK_DEADLINE = 7;

/**
 * ডিফল্ট ফিডব্যাক ক্যাটাগরি
 */
export const DEFAULT_FEEDBACK_CATEGORY = 'general';

/**
 * ফিডব্যাক অ্যানোনিমিটি সেটিংস
 */
export const FEEDBACK_ANONYMITY_SETTINGS = {
  ALLOW_ANONYMOUS: true,
  REQUIRE_EMAIL_FOR_ANONYMOUS: false,
  SHOW_USER_INFO: false,
} as const;

/**
 * ফিডব্যাক রিভিউ পিরিয়ড (দিনে)
 */
export const FEEDBACK_REVIEW_PERIOD = 30;

/**
 * ফিডব্যাক ক্যাটাগরি
 */
export const FEEDBACK_CATEGORY = {
  GENERAL: 'general',
  PRODUCT: 'product',
  SERVICE: 'service',
  SUPPORT: 'support',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  FEATURE_REQUEST: 'feature_request',
  BUG_REPORT: 'bug_report',
  COMPLAINT: 'complaint',
  SUGGESTION: 'suggestion',
  PRAISE: 'praise',
  USABILITY: 'usability',
  PERFORMANCE: 'performance',
  SECURITY: 'security',
  PRIVACY: 'privacy',
  USER_EXPERIENCE: 'user_experience',
  DOCUMENTATION: 'documentation',
  MOBILE_APP: 'mobile_app',
  WEBSITE: 'website',
  API: 'api',
} as const;

/**
 * ফিডব্যাক ক্যাটাগরির ডিসপ্লে নাম
 */
export const FEEDBACK_CATEGORY_DISPLAY_NAMES = {
  [FEEDBACK_CATEGORY.GENERAL]: 'সাধারণ',
  [FEEDBACK_CATEGORY.PRODUCT]: 'পণ্য',
  [FEEDBACK_CATEGORY.SERVICE]: 'সার্ভিস',
  [FEEDBACK_CATEGORY.SUPPORT]: 'সাপোর্ট',
  [FEEDBACK_CATEGORY.TECHNICAL]: 'প্রযুক্তিগত',
  [FEEDBACK_CATEGORY.BILLING]: 'বিলিং',
  [FEEDBACK_CATEGORY.FEATURE_REQUEST]: 'ফিচার রিকোয়েস্ট',
  [FEEDBACK_CATEGORY.BUG_REPORT]: 'বাগ রিপোর্ট',
  [FEEDBACK_CATEGORY.COMPLAINT]: 'অভিযোগ',
  [FEEDBACK_CATEGORY.SUGGESTION]: 'পরামর্শ',
  [FEEDBACK_CATEGORY.PRAISE]: 'প্রশংসা',
  [FEEDBACK_CATEGORY.USABILITY]: 'ব্যবহারযোগ্যতা',
  [FEEDBACK_CATEGORY.PERFORMANCE]: 'পারফরম্যান্স',
  [FEEDBACK_CATEGORY.SECURITY]: 'সিকিউরিটি',
  [FEEDBACK_CATEGORY.PRIVACY]: 'প্রাইভেসি',
  [FEEDBACK_CATEGORY.USER_EXPERIENCE]: 'ব্যবহারকারী অভিজ্ঞতা',
  [FEEDBACK_CATEGORY.DOCUMENTATION]: 'ডকুমেন্টেশন',
  [FEEDBACK_CATEGORY.MOBILE_APP]: 'মোবাইল অ্যাপ',
  [FEEDBACK_CATEGORY.WEBSITE]: 'ওয়েবসাইট',
  [FEEDBACK_CATEGORY.API]: 'এপিআই',
} as const;

/**
 * ফিডব্যাক ক্যাটাগরির আইকন (অনুষঙ্গিক নাম)
 */
export const FEEDBACK_CATEGORY_ICONS = {
  [FEEDBACK_CATEGORY.GENERAL]: 'help-circle',
  [FEEDBACK_CATEGORY.PRODUCT]: 'package',
  [FEEDBACK_CATEGORY.SERVICE]: 'briefcase',
  [FEEDBACK_CATEGORY.SUPPORT]: 'headphones',
  [FEEDBACK_CATEGORY.TECHNICAL]: 'cpu',
  [FEEDBACK_CATEGORY.BILLING]: 'credit-card',
  [FEEDBACK_CATEGORY.FEATURE_REQUEST]: 'star',
  [FEEDBACK_CATEGORY.BUG_REPORT]: 'bug',
  [FEEDBACK_CATEGORY.COMPLAINT]: 'alert-triangle',
  [FEEDBACK_CATEGORY.SUGGESTION]: 'lightbulb',
  [FEEDBACK_CATEGORY.PRAISE]: 'thumbs-up',
  [FEEDBACK_CATEGORY.USABILITY]: 'mouse-pointer',
  [FEEDBACK_CATEGORY.PERFORMANCE]: 'bar-chart',
  [FEEDBACK_CATEGORY.SECURITY]: 'shield',
  [FEEDBACK_CATEGORY.PRIVACY]: 'eye-off',
  [FEEDBACK_CATEGORY.USER_EXPERIENCE]: 'smile',
  [FEEDBACK_CATEGORY.DOCUMENTATION]: 'file-text',
  [FEEDBACK_CATEGORY.MOBILE_APP]: 'smartphone',
  [FEEDBACK_CATEGORY.WEBSITE]: 'globe',
  [FEEDBACK_CATEGORY.API]: 'code',
} as const;

/**
 * ফিডব্যাক ক্যাটাগরির রঙের কোড (হেক্স)
 */
export const FEEDBACK_CATEGORY_COLORS = {
  [FEEDBACK_CATEGORY.GENERAL]: '#95a5a6',
  [FEEDBACK_CATEGORY.PRODUCT]: '#e67e22',
  [FEEDBACK_CATEGORY.SERVICE]: '#1abc9c',
  [FEEDBACK_CATEGORY.SUPPORT]: '#3498db',
  [FEEDBACK_CATEGORY.TECHNICAL]: '#e74c3c',
  [FEEDBACK_CATEGORY.BILLING]: '#2ecc71',
  [FEEDBACK_CATEGORY.FEATURE_REQUEST]: '#9b59b6',
  [FEEDBACK_CATEGORY.BUG_REPORT]: '#c0392b',
  [FEEDBACK_CATEGORY.COMPLAINT]: '#e74c3c',
  [FEEDBACK_CATEGORY.SUGGESTION]: '#f1c40f',
  [FEEDBACK_CATEGORY.PRAISE]: '#2ecc71',
  [FEEDBACK_CATEGORY.USABILITY]: '#3498db',
  [FEEDBACK_CATEGORY.PERFORMANCE]: '#e67e22',
  [FEEDBACK_CATEGORY.SECURITY]: '#c0392b',
  [FEEDBACK_CATEGORY.PRIVACY]: '#7f8c8d',
  [FEEDBACK_CATEGORY.USER_EXPERIENCE]: '#9b59b6',
  [FEEDBACK_CATEGORY.DOCUMENTATION]: '#2980b9',
  [FEEDBACK_CATEGORY.MOBILE_APP]: '#d35400',
  [FEEDBACK_CATEGORY.WEBSITE]: '#34495e',
  [FEEDBACK_CATEGORY.API]: '#16a085',
} as const;

/**
 * ফিডব্যাক স্ট্যাটাস
 */
export const FEEDBACK_STATUS = {
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  ACKNOWLEDGED: 'acknowledged',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  REJECTED: 'rejected',
  DUPLICATE: 'duplicate',
} as const;

/**
 * ফিডব্যাক স্ট্যাটাসের ডিসপ্লে নাম
 */
export const FEEDBACK_STATUS_DISPLAY_NAMES = {
  [FEEDBACK_STATUS.PENDING]: 'মুলতুবি',
  [FEEDBACK_STATUS.IN_REVIEW]: 'পর্যালোচনাধীন',
  [FEEDBACK_STATUS.ACKNOWLEDGED]: 'স্বীকৃত',
  [FEEDBACK_STATUS.IN_PROGRESS]: 'প্রক্রিয়াধীন',
  [FEEDBACK_STATUS.RESOLVED]: 'সমাধানকৃত',
  [FEEDBACK_STATUS.CLOSED]: 'বন্ধ',
  [FEEDBACK_STATUS.REJECTED]: 'প্রত্যাখ্যাত',
  [FEEDBACK_STATUS.DUPLICATE]: 'ডুপ্লিকেট',
} as const;

/**
 * ফিডব্যাক স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const FEEDBACK_STATUS_COLORS = {
  [FEEDBACK_STATUS.PENDING]: '#f39c12',
  [FEEDBACK_STATUS.IN_REVIEW]: '#3498db',
  [FEEDBACK_STATUS.ACKNOWLEDGED]: '#9b59b6',
  [FEEDBACK_STATUS.IN_PROGRESS]: '#e67e22',
  [FEEDBACK_STATUS.RESOLVED]: '#2ecc71',
  [FEEDBACK_STATUS.CLOSED]: '#95a5a6',
  [FEEDBACK_STATUS.REJECTED]: '#e74c3c',
  [FEEDBACK_STATUS.DUPLICATE]: '#7f8c8d',
} as const;

/**
 * ফিডব্যাক প্রায়োরিটি
 */
export const FEEDBACK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * ফিডব্যাক প্রায়োরিটির ডিসপ্লে নাম
 */
export const FEEDBACK_PRIORITY_DISPLAY_NAMES = {
  [FEEDBACK_PRIORITY.LOW]: 'নিম্ন',
  [FEEDBACK_PRIORITY.MEDIUM]: 'মাঝারি',
  [FEEDBACK_PRIORITY.HIGH]: 'উচ্চ',
  [FEEDBACK_PRIORITY.CRITICAL]: 'জটিল',
} as const;

/**
 * ফিডব্যাক ডিফল্ট সেটিংস
 */
export const FEEDBACK_DEFAULT_SETTINGS = {
  defaultCategory: DEFAULT_FEEDBACK_CATEGORY,
  defaultRatingScale: DEFAULT_FEEDBACK_RATING_SCALE,
  deadline: FEEDBACK_DEADLINE,
  reviewPeriod: FEEDBACK_REVIEW_PERIOD,
  allowAnonymous: FEEDBACK_ANONYMITY_SETTINGS.ALLOW_ANONYMOUS,
  requireEmailForAnonymous: FEEDBACK_ANONYMITY_SETTINGS.REQUIRE_EMAIL_FOR_ANONYMOUS,
  showUserInfo: FEEDBACK_ANONYMITY_SETTINGS.SHOW_USER_INFO,
} as const;

/**
 * ফিডব্যাক ভ্যালিডেশন রুলস
 */
export const FEEDBACK_VALIDATION_RULES = {
  title: {
    minLength: 5,
    maxLength: 200,
    required: true,
  },
  description: {
    minLength: 10,
    maxLength: 5000,
    required: true,
  },
  rating: {
    min: 1,
    max: 10,
    required: false,
  },
  tags: {
    maxTags: 10,
    minTagLength: 2,
    maxTagLength: 30,
  },
} as const;

/**
 * ফিডব্যাক ইভেন্ট টাইপ
 */
export const FEEDBACK_EVENT_TYPES = {
  CREATED: 'feedback_created',
  UPDATED: 'feedback_updated',
  REVIEWED: 'feedback_reviewed',
  ACKNOWLEDGED: 'feedback_acknowledged',
  RESOLVED: 'feedback_resolved',
  CLOSED: 'feedback_closed',
  REJECTED: 'feedback_rejected',
  DUPLICATED: 'feedback_duplicated',
} as const;

/**
 * ফিডব্যাক মেট্রিক্স
 */
export const FEEDBACK_METRICS = {
  TOTAL: 'total',
  PENDING: 'pending',
  IN_REVIEW: 'in_review',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  AVERAGE_RATING: 'average_rating',
  RESPONSE_TIME: 'response_time',
  RESOLUTION_TIME: 'resolution_time',
} as const;

export type FeedbackIdPrefix = typeof FEEDBACK_ID_PREFIX;
export type FeedbackCategory = (typeof FEEDBACK_CATEGORY)[keyof typeof FEEDBACK_CATEGORY];
export type FeedbackStatus = (typeof FEEDBACK_STATUS)[keyof typeof FEEDBACK_STATUS];
export type FeedbackPriority = (typeof FEEDBACK_PRIORITY)[keyof typeof FEEDBACK_PRIORITY];
export type FeedbackEventType = (typeof FEEDBACK_EVENT_TYPES)[keyof typeof FEEDBACK_EVENT_TYPES];
export type FeedbackMetric = (typeof FEEDBACK_METRICS)[keyof typeof FEEDBACK_METRICS];

export interface FeedbackRatingScale {
  min: number;
  max: number;
}

export interface FeedbackAnonymitySettings {
  allowAnonymous: boolean;
  requireEmailForAnonymous: boolean;
  showUserInfo: boolean;
}

export interface FeedbackDefaultSettings {
  defaultCategory: string;
  defaultRatingScale: FeedbackRatingScale;
  deadline: number;
  reviewPeriod: number;
  allowAnonymous: boolean;
  requireEmailForAnonymous: boolean;
  showUserInfo: boolean;
}

export interface FeedbackValidationRules {
  title: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  description: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  rating: {
    min: number;
    max: number;
    required: boolean;
  };
  tags: {
    maxTags: number;
    minTagLength: number;
    maxTagLength: number;
  };
}

export interface FeedbackMetadata {
  id: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  status: FeedbackStatus;
  priority: FeedbackPriority;
  rating?: number;
  tags: string[];
  userId?: string;
  email?: string;
  isAnonymous: boolean;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  reviewedAt?: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface FeedbackReview {
  id: string;
  feedbackId: string;
  reviewer: string;
  status: FeedbackStatus;
  comments?: string;
  actionTaken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackAnalytics {
  total: number;
  byCategory: Record<FeedbackCategory, number>;
  byStatus: Record<FeedbackStatus, number>;
  byPriority: Record<FeedbackPriority, number>;
  averageRating: number;
  responseTimeAvg: number;
  resolutionTimeAvg: number;
  period: string;
}

/**
 * ফিডব্যাক ক্যাটাগরি কনফিগারেশন
 */
export const FEEDBACK_CATEGORY_CONFIGS: Record<
  FeedbackCategory,
  {
    category: FeedbackCategory;
    displayName: string;
    icon: string;
    color: string;
  }
> = {
  [FEEDBACK_CATEGORY.GENERAL]: {
    category: FEEDBACK_CATEGORY.GENERAL,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.GENERAL],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.GENERAL],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.GENERAL],
  },
  [FEEDBACK_CATEGORY.PRODUCT]: {
    category: FEEDBACK_CATEGORY.PRODUCT,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.PRODUCT],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.PRODUCT],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.PRODUCT],
  },
  [FEEDBACK_CATEGORY.SERVICE]: {
    category: FEEDBACK_CATEGORY.SERVICE,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.SERVICE],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.SERVICE],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.SERVICE],
  },
  [FEEDBACK_CATEGORY.SUPPORT]: {
    category: FEEDBACK_CATEGORY.SUPPORT,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.SUPPORT],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.SUPPORT],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.SUPPORT],
  },
  [FEEDBACK_CATEGORY.TECHNICAL]: {
    category: FEEDBACK_CATEGORY.TECHNICAL,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.TECHNICAL],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.TECHNICAL],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.TECHNICAL],
  },
  [FEEDBACK_CATEGORY.BILLING]: {
    category: FEEDBACK_CATEGORY.BILLING,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.BILLING],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.BILLING],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.BILLING],
  },
  [FEEDBACK_CATEGORY.FEATURE_REQUEST]: {
    category: FEEDBACK_CATEGORY.FEATURE_REQUEST,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.FEATURE_REQUEST],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.FEATURE_REQUEST],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.FEATURE_REQUEST],
  },
  [FEEDBACK_CATEGORY.BUG_REPORT]: {
    category: FEEDBACK_CATEGORY.BUG_REPORT,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.BUG_REPORT],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.BUG_REPORT],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.BUG_REPORT],
  },
  [FEEDBACK_CATEGORY.COMPLAINT]: {
    category: FEEDBACK_CATEGORY.COMPLAINT,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.COMPLAINT],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.COMPLAINT],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.COMPLAINT],
  },
  [FEEDBACK_CATEGORY.SUGGESTION]: {
    category: FEEDBACK_CATEGORY.SUGGESTION,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.SUGGESTION],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.SUGGESTION],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.SUGGESTION],
  },
  [FEEDBACK_CATEGORY.PRAISE]: {
    category: FEEDBACK_CATEGORY.PRAISE,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.PRAISE],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.PRAISE],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.PRAISE],
  },
  [FEEDBACK_CATEGORY.USABILITY]: {
    category: FEEDBACK_CATEGORY.USABILITY,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.USABILITY],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.USABILITY],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.USABILITY],
  },
  [FEEDBACK_CATEGORY.PERFORMANCE]: {
    category: FEEDBACK_CATEGORY.PERFORMANCE,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.PERFORMANCE],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.PERFORMANCE],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.PERFORMANCE],
  },
  [FEEDBACK_CATEGORY.SECURITY]: {
    category: FEEDBACK_CATEGORY.SECURITY,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.SECURITY],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.SECURITY],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.SECURITY],
  },
  [FEEDBACK_CATEGORY.PRIVACY]: {
    category: FEEDBACK_CATEGORY.PRIVACY,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.PRIVACY],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.PRIVACY],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.PRIVACY],
  },
  [FEEDBACK_CATEGORY.USER_EXPERIENCE]: {
    category: FEEDBACK_CATEGORY.USER_EXPERIENCE,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.USER_EXPERIENCE],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.USER_EXPERIENCE],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.USER_EXPERIENCE],
  },
  [FEEDBACK_CATEGORY.DOCUMENTATION]: {
    category: FEEDBACK_CATEGORY.DOCUMENTATION,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.DOCUMENTATION],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.DOCUMENTATION],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.DOCUMENTATION],
  },
  [FEEDBACK_CATEGORY.MOBILE_APP]: {
    category: FEEDBACK_CATEGORY.MOBILE_APP,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.MOBILE_APP],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.MOBILE_APP],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.MOBILE_APP],
  },
  [FEEDBACK_CATEGORY.WEBSITE]: {
    category: FEEDBACK_CATEGORY.WEBSITE,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.WEBSITE],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.WEBSITE],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.WEBSITE],
  },
  [FEEDBACK_CATEGORY.API]: {
    category: FEEDBACK_CATEGORY.API,
    displayName: FEEDBACK_CATEGORY_DISPLAY_NAMES[FEEDBACK_CATEGORY.API],
    icon: FEEDBACK_CATEGORY_ICONS[FEEDBACK_CATEGORY.API],
    color: FEEDBACK_CATEGORY_COLORS[FEEDBACK_CATEGORY.API],
  },
};

/**
 * ফিডব্যাক কনফিগারেশন
 */
export const FEEDBACK_CONFIG = {
  idPrefix: FEEDBACK_ID_PREFIX,
  numberFormat: FEEDBACK_NUMBER_FORMAT,
  defaultSettings: FEEDBACK_DEFAULT_SETTINGS,
  validationRules: FEEDBACK_VALIDATION_RULES,
  categories: FEEDBACK_CATEGORY_CONFIGS,
  statusColors: FEEDBACK_STATUS_COLORS,
  priorityColors: FEEDBACK_PRIORITY,
} as const;
