/**
 * @fileoverview Sales analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Sales analytics types enum for different sales-related analytics
 */
export enum SalesAnalyticsType {
  /** Daily sales analytics */
  DAILY_SALES = 'DAILY_SALES',
  /** Weekly sales analytics */
  WEEKLY_SALES = 'WEEKLY_SALES',
  /** Monthly sales analytics */
  MONTHLY_SALES = 'MONTHLY_SALES',
  /** Quarterly sales analytics */
  QUARTERLY_SALES = 'QUARTERLY_SALES',
  /** Yearly sales analytics */
  YEARLY_SALES = 'YEARLY_SALES',
  /** Retail sales analytics */
  RETAIL_SALES = 'RETAIL_SALES',
  /** Online sales analytics */
  ONLINE_SALES = 'ONLINE_SALES',
  /** Wholesale sales analytics */
  WHOLESALE_SALES = 'WHOLESALE_SALES',
  /** B2B sales analytics */
  B2B_SALES = 'B2B_SALES',
  /** B2C sales analytics */
  B2C_SALES = 'B2C_SALES',
  /** Cross border sales analytics */
  CROSS_BORDER_SALES = 'CROSS_BORDER_SALES',
  /** Seasonal sales analytics */
  SEASONAL_SALES = 'SEASONAL_SALES',
  /** Promotional sales analytics */
  PROMOTIONAL_SALES = 'PROMOTIONAL_SALES',
  /** Regular sales analytics */
  REGULAR_SALES = 'REGULAR_SALES',
  /** Bulk sales analytics */
  BULK_SALES = 'BULK_SALES',
  /** Corporate sales analytics */
  CORPORATE_SALES = 'CORPORATE_SALES',
  /** Government sales analytics */
  GOVERNMENT_SALES = 'GOVERNMENT_SALES',
  /** Export sales analytics */
  EXPORT_SALES = 'EXPORT_SALES',
  /** Domestic sales analytics */
  DOMESTIC_SALES = 'DOMESTIC_SALES',
  /** Channel sales analytics */
  CHANNEL_SALES = 'CHANNEL_SALES',
  /** Direct sales analytics */
  DIRECT_SALES = 'DIRECT_SALES',
  /** Indirect sales analytics */
  INDIRECT_SALES = 'INDIRECT_SALES',
  /** Recurring sales analytics */
  RECURRING_SALES = 'RECURRING_SALES',
  /** One-time sales analytics */
  ONE_TIME_SALES = 'ONE_TIME_SALES',
  /** Subscription sales analytics */
  SUBSCRIPTION_SALES = 'SUBSCRIPTION_SALES',
  /** Commission sales analytics */
  COMMISSION_SALES = 'COMMISSION_SALES',
  /** Discount sales analytics */
  DISCOUNT_SALES = 'DISCOUNT_SALES',
  /** Premium sales analytics */
  PREMIUM_SALES = 'PREMIUM_SALES',
  /** Standard sales analytics */
  STANDARD_SALES = 'STANDARD_SALES',
  /** Express sales analytics */
  EXPRESS_SALES = 'EXPRESS_SALES',
}

/**
 * Sales analytics category for grouping
 */
export enum SalesAnalyticsCategory {
  /** Time-based analytics */
  TIME = 'TIME',
  /** Channel-based analytics */
  CHANNEL = 'CHANNEL',
  /** Customer-based analytics */
  CUSTOMER = 'CUSTOMER',
  /** Transaction-based analytics */
  TRANSACTION = 'TRANSACTION',
  /** Geographic-based analytics */
  GEOGRAPHIC = 'GEOGRAPHIC',
  /** Product-based analytics */
  PRODUCT = 'PRODUCT',
  /** Pricing-based analytics */
  PRICING = 'PRICING',
}

/**
 * Sales analytics category mapping
 */
export const SALES_ANALYTICS_TYPE_CATEGORY_MAP: Record<SalesAnalyticsType, SalesAnalyticsCategory> =
  {
    [SalesAnalyticsType.DAILY_SALES]: SalesAnalyticsCategory.TIME,
    [SalesAnalyticsType.WEEKLY_SALES]: SalesAnalyticsCategory.TIME,
    [SalesAnalyticsType.MONTHLY_SALES]: SalesAnalyticsCategory.TIME,
    [SalesAnalyticsType.QUARTERLY_SALES]: SalesAnalyticsCategory.TIME,
    [SalesAnalyticsType.YEARLY_SALES]: SalesAnalyticsCategory.TIME,
    [SalesAnalyticsType.RETAIL_SALES]: SalesAnalyticsCategory.CHANNEL,
    [SalesAnalyticsType.ONLINE_SALES]: SalesAnalyticsCategory.CHANNEL,
    [SalesAnalyticsType.WHOLESALE_SALES]: SalesAnalyticsCategory.CHANNEL,
    [SalesAnalyticsType.B2B_SALES]: SalesAnalyticsCategory.CUSTOMER,
    [SalesAnalyticsType.B2C_SALES]: SalesAnalyticsCategory.CUSTOMER,
    [SalesAnalyticsType.CROSS_BORDER_SALES]: SalesAnalyticsCategory.GEOGRAPHIC,
    [SalesAnalyticsType.SEASONAL_SALES]: SalesAnalyticsCategory.TIME,
    [SalesAnalyticsType.PROMOTIONAL_SALES]: SalesAnalyticsCategory.PRICING,
    [SalesAnalyticsType.REGULAR_SALES]: SalesAnalyticsCategory.PRICING,
    [SalesAnalyticsType.BULK_SALES]: SalesAnalyticsCategory.TRANSACTION,
    [SalesAnalyticsType.CORPORATE_SALES]: SalesAnalyticsCategory.CUSTOMER,
    [SalesAnalyticsType.GOVERNMENT_SALES]: SalesAnalyticsCategory.CUSTOMER,
    [SalesAnalyticsType.EXPORT_SALES]: SalesAnalyticsCategory.GEOGRAPHIC,
    [SalesAnalyticsType.DOMESTIC_SALES]: SalesAnalyticsCategory.GEOGRAPHIC,
    [SalesAnalyticsType.CHANNEL_SALES]: SalesAnalyticsCategory.CHANNEL,
    [SalesAnalyticsType.DIRECT_SALES]: SalesAnalyticsCategory.CHANNEL,
    [SalesAnalyticsType.INDIRECT_SALES]: SalesAnalyticsCategory.CHANNEL,
    [SalesAnalyticsType.RECURRING_SALES]: SalesAnalyticsCategory.TRANSACTION,
    [SalesAnalyticsType.ONE_TIME_SALES]: SalesAnalyticsCategory.TRANSACTION,
    [SalesAnalyticsType.SUBSCRIPTION_SALES]: SalesAnalyticsCategory.TRANSACTION,
    [SalesAnalyticsType.COMMISSION_SALES]: SalesAnalyticsCategory.PRICING,
    [SalesAnalyticsType.DISCOUNT_SALES]: SalesAnalyticsCategory.PRICING,
    [SalesAnalyticsType.PREMIUM_SALES]: SalesAnalyticsCategory.PRODUCT,
    [SalesAnalyticsType.STANDARD_SALES]: SalesAnalyticsCategory.PRODUCT,
    [SalesAnalyticsType.EXPRESS_SALES]: SalesAnalyticsCategory.TRANSACTION,
  };

/**
 * Sales analytics type configuration
 */
export interface SalesAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresOrderId: boolean;
}

export const SALES_ANALYTICS_TYPE_CONFIG: Record<SalesAnalyticsType, SalesAnalyticsTypeConfig> = {
  [SalesAnalyticsType.DAILY_SALES]: {
    label: 'Daily Sales',
    description: 'Sales analytics for daily performance',
    icon: 'Calendar',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresOrderId: false,
  },
  [SalesAnalyticsType.WEEKLY_SALES]: {
    label: 'Weekly Sales',
    description: 'Sales analytics for weekly performance',
    icon: 'Calendar',
    color: '#6366F1',
    priority: 1,
    isRealtime: false,
    requiresOrderId: false,
  },
  [SalesAnalyticsType.MONTHLY_SALES]: {
    label: 'Monthly Sales',
    description: 'Sales analytics for monthly performance',
    icon: 'Calendar',
    color: '#8B5CF6',
    priority: 1,
    isRealtime: false,
    requiresOrderId: false,
  },
  [SalesAnalyticsType.QUARTERLY_SALES]: {
    label: 'Quarterly Sales',
    description: 'Sales analytics for quarterly performance',
    icon: 'Calendar',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresOrderId: false,
  },
  [SalesAnalyticsType.YEARLY_SALES]: {
    label: 'Yearly Sales',
    description: 'Sales analytics for yearly performance',
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresOrderId: false,
  },
  [SalesAnalyticsType.RETAIL_SALES]: {
    label: 'Retail Sales',
    description: 'Sales analytics for retail stores',
    icon: 'Store',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.ONLINE_SALES]: {
    label: 'Online Sales',
    description: 'Sales analytics for online store',
    icon: 'Globe',
    color: '#10B981',
    priority: 1,
    isRealtime: true,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.WHOLESALE_SALES]: {
    label: 'Wholesale Sales',
    description: 'Sales analytics for wholesale',
    icon: 'Truck',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.B2B_SALES]: {
    label: 'B2B Sales',
    description: 'Sales analytics for business-to-business',
    icon: 'Building',
    color: '#3B82F6',
    priority: 1,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.B2C_SALES]: {
    label: 'B2C Sales',
    description: 'Sales analytics for business-to-consumer',
    icon: 'User',
    color: '#22C55E',
    priority: 1,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.CROSS_BORDER_SALES]: {
    label: 'Cross Border Sales',
    description: 'Sales analytics for international sales',
    icon: 'Globe',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.SEASONAL_SALES]: {
    label: 'Seasonal Sales',
    description: 'Sales analytics for seasonal patterns',
    icon: 'Calendar',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresOrderId: false,
  },
  [SalesAnalyticsType.PROMOTIONAL_SALES]: {
    label: 'Promotional Sales',
    description: 'Sales analytics for promotional campaigns',
    icon: 'Megaphone',
    color: '#F97316',
    priority: 2,
    isRealtime: true,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.REGULAR_SALES]: {
    label: 'Regular Sales',
    description: 'Sales analytics for regular pricing',
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.BULK_SALES]: {
    label: 'Bulk Sales',
    description: 'Sales analytics for bulk orders',
    icon: 'Package',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.CORPORATE_SALES]: {
    label: 'Corporate Sales',
    description: 'Sales analytics for corporate customers',
    icon: 'Building',
    color: '#6366F1',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.GOVERNMENT_SALES]: {
    label: 'Government Sales',
    description: 'Sales analytics for government clients',
    icon: 'Landmark',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.EXPORT_SALES]: {
    label: 'Export Sales',
    description: 'Sales analytics for exports',
    icon: 'Ship',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.DOMESTIC_SALES]: {
    label: 'Domestic Sales',
    description: 'Sales analytics for domestic market',
    icon: 'MapPin',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.CHANNEL_SALES]: {
    label: 'Channel Sales',
    description: 'Sales analytics for partner channels',
    icon: 'Layers',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.DIRECT_SALES]: {
    label: 'Direct Sales',
    description: 'Sales analytics for direct sales team',
    icon: 'User',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.INDIRECT_SALES]: {
    label: 'Indirect Sales',
    description: 'Sales analytics for indirect channels',
    icon: 'Users',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.RECURRING_SALES]: {
    label: 'Recurring Sales',
    description: 'Sales analytics for recurring revenue',
    icon: 'Repeat',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.ONE_TIME_SALES]: {
    label: 'One-Time Sales',
    description: 'Sales analytics for one-time purchases',
    icon: 'DollarSign',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.SUBSCRIPTION_SALES]: {
    label: 'Subscription Sales',
    description: 'Sales analytics for subscriptions',
    icon: 'Repeat',
    color: '#EC4899',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.COMMISSION_SALES]: {
    label: 'Commission Sales',
    description: 'Sales analytics for commission-based sales',
    icon: 'DollarSign',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.DISCOUNT_SALES]: {
    label: 'Discount Sales',
    description: 'Sales analytics for discounted items',
    icon: 'Percent',
    color: '#F97316',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.PREMIUM_SALES]: {
    label: 'Premium Sales',
    description: 'Sales analytics for premium products',
    icon: 'Star',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.STANDARD_SALES]: {
    label: 'Standard Sales',
    description: 'Sales analytics for standard products',
    icon: 'Package',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresOrderId: true,
  },
  [SalesAnalyticsType.EXPRESS_SALES]: {
    label: 'Express Sales',
    description: 'Sales analytics for express/quick sales',
    icon: 'Zap',
    color: '#F59E0B',
    priority: 3,
    isRealtime: true,
    requiresOrderId: true,
  },
};

/**
 * Get sales analytics type label
 */
export function getSalesAnalyticsTypeLabel(type: SalesAnalyticsType): string {
  return SALES_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get sales analytics type description
 */
export function getSalesAnalyticsTypeDescription(type: SalesAnalyticsType): string {
  return SALES_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get sales analytics type category
 */
export function getSalesAnalyticsTypeCategory(type: SalesAnalyticsType): SalesAnalyticsCategory {
  return SALES_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get sales analytics types by category
 */
export function getSalesAnalyticsTypesByCategory(
  category: SalesAnalyticsCategory
): SalesAnalyticsType[] {
  return Object.entries(SALES_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as SalesAnalyticsType);
}

/**
 * Check if sales analytics type requires order ID
 */
export function salesAnalyticsTypeRequiresOrderId(type: SalesAnalyticsType): boolean {
  return SALES_ANALYTICS_TYPE_CONFIG[type]?.requiresOrderId || false;
}

/**
 * Check if sales analytics type is real-time
 */
export function isSalesAnalyticsTypeRealtime(type: SalesAnalyticsType): boolean {
  return SALES_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get sales analytics type priority
 */
export function getSalesAnalyticsTypePriority(type: SalesAnalyticsType): number {
  return SALES_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Sales analytics type status
 */
export enum SalesAnalyticsTypeStatus {
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
 * Default status for sales analytics types
 */
export const SALES_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  SalesAnalyticsType,
  SalesAnalyticsTypeStatus
> = {
  [SalesAnalyticsType.DAILY_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.WEEKLY_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.MONTHLY_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.QUARTERLY_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.YEARLY_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.RETAIL_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.ONLINE_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.WHOLESALE_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.B2B_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.B2C_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.CROSS_BORDER_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.SEASONAL_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.PROMOTIONAL_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.REGULAR_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.BULK_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.CORPORATE_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.GOVERNMENT_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.EXPORT_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.DOMESTIC_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.CHANNEL_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.DIRECT_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.INDIRECT_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.RECURRING_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.ONE_TIME_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.SUBSCRIPTION_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.COMMISSION_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.DISCOUNT_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.PREMIUM_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.STANDARD_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
  [SalesAnalyticsType.EXPRESS_SALES]: SalesAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get sales analytics type status
 */
export function getSalesAnalyticsTypeStatus(type: SalesAnalyticsType): SalesAnalyticsTypeStatus {
  return SALES_ANALYTICS_TYPE_DEFAULT_STATUS[type] || SalesAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set sales analytics type status
 */
export function setSalesAnalyticsTypeStatus(
  type: SalesAnalyticsType,
  status: SalesAnalyticsTypeStatus
): void {
  SALES_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Sales analytics priority levels
 */
export const SALES_ANALYTICS_PRIORITY_LEVELS = {
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
 * Get sales analytics types by priority
 */
export function getSalesAnalyticsTypesByPriority(priority: number): SalesAnalyticsType[] {
  return Object.entries(SALES_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as SalesAnalyticsType);
}

/**
 * Get critical sales analytics types
 */
export function getCriticalSalesAnalyticsTypes(): SalesAnalyticsType[] {
  return getSalesAnalyticsTypesByPriority(SALES_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Sales analytics sub-categories
 */
export enum SalesAnalyticsSubCategory {
  /** Time-based analysis */
  TIME_BASED = 'TIME_BASED',
  /** Channel analysis */
  CHANNEL_ANALYSIS = 'CHANNEL_ANALYSIS',
  /** Customer segment analysis */
  CUSTOMER_ANALYSIS = 'CUSTOMER_ANALYSIS',
  /** Geographic analysis */
  GEOGRAPHIC_ANALYSIS = 'GEOGRAPHIC_ANALYSIS',
  /** Product analysis */
  PRODUCT_ANALYSIS = 'PRODUCT_ANALYSIS',
  /** Pricing analysis */
  PRICING_ANALYSIS = 'PRICING_ANALYSIS',
  /** Transaction analysis */
  TRANSACTION_ANALYSIS = 'TRANSACTION_ANALYSIS',
}

/**
 * Mapping of sales analytics types to sub-categories
 */
export const SALES_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  SalesAnalyticsType,
  SalesAnalyticsSubCategory
> = {
  [SalesAnalyticsType.DAILY_SALES]: SalesAnalyticsSubCategory.TIME_BASED,
  [SalesAnalyticsType.WEEKLY_SALES]: SalesAnalyticsSubCategory.TIME_BASED,
  [SalesAnalyticsType.MONTHLY_SALES]: SalesAnalyticsSubCategory.TIME_BASED,
  [SalesAnalyticsType.QUARTERLY_SALES]: SalesAnalyticsSubCategory.TIME_BASED,
  [SalesAnalyticsType.YEARLY_SALES]: SalesAnalyticsSubCategory.TIME_BASED,
  [SalesAnalyticsType.SEASONAL_SALES]: SalesAnalyticsSubCategory.TIME_BASED,
  [SalesAnalyticsType.RETAIL_SALES]: SalesAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [SalesAnalyticsType.ONLINE_SALES]: SalesAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [SalesAnalyticsType.WHOLESALE_SALES]: SalesAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [SalesAnalyticsType.CHANNEL_SALES]: SalesAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [SalesAnalyticsType.DIRECT_SALES]: SalesAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [SalesAnalyticsType.INDIRECT_SALES]: SalesAnalyticsSubCategory.CHANNEL_ANALYSIS,
  [SalesAnalyticsType.B2B_SALES]: SalesAnalyticsSubCategory.CUSTOMER_ANALYSIS,
  [SalesAnalyticsType.B2C_SALES]: SalesAnalyticsSubCategory.CUSTOMER_ANALYSIS,
  [SalesAnalyticsType.CORPORATE_SALES]: SalesAnalyticsSubCategory.CUSTOMER_ANALYSIS,
  [SalesAnalyticsType.GOVERNMENT_SALES]: SalesAnalyticsSubCategory.CUSTOMER_ANALYSIS,
  [SalesAnalyticsType.CROSS_BORDER_SALES]: SalesAnalyticsSubCategory.GEOGRAPHIC_ANALYSIS,
  [SalesAnalyticsType.EXPORT_SALES]: SalesAnalyticsSubCategory.GEOGRAPHIC_ANALYSIS,
  [SalesAnalyticsType.DOMESTIC_SALES]: SalesAnalyticsSubCategory.GEOGRAPHIC_ANALYSIS,
  [SalesAnalyticsType.PREMIUM_SALES]: SalesAnalyticsSubCategory.PRODUCT_ANALYSIS,
  [SalesAnalyticsType.STANDARD_SALES]: SalesAnalyticsSubCategory.PRODUCT_ANALYSIS,
  [SalesAnalyticsType.PROMOTIONAL_SALES]: SalesAnalyticsSubCategory.PRICING_ANALYSIS,
  [SalesAnalyticsType.REGULAR_SALES]: SalesAnalyticsSubCategory.PRICING_ANALYSIS,
  [SalesAnalyticsType.COMMISSION_SALES]: SalesAnalyticsSubCategory.PRICING_ANALYSIS,
  [SalesAnalyticsType.DISCOUNT_SALES]: SalesAnalyticsSubCategory.PRICING_ANALYSIS,
  [SalesAnalyticsType.BULK_SALES]: SalesAnalyticsSubCategory.TRANSACTION_ANALYSIS,
  [SalesAnalyticsType.RECURRING_SALES]: SalesAnalyticsSubCategory.TRANSACTION_ANALYSIS,
  [SalesAnalyticsType.ONE_TIME_SALES]: SalesAnalyticsSubCategory.TRANSACTION_ANALYSIS,
  [SalesAnalyticsType.SUBSCRIPTION_SALES]: SalesAnalyticsSubCategory.TRANSACTION_ANALYSIS,
  [SalesAnalyticsType.EXPRESS_SALES]: SalesAnalyticsSubCategory.TRANSACTION_ANALYSIS,
};

/**
 * Get sales analytics type sub-category
 */
export function getSalesAnalyticsTypeSubCategory(
  type: SalesAnalyticsType
): SalesAnalyticsSubCategory {
  return SALES_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get sales analytics types by sub-category
 */
export function getSalesAnalyticsTypesBySubCategory(
  subCategory: SalesAnalyticsSubCategory
): SalesAnalyticsType[] {
  return Object.entries(SALES_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as SalesAnalyticsType);
}
