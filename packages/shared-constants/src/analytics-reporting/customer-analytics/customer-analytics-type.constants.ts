/**
 * @fileoverview Customer analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Customer analytics types enum for different customer-related analytics
 */
export enum CustomerAnalyticsType {
  /** Customer demographic analytics */
  CUSTOMER_DEMOGRAPHIC = 'CUSTOMER_DEMOGRAPHIC',
  /** Customer behavioral analytics */
  CUSTOMER_BEHAVIORAL = 'CUSTOMER_BEHAVIORAL',
  /** Customer transactional analytics */
  CUSTOMER_TRANSACTIONAL = 'CUSTOMER_TRANSACTIONAL',
  /** Customer engagement analytics */
  CUSTOMER_ENGAGEMENT = 'CUSTOMER_ENGAGEMENT',
  /** Customer retention analytics */
  CUSTOMER_RETENTION = 'CUSTOMER_RETENTION',
  /** Customer loyalty analytics */
  CUSTOMER_LOYALTY = 'CUSTOMER_LOYALTY',
  /** Customer satisfaction analytics */
  CUSTOMER_SATISFACTION = 'CUSTOMER_SATISFACTION',
  /** Customer feedback analytics */
  CUSTOMER_FEEDBACK = 'CUSTOMER_FEEDBACK',
  /** Customer support analytics */
  CUSTOMER_SUPPORT = 'CUSTOMER_SUPPORT',
  /** Customer social analytics */
  CUSTOMER_SOCIAL = 'CUSTOMER_SOCIAL',
  /** Customer preference analytics */
  CUSTOMER_PREFERENCE = 'CUSTOMER_PREFERENCE',
  /** Customer segment analytics */
  CUSTOMER_SEGMENT = 'CUSTOMER_SEGMENT',
  /** Customer journey analytics */
  CUSTOMER_JOURNEY = 'CUSTOMER_JOURNEY',
  /** Customer lifecycle analytics */
  CUSTOMER_LIFECYCLE = 'CUSTOMER_LIFECYCLE',
  /** Customer acquisition analytics */
  CUSTOMER_ACQUISITION = 'CUSTOMER_ACQUISITION',
  /** Customer churn analytics */
  CUSTOMER_CHURN = 'CUSTOMER_CHURN',
  /** Customer reactivation analytics */
  CUSTOMER_REACTIVATION = 'CUSTOMER_REACTIVATION',
  /** Customer referral analytics */
  CUSTOMER_REFERRAL = 'CUSTOMER_REFERRAL',
  /** Customer review analytics */
  CUSTOMER_REVIEW = 'CUSTOMER_REVIEW',
  /** Customer rating analytics */
  CUSTOMER_RATING = 'CUSTOMER_RATING',
  /** Customer advocacy analytics */
  CUSTOMER_ADVOCACY = 'CUSTOMER_ADVOCACY',
  /** Customer experience analytics */
  CUSTOMER_EXPERIENCE = 'CUSTOMER_EXPERIENCE',
  /** Customer trust analytics */
  CUSTOMER_TRUST = 'CUSTOMER_TRUST',
  /** Customer value analytics */
  CUSTOMER_VALUE = 'CUSTOMER_VALUE',
  /** Customer growth analytics */
  CUSTOMER_GROWTH = 'CUSTOMER_GROWTH',
}

/**
 * Customer analytics category for grouping
 */
export enum CustomerAnalyticsCategory {
  /** Identity analytics */
  IDENTITY = 'IDENTITY',
  /** Behavioral analytics */
  BEHAVIOR = 'BEHAVIOR',
  /** Engagement analytics */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Value analytics */
  VALUE = 'VALUE',
  /** Satisfaction analytics */
  SATISFACTION = 'SATISFACTION',
  /** Loyalty analytics */
  LOYALTY = 'LOYALTY',
  /** Support analytics */
  SUPPORT = 'SUPPORT',
  /** Growth analytics */
  GROWTH = 'GROWTH',
}

/**
 * Customer analytics category mapping
 */
export const CUSTOMER_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  CustomerAnalyticsType,
  CustomerAnalyticsCategory
> = {
  [CustomerAnalyticsType.CUSTOMER_DEMOGRAPHIC]: CustomerAnalyticsCategory.IDENTITY,
  [CustomerAnalyticsType.CUSTOMER_BEHAVIORAL]: CustomerAnalyticsCategory.BEHAVIOR,
  [CustomerAnalyticsType.CUSTOMER_TRANSACTIONAL]: CustomerAnalyticsCategory.VALUE,
  [CustomerAnalyticsType.CUSTOMER_ENGAGEMENT]: CustomerAnalyticsCategory.ENGAGEMENT,
  [CustomerAnalyticsType.CUSTOMER_RETENTION]: CustomerAnalyticsCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_LOYALTY]: CustomerAnalyticsCategory.LOYALTY,
  [CustomerAnalyticsType.CUSTOMER_SATISFACTION]: CustomerAnalyticsCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_FEEDBACK]: CustomerAnalyticsCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_SUPPORT]: CustomerAnalyticsCategory.SUPPORT,
  [CustomerAnalyticsType.CUSTOMER_SOCIAL]: CustomerAnalyticsCategory.ENGAGEMENT,
  [CustomerAnalyticsType.CUSTOMER_PREFERENCE]: CustomerAnalyticsCategory.IDENTITY,
  [CustomerAnalyticsType.CUSTOMER_SEGMENT]: CustomerAnalyticsCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_JOURNEY]: CustomerAnalyticsCategory.BEHAVIOR,
  [CustomerAnalyticsType.CUSTOMER_LIFECYCLE]: CustomerAnalyticsCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_ACQUISITION]: CustomerAnalyticsCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_CHURN]: CustomerAnalyticsCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_REACTIVATION]: CustomerAnalyticsCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_REFERRAL]: CustomerAnalyticsCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_REVIEW]: CustomerAnalyticsCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_RATING]: CustomerAnalyticsCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_ADVOCACY]: CustomerAnalyticsCategory.LOYALTY,
  [CustomerAnalyticsType.CUSTOMER_EXPERIENCE]: CustomerAnalyticsCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_TRUST]: CustomerAnalyticsCategory.LOYALTY,
  [CustomerAnalyticsType.CUSTOMER_VALUE]: CustomerAnalyticsCategory.VALUE,
  [CustomerAnalyticsType.CUSTOMER_GROWTH]: CustomerAnalyticsCategory.GROWTH,
};

/**
 * Customer analytics type configuration
 */
export interface CustomerAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresCustomerId: boolean;
}

export const CUSTOMER_ANALYTICS_TYPE_CONFIG: Record<
  CustomerAnalyticsType,
  CustomerAnalyticsTypeConfig
> = {
  [CustomerAnalyticsType.CUSTOMER_DEMOGRAPHIC]: {
    label: 'Customer Demographic',
    description: 'Analytics for customer demographic data',
    icon: 'Users',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_BEHAVIORAL]: {
    label: 'Customer Behavioral',
    description: 'Analytics for customer behavior patterns',
    icon: 'Activity',
    color: '#6366F1',
    priority: 1,
    isRealtime: true,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_TRANSACTIONAL]: {
    label: 'Customer Transactional',
    description: 'Analytics for customer transactions',
    icon: 'ShoppingCart',
    color: '#10B981',
    priority: 1,
    isRealtime: true,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_ENGAGEMENT]: {
    label: 'Customer Engagement',
    description: 'Analytics for customer engagement metrics',
    icon: 'Activity',
    color: '#8B5CF6',
    priority: 1,
    isRealtime: true,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_RETENTION]: {
    label: 'Customer Retention',
    description: 'Analytics for customer retention rates',
    icon: 'UserCheck',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_LOYALTY]: {
    label: 'Customer Loyalty',
    description: 'Analytics for customer loyalty metrics',
    icon: 'Heart',
    color: '#EC4899',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_SATISFACTION]: {
    label: 'Customer Satisfaction',
    description: 'Analytics for customer satisfaction scores',
    icon: 'Smile',
    color: '#F59E0B',
    priority: 1,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_FEEDBACK]: {
    label: 'Customer Feedback',
    description: 'Analytics for customer feedback and reviews',
    icon: 'MessageSquare',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_SUPPORT]: {
    label: 'Customer Support',
    description: 'Analytics for customer support interactions',
    icon: 'Headset',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_SOCIAL]: {
    label: 'Customer Social',
    description: 'Analytics for customer social media activity',
    icon: 'Share2',
    color: '#1DA1F2',
    priority: 2,
    isRealtime: true,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_PREFERENCE]: {
    label: 'Customer Preference',
    description: 'Analytics for customer preferences',
    icon: 'Settings',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_SEGMENT]: {
    label: 'Customer Segment',
    description: 'Analytics for customer segmentation',
    icon: 'PieChart',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: false,
  },
  [CustomerAnalyticsType.CUSTOMER_JOURNEY]: {
    label: 'Customer Journey',
    description: 'Analytics for customer journey mapping',
    icon: 'Map',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_LIFECYCLE]: {
    label: 'Customer Lifecycle',
    description: 'Analytics for customer lifecycle stages',
    icon: 'Cycle',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_ACQUISITION]: {
    label: 'Customer Acquisition',
    description: 'Analytics for customer acquisition costs',
    icon: 'UserPlus',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresCustomerId: false,
  },
  [CustomerAnalyticsType.CUSTOMER_CHURN]: {
    label: 'Customer Churn',
    description: 'Analytics for customer churn rates',
    icon: 'UserX',
    color: '#EF4444',
    priority: 1,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_REACTIVATION]: {
    label: 'Customer Reactivation',
    description: 'Analytics for customer reactivation campaigns',
    icon: 'Refresh',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_REFERRAL]: {
    label: 'Customer Referral',
    description: 'Analytics for customer referrals',
    icon: 'Users',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_REVIEW]: {
    label: 'Customer Review',
    description: 'Analytics for customer reviews',
    icon: 'FileText',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_RATING]: {
    label: 'Customer Rating',
    description: 'Analytics for customer ratings',
    icon: 'Star',
    color: '#F472B6',
    priority: 2,
    isRealtime: true,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_ADVOCACY]: {
    label: 'Customer Advocacy',
    description: 'Analytics for customer advocacy programs',
    icon: 'Shield',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_EXPERIENCE]: {
    label: 'Customer Experience',
    description: 'Analytics for customer experience metrics',
    icon: 'Layout',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_TRUST]: {
    label: 'Customer Trust',
    description: 'Analytics for customer trust metrics',
    icon: 'ShieldCheck',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_VALUE]: {
    label: 'Customer Value',
    description: 'Analytics for customer lifetime value',
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresCustomerId: true,
  },
  [CustomerAnalyticsType.CUSTOMER_GROWTH]: {
    label: 'Customer Growth',
    description: 'Analytics for customer growth metrics',
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresCustomerId: false,
  },
};

/**
 * Get customer analytics type label
 */
export function getCustomerAnalyticsTypeLabel(type: CustomerAnalyticsType): string {
  return CUSTOMER_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get customer analytics type description
 */
export function getCustomerAnalyticsTypeDescription(type: CustomerAnalyticsType): string {
  return CUSTOMER_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get customer analytics type category
 */
export function getCustomerAnalyticsTypeCategory(
  type: CustomerAnalyticsType
): CustomerAnalyticsCategory {
  return CUSTOMER_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get customer analytics types by category
 */
export function getCustomerAnalyticsTypesByCategory(
  category: CustomerAnalyticsCategory
): CustomerAnalyticsType[] {
  return Object.entries(CUSTOMER_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as CustomerAnalyticsType);
}

/**
 * Check if customer analytics type requires customer ID
 */
export function customerAnalyticsTypeRequiresCustomerId(type: CustomerAnalyticsType): boolean {
  return CUSTOMER_ANALYTICS_TYPE_CONFIG[type]?.requiresCustomerId || false;
}

/**
 * Check if customer analytics type is real-time
 */
export function isCustomerAnalyticsTypeRealtime(type: CustomerAnalyticsType): boolean {
  return CUSTOMER_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get customer analytics type priority
 */
export function getCustomerAnalyticsTypePriority(type: CustomerAnalyticsType): number {
  return CUSTOMER_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Customer analytics type status
 */
export enum CustomerAnalyticsTypeStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Paused temporarily */
  PAUSED = 'PAUSED',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for customer analytics types
 */
export const CUSTOMER_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  CustomerAnalyticsType,
  CustomerAnalyticsTypeStatus
> = {
  [CustomerAnalyticsType.CUSTOMER_DEMOGRAPHIC]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_BEHAVIORAL]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_TRANSACTIONAL]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_ENGAGEMENT]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_RETENTION]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_LOYALTY]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_SATISFACTION]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_FEEDBACK]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_SUPPORT]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_SOCIAL]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_PREFERENCE]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_SEGMENT]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_JOURNEY]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_LIFECYCLE]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_ACQUISITION]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_CHURN]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_REACTIVATION]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_REFERRAL]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_REVIEW]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_RATING]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_ADVOCACY]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_EXPERIENCE]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_TRUST]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_VALUE]: CustomerAnalyticsTypeStatus.ACTIVE,
  [CustomerAnalyticsType.CUSTOMER_GROWTH]: CustomerAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get customer analytics type status
 */
export function getCustomerAnalyticsTypeStatus(
  type: CustomerAnalyticsType
): CustomerAnalyticsTypeStatus {
  return CUSTOMER_ANALYTICS_TYPE_DEFAULT_STATUS[type] || CustomerAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set customer analytics type status
 */
export function setCustomerAnalyticsTypeStatus(
  type: CustomerAnalyticsType,
  status: CustomerAnalyticsTypeStatus
): void {
  CUSTOMER_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Customer analytics priority levels
 */
export const CUSTOMER_ANALYTICS_PRIORITY_LEVELS = {
  /** Critical priority - essential analytics */
  CRITICAL: 1,
  /** High priority - important analytics */
  HIGH: 2,
  /** Medium priority - useful analytics */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get customer analytics types by priority
 */
export function getCustomerAnalyticsTypesByPriority(priority: number): CustomerAnalyticsType[] {
  return Object.entries(CUSTOMER_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as CustomerAnalyticsType);
}

/**
 * Get critical customer analytics types
 */
export function getCriticalCustomerAnalyticsTypes(): CustomerAnalyticsType[] {
  return getCustomerAnalyticsTypesByPriority(CUSTOMER_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Customer analytics sub-categories
 */
export enum CustomerAnalyticsSubCategory {
  /** Demographic analysis */
  DEMOGRAPHIC = 'DEMOGRAPHIC',
  /** Behavioral analysis */
  BEHAVIORAL = 'BEHAVIORAL',
  /** Transactional analysis */
  TRANSACTIONAL = 'TRANSACTIONAL',
  /** Engagement analysis */
  ENGAGEMENT = 'ENGAGEMENT',
  /** Satisfaction analysis */
  SATISFACTION = 'SATISFACTION',
  /** Loyalty analysis */
  LOYALTY = 'LOYALTY',
  /** Support analysis */
  SUPPORT = 'SUPPORT',
  /** Growth analysis */
  GROWTH = 'GROWTH',
  /** Value analysis */
  VALUE = 'VALUE',
}

/**
 * Mapping of customer analytics types to sub-categories
 */
export const CUSTOMER_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  CustomerAnalyticsType,
  CustomerAnalyticsSubCategory
> = {
  [CustomerAnalyticsType.CUSTOMER_DEMOGRAPHIC]: CustomerAnalyticsSubCategory.DEMOGRAPHIC,
  [CustomerAnalyticsType.CUSTOMER_PREFERENCE]: CustomerAnalyticsSubCategory.DEMOGRAPHIC,
  [CustomerAnalyticsType.CUSTOMER_BEHAVIORAL]: CustomerAnalyticsSubCategory.BEHAVIORAL,
  [CustomerAnalyticsType.CUSTOMER_JOURNEY]: CustomerAnalyticsSubCategory.BEHAVIORAL,
  [CustomerAnalyticsType.CUSTOMER_TRANSACTIONAL]: CustomerAnalyticsSubCategory.TRANSACTIONAL,
  [CustomerAnalyticsType.CUSTOMER_ENGAGEMENT]: CustomerAnalyticsSubCategory.ENGAGEMENT,
  [CustomerAnalyticsType.CUSTOMER_SOCIAL]: CustomerAnalyticsSubCategory.ENGAGEMENT,
  [CustomerAnalyticsType.CUSTOMER_SATISFACTION]: CustomerAnalyticsSubCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_FEEDBACK]: CustomerAnalyticsSubCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_REVIEW]: CustomerAnalyticsSubCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_RATING]: CustomerAnalyticsSubCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_EXPERIENCE]: CustomerAnalyticsSubCategory.SATISFACTION,
  [CustomerAnalyticsType.CUSTOMER_LOYALTY]: CustomerAnalyticsSubCategory.LOYALTY,
  [CustomerAnalyticsType.CUSTOMER_ADVOCACY]: CustomerAnalyticsSubCategory.LOYALTY,
  [CustomerAnalyticsType.CUSTOMER_TRUST]: CustomerAnalyticsSubCategory.LOYALTY,
  [CustomerAnalyticsType.CUSTOMER_SUPPORT]: CustomerAnalyticsSubCategory.SUPPORT,
  [CustomerAnalyticsType.CUSTOMER_RETENTION]: CustomerAnalyticsSubCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_ACQUISITION]: CustomerAnalyticsSubCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_CHURN]: CustomerAnalyticsSubCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_REACTIVATION]: CustomerAnalyticsSubCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_REFERRAL]: CustomerAnalyticsSubCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_SEGMENT]: CustomerAnalyticsSubCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_LIFECYCLE]: CustomerAnalyticsSubCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_GROWTH]: CustomerAnalyticsSubCategory.GROWTH,
  [CustomerAnalyticsType.CUSTOMER_VALUE]: CustomerAnalyticsSubCategory.VALUE,
};

/**
 * Get customer analytics type sub-category
 */
export function getCustomerAnalyticsTypeSubCategory(
  type: CustomerAnalyticsType
): CustomerAnalyticsSubCategory {
  return CUSTOMER_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get customer analytics types by sub-category
 */
export function getCustomerAnalyticsTypesBySubCategory(
  subCategory: CustomerAnalyticsSubCategory
): CustomerAnalyticsType[] {
  return Object.entries(CUSTOMER_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as CustomerAnalyticsType);
}
