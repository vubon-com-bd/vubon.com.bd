/**
 * Email Marketing Type Constants
 * Type definitions and classifications for emails
 */

export const MARKETINGEMAIL_TYPE = {
  // Email Categories
  CATEGORIES: {
    MARKETING: 'marketing',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    RELATIONAL: 'relational',
    PROMOTIONAL: 'promotional',
    INFORMATIONAL: 'informational',
    EDUCATIONAL: 'educational',
    ENTERTAINMENT: 'entertainment',
    URGENT: 'urgent',
  } as const,

  // Email Sub-Types
  SUB_TYPES: {
    // Marketing
    NEWSLETTER: 'newsletter',
    CAMPAIGN: 'campaign',
    AUTOMATION: 'automation',
    SEGMENTED: 'segmented',
    PERSONALIZED: 'personalized',

    // Transactional
    ORDER: 'order',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    DELIVERY: 'delivery',
    RETURN: 'return',
    REFUND: 'refund',

    // Operational
    SYSTEM: 'system',
    NOTIFICATION: 'notification',
    ALERT: 'alert',
    REMINDER: 'reminder',
    REPORT: 'report',

    // Relational
    WELCOME: 'welcome',
    REENGAGEMENT: 'reengagement',
    WIN_BACK: 'win_back',
    BIRTHDAY: 'birthday',
    ANNIVERSARY: 'anniversary',

    // Promotional
    SALE: 'sale',
    DISCOUNT: 'discount',
    OFFER: 'offer',
    COUPON: 'coupon',
    VOUCHER: 'voucher',
    LIMITED_TIME: 'limited_time',
    FLASH_SALE: 'flash_sale',

    // Informational
    UPDATE: 'update',
    ANNOUNCEMENT: 'announcement',
    NEWS: 'news',
    BLOG: 'blog',
    CASE_STUDY: 'case_study',

    // Educational
    TUTORIAL: 'tutorial',
    GUIDE: 'guide',
    TIPS: 'tips',
    HOW_TO: 'how_to',
    TRAINING: 'training',

    // Entertainment
    STORY: 'story',
    FUN: 'fun',
    INTERACTIVE: 'interactive',
  } as const,

  // Email Formats
  FORMATS: {
    HTML: 'html',
    PLAIN_TEXT: 'plain_text',
    AMP: 'amp',
    MARKDOWN: 'markdown',
    RICH_TEXT: 'rich_text',
    TEMPLATE: 'template',
    DYNAMIC: 'dynamic',
  } as const,

  // Email Purposes
  PURPOSES: {
    AWARENESS: 'awareness',
    EDUCATION: 'education',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    RETENTION: 'retention',
    REACTIVATION: 'reactivation',
    REVENUE: 'revenue',
    RELATIONSHIP: 'relationship',
  } as const,

  // Email Personalization Types
  PERSONALIZATION_TYPES: {
    NONE: 'none',
    BASIC: 'basic',
    SEGMENT_BASED: 'segment_based',
    BEHAVIOR_BASED: 'behavior_based',
    DYNAMIC: 'dynamic',
    AI_POWERED: 'ai_powered',
    HYPER_PERSONALIZED: 'hyper_personalized',
  } as const,
} as const;

// Email Categories
export type MarketingEmailCategoryType =
  (typeof MARKETINGEMAIL_TYPE.CATEGORIES)[keyof typeof MARKETINGEMAIL_TYPE.CATEGORIES];

// Email Sub-Types
export type MarketingEmailSubType =
  (typeof MARKETINGEMAIL_TYPE.SUB_TYPES)[keyof typeof MARKETINGEMAIL_TYPE.SUB_TYPES];

// Email Formats
export type MarketingEmailFormat =
  (typeof MARKETINGEMAIL_TYPE.FORMATS)[keyof typeof MARKETINGEMAIL_TYPE.FORMATS];

// Email Purposes
export type MarketingEmailPurpose =
  (typeof MARKETINGEMAIL_TYPE.PURPOSES)[keyof typeof MARKETINGEMAIL_TYPE.PURPOSES];

// Email Personalization Types
export type MarketingEmailPersonalizationType =
  (typeof MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES)[keyof typeof MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES];

// Utility Functions
export function marketingemailGetCategoryLabel(category: MarketingEmailCategoryType): string {
  const labels: Record<MarketingEmailCategoryType, string> = {
    [MARKETINGEMAIL_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGEMAIL_TYPE.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [MARKETINGEMAIL_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGEMAIL_TYPE.CATEGORIES.RELATIONAL]: 'Relational',
    [MARKETINGEMAIL_TYPE.CATEGORIES.PROMOTIONAL]: 'Promotional',
    [MARKETINGEMAIL_TYPE.CATEGORIES.INFORMATIONAL]: 'Informational',
    [MARKETINGEMAIL_TYPE.CATEGORIES.EDUCATIONAL]: 'Educational',
    [MARKETINGEMAIL_TYPE.CATEGORIES.ENTERTAINMENT]: 'Entertainment',
    [MARKETINGEMAIL_TYPE.CATEGORIES.URGENT]: 'Urgent',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingemailGetSubTypeLabel(subType: MarketingEmailSubType): string {
  const labels: Record<MarketingEmailSubType, string> = {
    // Marketing
    [MARKETINGEMAIL_TYPE.SUB_TYPES.NEWSLETTER]: 'Newsletter',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.CAMPAIGN]: 'Campaign',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.AUTOMATION]: 'Automation',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.SEGMENTED]: 'Segmented',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.PERSONALIZED]: 'Personalized',

    // Transactional
    [MARKETINGEMAIL_TYPE.SUB_TYPES.ORDER]: 'Order',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.PAYMENT]: 'Payment',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.SHIPPING]: 'Shipping',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.DELIVERY]: 'Delivery',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.RETURN]: 'Return',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.REFUND]: 'Refund',

    // Operational
    [MARKETINGEMAIL_TYPE.SUB_TYPES.SYSTEM]: 'System',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.NOTIFICATION]: 'Notification',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.ALERT]: 'Alert',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.REMINDER]: 'Reminder',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.REPORT]: 'Report',

    // Relational
    [MARKETINGEMAIL_TYPE.SUB_TYPES.WELCOME]: 'Welcome',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.REENGAGEMENT]: 'Re-engagement',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.WIN_BACK]: 'Win Back',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.BIRTHDAY]: 'Birthday',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.ANNIVERSARY]: 'Anniversary',

    // Promotional
    [MARKETINGEMAIL_TYPE.SUB_TYPES.SALE]: 'Sale',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.DISCOUNT]: 'Discount',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.OFFER]: 'Offer',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.COUPON]: 'Coupon',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.VOUCHER]: 'Voucher',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.LIMITED_TIME]: 'Limited Time',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.FLASH_SALE]: 'Flash Sale',

    // Informational
    [MARKETINGEMAIL_TYPE.SUB_TYPES.UPDATE]: 'Update',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.ANNOUNCEMENT]: 'Announcement',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.NEWS]: 'News',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.BLOG]: 'Blog',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.CASE_STUDY]: 'Case Study',

    // Educational
    [MARKETINGEMAIL_TYPE.SUB_TYPES.TUTORIAL]: 'Tutorial',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.GUIDE]: 'Guide',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.TIPS]: 'Tips',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.HOW_TO]: 'How To',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.TRAINING]: 'Training',

    // Entertainment
    [MARKETINGEMAIL_TYPE.SUB_TYPES.STORY]: 'Story',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.FUN]: 'Fun',
    [MARKETINGEMAIL_TYPE.SUB_TYPES.INTERACTIVE]: 'Interactive',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingemailGetFormatLabel(format: MarketingEmailFormat): string {
  const labels: Record<MarketingEmailFormat, string> = {
    [MARKETINGEMAIL_TYPE.FORMATS.HTML]: 'HTML',
    [MARKETINGEMAIL_TYPE.FORMATS.PLAIN_TEXT]: 'Plain Text',
    [MARKETINGEMAIL_TYPE.FORMATS.AMP]: 'AMP',
    [MARKETINGEMAIL_TYPE.FORMATS.MARKDOWN]: 'Markdown',
    [MARKETINGEMAIL_TYPE.FORMATS.RICH_TEXT]: 'Rich Text',
    [MARKETINGEMAIL_TYPE.FORMATS.TEMPLATE]: 'Template',
    [MARKETINGEMAIL_TYPE.FORMATS.DYNAMIC]: 'Dynamic',
  };
  return labels[format] || 'Unknown Format';
}

export function marketingemailGetPurposeLabel(purpose: MarketingEmailPurpose): string {
  const labels: Record<MarketingEmailPurpose, string> = {
    [MARKETINGEMAIL_TYPE.PURPOSES.AWARENESS]: 'Awareness',
    [MARKETINGEMAIL_TYPE.PURPOSES.EDUCATION]: 'Education',
    [MARKETINGEMAIL_TYPE.PURPOSES.ENGAGEMENT]: 'Engagement',
    [MARKETINGEMAIL_TYPE.PURPOSES.CONVERSION]: 'Conversion',
    [MARKETINGEMAIL_TYPE.PURPOSES.RETENTION]: 'Retention',
    [MARKETINGEMAIL_TYPE.PURPOSES.REACTIVATION]: 'Reactivation',
    [MARKETINGEMAIL_TYPE.PURPOSES.REVENUE]: 'Revenue',
    [MARKETINGEMAIL_TYPE.PURPOSES.RELATIONSHIP]: 'Relationship',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function marketingemailGetPersonalizationTypeLabel(
  type: MarketingEmailPersonalizationType
): string {
  const labels: Record<MarketingEmailPersonalizationType, string> = {
    [MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES.NONE]: 'None',
    [MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES.BASIC]: 'Basic',
    [MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES.SEGMENT_BASED]: 'Segment Based',
    [MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES.BEHAVIOR_BASED]: 'Behavior Based',
    [MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES.DYNAMIC]: 'Dynamic',
    [MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES.AI_POWERED]: 'AI Powered',
    [MARKETINGEMAIL_TYPE.PERSONALIZATION_TYPES.HYPER_PERSONALIZED]: 'Hyper Personalized',
  };
  return labels[type] || 'Unknown Personalization Type';
}

export function marketingemailIsMarketingCategory(category: MarketingEmailCategoryType): boolean {
  const marketingCategories: MarketingEmailCategoryType[] = [
    MARKETINGEMAIL_TYPE.CATEGORIES.MARKETING,
    MARKETINGEMAIL_TYPE.CATEGORIES.PROMOTIONAL,
    MARKETINGEMAIL_TYPE.CATEGORIES.EDUCATIONAL,
  ];
  return marketingCategories.includes(category);
}

export function marketingemailIsTransactionalCategory(
  category: MarketingEmailCategoryType
): boolean {
  return category === MARKETINGEMAIL_TYPE.CATEGORIES.TRANSACTIONAL;
}

export function marketingemailIsRelationalCategory(category: MarketingEmailCategoryType): boolean {
  return category === MARKETINGEMAIL_TYPE.CATEGORIES.RELATIONAL;
}

export function marketingemailIsOperationalCategory(category: MarketingEmailCategoryType): boolean {
  return category === MARKETINGEMAIL_TYPE.CATEGORIES.OPERATIONAL;
}
