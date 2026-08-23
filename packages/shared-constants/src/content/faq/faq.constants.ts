/**
 * FAQ Constants
 * Configuration for frequently asked questions and knowledge base
 */

export const CONTENT_FAQ = {
  // FAQ Types
  TYPES: {
    GENERAL: 'general',
    PRODUCT: 'product',
    SERVICE: 'service',
    ORDER: 'order',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    RETURN: 'return',
    ACCOUNT: 'account',
    SUPPORT: 'support',
    TECHNICAL: 'technical',
    BILLING: 'billing',
    CUSTOM: 'custom',
  } as const,

  // FAQ Statuses
  STATUSES: {
    DRAFT: 'draft',
    PENDING_REVIEW: 'pending_review',
    IN_REVIEW: 'in_review',
    REVIEWED: 'reviewed',
    PENDING_APPROVAL: 'pending_approval',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
    DELETED: 'deleted',
  } as const,

  // FAQ Categories
  CATEGORIES: {
    // General
    GENERAL: 'general',
    ABOUT: 'about',
    CONTACT: 'contact',

    // Product
    PRODUCT_INFO: 'product_info',
    PRODUCT_USAGE: 'product_usage',
    PRODUCT_SPECS: 'product_specs',

    // Service
    SERVICE_INFO: 'service_info',
    SERVICE_USAGE: 'service_usage',

    // Order
    ORDER_PLACEMENT: 'order_placement',
    ORDER_STATUS: 'order_status',
    ORDER_CANCELLATION: 'order_cancellation',

    // Shipping
    SHIPPING_INFO: 'shipping_info',
    SHIPPING_COST: 'shipping_cost',
    SHIPPING_TRACKING: 'shipping_tracking',

    // Payment
    PAYMENT_METHODS: 'payment_methods',
    PAYMENT_ISSUES: 'payment_issues',
    PAYMENT_SECURITY: 'payment_security',

    // Return
    RETURN_POLICY: 'return_policy',
    RETURN_PROCESS: 'return_process',
    REFUND_STATUS: 'refund_status',

    // Account
    ACCOUNT_SETUP: 'account_setup',
    ACCOUNT_SECURITY: 'account_security',
    ACCOUNT_RECOVERY: 'account_recovery',

    // Support
    SUPPORT_OPTIONS: 'support_options',
    SUPPORT_TICKETS: 'support_tickets',
    SUPPORT_ESCALATION: 'support_escalation',

    // Technical
    TECHNICAL_ISSUES: 'technical_issues',
    SYSTEM_REQUIREMENTS: 'system_requirements',
    INTEGRATION: 'integration',

    // Billing
    BILLING_INFO: 'billing_info',
    INVOICE: 'invoice',
    SUBSCRIPTION: 'subscription',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // FAQ Formats
  FORMATS: {
    TEXT: 'text',
    RICH: 'rich',
    MARKDOWN: 'markdown',
    HTML: 'html',
    VIDEO: 'video',
    AUDIO: 'audio',
    IMAGE: 'image',
    CUSTOM: 'custom',
  } as const,

  // FAQ Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    UNLISTED: 'unlisted',
    PASSWORD_PROTECTED: 'password_protected',
    MEMBERS_ONLY: 'members_only',
    SUBSCRIBERS_ONLY: 'subscribers_only',
    PREMIUM_ONLY: 'premium_only',
    TEAM_ONLY: 'team_only',
  } as const,

  // FAQ Helpful Status
  HELPFUL_STATUS: {
    HELPFUL: 'helpful',
    NOT_HELPFUL: 'not_helpful',
    UNRATED: 'unrated',
  } as const,

  // FAQ Defaults
  DEFAULTS: {
    STATUS: 'draft',
    FORMAT: 'text',
    VISIBILITY: 'public',
    CATEGORY: 'general',
    MAX_QUESTION_LENGTH: 200,
    MAX_ANSWER_LENGTH: 5000,
    SORT_ORDER: 'asc',
  } as const,

  // FAQ Limits
  LIMITS: {
    MAX_QUESTION_LENGTH: 200,
    MAX_ANSWER_LENGTH: 10000,
    MAX_CATEGORIES_PER_FAQ: 5,
    MAX_TAGS_PER_FAQ: 10,
    MIN_ANSWER_LENGTH: 10,
  } as const,
} as const;

// FAQ Types
export type ContentFAQType = (typeof CONTENT_FAQ.TYPES)[keyof typeof CONTENT_FAQ.TYPES];

// FAQ Statuses
export type ContentFAQStatus = (typeof CONTENT_FAQ.STATUSES)[keyof typeof CONTENT_FAQ.STATUSES];

// FAQ Categories
export type ContentFAQCategory =
  (typeof CONTENT_FAQ.CATEGORIES)[keyof typeof CONTENT_FAQ.CATEGORIES];

// FAQ Formats
export type ContentFAQFormat = (typeof CONTENT_FAQ.FORMATS)[keyof typeof CONTENT_FAQ.FORMATS];

// FAQ Visibility
export type ContentFAQVisibility =
  (typeof CONTENT_FAQ.VISIBILITY)[keyof typeof CONTENT_FAQ.VISIBILITY];

// FAQ Helpful Status
export type ContentFAQHelpfulStatus =
  (typeof CONTENT_FAQ.HELPFUL_STATUS)[keyof typeof CONTENT_FAQ.HELPFUL_STATUS];

// Utility Functions
export function contentFaqGetTypeLabel(type: ContentFAQType): string {
  const labels: Record<ContentFAQType, string> = {
    [CONTENT_FAQ.TYPES.GENERAL]: 'General FAQ',
    [CONTENT_FAQ.TYPES.PRODUCT]: 'Product FAQ',
    [CONTENT_FAQ.TYPES.SERVICE]: 'Service FAQ',
    [CONTENT_FAQ.TYPES.ORDER]: 'Order FAQ',
    [CONTENT_FAQ.TYPES.SHIPPING]: 'Shipping FAQ',
    [CONTENT_FAQ.TYPES.PAYMENT]: 'Payment FAQ',
    [CONTENT_FAQ.TYPES.RETURN]: 'Return FAQ',
    [CONTENT_FAQ.TYPES.ACCOUNT]: 'Account FAQ',
    [CONTENT_FAQ.TYPES.SUPPORT]: 'Support FAQ',
    [CONTENT_FAQ.TYPES.TECHNICAL]: 'Technical FAQ',
    [CONTENT_FAQ.TYPES.BILLING]: 'Billing FAQ',
    [CONTENT_FAQ.TYPES.CUSTOM]: 'Custom FAQ',
  };
  return labels[type] || 'Unknown FAQ Type';
}

export function contentFaqGetStatusLabel(status: ContentFAQStatus): string {
  const labels: Record<ContentFAQStatus, string> = {
    [CONTENT_FAQ.STATUSES.DRAFT]: 'Draft',
    [CONTENT_FAQ.STATUSES.PENDING_REVIEW]: 'Pending Review',
    [CONTENT_FAQ.STATUSES.IN_REVIEW]: 'In Review',
    [CONTENT_FAQ.STATUSES.REVIEWED]: 'Reviewed',
    [CONTENT_FAQ.STATUSES.PENDING_APPROVAL]: 'Pending Approval',
    [CONTENT_FAQ.STATUSES.APPROVED]: 'Approved',
    [CONTENT_FAQ.STATUSES.REJECTED]: 'Rejected',
    [CONTENT_FAQ.STATUSES.PUBLISHED]: 'Published',
    [CONTENT_FAQ.STATUSES.SCHEDULED]: 'Scheduled',
    [CONTENT_FAQ.STATUSES.PRIVATE]: 'Private',
    [CONTENT_FAQ.STATUSES.UNLISTED]: 'Unlisted',
    [CONTENT_FAQ.STATUSES.ARCHIVED]: 'Archived',
    [CONTENT_FAQ.STATUSES.DEPRECATED]: 'Deprecated',
    [CONTENT_FAQ.STATUSES.DELETED]: 'Deleted',
  };
  return labels[status] || 'Unknown Status';
}

export function contentFaqGetCategoryLabel(category: ContentFAQCategory): string {
  const labels: Record<ContentFAQCategory, string> = {
    // General
    [CONTENT_FAQ.CATEGORIES.GENERAL]: 'General',
    [CONTENT_FAQ.CATEGORIES.ABOUT]: 'About',
    [CONTENT_FAQ.CATEGORIES.CONTACT]: 'Contact',

    // Product
    [CONTENT_FAQ.CATEGORIES.PRODUCT_INFO]: 'Product Information',
    [CONTENT_FAQ.CATEGORIES.PRODUCT_USAGE]: 'Product Usage',
    [CONTENT_FAQ.CATEGORIES.PRODUCT_SPECS]: 'Product Specifications',

    // Service
    [CONTENT_FAQ.CATEGORIES.SERVICE_INFO]: 'Service Information',
    [CONTENT_FAQ.CATEGORIES.SERVICE_USAGE]: 'Service Usage',

    // Order
    [CONTENT_FAQ.CATEGORIES.ORDER_PLACEMENT]: 'Order Placement',
    [CONTENT_FAQ.CATEGORIES.ORDER_STATUS]: 'Order Status',
    [CONTENT_FAQ.CATEGORIES.ORDER_CANCELLATION]: 'Order Cancellation',

    // Shipping
    [CONTENT_FAQ.CATEGORIES.SHIPPING_INFO]: 'Shipping Information',
    [CONTENT_FAQ.CATEGORIES.SHIPPING_COST]: 'Shipping Cost',
    [CONTENT_FAQ.CATEGORIES.SHIPPING_TRACKING]: 'Shipping Tracking',

    // Payment
    [CONTENT_FAQ.CATEGORIES.PAYMENT_METHODS]: 'Payment Methods',
    [CONTENT_FAQ.CATEGORIES.PAYMENT_ISSUES]: 'Payment Issues',
    [CONTENT_FAQ.CATEGORIES.PAYMENT_SECURITY]: 'Payment Security',

    // Return
    [CONTENT_FAQ.CATEGORIES.RETURN_POLICY]: 'Return Policy',
    [CONTENT_FAQ.CATEGORIES.RETURN_PROCESS]: 'Return Process',
    [CONTENT_FAQ.CATEGORIES.REFUND_STATUS]: 'Refund Status',

    // Account
    [CONTENT_FAQ.CATEGORIES.ACCOUNT_SETUP]: 'Account Setup',
    [CONTENT_FAQ.CATEGORIES.ACCOUNT_SECURITY]: 'Account Security',
    [CONTENT_FAQ.CATEGORIES.ACCOUNT_RECOVERY]: 'Account Recovery',

    // Support
    [CONTENT_FAQ.CATEGORIES.SUPPORT_OPTIONS]: 'Support Options',
    [CONTENT_FAQ.CATEGORIES.SUPPORT_TICKETS]: 'Support Tickets',
    [CONTENT_FAQ.CATEGORIES.SUPPORT_ESCALATION]: 'Support Escalation',

    // Technical
    [CONTENT_FAQ.CATEGORIES.TECHNICAL_ISSUES]: 'Technical Issues',
    [CONTENT_FAQ.CATEGORIES.SYSTEM_REQUIREMENTS]: 'System Requirements',
    [CONTENT_FAQ.CATEGORIES.INTEGRATION]: 'Integration',

    // Billing
    [CONTENT_FAQ.CATEGORIES.BILLING_INFO]: 'Billing Information',
    [CONTENT_FAQ.CATEGORIES.INVOICE]: 'Invoice',
    [CONTENT_FAQ.CATEGORIES.SUBSCRIPTION]: 'Subscription',

    // Custom
    [CONTENT_FAQ.CATEGORIES.CUSTOM]: 'Custom Category',
  };
  return labels[category] || 'Unknown Category';
}

export function contentFaqGetFormatLabel(format: ContentFAQFormat): string {
  const labels: Record<ContentFAQFormat, string> = {
    [CONTENT_FAQ.FORMATS.TEXT]: 'Text',
    [CONTENT_FAQ.FORMATS.RICH]: 'Rich Text',
    [CONTENT_FAQ.FORMATS.MARKDOWN]: 'Markdown',
    [CONTENT_FAQ.FORMATS.HTML]: 'HTML',
    [CONTENT_FAQ.FORMATS.VIDEO]: 'Video',
    [CONTENT_FAQ.FORMATS.AUDIO]: 'Audio',
    [CONTENT_FAQ.FORMATS.IMAGE]: 'Image',
    [CONTENT_FAQ.FORMATS.CUSTOM]: 'Custom Format',
  };
  return labels[format] || 'Unknown Format';
}

export function contentFaqGetVisibilityLabel(visibility: ContentFAQVisibility): string {
  const labels: Record<ContentFAQVisibility, string> = {
    [CONTENT_FAQ.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_FAQ.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_FAQ.VISIBILITY.UNLISTED]: 'Unlisted',
    [CONTENT_FAQ.VISIBILITY.PASSWORD_PROTECTED]: 'Password Protected',
    [CONTENT_FAQ.VISIBILITY.MEMBERS_ONLY]: 'Members Only',
    [CONTENT_FAQ.VISIBILITY.SUBSCRIBERS_ONLY]: 'Subscribers Only',
    [CONTENT_FAQ.VISIBILITY.PREMIUM_ONLY]: 'Premium Only',
    [CONTENT_FAQ.VISIBILITY.TEAM_ONLY]: 'Team Only',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentFaqGetHelpfulStatusLabel(status: ContentFAQHelpfulStatus): string {
  const labels: Record<ContentFAQHelpfulStatus, string> = {
    [CONTENT_FAQ.HELPFUL_STATUS.HELPFUL]: 'Helpful',
    [CONTENT_FAQ.HELPFUL_STATUS.NOT_HELPFUL]: 'Not Helpful',
    [CONTENT_FAQ.HELPFUL_STATUS.UNRATED]: 'Unrated',
  };
  return labels[status] || 'Unknown Status';
}

export function contentFaqIsPublished(status: ContentFAQStatus): boolean {
  const publishedStatuses: ContentFAQStatus[] = [
    CONTENT_FAQ.STATUSES.PUBLISHED,
    CONTENT_FAQ.STATUSES.SCHEDULED,
  ];
  return publishedStatuses.includes(status);
}

export function contentFaqIsEditable(status: ContentFAQStatus): boolean {
  const editableStatuses: ContentFAQStatus[] = [
    CONTENT_FAQ.STATUSES.DRAFT,
    CONTENT_FAQ.STATUSES.PENDING_REVIEW,
    CONTENT_FAQ.STATUSES.IN_REVIEW,
    CONTENT_FAQ.STATUSES.REVIEWED,
    CONTENT_FAQ.STATUSES.PENDING_APPROVAL,
    CONTENT_FAQ.STATUSES.REJECTED,
    CONTENT_FAQ.STATUSES.PRIVATE,
    CONTENT_FAQ.STATUSES.UNLISTED,
  ];
  return editableStatuses.includes(status);
}

export function contentFaqIsApproved(status: ContentFAQStatus): boolean {
  const approvedStatuses: ContentFAQStatus[] = [
    CONTENT_FAQ.STATUSES.APPROVED,
    CONTENT_FAQ.STATUSES.PUBLISHED,
    CONTENT_FAQ.STATUSES.SCHEDULED,
  ];
  return approvedStatuses.includes(status);
}

export function contentFaqGetDefaultStatus(): ContentFAQStatus {
  return CONTENT_FAQ.DEFAULTS.STATUS as ContentFAQStatus;
}

export function contentFaqGetDefaultFormat(): ContentFAQFormat {
  return CONTENT_FAQ.DEFAULTS.FORMAT as ContentFAQFormat;
}

export function contentFaqGetDefaultVisibility(): ContentFAQVisibility {
  return CONTENT_FAQ.DEFAULTS.VISIBILITY as ContentFAQVisibility;
}

export function contentFaqGetDefaultCategory(): ContentFAQCategory {
  return CONTENT_FAQ.DEFAULTS.CATEGORY as ContentFAQCategory;
}

export function contentFaqGetMaxQuestionLength(): number {
  return CONTENT_FAQ.LIMITS.MAX_QUESTION_LENGTH;
}

export function contentFaqGetMaxAnswerLength(): number {
  return CONTENT_FAQ.LIMITS.MAX_ANSWER_LENGTH;
}

export function contentFaqGetMinAnswerLength(): number {
  return CONTENT_FAQ.LIMITS.MIN_ANSWER_LENGTH;
}

export function contentFaqIsValidType(type: string): type is ContentFAQType {
  return Object.values(CONTENT_FAQ.TYPES).includes(type as ContentFAQType);
}

export function contentFaqIsValidStatus(status: string): status is ContentFAQStatus {
  return Object.values(CONTENT_FAQ.STATUSES).includes(status as ContentFAQStatus);
}

export function contentFaqIsValidCategory(category: string): category is ContentFAQCategory {
  return Object.values(CONTENT_FAQ.CATEGORIES).includes(category as ContentFAQCategory);
}

export function contentFaqIsValidFormat(format: string): format is ContentFAQFormat {
  return Object.values(CONTENT_FAQ.FORMATS).includes(format as ContentFAQFormat);
}
