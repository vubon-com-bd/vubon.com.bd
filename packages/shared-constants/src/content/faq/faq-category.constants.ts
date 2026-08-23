/**
 * FAQ Category Constants
 * Categories for FAQ organization
 */

export const CONTENT_FAQ_CATEGORY = {
  // Main Categories
  MAIN: {
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

  // Sub Categories
  SUB: {
    // General
    ABOUT: 'about',
    CONTACT: 'contact',
    COMPANY: 'company',

    // Product
    PRODUCT_INFO: 'product_info',
    PRODUCT_USAGE: 'product_usage',
    PRODUCT_SPECS: 'product_specs',
    PRODUCT_AVAILABILITY: 'product_availability',

    // Service
    SERVICE_INFO: 'service_info',
    SERVICE_USAGE: 'service_usage',
    SERVICE_HOURS: 'service_hours',

    // Order
    ORDER_PLACEMENT: 'order_placement',
    ORDER_STATUS: 'order_status',
    ORDER_CANCELLATION: 'order_cancellation',
    ORDER_MODIFICATION: 'order_modification',

    // Shipping
    SHIPPING_INFO: 'shipping_info',
    SHIPPING_COST: 'shipping_cost',
    SHIPPING_TRACKING: 'shipping_tracking',
    SHIPPING_DELIVERY: 'shipping_delivery',

    // Payment
    PAYMENT_METHODS: 'payment_methods',
    PAYMENT_ISSUES: 'payment_issues',
    PAYMENT_SECURITY: 'payment_security',
    PAYMENT_FAILED: 'payment_failed',

    // Return
    RETURN_POLICY: 'return_policy',
    RETURN_PROCESS: 'return_process',
    REFUND_STATUS: 'refund_status',
    RETURN_SHIPPING: 'return_shipping',

    // Account
    ACCOUNT_SETUP: 'account_setup',
    ACCOUNT_SECURITY: 'account_security',
    ACCOUNT_RECOVERY: 'account_recovery',
    ACCOUNT_VERIFICATION: 'account_verification',

    // Support
    SUPPORT_OPTIONS: 'support_options',
    SUPPORT_TICKETS: 'support_tickets',
    SUPPORT_ESCALATION: 'support_escalation',
    SUPPORT_AVAILABILITY: 'support_availability',

    // Technical
    TECHNICAL_ISSUES: 'technical_issues',
    SYSTEM_REQUIREMENTS: 'system_requirements',
    INTEGRATION: 'integration',
    COMPATIBILITY: 'compatibility',

    // Billing
    BILLING_INFO: 'billing_info',
    INVOICE: 'invoice',
    SUBSCRIPTION: 'subscription',
    PRICING: 'pricing',

    // Custom
    CUSTOM: 'custom',
  } as const,

  // Category Types
  TYPES: {
    PARENT: 'parent',
    CHILD: 'child',
    BOTH: 'both',
  } as const,

  // Category Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    INTERNAL: 'internal',
  } as const,

  // Category Hierarchy
  HIERARCHY: {
    LEVEL_1: 'level_1',
    LEVEL_2: 'level_2',
    LEVEL_3: 'level_3',
  } as const,

  // Category Sort Options
  SORT_OPTIONS: {
    NAME_ASC: 'name_asc',
    NAME_DESC: 'name_desc',
    COUNT_ASC: 'count_asc',
    COUNT_DESC: 'count_desc',
    POPULAR: 'popular',
    CUSTOM: 'custom',
  } as const,
} as const;

// Main Categories
export type ContentFAQCategoryMain =
  (typeof CONTENT_FAQ_CATEGORY.MAIN)[keyof typeof CONTENT_FAQ_CATEGORY.MAIN];

// Sub Categories
export type ContentFAQCategorySub =
  (typeof CONTENT_FAQ_CATEGORY.SUB)[keyof typeof CONTENT_FAQ_CATEGORY.SUB];

// Category Types
export type ContentFAQCategoryType =
  (typeof CONTENT_FAQ_CATEGORY.TYPES)[keyof typeof CONTENT_FAQ_CATEGORY.TYPES];

// Category Visibility
export type ContentFAQCategoryVisibility =
  (typeof CONTENT_FAQ_CATEGORY.VISIBILITY)[keyof typeof CONTENT_FAQ_CATEGORY.VISIBILITY];

// Category Hierarchy
export type ContentFAQCategoryHierarchy =
  (typeof CONTENT_FAQ_CATEGORY.HIERARCHY)[keyof typeof CONTENT_FAQ_CATEGORY.HIERARCHY];

// Category Sort Options
export type ContentFAQCategorySortOption =
  (typeof CONTENT_FAQ_CATEGORY.SORT_OPTIONS)[keyof typeof CONTENT_FAQ_CATEGORY.SORT_OPTIONS];

// Utility Functions
export function contentFaqCategoryGetMainLabel(category: ContentFAQCategoryMain): string {
  const labels: Record<ContentFAQCategoryMain, string> = {
    [CONTENT_FAQ_CATEGORY.MAIN.GENERAL]: 'General',
    [CONTENT_FAQ_CATEGORY.MAIN.PRODUCT]: 'Product',
    [CONTENT_FAQ_CATEGORY.MAIN.SERVICE]: 'Service',
    [CONTENT_FAQ_CATEGORY.MAIN.ORDER]: 'Order',
    [CONTENT_FAQ_CATEGORY.MAIN.SHIPPING]: 'Shipping',
    [CONTENT_FAQ_CATEGORY.MAIN.PAYMENT]: 'Payment',
    [CONTENT_FAQ_CATEGORY.MAIN.RETURN]: 'Return',
    [CONTENT_FAQ_CATEGORY.MAIN.ACCOUNT]: 'Account',
    [CONTENT_FAQ_CATEGORY.MAIN.SUPPORT]: 'Support',
    [CONTENT_FAQ_CATEGORY.MAIN.TECHNICAL]: 'Technical',
    [CONTENT_FAQ_CATEGORY.MAIN.BILLING]: 'Billing',
    [CONTENT_FAQ_CATEGORY.MAIN.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function contentFaqCategoryGetSubLabel(category: ContentFAQCategorySub): string {
  const labels: Record<ContentFAQCategorySub, string> = {
    // General
    [CONTENT_FAQ_CATEGORY.SUB.ABOUT]: 'About',
    [CONTENT_FAQ_CATEGORY.SUB.CONTACT]: 'Contact',
    [CONTENT_FAQ_CATEGORY.SUB.COMPANY]: 'Company',

    // Product
    [CONTENT_FAQ_CATEGORY.SUB.PRODUCT_INFO]: 'Product Information',
    [CONTENT_FAQ_CATEGORY.SUB.PRODUCT_USAGE]: 'Product Usage',
    [CONTENT_FAQ_CATEGORY.SUB.PRODUCT_SPECS]: 'Product Specifications',
    [CONTENT_FAQ_CATEGORY.SUB.PRODUCT_AVAILABILITY]: 'Product Availability',

    // Service
    [CONTENT_FAQ_CATEGORY.SUB.SERVICE_INFO]: 'Service Information',
    [CONTENT_FAQ_CATEGORY.SUB.SERVICE_USAGE]: 'Service Usage',
    [CONTENT_FAQ_CATEGORY.SUB.SERVICE_HOURS]: 'Service Hours',

    // Order
    [CONTENT_FAQ_CATEGORY.SUB.ORDER_PLACEMENT]: 'Order Placement',
    [CONTENT_FAQ_CATEGORY.SUB.ORDER_STATUS]: 'Order Status',
    [CONTENT_FAQ_CATEGORY.SUB.ORDER_CANCELLATION]: 'Order Cancellation',
    [CONTENT_FAQ_CATEGORY.SUB.ORDER_MODIFICATION]: 'Order Modification',

    // Shipping
    [CONTENT_FAQ_CATEGORY.SUB.SHIPPING_INFO]: 'Shipping Information',
    [CONTENT_FAQ_CATEGORY.SUB.SHIPPING_COST]: 'Shipping Cost',
    [CONTENT_FAQ_CATEGORY.SUB.SHIPPING_TRACKING]: 'Shipping Tracking',
    [CONTENT_FAQ_CATEGORY.SUB.SHIPPING_DELIVERY]: 'Shipping Delivery',

    // Payment
    [CONTENT_FAQ_CATEGORY.SUB.PAYMENT_METHODS]: 'Payment Methods',
    [CONTENT_FAQ_CATEGORY.SUB.PAYMENT_ISSUES]: 'Payment Issues',
    [CONTENT_FAQ_CATEGORY.SUB.PAYMENT_SECURITY]: 'Payment Security',
    [CONTENT_FAQ_CATEGORY.SUB.PAYMENT_FAILED]: 'Payment Failed',

    // Return
    [CONTENT_FAQ_CATEGORY.SUB.RETURN_POLICY]: 'Return Policy',
    [CONTENT_FAQ_CATEGORY.SUB.RETURN_PROCESS]: 'Return Process',
    [CONTENT_FAQ_CATEGORY.SUB.REFUND_STATUS]: 'Refund Status',
    [CONTENT_FAQ_CATEGORY.SUB.RETURN_SHIPPING]: 'Return Shipping',

    // Account
    [CONTENT_FAQ_CATEGORY.SUB.ACCOUNT_SETUP]: 'Account Setup',
    [CONTENT_FAQ_CATEGORY.SUB.ACCOUNT_SECURITY]: 'Account Security',
    [CONTENT_FAQ_CATEGORY.SUB.ACCOUNT_RECOVERY]: 'Account Recovery',
    [CONTENT_FAQ_CATEGORY.SUB.ACCOUNT_VERIFICATION]: 'Account Verification',

    // Support
    [CONTENT_FAQ_CATEGORY.SUB.SUPPORT_OPTIONS]: 'Support Options',
    [CONTENT_FAQ_CATEGORY.SUB.SUPPORT_TICKETS]: 'Support Tickets',
    [CONTENT_FAQ_CATEGORY.SUB.SUPPORT_ESCALATION]: 'Support Escalation',
    [CONTENT_FAQ_CATEGORY.SUB.SUPPORT_AVAILABILITY]: 'Support Availability',

    // Technical
    [CONTENT_FAQ_CATEGORY.SUB.TECHNICAL_ISSUES]: 'Technical Issues',
    [CONTENT_FAQ_CATEGORY.SUB.SYSTEM_REQUIREMENTS]: 'System Requirements',
    [CONTENT_FAQ_CATEGORY.SUB.INTEGRATION]: 'Integration',
    [CONTENT_FAQ_CATEGORY.SUB.COMPATIBILITY]: 'Compatibility',

    // Billing
    [CONTENT_FAQ_CATEGORY.SUB.BILLING_INFO]: 'Billing Information',
    [CONTENT_FAQ_CATEGORY.SUB.INVOICE]: 'Invoice',
    [CONTENT_FAQ_CATEGORY.SUB.SUBSCRIPTION]: 'Subscription',
    [CONTENT_FAQ_CATEGORY.SUB.PRICING]: 'Pricing',

    // Custom
    [CONTENT_FAQ_CATEGORY.SUB.CUSTOM]: 'Custom Sub-Category',
  };
  return labels[category] || 'Unknown Sub-Category';
}

export function contentFaqCategoryGetTypeLabel(type: ContentFAQCategoryType): string {
  const labels: Record<ContentFAQCategoryType, string> = {
    [CONTENT_FAQ_CATEGORY.TYPES.PARENT]: 'Parent Category',
    [CONTENT_FAQ_CATEGORY.TYPES.CHILD]: 'Child Category',
    [CONTENT_FAQ_CATEGORY.TYPES.BOTH]: 'Both Parent & Child',
  };
  return labels[type] || 'Unknown Type';
}

export function contentFaqCategoryGetVisibilityLabel(
  visibility: ContentFAQCategoryVisibility
): string {
  const labels: Record<ContentFAQCategoryVisibility, string> = {
    [CONTENT_FAQ_CATEGORY.VISIBILITY.PUBLIC]: 'Public',
    [CONTENT_FAQ_CATEGORY.VISIBILITY.PRIVATE]: 'Private',
    [CONTENT_FAQ_CATEGORY.VISIBILITY.INTERNAL]: 'Internal',
  };
  return labels[visibility] || 'Unknown Visibility';
}

export function contentFaqCategoryGetHierarchyLabel(
  hierarchy: ContentFAQCategoryHierarchy
): string {
  const labels: Record<ContentFAQCategoryHierarchy, string> = {
    [CONTENT_FAQ_CATEGORY.HIERARCHY.LEVEL_1]: 'Level 1 (Top)',
    [CONTENT_FAQ_CATEGORY.HIERARCHY.LEVEL_2]: 'Level 2',
    [CONTENT_FAQ_CATEGORY.HIERARCHY.LEVEL_3]: 'Level 3 (Bottom)',
  };
  return labels[hierarchy] || 'Unknown Hierarchy';
}

export function contentFaqCategoryGetSortOptionLabel(sort: ContentFAQCategorySortOption): string {
  const labels: Record<ContentFAQCategorySortOption, string> = {
    [CONTENT_FAQ_CATEGORY.SORT_OPTIONS.NAME_ASC]: 'Name A-Z',
    [CONTENT_FAQ_CATEGORY.SORT_OPTIONS.NAME_DESC]: 'Name Z-A',
    [CONTENT_FAQ_CATEGORY.SORT_OPTIONS.COUNT_ASC]: 'Fewest FAQs First',
    [CONTENT_FAQ_CATEGORY.SORT_OPTIONS.COUNT_DESC]: 'Most FAQs First',
    [CONTENT_FAQ_CATEGORY.SORT_OPTIONS.POPULAR]: 'Most Popular',
    [CONTENT_FAQ_CATEGORY.SORT_OPTIONS.CUSTOM]: 'Custom Sort',
  };
  return labels[sort] || 'Unknown Sort Option';
}

export function contentFaqCategoryIsValidMain(
  category: string
): category is ContentFAQCategoryMain {
  return Object.values(CONTENT_FAQ_CATEGORY.MAIN).includes(category as ContentFAQCategoryMain);
}

export function contentFaqCategoryIsValidSub(category: string): category is ContentFAQCategorySub {
  return Object.values(CONTENT_FAQ_CATEGORY.SUB).includes(category as ContentFAQCategorySub);
}

export function contentFaqCategoryGetSubCategories(
  main: ContentFAQCategoryMain
): ContentFAQCategorySub[] {
  const subMap: Record<ContentFAQCategoryMain, ContentFAQCategorySub[]> = {
    [CONTENT_FAQ_CATEGORY.MAIN.GENERAL]: [
      CONTENT_FAQ_CATEGORY.SUB.ABOUT,
      CONTENT_FAQ_CATEGORY.SUB.CONTACT,
      CONTENT_FAQ_CATEGORY.SUB.COMPANY,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.PRODUCT]: [
      CONTENT_FAQ_CATEGORY.SUB.PRODUCT_INFO,
      CONTENT_FAQ_CATEGORY.SUB.PRODUCT_USAGE,
      CONTENT_FAQ_CATEGORY.SUB.PRODUCT_SPECS,
      CONTENT_FAQ_CATEGORY.SUB.PRODUCT_AVAILABILITY,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.SERVICE]: [
      CONTENT_FAQ_CATEGORY.SUB.SERVICE_INFO,
      CONTENT_FAQ_CATEGORY.SUB.SERVICE_USAGE,
      CONTENT_FAQ_CATEGORY.SUB.SERVICE_HOURS,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.ORDER]: [
      CONTENT_FAQ_CATEGORY.SUB.ORDER_PLACEMENT,
      CONTENT_FAQ_CATEGORY.SUB.ORDER_STATUS,
      CONTENT_FAQ_CATEGORY.SUB.ORDER_CANCELLATION,
      CONTENT_FAQ_CATEGORY.SUB.ORDER_MODIFICATION,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.SHIPPING]: [
      CONTENT_FAQ_CATEGORY.SUB.SHIPPING_INFO,
      CONTENT_FAQ_CATEGORY.SUB.SHIPPING_COST,
      CONTENT_FAQ_CATEGORY.SUB.SHIPPING_TRACKING,
      CONTENT_FAQ_CATEGORY.SUB.SHIPPING_DELIVERY,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.PAYMENT]: [
      CONTENT_FAQ_CATEGORY.SUB.PAYMENT_METHODS,
      CONTENT_FAQ_CATEGORY.SUB.PAYMENT_ISSUES,
      CONTENT_FAQ_CATEGORY.SUB.PAYMENT_SECURITY,
      CONTENT_FAQ_CATEGORY.SUB.PAYMENT_FAILED,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.RETURN]: [
      CONTENT_FAQ_CATEGORY.SUB.RETURN_POLICY,
      CONTENT_FAQ_CATEGORY.SUB.RETURN_PROCESS,
      CONTENT_FAQ_CATEGORY.SUB.REFUND_STATUS,
      CONTENT_FAQ_CATEGORY.SUB.RETURN_SHIPPING,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.ACCOUNT]: [
      CONTENT_FAQ_CATEGORY.SUB.ACCOUNT_SETUP,
      CONTENT_FAQ_CATEGORY.SUB.ACCOUNT_SECURITY,
      CONTENT_FAQ_CATEGORY.SUB.ACCOUNT_RECOVERY,
      CONTENT_FAQ_CATEGORY.SUB.ACCOUNT_VERIFICATION,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.SUPPORT]: [
      CONTENT_FAQ_CATEGORY.SUB.SUPPORT_OPTIONS,
      CONTENT_FAQ_CATEGORY.SUB.SUPPORT_TICKETS,
      CONTENT_FAQ_CATEGORY.SUB.SUPPORT_ESCALATION,
      CONTENT_FAQ_CATEGORY.SUB.SUPPORT_AVAILABILITY,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.TECHNICAL]: [
      CONTENT_FAQ_CATEGORY.SUB.TECHNICAL_ISSUES,
      CONTENT_FAQ_CATEGORY.SUB.SYSTEM_REQUIREMENTS,
      CONTENT_FAQ_CATEGORY.SUB.INTEGRATION,
      CONTENT_FAQ_CATEGORY.SUB.COMPATIBILITY,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.BILLING]: [
      CONTENT_FAQ_CATEGORY.SUB.BILLING_INFO,
      CONTENT_FAQ_CATEGORY.SUB.INVOICE,
      CONTENT_FAQ_CATEGORY.SUB.SUBSCRIPTION,
      CONTENT_FAQ_CATEGORY.SUB.PRICING,
    ],
    [CONTENT_FAQ_CATEGORY.MAIN.CUSTOM]: [CONTENT_FAQ_CATEGORY.SUB.CUSTOM],
  };
  return subMap[main] || [];
}
