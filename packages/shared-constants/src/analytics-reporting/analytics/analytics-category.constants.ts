/**
 * @fileoverview Analytics data categories and classifications
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics data categories for data classification
 */
export enum AnalyticsDataCategory {
  /** Demographic data - age, gender, location, etc. */
  DEMOGRAPHIC = 'DEMOGRAPHIC',
  /** Behavioral data - user actions, patterns, preferences */
  BEHAVIORAL = 'BEHAVIORAL',
  /** Transactional data - purchases, orders, payments */
  TRANSACTIONAL = 'TRANSACTIONAL',
  /** Engagement data - interactions, sessions, activity */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Acquisition data - new users, sources, channels */
  ACQUISITION = 'ACQUISITION',
  /** Retention data - returning users, loyalty, churn */
  RETENTION = 'RETENTION',
  /** Revenue data - income, sales, earnings */
  REVENUE = 'REVENUE',
  /** Cost data - expenses, overhead, spending */
  COST = 'COST',
  /** Profit data - earnings, margins, ROI */
  PROFIT = 'PROFIT',
  /** Operational data - processes, efficiency, performance */
  OPERATIONAL = 'OPERATIONAL',
  /** Customer satisfaction data - feedback, ratings, NPS */
  CUSTOMER_SATISFACTION = 'CUSTOMER_SATISFACTION',
  /** Support data - tickets, resolution, service */
  SUPPORT = 'SUPPORT',
  /** Marketing data - campaigns, leads, conversions */
  MARKETING = 'MARKETING',
  /** Product data - features, usage, feedback */
  PRODUCT = 'PRODUCT',
  /** Inventory data - stock, supply chain, logistics */
  INVENTORY = 'INVENTORY',
  /** Financial data - accounting, budgeting, forecasting */
  FINANCIAL = 'FINANCIAL',
  /** Risk data - fraud, compliance, security */
  RISK = 'RISK',
  /** Social data - social media, reviews, mentions */
  SOCIAL = 'SOCIAL',
  /** Technical data - system logs, errors, performance */
  TECHNICAL = 'TECHNICAL',
}

/**
 * Data category configuration with labels and descriptions
 */
export const ANALYTICS_DATA_CATEGORY_CONFIG: Record<
  AnalyticsDataCategory,
  { label: string; description: string; priority: number; icon?: string }
> = {
  [AnalyticsDataCategory.DEMOGRAPHIC]: {
    label: 'Demographic Data',
    description: 'User demographics including age, gender, location, and education',
    priority: 1,
    icon: 'UserCircle',
  },
  [AnalyticsDataCategory.BEHAVIORAL]: {
    label: 'Behavioral Data',
    description: 'User behavior patterns, preferences, and interaction history',
    priority: 2,
    icon: 'Activity',
  },
  [AnalyticsDataCategory.TRANSACTIONAL]: {
    label: 'Transactional Data',
    description: 'Purchase history, order details, and payment information',
    priority: 1,
    icon: 'ShoppingCart',
  },
  [AnalyticsDataCategory.ENGAGEMENT]: {
    label: 'Engagement Data',
    description: 'User engagement metrics, session data, and activity levels',
    priority: 2,
    icon: 'BarChart3',
  },
  [AnalyticsDataCategory.ACQUISITION]: {
    label: 'Acquisition Data',
    description: 'New user acquisition sources, channels, and conversion funnels',
    priority: 2,
    icon: 'Rocket',
  },
  [AnalyticsDataCategory.RETENTION]: {
    label: 'Retention Data',
    description: 'User retention, loyalty metrics, and churn analysis',
    priority: 1,
    icon: 'Heart',
  },
  [AnalyticsDataCategory.REVENUE]: {
    label: 'Revenue Data',
    description: 'Total revenue, recurring revenue, and revenue streams',
    priority: 1,
    icon: 'DollarSign',
  },
  [AnalyticsDataCategory.COST]: {
    label: 'Cost Data',
    description: 'Operating costs, overhead, and expense tracking',
    priority: 2,
    icon: 'TrendingDown',
  },
  [AnalyticsDataCategory.PROFIT]: {
    label: 'Profit Data',
    description: 'Profit margins, net earnings, and ROI analysis',
    priority: 1,
    icon: 'TrendingUp',
  },
  [AnalyticsDataCategory.OPERATIONAL]: {
    label: 'Operational Data',
    description: 'Business operations, efficiency metrics, and process optimization',
    priority: 2,
    icon: 'Gauge',
  },
  [AnalyticsDataCategory.CUSTOMER_SATISFACTION]: {
    label: 'Customer Satisfaction',
    description: 'Customer feedback, NPS scores, and satisfaction metrics',
    priority: 1,
    icon: 'Smile',
  },
  [AnalyticsDataCategory.SUPPORT]: {
    label: 'Support Data',
    description: 'Support tickets, resolution time, and service quality',
    priority: 2,
    icon: 'Headset',
  },
  [AnalyticsDataCategory.MARKETING]: {
    label: 'Marketing Data',
    description: 'Campaign performance, lead generation, and marketing ROI',
    priority: 2,
    icon: 'Megaphone',
  },
  [AnalyticsDataCategory.PRODUCT]: {
    label: 'Product Data',
    description: 'Product usage, feature adoption, and product feedback',
    priority: 2,
    icon: 'Package',
  },
  [AnalyticsDataCategory.INVENTORY]: {
    label: 'Inventory Data',
    description: 'Stock levels, supply chain metrics, and inventory turnover',
    priority: 2,
    icon: 'Boxes',
  },
  [AnalyticsDataCategory.FINANCIAL]: {
    label: 'Financial Data',
    description: 'Financial reports, budgeting, and forecasting',
    priority: 1,
    icon: 'LineChart',
  },
  [AnalyticsDataCategory.RISK]: {
    label: 'Risk Data',
    description: 'Risk assessment, fraud detection, and compliance metrics',
    priority: 2,
    icon: 'Shield',
  },
  [AnalyticsDataCategory.SOCIAL]: {
    label: 'Social Data',
    description: 'Social media metrics, reviews, and brand mentions',
    priority: 3,
    icon: 'Share2',
  },
  [AnalyticsDataCategory.TECHNICAL]: {
    label: 'Technical Data',
    description: 'System performance, error logs, and technical metrics',
    priority: 2,
    icon: 'Code2',
  },
};

/**
 * Data category groups for organizing categories
 */
export enum AnalyticsCategoryGroup {
  /** Customer-related categories */
  CUSTOMER = 'CUSTOMER',
  /** Business-related categories */
  BUSINESS = 'BUSINESS',
  /** Operational categories */
  OPERATIONAL = 'OPERATIONAL',
  /** Financial categories */
  FINANCIAL = 'FINANCIAL',
  /** Product-related categories */
  PRODUCT = 'PRODUCT',
  /** Technical categories */
  TECHNICAL = 'TECHNICAL',
}

/**
 * Category group configuration
 */
export const ANALYTICS_CATEGORY_GROUP_CONFIG: Record<
  AnalyticsCategoryGroup,
  { label: string; description: string; priority: number }
> = {
  [AnalyticsCategoryGroup.CUSTOMER]: {
    label: 'Customer Data',
    description: 'Data related to customer behavior, satisfaction, and demographics',
    priority: 1,
  },
  [AnalyticsCategoryGroup.BUSINESS]: {
    label: 'Business Data',
    description: 'Data related to business operations, revenue, and growth',
    priority: 1,
  },
  [AnalyticsCategoryGroup.OPERATIONAL]: {
    label: 'Operational Data',
    description: 'Data related to internal operations, processes, and efficiency',
    priority: 2,
  },
  [AnalyticsCategoryGroup.FINANCIAL]: {
    label: 'Financial Data',
    description: 'Data related to financial metrics, reporting, and compliance',
    priority: 1,
  },
  [AnalyticsCategoryGroup.PRODUCT]: {
    label: 'Product Data',
    description: 'Data related to product usage, features, and feedback',
    priority: 2,
  },
  [AnalyticsCategoryGroup.TECHNICAL]: {
    label: 'Technical Data',
    description: 'Data related to system performance, technical issues, and logs',
    priority: 2,
  },
};

/**
 * Mapping of data categories to their groups
 */
export const ANALYTICS_CATEGORY_TO_GROUP: Record<AnalyticsDataCategory, AnalyticsCategoryGroup> = {
  [AnalyticsDataCategory.DEMOGRAPHIC]: AnalyticsCategoryGroup.CUSTOMER,
  [AnalyticsDataCategory.BEHAVIORAL]: AnalyticsCategoryGroup.CUSTOMER,
  [AnalyticsDataCategory.TRANSACTIONAL]: AnalyticsCategoryGroup.BUSINESS,
  [AnalyticsDataCategory.ENGAGEMENT]: AnalyticsCategoryGroup.CUSTOMER,
  [AnalyticsDataCategory.ACQUISITION]: AnalyticsCategoryGroup.BUSINESS,
  [AnalyticsDataCategory.RETENTION]: AnalyticsCategoryGroup.CUSTOMER,
  [AnalyticsDataCategory.REVENUE]: AnalyticsCategoryGroup.FINANCIAL,
  [AnalyticsDataCategory.COST]: AnalyticsCategoryGroup.FINANCIAL,
  [AnalyticsDataCategory.PROFIT]: AnalyticsCategoryGroup.FINANCIAL,
  [AnalyticsDataCategory.OPERATIONAL]: AnalyticsCategoryGroup.OPERATIONAL,
  [AnalyticsDataCategory.CUSTOMER_SATISFACTION]: AnalyticsCategoryGroup.CUSTOMER,
  [AnalyticsDataCategory.SUPPORT]: AnalyticsCategoryGroup.OPERATIONAL,
  [AnalyticsDataCategory.MARKETING]: AnalyticsCategoryGroup.BUSINESS,
  [AnalyticsDataCategory.PRODUCT]: AnalyticsCategoryGroup.PRODUCT,
  [AnalyticsDataCategory.INVENTORY]: AnalyticsCategoryGroup.OPERATIONAL,
  [AnalyticsDataCategory.FINANCIAL]: AnalyticsCategoryGroup.FINANCIAL,
  [AnalyticsDataCategory.RISK]: AnalyticsCategoryGroup.BUSINESS,
  [AnalyticsDataCategory.SOCIAL]: AnalyticsCategoryGroup.CUSTOMER,
  [AnalyticsDataCategory.TECHNICAL]: AnalyticsCategoryGroup.TECHNICAL,
};

/**
 * Data sensitivity levels for categories
 */
export enum AnalyticsDataSensitivity {
  /** Public data - no restrictions */
  PUBLIC = 'PUBLIC',
  /** Internal data - limited access */
  INTERNAL = 'INTERNAL',
  /** Confidential data - restricted access */
  CONFIDENTIAL = 'CONFIDENTIAL',
  /** Highly confidential data - very restricted access */
  HIGHLY_CONFIDENTIAL = 'HIGHLY_CONFIDENTIAL',
  /** Personal Identifiable Information (PII) */
  PII = 'PII',
  /** Financial data requiring compliance */
  FINANCIAL_COMPLIANCE = 'FINANCIAL_COMPLIANCE',
  /** Medical or health data */
  HEALTH_DATA = 'HEALTH_DATA',
}

/**
 * Data sensitivity mapping for categories
 */
export const ANALYTICS_CATEGORY_SENSITIVITY: Record<
  AnalyticsDataCategory,
  AnalyticsDataSensitivity
> = {
  [AnalyticsDataCategory.DEMOGRAPHIC]: AnalyticsDataSensitivity.PII,
  [AnalyticsDataCategory.BEHAVIORAL]: AnalyticsDataSensitivity.CONFIDENTIAL,
  [AnalyticsDataCategory.TRANSACTIONAL]: AnalyticsDataSensitivity.FINANCIAL_COMPLIANCE,
  [AnalyticsDataCategory.ENGAGEMENT]: AnalyticsDataSensitivity.INTERNAL,
  [AnalyticsDataCategory.ACQUISITION]: AnalyticsDataSensitivity.INTERNAL,
  [AnalyticsDataCategory.RETENTION]: AnalyticsDataSensitivity.CONFIDENTIAL,
  [AnalyticsDataCategory.REVENUE]: AnalyticsDataSensitivity.FINANCIAL_COMPLIANCE,
  [AnalyticsDataCategory.COST]: AnalyticsDataSensitivity.CONFIDENTIAL,
  [AnalyticsDataCategory.PROFIT]: AnalyticsDataSensitivity.HIGHLY_CONFIDENTIAL,
  [AnalyticsDataCategory.OPERATIONAL]: AnalyticsDataSensitivity.INTERNAL,
  [AnalyticsDataCategory.CUSTOMER_SATISFACTION]: AnalyticsDataSensitivity.CONFIDENTIAL,
  [AnalyticsDataCategory.SUPPORT]: AnalyticsDataSensitivity.INTERNAL,
  [AnalyticsDataCategory.MARKETING]: AnalyticsDataSensitivity.INTERNAL,
  [AnalyticsDataCategory.PRODUCT]: AnalyticsDataSensitivity.INTERNAL,
  [AnalyticsDataCategory.INVENTORY]: AnalyticsDataSensitivity.INTERNAL,
  [AnalyticsDataCategory.FINANCIAL]: AnalyticsDataSensitivity.FINANCIAL_COMPLIANCE,
  [AnalyticsDataCategory.RISK]: AnalyticsDataSensitivity.HIGHLY_CONFIDENTIAL,
  [AnalyticsDataCategory.SOCIAL]: AnalyticsDataSensitivity.PUBLIC,
  [AnalyticsDataCategory.TECHNICAL]: AnalyticsDataSensitivity.INTERNAL,
};

/**
 * Data retention periods for categories in days
 */
export const ANALYTICS_CATEGORY_RETENTION: Record<AnalyticsDataCategory, number> = {
  [AnalyticsDataCategory.DEMOGRAPHIC]: 730, // 2 years
  [AnalyticsDataCategory.BEHAVIORAL]: 365, // 1 year
  [AnalyticsDataCategory.TRANSACTIONAL]: 2555, // 7 years (tax compliance)
  [AnalyticsDataCategory.ENGAGEMENT]: 365, // 1 year
  [AnalyticsDataCategory.ACQUISITION]: 730, // 2 years
  [AnalyticsDataCategory.RETENTION]: 730, // 2 years
  [AnalyticsDataCategory.REVENUE]: 2555, // 7 years
  [AnalyticsDataCategory.COST]: 2555, // 7 years
  [AnalyticsDataCategory.PROFIT]: 2555, // 7 years
  [AnalyticsDataCategory.OPERATIONAL]: 365, // 1 year
  [AnalyticsDataCategory.CUSTOMER_SATISFACTION]: 730, // 2 years
  [AnalyticsDataCategory.SUPPORT]: 365, // 1 year
  [AnalyticsDataCategory.MARKETING]: 730, // 2 years
  [AnalyticsDataCategory.PRODUCT]: 365, // 1 year
  [AnalyticsDataCategory.INVENTORY]: 730, // 2 years
  [AnalyticsDataCategory.FINANCIAL]: 2555, // 7 years
  [AnalyticsDataCategory.RISK]: 2555, // 7 years
  [AnalyticsDataCategory.SOCIAL]: 365, // 1 year
  [AnalyticsDataCategory.TECHNICAL]: 90, // 3 months
};

/**
 * Data category status for operational control
 */
export enum AnalyticsCategoryStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Archived data available for queries */
  ARCHIVED = 'ARCHIVED',
  /** Under review for compliance */
  REVIEW = 'REVIEW',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for each data category
 */
export const ANALYTICS_CATEGORY_DEFAULT_STATUS: Record<
  AnalyticsDataCategory,
  AnalyticsCategoryStatus
> = {
  [AnalyticsDataCategory.DEMOGRAPHIC]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.BEHAVIORAL]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.TRANSACTIONAL]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.ENGAGEMENT]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.ACQUISITION]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.RETENTION]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.REVENUE]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.COST]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.PROFIT]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.OPERATIONAL]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.CUSTOMER_SATISFACTION]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.SUPPORT]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.MARKETING]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.PRODUCT]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.INVENTORY]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.FINANCIAL]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.RISK]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.SOCIAL]: AnalyticsCategoryStatus.ACTIVE,
  [AnalyticsDataCategory.TECHNICAL]: AnalyticsCategoryStatus.ACTIVE,
};

/**
 * Get label for a data category
 */
export function getAnalyticsCategoryLabel(category: AnalyticsDataCategory): string {
  return ANALYTICS_DATA_CATEGORY_CONFIG[category]?.label || category;
}

/**
 * Get description for a data category
 */
export function getAnalyticsCategoryDescription(category: AnalyticsDataCategory): string {
  return ANALYTICS_DATA_CATEGORY_CONFIG[category]?.description || '';
}

/**
 * Get priority for a data category
 */
export function getAnalyticsCategoryPriority(category: AnalyticsDataCategory): number {
  return ANALYTICS_DATA_CATEGORY_CONFIG[category]?.priority || 3;
}

/**
 * Get group for a data category
 */
export function getAnalyticsCategoryGroup(category: AnalyticsDataCategory): AnalyticsCategoryGroup {
  return ANALYTICS_CATEGORY_TO_GROUP[category];
}

/**
 * Get sensitivity for a data category
 */
export function getAnalyticsCategorySensitivity(
  category: AnalyticsDataCategory
): AnalyticsDataSensitivity {
  return ANALYTICS_CATEGORY_SENSITIVITY[category];
}

/**
 * Get retention period for a data category in days
 */
export function getAnalyticsCategoryRetention(category: AnalyticsDataCategory): number {
  return ANALYTICS_CATEGORY_RETENTION[category];
}

/**
 * Get status for a data category
 */
export function getAnalyticsCategoryStatus(
  category: AnalyticsDataCategory
): AnalyticsCategoryStatus {
  return ANALYTICS_CATEGORY_DEFAULT_STATUS[category];
}

/**
 * Set status for a data category
 */
export function setAnalyticsCategoryStatus(
  category: AnalyticsDataCategory,
  status: AnalyticsCategoryStatus
): void {
  ANALYTICS_CATEGORY_DEFAULT_STATUS[category] = status;
}

/**
 * Get all categories in a specific group
 */
export function getCategoriesByGroup(group: AnalyticsCategoryGroup): AnalyticsDataCategory[] {
  return Object.entries(ANALYTICS_CATEGORY_TO_GROUP)
    .filter(([_, g]) => g === group)
    .map(([category]) => category as AnalyticsDataCategory);
}

/**
 * Check if a category is active
 */
export function isCategoryActive(category: AnalyticsDataCategory): boolean {
  return getAnalyticsCategoryStatus(category) === AnalyticsCategoryStatus.ACTIVE;
}

/**
 * Check if a category requires compliance
 */
export function requiresCompliance(category: AnalyticsDataCategory): boolean {
  const sensitivity = getAnalyticsCategorySensitivity(category);
  return (
    sensitivity === AnalyticsDataSensitivity.FINANCIAL_COMPLIANCE ||
    sensitivity === AnalyticsDataSensitivity.PII ||
    sensitivity === AnalyticsDataSensitivity.HEALTH_DATA
  );
}

/**
 * Data category priority levels for ranking
 */
export enum AnalyticsCategoryPriorityLevel {
  /** Critical priority - essential data */
  CRITICAL = 'CRITICAL',
  /** High priority - important data */
  HIGH = 'HIGH',
  /** Medium priority - useful data */
  MEDIUM = 'MEDIUM',
  /** Low priority - nice to have */
  LOW = 'LOW',
}

/**
 * Get priority level from numeric priority
 */
export function getPriorityLevel(priority: number): AnalyticsCategoryPriorityLevel {
  if (priority <= 1) return AnalyticsCategoryPriorityLevel.CRITICAL;
  if (priority === 2) return AnalyticsCategoryPriorityLevel.HIGH;
  if (priority === 3) return AnalyticsCategoryPriorityLevel.MEDIUM;
  return AnalyticsCategoryPriorityLevel.LOW;
}
