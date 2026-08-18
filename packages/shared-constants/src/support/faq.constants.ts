/**
 * FAQ সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * FAQ আইডি প্রিফিক্স
 */
export const FAQ_ID_PREFIX = 'FAQ';

/**
 * FAQ নম্বর ফরম্যাট
 */
export const FAQ_NUMBER_FORMAT = 'FAQ-{category}-{sequence}';

/**
 * FAQ আইটেম পার পেজ (ডিফল্ট)
 */
export const FAQ_ITEMS_PER_PAGE = 10;

/**
 * ডিফল্ট FAQ সর্ট অর্ডার
 */
export const DEFAULT_FAQ_SORT_ORDER = {
  field: 'createdAt',
  order: 'desc',
} as const;

/**
 * FAQ সার্চ রেজাল্ট লিমিট
 */
export const FAQ_SEARCH_RESULT_LIMIT = 50;

/**
 * ডিফল্ট FAQ ল্যাঙ্গুয়েজ
 */
export const DEFAULT_FAQ_LANGUAGE = 'bn';

/**
 * FAQ ভিউ কাউন্ট ট্র্যাকিং পিরিয়ড (দিনে)
 */
export const FAQ_VIEW_COUNT_TRACKING_PERIOD = 30;

/**
 * FAQ হেল্পফুল রেটিং থ্রেশহোল্ড (%)
 */
export const FAQ_HELPFUL_RATING_THRESHOLD = 70;

/**
 * FAQ ক্যাটাগরি
 */
export const FAQ_CATEGORY = {
  GENERAL: 'general',
  ACCOUNT: 'account',
  BILLING: 'billing',
  TECHNICAL: 'technical',
  PRODUCT: 'product',
  SERVICE: 'service',
  SHIPPING: 'shipping',
  RETURNS: 'returns',
  WARRANTY: 'warranty',
  SECURITY: 'security',
  PRIVACY: 'privacy',
  PAYMENT: 'payment',
  SUBSCRIPTION: 'subscription',
  TROUBLESHOOTING: 'troubleshooting',
  FEATURES: 'features',
  INTEGRATION: 'integration',
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
  API: 'api',
} as const;

/**
 * FAQ ক্যাটাগরির ডিসপ্লে নাম
 */
export const FAQ_CATEGORY_DISPLAY_NAMES = {
  [FAQ_CATEGORY.GENERAL]: 'সাধারণ',
  [FAQ_CATEGORY.ACCOUNT]: 'অ্যাকাউন্ট',
  [FAQ_CATEGORY.BILLING]: 'বিলিং',
  [FAQ_CATEGORY.TECHNICAL]: 'প্রযুক্তিগত',
  [FAQ_CATEGORY.PRODUCT]: 'পণ্য',
  [FAQ_CATEGORY.SERVICE]: 'সার্ভিস',
  [FAQ_CATEGORY.SHIPPING]: 'শিপিং',
  [FAQ_CATEGORY.RETURNS]: 'রিটার্নস',
  [FAQ_CATEGORY.WARRANTY]: 'ওয়ারেন্টি',
  [FAQ_CATEGORY.SECURITY]: 'সিকিউরিটি',
  [FAQ_CATEGORY.PRIVACY]: 'প্রাইভেসি',
  [FAQ_CATEGORY.PAYMENT]: 'পেমেন্ট',
  [FAQ_CATEGORY.SUBSCRIPTION]: 'সাবস্ক্রিপশন',
  [FAQ_CATEGORY.TROUBLESHOOTING]: 'ট্রাবলশুটিং',
  [FAQ_CATEGORY.FEATURES]: 'ফিচারসমূহ',
  [FAQ_CATEGORY.INTEGRATION]: 'ইন্টিগ্রেশন',
  [FAQ_CATEGORY.MOBILE]: 'মোবাইল',
  [FAQ_CATEGORY.DESKTOP]: 'ডেস্কটপ',
  [FAQ_CATEGORY.API]: 'এপিআই',
} as const;

/**
 * FAQ ক্যাটাগরির আইকন (অনুষঙ্গিক নাম)
 */
export const FAQ_CATEGORY_ICONS = {
  [FAQ_CATEGORY.GENERAL]: 'help-circle',
  [FAQ_CATEGORY.ACCOUNT]: 'user',
  [FAQ_CATEGORY.BILLING]: 'credit-card',
  [FAQ_CATEGORY.TECHNICAL]: 'cpu',
  [FAQ_CATEGORY.PRODUCT]: 'package',
  [FAQ_CATEGORY.SERVICE]: 'briefcase',
  [FAQ_CATEGORY.SHIPPING]: 'truck',
  [FAQ_CATEGORY.RETURNS]: 'rotate-ccw',
  [FAQ_CATEGORY.WARRANTY]: 'shield',
  [FAQ_CATEGORY.SECURITY]: 'lock',
  [FAQ_CATEGORY.PRIVACY]: 'eye-off',
  [FAQ_CATEGORY.PAYMENT]: 'dollar-sign',
  [FAQ_CATEGORY.SUBSCRIPTION]: 'repeat',
  [FAQ_CATEGORY.TROUBLESHOOTING]: 'wrench',
  [FAQ_CATEGORY.FEATURES]: 'star',
  [FAQ_CATEGORY.INTEGRATION]: 'link',
  [FAQ_CATEGORY.MOBILE]: 'smartphone',
  [FAQ_CATEGORY.DESKTOP]: 'monitor',
  [FAQ_CATEGORY.API]: 'code',
} as const;

/**
 * FAQ ক্যাটাগরির রঙের কোড (হেক্স)
 */
export const FAQ_CATEGORY_COLORS = {
  [FAQ_CATEGORY.GENERAL]: '#3498db',
  [FAQ_CATEGORY.ACCOUNT]: '#9b59b6',
  [FAQ_CATEGORY.BILLING]: '#2ecc71',
  [FAQ_CATEGORY.TECHNICAL]: '#e74c3c',
  [FAQ_CATEGORY.PRODUCT]: '#e67e22',
  [FAQ_CATEGORY.SERVICE]: '#1abc9c',
  [FAQ_CATEGORY.SHIPPING]: '#f39c12',
  [FAQ_CATEGORY.RETURNS]: '#e74c3c',
  [FAQ_CATEGORY.WARRANTY]: '#2c3e50',
  [FAQ_CATEGORY.SECURITY]: '#c0392b',
  [FAQ_CATEGORY.PRIVACY]: '#7f8c8d',
  [FAQ_CATEGORY.PAYMENT]: '#27ae60',
  [FAQ_CATEGORY.SUBSCRIPTION]: '#8e44ad',
  [FAQ_CATEGORY.TROUBLESHOOTING]: '#e67e22',
  [FAQ_CATEGORY.FEATURES]: '#f1c40f',
  [FAQ_CATEGORY.INTEGRATION]: '#16a085',
  [FAQ_CATEGORY.MOBILE]: '#d35400',
  [FAQ_CATEGORY.DESKTOP]: '#34495e',
  [FAQ_CATEGORY.API]: '#2980b9',
} as const;

/**
 * FAQ স্ট্যাটাস
 */
export const FAQ_STATUS = {
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  PENDING_REVIEW: 'pending_review',
  REJECTED: 'rejected',
} as const;

/**
 * FAQ স্ট্যাটাসের ডিসপ্লে নাম
 */
export const FAQ_STATUS_DISPLAY_NAMES = {
  [FAQ_STATUS.PUBLISHED]: 'প্রকাশিত',
  [FAQ_STATUS.DRAFT]: 'খসড়া',
  [FAQ_STATUS.ARCHIVED]: 'আর্কাইভড',
  [FAQ_STATUS.PENDING_REVIEW]: 'পর্যালোচনার অপেক্ষায়',
  [FAQ_STATUS.REJECTED]: 'প্রত্যাখ্যাত',
} as const;

/**
 * FAQ স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const FAQ_STATUS_COLORS = {
  [FAQ_STATUS.PUBLISHED]: '#2ecc71',
  [FAQ_STATUS.DRAFT]: '#95a5a6',
  [FAQ_STATUS.ARCHIVED]: '#7f8c8d',
  [FAQ_STATUS.PENDING_REVIEW]: '#f39c12',
  [FAQ_STATUS.REJECTED]: '#e74c3c',
} as const;

/**
 * FAQ ডিফল্ট সেটিংস
 */
export const FAQ_DEFAULT_SETTINGS = {
  itemsPerPage: FAQ_ITEMS_PER_PAGE,
  sortOrder: DEFAULT_FAQ_SORT_ORDER,
  searchLimit: FAQ_SEARCH_RESULT_LIMIT,
  defaultLanguage: DEFAULT_FAQ_LANGUAGE,
  viewCountPeriod: FAQ_VIEW_COUNT_TRACKING_PERIOD,
  helpfulThreshold: FAQ_HELPFUL_RATING_THRESHOLD,
} as const;

/**
 * FAQ টাইপ
 */
export const FAQ_TYPE = {
  GENERAL: 'general',
  TECHNICAL: 'technical',
  TROUBLESHOOTING: 'troubleshooting',
  HOW_TO: 'how_to',
  DEFINITION: 'definition',
} as const;

/**
 * FAQ টাইপের ডিসপ্লে নাম
 */
export const FAQ_TYPE_DISPLAY_NAMES = {
  [FAQ_TYPE.GENERAL]: 'সাধারণ',
  [FAQ_TYPE.TECHNICAL]: 'প্রযুক্তিগত',
  [FAQ_TYPE.TROUBLESHOOTING]: 'ট্রাবলশুটিং',
  [FAQ_TYPE.HOW_TO]: 'কিভাবে করবেন',
  [FAQ_TYPE.DEFINITION]: 'সংজ্ঞা',
} as const;

/**
 * FAQ ফিল্টার অপশন
 */
export const FAQ_FILTER_OPTIONS = {
  CATEGORY: 'category',
  STATUS: 'status',
  TYPE: 'type',
  LANGUAGE: 'language',
  DATE_RANGE: 'date_range',
  SEARCH: 'search',
  TAGS: 'tags',
} as const;

/**
 * FAQ সর্ট অপশন
 */
export const FAQ_SORT_OPTIONS = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  VIEWS: 'views',
  HELPFUL_COUNT: 'helpfulCount',
  NOT_HELPFUL_COUNT: 'notHelpfulCount',
  TITLE: 'title',
  ORDER: 'order',
} as const;

/**
 * FAQ রেটিং টাইপ
 */
export const FAQ_RATING_TYPE = {
  HELPFUL: 'helpful',
  NOT_HELPFUL: 'not_helpful',
} as const;

/**
 * FAQ ভ্যালিডেশন রুলস
 */
export const FAQ_VALIDATION_RULES = {
  title: {
    minLength: 5,
    maxLength: 200,
    required: true,
  },
  question: {
    minLength: 10,
    maxLength: 500,
    required: true,
  },
  answer: {
    minLength: 20,
    maxLength: 10000,
    required: true,
  },
  tags: {
    maxTags: 10,
    minTagLength: 2,
    maxTagLength: 30,
  },
} as const;

/**
 * FAQ ইভেন্ট টাইপ
 */
export const FAQ_EVENT_TYPES = {
  CREATED: 'faq_created',
  UPDATED: 'faq_updated',
  PUBLISHED: 'faq_published',
  ARCHIVED: 'faq_archived',
  VIEWED: 'faq_viewed',
  RATED_HELPFUL: 'faq_rated_helpful',
  RATED_NOT_HELPFUL: 'faq_rated_not_helpful',
  SEARCHED: 'faq_searched',
} as const;

/**
 * FAQ মেট্রিক্স
 */
export const FAQ_METRICS = {
  TOTAL: 'total',
  PUBLISHED: 'published',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  VIEWS: 'views',
  HELPFUL_RATE: 'helpful_rate',
  SEARCH_COUNT: 'search_count',
  AVERAGE_RATING: 'average_rating',
} as const;

export type FAQIdPrefix = typeof FAQ_ID_PREFIX;
export type FAQCategory = (typeof FAQ_CATEGORY)[keyof typeof FAQ_CATEGORY];
export type FAQStatus = (typeof FAQ_STATUS)[keyof typeof FAQ_STATUS];
export type FAQType = (typeof FAQ_TYPE)[keyof typeof FAQ_TYPE];
export type FAQFilterOption = (typeof FAQ_FILTER_OPTIONS)[keyof typeof FAQ_FILTER_OPTIONS];
export type FAQSortOption = (typeof FAQ_SORT_OPTIONS)[keyof typeof FAQ_SORT_OPTIONS];
export type FAQRatingType = (typeof FAQ_RATING_TYPE)[keyof typeof FAQ_RATING_TYPE];
export type FAQEventType = (typeof FAQ_EVENT_TYPES)[keyof typeof FAQ_EVENT_TYPES];
export type FAQMetric = (typeof FAQ_METRICS)[keyof typeof FAQ_METRICS];

export interface FAQDefaultSettings {
  itemsPerPage: number;
  sortOrder: {
    field: string;
    order: 'asc' | 'desc';
  };
  searchLimit: number;
  defaultLanguage: string;
  viewCountPeriod: number;
  helpfulThreshold: number;
}

export interface FAQValidationRules {
  title: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  question: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  answer: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  tags: {
    maxTags: number;
    minTagLength: number;
    maxTagLength: number;
  };
}

export interface FAQMetadata {
  id: string;
  title: string;
  question: string;
  answer: string;
  category: FAQCategory;
  status: FAQStatus;
  type: FAQType;
  language: string;
  tags: string[];
  views: number;
  helpfulCount: number;
  notHelpfulCount: number;
  order: number;
  publishedAt?: Date;
  createdBy: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface FAQSearchOptions {
  query: string;
  category?: FAQCategory;
  status?: FAQStatus;
  type?: FAQType;
  language?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
  sortBy?: FAQSortOption;
  sortOrder?: 'asc' | 'desc';
}

export interface FAQRating {
  id: string;
  faqId: string;
  type: FAQRatingType;
  userId?: string;
  sessionId: string;
  feedback?: string;
  createdAt: Date;
}

export interface FAQView {
  id: string;
  faqId: string;
  userId?: string;
  sessionId: string;
  ip: string;
  userAgent: string;
  createdAt: Date;
}

export interface FAQAnalytics {
  faqId: string;
  views: number;
  helpfulCount: number;
  notHelpfulCount: number;
  helpfulRate: number;
  averageRating: number;
  searchImpressions: number;
  lastViewedAt?: Date;
  period: string;
}

/**
 * FAQ ক্যাটাগরি কনফিগারেশন অবজেক্ট
 */
export const FAQ_CATEGORY_CONFIGS: Record<
  FAQCategory,
  {
    category: FAQCategory;
    displayName: string;
    icon: string;
    color: string;
  }
> = {
  [FAQ_CATEGORY.GENERAL]: {
    category: FAQ_CATEGORY.GENERAL,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.GENERAL],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.GENERAL],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.GENERAL],
  },
  [FAQ_CATEGORY.ACCOUNT]: {
    category: FAQ_CATEGORY.ACCOUNT,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.ACCOUNT],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.ACCOUNT],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.ACCOUNT],
  },
  [FAQ_CATEGORY.BILLING]: {
    category: FAQ_CATEGORY.BILLING,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.BILLING],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.BILLING],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.BILLING],
  },
  [FAQ_CATEGORY.TECHNICAL]: {
    category: FAQ_CATEGORY.TECHNICAL,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.TECHNICAL],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.TECHNICAL],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.TECHNICAL],
  },
  [FAQ_CATEGORY.PRODUCT]: {
    category: FAQ_CATEGORY.PRODUCT,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.PRODUCT],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.PRODUCT],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.PRODUCT],
  },
  [FAQ_CATEGORY.SERVICE]: {
    category: FAQ_CATEGORY.SERVICE,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SERVICE],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SERVICE],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SERVICE],
  },
  [FAQ_CATEGORY.SHIPPING]: {
    category: FAQ_CATEGORY.SHIPPING,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SHIPPING],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SHIPPING],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SHIPPING],
  },
  [FAQ_CATEGORY.RETURNS]: {
    category: FAQ_CATEGORY.RETURNS,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.RETURNS],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.RETURNS],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.RETURNS],
  },
  [FAQ_CATEGORY.WARRANTY]: {
    category: FAQ_CATEGORY.WARRANTY,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.WARRANTY],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.WARRANTY],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.WARRANTY],
  },
  [FAQ_CATEGORY.SECURITY]: {
    category: FAQ_CATEGORY.SECURITY,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SECURITY],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SECURITY],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SECURITY],
  },
  [FAQ_CATEGORY.PRIVACY]: {
    category: FAQ_CATEGORY.PRIVACY,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.PRIVACY],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.PRIVACY],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.PRIVACY],
  },
  [FAQ_CATEGORY.PAYMENT]: {
    category: FAQ_CATEGORY.PAYMENT,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.PAYMENT],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.PAYMENT],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.PAYMENT],
  },
  [FAQ_CATEGORY.SUBSCRIPTION]: {
    category: FAQ_CATEGORY.SUBSCRIPTION,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.SUBSCRIPTION],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.SUBSCRIPTION],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.SUBSCRIPTION],
  },
  [FAQ_CATEGORY.TROUBLESHOOTING]: {
    category: FAQ_CATEGORY.TROUBLESHOOTING,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.TROUBLESHOOTING],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.TROUBLESHOOTING],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.TROUBLESHOOTING],
  },
  [FAQ_CATEGORY.FEATURES]: {
    category: FAQ_CATEGORY.FEATURES,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.FEATURES],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.FEATURES],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.FEATURES],
  },
  [FAQ_CATEGORY.INTEGRATION]: {
    category: FAQ_CATEGORY.INTEGRATION,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.INTEGRATION],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.INTEGRATION],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.INTEGRATION],
  },
  [FAQ_CATEGORY.MOBILE]: {
    category: FAQ_CATEGORY.MOBILE,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.MOBILE],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.MOBILE],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.MOBILE],
  },
  [FAQ_CATEGORY.DESKTOP]: {
    category: FAQ_CATEGORY.DESKTOP,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.DESKTOP],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.DESKTOP],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.DESKTOP],
  },
  [FAQ_CATEGORY.API]: {
    category: FAQ_CATEGORY.API,
    displayName: FAQ_CATEGORY_DISPLAY_NAMES[FAQ_CATEGORY.API],
    icon: FAQ_CATEGORY_ICONS[FAQ_CATEGORY.API],
    color: FAQ_CATEGORY_COLORS[FAQ_CATEGORY.API],
  },
};

/**
 * FAQ স্ট্যাটাস কনফিগারেশন
 */
export const FAQ_STATUS_CONFIGS: Record<
  FAQStatus,
  {
    status: FAQStatus;
    displayName: string;
    color: string;
  }
> = {
  [FAQ_STATUS.PUBLISHED]: {
    status: FAQ_STATUS.PUBLISHED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.PUBLISHED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.PUBLISHED],
  },
  [FAQ_STATUS.DRAFT]: {
    status: FAQ_STATUS.DRAFT,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.DRAFT],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.DRAFT],
  },
  [FAQ_STATUS.ARCHIVED]: {
    status: FAQ_STATUS.ARCHIVED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.ARCHIVED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.ARCHIVED],
  },
  [FAQ_STATUS.PENDING_REVIEW]: {
    status: FAQ_STATUS.PENDING_REVIEW,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.PENDING_REVIEW],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.PENDING_REVIEW],
  },
  [FAQ_STATUS.REJECTED]: {
    status: FAQ_STATUS.REJECTED,
    displayName: FAQ_STATUS_DISPLAY_NAMES[FAQ_STATUS.REJECTED],
    color: FAQ_STATUS_COLORS[FAQ_STATUS.REJECTED],
  },
};

export const FAQ_CONFIG = {
  idPrefix: FAQ_ID_PREFIX,
  numberFormat: FAQ_NUMBER_FORMAT,
  defaultSettings: FAQ_DEFAULT_SETTINGS,
  validationRules: FAQ_VALIDATION_RULES,
} as const;
