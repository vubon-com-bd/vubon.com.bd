/**
 * Analytics Category Constants
 * Categories for organizing analytics data and reports
 */

export const ANALYTICS_CATEGORY = {
  // Main Categories
  CATEGORIES: {
    // Business Categories
    SALES: 'sales',
    MARKETING: 'marketing',
    FINANCE: 'finance',
    OPERATIONS: 'operations',
    CUSTOMER: 'customer',
    PRODUCT: 'product',
    INVENTORY: 'inventory',
    SUPPLY_CHAIN: 'supply_chain',
    HUMAN_RESOURCES: 'human_resources',

    // Digital Categories
    WEBSITE: 'website',
    MOBILE: 'mobile',
    SOCIAL: 'social',
    EMAIL: 'email',
    SEARCH: 'search',
    ADVERTISING: 'advertising',

    // Performance Categories
    PERFORMANCE: 'performance',
    QUALITY: 'quality',
    EFFICIENCY: 'efficiency',
    PRODUCTIVITY: 'productivity',

    // Risk Categories
    RISK: 'risk',
    COMPLIANCE: 'compliance',
    SECURITY: 'security',
    FRAUD: 'fraud',

    // User Categories
    USER_BEHAVIOR: 'user_behavior',
    USER_ENGAGEMENT: 'user_engagement',
    USER_RETENTION: 'user_retention',
    USER_SATISFACTION: 'user_satisfaction',

    // System Categories
    SYSTEM: 'system',
    INFRASTRUCTURE: 'infrastructure',
    NETWORK: 'network',
    DATABASE: 'database',

    // Industry Categories
    ECOMMERCE: 'ecommerce',
    RETAIL: 'retail',
    B2B: 'b2b',
    B2C: 'b2c',

    // Custom Categories
    CUSTOM: 'custom',
    PROJECT: 'project',
    TEAM: 'team',
    DEPARTMENT: 'department',
  } as const,

  // Sub-categories
  SUB_CATEGORIES: {
    // Sales Sub-categories
    SALES_REVENUE: 'sales_revenue',
    SALES_VOLUME: 'sales_volume',
    SALES_CHANNEL: 'sales_channel',
    SALES_REGION: 'sales_region',
    SALES_TEAM: 'sales_team',

    // Marketing Sub-categories
    MARKETING_CAMPAIGN: 'marketing_campaign',
    MARKETING_CHANNEL: 'marketing_channel',
    MARKETING_CONTENT: 'marketing_content',
    MARKETING_SOCIAL: 'marketing_social',
    MARKETING_SEO: 'marketing_seo',

    // Customer Sub-categories
    CUSTOMER_DEMOGRAPHIC: 'customer_demographic',
    CUSTOMER_BEHAVIOR: 'customer_behavior',
    CUSTOMER_JOURNEY: 'customer_journey',
    CUSTOMER_SEGMENT: 'customer_segment',

    // Product Sub-categories
    PRODUCT_PERFORMANCE: 'product_performance',
    PRODUCT_QUALITY: 'product_quality',
    PRODUCT_REVIEWS: 'product_reviews',
    PRODUCT_INVENTORY: 'product_inventory',

    // Website Sub-categories
    WEBSITE_TRAFFIC: 'website_traffic',
    WEBSITE_USER: 'website_user',
    WEBSITE_CONTENT: 'website_content',
    WEBSITE_CONVERSION: 'website_conversion',
  } as const,

  // Category Groups
  GROUPS: {
    REVENUE: 'revenue',
    ENGAGEMENT: 'engagement',
    ACQUISITION: 'acquisition',
    RETENTION: 'retention',
    MONETIZATION: 'monetization',
    PERFORMANCE: 'performance',
    OPERATIONAL: 'operational',
    STRATEGIC: 'strategic',
  } as const,

  // Category Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Category Visibility
  VISIBILITY: {
    PUBLIC: 'public',
    TEAM: 'team',
    DEPARTMENT: 'department',
    ORGANIZATION: 'organization',
    PRIVATE: 'private',
  } as const,

  // Category Status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
    DEPRECATED: 'deprecated',
  } as const,
} as const;

// Analytics Category Types
export type AnalyticsCategoryType =
  (typeof ANALYTICS_CATEGORY.CATEGORIES)[keyof typeof ANALYTICS_CATEGORY.CATEGORIES];

// Analytics Sub-category Types
export type AnalyticsSubCategoryType =
  (typeof ANALYTICS_CATEGORY.SUB_CATEGORIES)[keyof typeof ANALYTICS_CATEGORY.SUB_CATEGORIES];

// Analytics Category Groups
export type AnalyticsCategoryGroup =
  (typeof ANALYTICS_CATEGORY.GROUPS)[keyof typeof ANALYTICS_CATEGORY.GROUPS];

// Analytics Category Priorities
export type AnalyticsCategoryPriority =
  (typeof ANALYTICS_CATEGORY.PRIORITIES)[keyof typeof ANALYTICS_CATEGORY.PRIORITIES];

// Analytics Category Visibility
export type AnalyticsCategoryVisibility =
  (typeof ANALYTICS_CATEGORY.VISIBILITY)[keyof typeof ANALYTICS_CATEGORY.VISIBILITY];

// Analytics Category Status
export type AnalyticsCategoryStatus =
  (typeof ANALYTICS_CATEGORY.STATUS)[keyof typeof ANALYTICS_CATEGORY.STATUS];

// Analytics Category Label
export function getAnalyticsCategoryLabel(category: AnalyticsCategoryType): string {
  const labels: Record<AnalyticsCategoryType, string> = {
    [ANALYTICS_CATEGORY.CATEGORIES.SALES]: 'Sales',
    [ANALYTICS_CATEGORY.CATEGORIES.MARKETING]: 'Marketing',
    [ANALYTICS_CATEGORY.CATEGORIES.FINANCE]: 'Finance',
    [ANALYTICS_CATEGORY.CATEGORIES.OPERATIONS]: 'Operations',
    [ANALYTICS_CATEGORY.CATEGORIES.CUSTOMER]: 'Customer',
    [ANALYTICS_CATEGORY.CATEGORIES.PRODUCT]: 'Product',
    [ANALYTICS_CATEGORY.CATEGORIES.INVENTORY]: 'Inventory',
    [ANALYTICS_CATEGORY.CATEGORIES.SUPPLY_CHAIN]: 'Supply Chain',
    [ANALYTICS_CATEGORY.CATEGORIES.HUMAN_RESOURCES]: 'Human Resources',
    [ANALYTICS_CATEGORY.CATEGORIES.WEBSITE]: 'Website',
    [ANALYTICS_CATEGORY.CATEGORIES.MOBILE]: 'Mobile',
    [ANALYTICS_CATEGORY.CATEGORIES.SOCIAL]: 'Social Media',
    [ANALYTICS_CATEGORY.CATEGORIES.EMAIL]: 'Email',
    [ANALYTICS_CATEGORY.CATEGORIES.SEARCH]: 'Search',
    [ANALYTICS_CATEGORY.CATEGORIES.ADVERTISING]: 'Advertising',
    [ANALYTICS_CATEGORY.CATEGORIES.PERFORMANCE]: 'Performance',
    [ANALYTICS_CATEGORY.CATEGORIES.QUALITY]: 'Quality',
    [ANALYTICS_CATEGORY.CATEGORIES.EFFICIENCY]: 'Efficiency',
    [ANALYTICS_CATEGORY.CATEGORIES.PRODUCTIVITY]: 'Productivity',
    [ANALYTICS_CATEGORY.CATEGORIES.RISK]: 'Risk',
    [ANALYTICS_CATEGORY.CATEGORIES.COMPLIANCE]: 'Compliance',
    [ANALYTICS_CATEGORY.CATEGORIES.SECURITY]: 'Security',
    [ANALYTICS_CATEGORY.CATEGORIES.FRAUD]: 'Fraud',
    [ANALYTICS_CATEGORY.CATEGORIES.USER_BEHAVIOR]: 'User Behavior',
    [ANALYTICS_CATEGORY.CATEGORIES.USER_ENGAGEMENT]: 'User Engagement',
    [ANALYTICS_CATEGORY.CATEGORIES.USER_RETENTION]: 'User Retention',
    [ANALYTICS_CATEGORY.CATEGORIES.USER_SATISFACTION]: 'User Satisfaction',
    [ANALYTICS_CATEGORY.CATEGORIES.SYSTEM]: 'System',
    [ANALYTICS_CATEGORY.CATEGORIES.INFRASTRUCTURE]: 'Infrastructure',
    [ANALYTICS_CATEGORY.CATEGORIES.NETWORK]: 'Network',
    [ANALYTICS_CATEGORY.CATEGORIES.DATABASE]: 'Database',
    [ANALYTICS_CATEGORY.CATEGORIES.ECOMMERCE]: 'E-commerce',
    [ANALYTICS_CATEGORY.CATEGORIES.RETAIL]: 'Retail',
    [ANALYTICS_CATEGORY.CATEGORIES.B2B]: 'B2B',
    [ANALYTICS_CATEGORY.CATEGORIES.B2C]: 'B2C',
    [ANALYTICS_CATEGORY.CATEGORIES.CUSTOM]: 'Custom',
    [ANALYTICS_CATEGORY.CATEGORIES.PROJECT]: 'Project',
    [ANALYTICS_CATEGORY.CATEGORIES.TEAM]: 'Team',
    [ANALYTICS_CATEGORY.CATEGORIES.DEPARTMENT]: 'Department',
  };
  return labels[category] || 'Unknown';
}

// Analytics Sub-category Label
export function getAnalyticsSubCategoryLabel(subCategory: AnalyticsSubCategoryType): string {
  const labels: Record<AnalyticsSubCategoryType, string> = {
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.SALES_REVENUE]: 'Sales Revenue',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.SALES_VOLUME]: 'Sales Volume',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.SALES_CHANNEL]: 'Sales Channel',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.SALES_REGION]: 'Sales Region',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.SALES_TEAM]: 'Sales Team',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.MARKETING_CAMPAIGN]: 'Marketing Campaign',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.MARKETING_CHANNEL]: 'Marketing Channel',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.MARKETING_CONTENT]: 'Marketing Content',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.MARKETING_SOCIAL]: 'Social Media Marketing',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.MARKETING_SEO]: 'SEO Marketing',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.CUSTOMER_DEMOGRAPHIC]: 'Customer Demographic',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.CUSTOMER_BEHAVIOR]: 'Customer Behavior',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.CUSTOMER_JOURNEY]: 'Customer Journey',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.CUSTOMER_SEGMENT]: 'Customer Segment',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.PRODUCT_PERFORMANCE]: 'Product Performance',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.PRODUCT_QUALITY]: 'Product Quality',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.PRODUCT_REVIEWS]: 'Product Reviews',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.PRODUCT_INVENTORY]: 'Product Inventory',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.WEBSITE_TRAFFIC]: 'Website Traffic',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.WEBSITE_USER]: 'Website User',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.WEBSITE_CONTENT]: 'Website Content',
    [ANALYTICS_CATEGORY.SUB_CATEGORIES.WEBSITE_CONVERSION]: 'Website Conversion',
  };
  return labels[subCategory] || 'Unknown';
}

// Analytics Category Group Labels
export function getAnalyticsCategoryGroupLabel(group: AnalyticsCategoryGroup): string {
  const labels: Record<AnalyticsCategoryGroup, string> = {
    [ANALYTICS_CATEGORY.GROUPS.REVENUE]: 'Revenue',
    [ANALYTICS_CATEGORY.GROUPS.ENGAGEMENT]: 'Engagement',
    [ANALYTICS_CATEGORY.GROUPS.ACQUISITION]: 'Acquisition',
    [ANALYTICS_CATEGORY.GROUPS.RETENTION]: 'Retention',
    [ANALYTICS_CATEGORY.GROUPS.MONETIZATION]: 'Monetization',
    [ANALYTICS_CATEGORY.GROUPS.PERFORMANCE]: 'Performance',
    [ANALYTICS_CATEGORY.GROUPS.OPERATIONAL]: 'Operational',
    [ANALYTICS_CATEGORY.GROUPS.STRATEGIC]: 'Strategic',
  };
  return labels[group] || 'Unknown';
}

// Analytics Category Priority Labels
export function getAnalyticsCategoryPriorityLabel(priority: AnalyticsCategoryPriority): string {
  const labels: Record<AnalyticsCategoryPriority, string> = {
    [ANALYTICS_CATEGORY.PRIORITIES.CRITICAL]: 'Critical',
    [ANALYTICS_CATEGORY.PRIORITIES.HIGH]: 'High',
    [ANALYTICS_CATEGORY.PRIORITIES.MEDIUM]: 'Medium',
    [ANALYTICS_CATEGORY.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

// Analytics Category Status Labels
export function getAnalyticsCategoryStatusLabel(status: AnalyticsCategoryStatus): string {
  const labels: Record<AnalyticsCategoryStatus, string> = {
    [ANALYTICS_CATEGORY.STATUS.ACTIVE]: 'Active',
    [ANALYTICS_CATEGORY.STATUS.INACTIVE]: 'Inactive',
    [ANALYTICS_CATEGORY.STATUS.ARCHIVED]: 'Archived',
    [ANALYTICS_CATEGORY.STATUS.DEPRECATED]: 'Deprecated',
  };
  return labels[status] || 'Unknown';
}

// Check if category is active
export function isAnalyticsCategoryActive(status: AnalyticsCategoryStatus): boolean {
  return status === ANALYTICS_CATEGORY.STATUS.ACTIVE;
}

// Check if category is archived
export function isAnalyticsCategoryArchived(status: AnalyticsCategoryStatus): boolean {
  return (
    status === ANALYTICS_CATEGORY.STATUS.ARCHIVED || status === ANALYTICS_CATEGORY.STATUS.DEPRECATED
  );
}
