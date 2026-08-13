/**
 * @fileoverview Analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics types enum for different business domains
 */
export enum AnalyticsType {
  /** User behavior and demographics analytics */
  USER_ANALYTICS = 'USER_ANALYTICS',
  /** Product performance and metrics analytics */
  PRODUCT_ANALYTICS = 'PRODUCT_ANALYTICS',
  /** Sales revenue and trends analytics */
  SALES_ANALYTICS = 'SALES_ANALYTICS',
  /** Order processing and fulfillment analytics */
  ORDER_ANALYTICS = 'ORDER_ANALYTICS',
  /** Vendor performance and supply analytics */
  VENDOR_ANALYTICS = 'VENDOR_ANALYTICS',
  /** Marketing campaign and ROI analytics */
  MARKETING_ANALYTICS = 'MARKETING_ANALYTICS',
  /** Website and app traffic analytics */
  TRAFFIC_ANALYTICS = 'TRAFFIC_ANALYTICS',
  /** System and application performance analytics */
  PERFORMANCE_ANALYTICS = 'PERFORMANCE_ANALYTICS',
  /** Financial metrics and reporting analytics */
  FINANCIAL_ANALYTICS = 'FINANCIAL_ANALYTICS',
  /** Inventory and stock management analytics */
  INVENTORY_ANALYTICS = 'INVENTORY_ANALYTICS',
  /** Customer behavior and satisfaction analytics */
  CUSTOMER_ANALYTICS = 'CUSTOMER_ANALYTICS',
  /** Customer support and ticket analytics */
  SUPPORT_ANALYTICS = 'SUPPORT_ANALYTICS',
  /** Sales channel and distribution analytics */
  CHANNEL_ANALYTICS = 'CHANNEL_ANALYTICS',
  /** Customer acquisition and conversion analytics */
  ACQUISITION_ANALYTICS = 'ACQUISITION_ANALYTICS',
  /** User engagement and interaction analytics */
  ENGAGEMENT_ANALYTICS = 'ENGAGEMENT_ANALYTICS',
  /** Customer retention and churn analytics */
  RETENTION_ANALYTICS = 'RETENTION_ANALYTICS',
}

/**
 * Analytics type configuration with display names and descriptions
 */
export const ANALYTICS_TYPE_CONFIG: Record<
  AnalyticsType,
  { label: string; description: string; icon?: string; color?: string }
> = {
  [AnalyticsType.USER_ANALYTICS]: {
    label: 'User Analytics',
    description: 'User behavior, demographics, and engagement metrics',
    icon: 'Users',
    color: '#4F46E5',
  },
  [AnalyticsType.PRODUCT_ANALYTICS]: {
    label: 'Product Analytics',
    description: 'Product performance, ratings, and metrics',
    icon: 'Package',
    color: '#7C3AED',
  },
  [AnalyticsType.SALES_ANALYTICS]: {
    label: 'Sales Analytics',
    description: 'Sales revenue, trends, and forecasting',
    icon: 'DollarSign',
    color: '#059669',
  },
  [AnalyticsType.ORDER_ANALYTICS]: {
    label: 'Order Analytics',
    description: 'Order processing, fulfillment, and status metrics',
    icon: 'ShoppingBag',
    color: '#D97706',
  },
  [AnalyticsType.VENDOR_ANALYTICS]: {
    label: 'Vendor Analytics',
    description: 'Vendor performance, supply, and reliability metrics',
    icon: 'Truck',
    color: '#DC2626',
  },
  [AnalyticsType.MARKETING_ANALYTICS]: {
    label: 'Marketing Analytics',
    description: 'Campaign performance, ROI, and attribution',
    icon: 'Megaphone',
    color: '#EA580C',
  },
  [AnalyticsType.TRAFFIC_ANALYTICS]: {
    label: 'Traffic Analytics',
    description: 'Website, app, and referral traffic metrics',
    icon: 'Globe',
    color: '#2563EB',
  },
  [AnalyticsType.PERFORMANCE_ANALYTICS]: {
    label: 'Performance Analytics',
    description: 'System performance, uptime, and response times',
    icon: 'Gauge',
    color: '#0891B2',
  },
  [AnalyticsType.FINANCIAL_ANALYTICS]: {
    label: 'Financial Analytics',
    description: 'Financial metrics, reporting, and compliance',
    icon: 'TrendingUp',
    color: '#059669',
  },
  [AnalyticsType.INVENTORY_ANALYTICS]: {
    label: 'Inventory Analytics',
    description: 'Stock management, turnover, and forecasting',
    icon: 'Boxes',
    color: '#B45309',
  },
  [AnalyticsType.CUSTOMER_ANALYTICS]: {
    label: 'Customer Analytics',
    description: 'Customer behavior, segmentation, and lifetime value',
    icon: 'UserCircle',
    color: '#4F46E5',
  },
  [AnalyticsType.SUPPORT_ANALYTICS]: {
    label: 'Support Analytics',
    description: 'Support tickets, resolution time, and satisfaction',
    icon: 'Headset',
    color: '#7C3AED',
  },
  [AnalyticsType.CHANNEL_ANALYTICS]: {
    label: 'Channel Analytics',
    description: 'Sales channel performance and distribution metrics',
    icon: 'Layers',
    color: '#D97706',
  },
  [AnalyticsType.ACQUISITION_ANALYTICS]: {
    label: 'Acquisition Analytics',
    description: 'Customer acquisition cost, channels, and conversion',
    icon: 'Rocket',
    color: '#059669',
  },
  [AnalyticsType.ENGAGEMENT_ANALYTICS]: {
    label: 'Engagement Analytics',
    description: 'User engagement, interaction, and activity metrics',
    icon: 'Activity',
    color: '#EA580C',
  },
  [AnalyticsType.RETENTION_ANALYTICS]: {
    label: 'Retention Analytics',
    description: 'Customer retention, churn, and loyalty metrics',
    icon: 'Heart',
    color: '#DC2626',
  },
};

/**
 * Analytics categories for grouping different analytics types
 */
export enum AnalyticsCategory {
  /** Customer-related analytics */
  CUSTOMER = 'CUSTOMER',
  /** Business-related analytics */
  BUSINESS = 'BUSINESS',
  /** Product-related analytics */
  PRODUCT = 'PRODUCT',
  /** Operational analytics */
  OPERATIONAL = 'OPERATIONAL',
  /** Marketing analytics */
  MARKETING = 'MARKETING',
  /** Financial analytics */
  FINANCIAL = 'FINANCIAL',
}

/**
 * Mapping of analytics types to their categories
 */
export const ANALYTICS_TYPE_CATEGORY_MAP: Record<AnalyticsType, AnalyticsCategory> = {
  [AnalyticsType.USER_ANALYTICS]: AnalyticsCategory.CUSTOMER,
  [AnalyticsType.PRODUCT_ANALYTICS]: AnalyticsCategory.PRODUCT,
  [AnalyticsType.SALES_ANALYTICS]: AnalyticsCategory.BUSINESS,
  [AnalyticsType.ORDER_ANALYTICS]: AnalyticsCategory.OPERATIONAL,
  [AnalyticsType.VENDOR_ANALYTICS]: AnalyticsCategory.OPERATIONAL,
  [AnalyticsType.MARKETING_ANALYTICS]: AnalyticsCategory.MARKETING,
  [AnalyticsType.TRAFFIC_ANALYTICS]: AnalyticsCategory.MARKETING,
  [AnalyticsType.PERFORMANCE_ANALYTICS]: AnalyticsCategory.OPERATIONAL,
  [AnalyticsType.FINANCIAL_ANALYTICS]: AnalyticsCategory.FINANCIAL,
  [AnalyticsType.INVENTORY_ANALYTICS]: AnalyticsCategory.OPERATIONAL,
  [AnalyticsType.CUSTOMER_ANALYTICS]: AnalyticsCategory.CUSTOMER,
  [AnalyticsType.SUPPORT_ANALYTICS]: AnalyticsCategory.CUSTOMER,
  [AnalyticsType.CHANNEL_ANALYTICS]: AnalyticsCategory.BUSINESS,
  [AnalyticsType.ACQUISITION_ANALYTICS]: AnalyticsCategory.MARKETING,
  [AnalyticsType.ENGAGEMENT_ANALYTICS]: AnalyticsCategory.CUSTOMER,
  [AnalyticsType.RETENTION_ANALYTICS]: AnalyticsCategory.CUSTOMER,
};

/**
 * Category configuration with display names
 */
export const ANALYTICS_CATEGORY_CONFIG: Record<
  AnalyticsCategory,
  { label: string; description: string }
> = {
  [AnalyticsCategory.CUSTOMER]: {
    label: 'Customer Analytics',
    description: 'Analytics related to customer behavior, engagement, and satisfaction',
  },
  [AnalyticsCategory.BUSINESS]: {
    label: 'Business Analytics',
    description: 'Analytics related to business performance, sales, and growth',
  },
  [AnalyticsCategory.PRODUCT]: {
    label: 'Product Analytics',
    description: 'Analytics related to product performance and development',
  },
  [AnalyticsCategory.OPERATIONAL]: {
    label: 'Operational Analytics',
    description: 'Analytics related to operational efficiency and processes',
  },
  [AnalyticsCategory.MARKETING]: {
    label: 'Marketing Analytics',
    description: 'Analytics related to marketing campaigns and acquisition',
  },
  [AnalyticsCategory.FINANCIAL]: {
    label: 'Financial Analytics',
    description: 'Analytics related to financial metrics and reporting',
  },
};

/**
 * Analytics priority levels for different types
 */
export const ANALYTICS_TYPE_PRIORITY: Record<AnalyticsType, number> = {
  [AnalyticsType.USER_ANALYTICS]: 1,
  [AnalyticsType.PRODUCT_ANALYTICS]: 2,
  [AnalyticsType.SALES_ANALYTICS]: 1,
  [AnalyticsType.ORDER_ANALYTICS]: 2,
  [AnalyticsType.VENDOR_ANALYTICS]: 3,
  [AnalyticsType.MARKETING_ANALYTICS]: 2,
  [AnalyticsType.TRAFFIC_ANALYTICS]: 3,
  [AnalyticsType.PERFORMANCE_ANALYTICS]: 1,
  [AnalyticsType.FINANCIAL_ANALYTICS]: 1,
  [AnalyticsType.INVENTORY_ANALYTICS]: 2,
  [AnalyticsType.CUSTOMER_ANALYTICS]: 1,
  [AnalyticsType.SUPPORT_ANALYTICS]: 2,
  [AnalyticsType.CHANNEL_ANALYTICS]: 3,
  [AnalyticsType.ACQUISITION_ANALYTICS]: 2,
  [AnalyticsType.ENGAGEMENT_ANALYTICS]: 2,
  [AnalyticsType.RETENTION_ANALYTICS]: 1,
};

/**
 * Default analytics types that should be enabled
 */
export const ANALYTICS_DEFAULT_ENABLED_TYPES: AnalyticsType[] = [
  AnalyticsType.USER_ANALYTICS,
  AnalyticsType.SALES_ANALYTICS,
  AnalyticsType.TRAFFIC_ANALYTICS,
  AnalyticsType.PERFORMANCE_ANALYTICS,
  AnalyticsType.CUSTOMER_ANALYTICS,
];

/**
 * Analytics types that require real-time processing
 */
export const ANALYTICS_REAL_TIME_TYPES: AnalyticsType[] = [
  AnalyticsType.PERFORMANCE_ANALYTICS,
  AnalyticsType.TRAFFIC_ANALYTICS,
  AnalyticsType.ORDER_ANALYTICS,
];

/**
 * Analytics types that support historical data analysis
 */
export const ANALYTICS_HISTORICAL_TYPES: AnalyticsType[] = [
  AnalyticsType.SALES_ANALYTICS,
  AnalyticsType.FINANCIAL_ANALYTICS,
  AnalyticsType.CUSTOMER_ANALYTICS,
  AnalyticsType.RETENTION_ANALYTICS,
  AnalyticsType.INVENTORY_ANALYTICS,
];

/**
 * Analytics types that require data aggregation
 */
export const ANALYTICS_AGGREGATION_TYPES: AnalyticsType[] = [
  AnalyticsType.SALES_ANALYTICS,
  AnalyticsType.FINANCIAL_ANALYTICS,
  AnalyticsType.INVENTORY_ANALYTICS,
  AnalyticsType.MARKETING_ANALYTICS,
];

/**
 * Get analytics type label by type
 */
export function getAnalyticsTypeLabel(type: AnalyticsType): string {
  return ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get analytics type description by type
 */
export function getAnalyticsTypeDescription(type: AnalyticsType): string {
  return ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get analytics category for a type
 */
export function getAnalyticsCategory(type: AnalyticsType): AnalyticsCategory {
  return ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Check if analytics type is enabled by default
 */
export function isAnalyticsTypeEnabledByDefault(type: AnalyticsType): boolean {
  return ANALYTICS_DEFAULT_ENABLED_TYPES.includes(type);
}

/**
 * Check if analytics type requires real-time processing
 */
export function isAnalyticsTypeRealTime(type: AnalyticsType): boolean {
  return ANALYTICS_REAL_TIME_TYPES.includes(type);
}

/**
 * Check if analytics type supports historical data
 */
export function supportsHistoricalData(type: AnalyticsType): boolean {
  return ANALYTICS_HISTORICAL_TYPES.includes(type);
}

/**
 * Check if analytics type requires aggregation
 */
export function requiresAggregation(type: AnalyticsType): boolean {
  return ANALYTICS_AGGREGATION_TYPES.includes(type);
}

/**
 * Get analytics types by category
 */
export function getAnalyticsTypesByCategory(category: AnalyticsCategory): AnalyticsType[] {
  return Object.entries(ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as AnalyticsType);
}

/**
 * Analytics sub-types for more granular categorization
 */
export enum AnalyticsSubType {
  /** User demographics */
  USER_DEMOGRAPHICS = 'USER_DEMOGRAPHICS',
  /** User behavior */
  USER_BEHAVIOR = 'USER_BEHAVIOR',
  /** Product views */
  PRODUCT_VIEWS = 'PRODUCT_VIEWS',
  /** Product purchases */
  PRODUCT_PURCHASES = 'PRODUCT_PURCHASES',
  /** Revenue metrics */
  REVENUE_METRICS = 'REVENUE_METRICS',
  /** Cost metrics */
  COST_METRICS = 'COST_METRICS',
  /** Order status */
  ORDER_STATUS = 'ORDER_STATUS',
  /** Order fulfillment */
  ORDER_FULFILLMENT = 'ORDER_FULFILLMENT',
  /** Vendor ratings */
  VENDOR_RATINGS = 'VENDOR_RATINGS',
  /** Vendor delivery */
  VENDOR_DELIVERY = 'VENDOR_DELIVERY',
  /** Campaign performance */
  CAMPAIGN_PERFORMANCE = 'CAMPAIGN_PERFORMANCE',
  /** Ad performance */
  AD_PERFORMANCE = 'AD_PERFORMANCE',
  /** Page views */
  PAGE_VIEWS = 'PAGE_VIEWS',
  /** Session metrics */
  SESSION_METRICS = 'SESSION_METRICS',
  /** Response time */
  RESPONSE_TIME = 'RESPONSE_TIME',
  /** Error rate */
  ERROR_RATE = 'ERROR_RATE',
  /** Profit metrics */
  PROFIT_METRICS = 'PROFIT_METRICS',
  /** Loss metrics */
  LOSS_METRICS = 'LOSS_METRICS',
  /** Stock levels */
  STOCK_LEVELS = 'STOCK_LEVELS',
  /** Stock turnover */
  STOCK_TURNOVER = 'STOCK_TURNOVER',
  /** Customer satisfaction */
  CUSTOMER_SATISFACTION = 'CUSTOMER_SATISFACTION',
  /** Customer loyalty */
  CUSTOMER_LOYALTY = 'CUSTOMER_LOYALTY',
  /** Ticket volume */
  TICKET_VOLUME = 'TICKET_VOLUME',
  /** Resolution time */
  RESOLUTION_TIME = 'RESOLUTION_TIME',
  /** Channel revenue */
  CHANNEL_REVENUE = 'CHANNEL_REVENUE',
  /** Channel costs */
  CHANNEL_COSTS = 'CHANNEL_COSTS',
  /** Acquisition channels */
  ACQUISITION_CHANNELS = 'ACQUISITION_CHANNELS',
  /** Conversion rates */
  CONVERSION_RATES = 'CONVERSION_RATES',
  /** Engagement metrics */
  ENGAGEMENT_METRICS = 'ENGAGEMENT_METRICS',
  /** Interaction metrics */
  INTERACTION_METRICS = 'INTERACTION_METRICS',
  /** Retention rates */
  RETENTION_RATES = 'RETENTION_RATES',
  /** Churn rates */
  CHURN_RATES = 'CHURN_RATES',
}

/**
 * Mapping of analytics types to their sub-types
 */
export const ANALYTICS_TYPE_SUBTYPE_MAP: Record<AnalyticsType, AnalyticsSubType[]> = {
  [AnalyticsType.USER_ANALYTICS]: [
    AnalyticsSubType.USER_DEMOGRAPHICS,
    AnalyticsSubType.USER_BEHAVIOR,
  ],
  [AnalyticsType.PRODUCT_ANALYTICS]: [
    AnalyticsSubType.PRODUCT_VIEWS,
    AnalyticsSubType.PRODUCT_PURCHASES,
  ],
  [AnalyticsType.SALES_ANALYTICS]: [
    AnalyticsSubType.REVENUE_METRICS,
    AnalyticsSubType.COST_METRICS,
  ],
  [AnalyticsType.ORDER_ANALYTICS]: [
    AnalyticsSubType.ORDER_STATUS,
    AnalyticsSubType.ORDER_FULFILLMENT,
  ],
  [AnalyticsType.VENDOR_ANALYTICS]: [
    AnalyticsSubType.VENDOR_RATINGS,
    AnalyticsSubType.VENDOR_DELIVERY,
  ],
  [AnalyticsType.MARKETING_ANALYTICS]: [
    AnalyticsSubType.CAMPAIGN_PERFORMANCE,
    AnalyticsSubType.AD_PERFORMANCE,
  ],
  [AnalyticsType.TRAFFIC_ANALYTICS]: [
    AnalyticsSubType.PAGE_VIEWS,
    AnalyticsSubType.SESSION_METRICS,
  ],
  [AnalyticsType.PERFORMANCE_ANALYTICS]: [
    AnalyticsSubType.RESPONSE_TIME,
    AnalyticsSubType.ERROR_RATE,
  ],
  [AnalyticsType.FINANCIAL_ANALYTICS]: [
    AnalyticsSubType.PROFIT_METRICS,
    AnalyticsSubType.LOSS_METRICS,
  ],
  [AnalyticsType.INVENTORY_ANALYTICS]: [
    AnalyticsSubType.STOCK_LEVELS,
    AnalyticsSubType.STOCK_TURNOVER,
  ],
  [AnalyticsType.CUSTOMER_ANALYTICS]: [
    AnalyticsSubType.CUSTOMER_SATISFACTION,
    AnalyticsSubType.CUSTOMER_LOYALTY,
  ],
  [AnalyticsType.SUPPORT_ANALYTICS]: [
    AnalyticsSubType.TICKET_VOLUME,
    AnalyticsSubType.RESOLUTION_TIME,
  ],
  [AnalyticsType.CHANNEL_ANALYTICS]: [
    AnalyticsSubType.CHANNEL_REVENUE,
    AnalyticsSubType.CHANNEL_COSTS,
  ],
  [AnalyticsType.ACQUISITION_ANALYTICS]: [
    AnalyticsSubType.ACQUISITION_CHANNELS,
    AnalyticsSubType.CONVERSION_RATES,
  ],
  [AnalyticsType.ENGAGEMENT_ANALYTICS]: [
    AnalyticsSubType.ENGAGEMENT_METRICS,
    AnalyticsSubType.INTERACTION_METRICS,
  ],
  [AnalyticsType.RETENTION_ANALYTICS]: [
    AnalyticsSubType.RETENTION_RATES,
    AnalyticsSubType.CHURN_RATES,
  ],
};

/**
 * Get sub-types for an analytics type
 */
export function getAnalyticsSubTypes(type: AnalyticsType): AnalyticsSubType[] {
  return ANALYTICS_TYPE_SUBTYPE_MAP[type] || [];
}

/**
 * Check if analytics type has sub-types
 */
export function hasAnalyticsSubTypes(type: AnalyticsType): boolean {
  return getAnalyticsSubTypes(type).length > 0;
}

/**
 * Analytics type status for operational control
 */
export enum AnalyticsTypeStatus {
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
 * Default status for analytics types
 */
export const ANALYTICS_TYPE_DEFAULT_STATUS: Record<AnalyticsType, AnalyticsTypeStatus> = {
  [AnalyticsType.USER_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.PRODUCT_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.SALES_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.ORDER_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.VENDOR_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.MARKETING_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.TRAFFIC_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.PERFORMANCE_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.FINANCIAL_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.INVENTORY_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.CUSTOMER_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.SUPPORT_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.CHANNEL_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.ACQUISITION_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.ENGAGEMENT_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
  [AnalyticsType.RETENTION_ANALYTICS]: AnalyticsTypeStatus.ACTIVE,
};

/**
 * Get status for an analytics type
 */
export function getAnalyticsTypeStatus(type: AnalyticsType): AnalyticsTypeStatus {
  return ANALYTICS_TYPE_DEFAULT_STATUS[type] || AnalyticsTypeStatus.INACTIVE;
}

/**
 * Update analytics type status
 */
export function setAnalyticsTypeStatus(type: AnalyticsType, status: AnalyticsTypeStatus): void {
  ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}
