/**
 * @fileoverview Seller analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Seller analytics types enum for different seller-related analytics
 */
export enum SellerAnalyticsType {
  /** Seller registration analytics */
  VENDOR_REGISTRATION = 'VENDOR_REGISTRATION',
  /** Product added by seller analytics */
  VENDOR_PRODUCT_ADD = 'VENDOR_PRODUCT_ADD',
  /** Product updated by seller analytics */
  VENDOR_PRODUCT_UPDATE = 'VENDOR_PRODUCT_UPDATE',
  /** Order received by seller analytics */
  VENDOR_ORDER_RECEIVED = 'VENDOR_ORDER_RECEIVED',
  /** Order fulfilled by seller analytics */
  VENDOR_ORDER_FULFILLED = 'VENDOR_ORDER_FULFILLED',
  /** Payment received by seller analytics */
  VENDOR_PAYMENT_RECEIVED = 'VENDOR_PAYMENT_RECEIVED',
  /** Rating received by seller analytics */
  VENDOR_RATING_RECEIVED = 'VENDOR_RATING_RECEIVED',
  /** Review received by seller analytics */
  VENDOR_REVIEW_RECEIVED = 'VENDOR_REVIEW_RECEIVED',
  /** Seller verification analytics */
  VENDOR_VERIFICATION = 'VENDOR_VERIFICATION',
  /** Seller suspension analytics */
  VENDOR_SUSPENSION = 'VENDOR_SUSPENSION',
  /** Seller reinstatement analytics */
  VENDOR_REINSTATEMENT = 'VENDOR_REINSTATEMENT',
  /** Seller tier upgrade analytics */
  VENDOR_TIER_UPGRADE = 'VENDOR_TIER_UPGRADE',
  /** Seller tier downgrade analytics */
  VENDOR_TIER_DOWNGRADE = 'VENDOR_TIER_DOWNGRADE',
  /** Seller performance review analytics */
  VENDOR_PERFORMANCE_REVIEW = 'VENDOR_PERFORMANCE_REVIEW',
  /** Seller audit analytics */
  VENDOR_AUDIT = 'VENDOR_AUDIT',
  /** Seller training analytics */
  VENDOR_TRAINING = 'VENDOR_TRAINING',
  /** Seller certification analytics */
  VENDOR_CERTIFICATION = 'VENDOR_CERTIFICATION',
  /** Seller inventory sync analytics */
  VENDOR_INVENTORY_SYNC = 'VENDOR_INVENTORY_SYNC',
  /** Seller sales analytics */
  VENDOR_SALES = 'VENDOR_SALES',
  /** Seller commission analytics */
  VENDOR_COMMISSION = 'VENDOR_COMMISSION',
  /** Seller dispute resolution */
  VENDOR_DISPUTE = 'VENDOR_DISPUTE',
  /** Seller return management */
  VENDOR_RETURN = 'VENDOR_RETURN',
  /** Seller shipping analytics */
  VENDOR_SHIPPING = 'VENDOR_SHIPPING',
  /** Seller marketing analytics */
  VENDOR_MARKETING = 'VENDOR_MARKETING',
  /** Seller customer service */
  VENDOR_CUSTOMER_SERVICE = 'VENDOR_CUSTOMER_SERVICE',
  /** Seller quality control */
  VENDOR_QUALITY_CONTROL = 'VENDOR_QUALITY_CONTROL',
  /** Seller compliance analytics */
  VENDOR_COMPLIANCE = 'VENDOR_COMPLIANCE',
  /** Seller fraud detection */
  VENDOR_FRAUD = 'VENDOR_FRAUD',
}

/**
 * Seller analytics category for grouping
 */
export enum SellerAnalyticsCategory {
  /** Registration and onboarding */
  REGISTRATION = 'REGISTRATION',
  /** Product management */
  PRODUCT = 'PRODUCT',
  /** Order management */
  ORDER = 'ORDER',
  /** Financial analytics */
  FINANCIAL = 'FINANCIAL',
  /** Performance analytics */
  PERFORMANCE = 'PERFORMANCE',
  /** Compliance analytics */
  COMPLIANCE = 'COMPLIANCE',
  /** Operational analytics */
  OPERATIONAL = 'OPERATIONAL',
  /** Training and development */
  TRAINING = 'TRAINING',
}

/**
 * Seller analytics category mapping
 */
export const SELLER_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  SellerAnalyticsType,
  SellerAnalyticsCategory
> = {
  [SellerAnalyticsType.VENDOR_REGISTRATION]: SellerAnalyticsCategory.REGISTRATION,
  [SellerAnalyticsType.VENDOR_PRODUCT_ADD]: SellerAnalyticsCategory.PRODUCT,
  [SellerAnalyticsType.VENDOR_PRODUCT_UPDATE]: SellerAnalyticsCategory.PRODUCT,
  [SellerAnalyticsType.VENDOR_ORDER_RECEIVED]: SellerAnalyticsCategory.ORDER,
  [SellerAnalyticsType.VENDOR_ORDER_FULFILLED]: SellerAnalyticsCategory.ORDER,
  [SellerAnalyticsType.VENDOR_PAYMENT_RECEIVED]: SellerAnalyticsCategory.FINANCIAL,
  [SellerAnalyticsType.VENDOR_RATING_RECEIVED]: SellerAnalyticsCategory.PERFORMANCE,
  [SellerAnalyticsType.VENDOR_REVIEW_RECEIVED]: SellerAnalyticsCategory.PERFORMANCE,
  [SellerAnalyticsType.VENDOR_VERIFICATION]: SellerAnalyticsCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_SUSPENSION]: SellerAnalyticsCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_REINSTATEMENT]: SellerAnalyticsCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_TIER_UPGRADE]: SellerAnalyticsCategory.PERFORMANCE,
  [SellerAnalyticsType.VENDOR_TIER_DOWNGRADE]: SellerAnalyticsCategory.PERFORMANCE,
  [SellerAnalyticsType.VENDOR_PERFORMANCE_REVIEW]: SellerAnalyticsCategory.PERFORMANCE,
  [SellerAnalyticsType.VENDOR_AUDIT]: SellerAnalyticsCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_TRAINING]: SellerAnalyticsCategory.TRAINING,
  [SellerAnalyticsType.VENDOR_CERTIFICATION]: SellerAnalyticsCategory.TRAINING,
  [SellerAnalyticsType.VENDOR_INVENTORY_SYNC]: SellerAnalyticsCategory.OPERATIONAL,
  [SellerAnalyticsType.VENDOR_SALES]: SellerAnalyticsCategory.FINANCIAL,
  [SellerAnalyticsType.VENDOR_COMMISSION]: SellerAnalyticsCategory.FINANCIAL,
  [SellerAnalyticsType.VENDOR_DISPUTE]: SellerAnalyticsCategory.OPERATIONAL,
  [SellerAnalyticsType.VENDOR_RETURN]: SellerAnalyticsCategory.OPERATIONAL,
  [SellerAnalyticsType.VENDOR_SHIPPING]: SellerAnalyticsCategory.OPERATIONAL,
  [SellerAnalyticsType.VENDOR_MARKETING]: SellerAnalyticsCategory.OPERATIONAL,
  [SellerAnalyticsType.VENDOR_CUSTOMER_SERVICE]: SellerAnalyticsCategory.OPERATIONAL,
  [SellerAnalyticsType.VENDOR_QUALITY_CONTROL]: SellerAnalyticsCategory.PERFORMANCE,
  [SellerAnalyticsType.VENDOR_COMPLIANCE]: SellerAnalyticsCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_FRAUD]: SellerAnalyticsCategory.COMPLIANCE,
};

/**
 * Seller analytics type configuration
 */
export interface SellerAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresSellerId: boolean;
}

export const SELLER_ANALYTICS_TYPE_CONFIG: Record<SellerAnalyticsType, SellerAnalyticsTypeConfig> =
  {
    [SellerAnalyticsType.VENDOR_REGISTRATION]: {
      label: 'Seller Registration',
      description: 'Analytics for seller registration and onboarding',
      icon: 'UserPlus',
      color: '#3B82F6',
      priority: 1,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_PRODUCT_ADD]: {
      label: 'Product Added',
      description: 'Analytics for products added by sellers',
      icon: 'Package',
      color: '#10B981',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_PRODUCT_UPDATE]: {
      label: 'Product Updated',
      description: 'Analytics for products updated by sellers',
      icon: 'Refresh',
      color: '#F59E0B',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_ORDER_RECEIVED]: {
      label: 'Order Received',
      description: 'Analytics for orders received by sellers',
      icon: 'ShoppingBag',
      color: '#6366F1',
      priority: 1,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_ORDER_FULFILLED]: {
      label: 'Order Fulfilled',
      description: 'Analytics for orders fulfilled by sellers',
      icon: 'CheckCircle',
      color: '#22C55E',
      priority: 1,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_PAYMENT_RECEIVED]: {
      label: 'Payment Received',
      description: 'Analytics for payments received by sellers',
      icon: 'DollarSign',
      color: '#22C55E',
      priority: 1,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_RATING_RECEIVED]: {
      label: 'Rating Received',
      description: 'Analytics for ratings received by sellers',
      icon: 'Star',
      color: '#F59E0B',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_REVIEW_RECEIVED]: {
      label: 'Review Received',
      description: 'Analytics for reviews received by sellers',
      icon: 'MessageSquare',
      color: '#8B5CF6',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_VERIFICATION]: {
      label: 'Verification',
      description: 'Analytics for seller verification process',
      icon: 'ShieldCheck',
      color: '#6366F1',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_SUSPENSION]: {
      label: 'Suspension',
      description: 'Analytics for seller account suspension',
      icon: 'AlertCircle',
      color: '#EF4444',
      priority: 1,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_REINSTATEMENT]: {
      label: 'Reinstatement',
      description: 'Analytics for seller account reinstatement',
      icon: 'UserCheck',
      color: '#22C55E',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_TIER_UPGRADE]: {
      label: 'Tier Upgrade',
      description: 'Analytics for seller tier upgrades',
      icon: 'TrendingUp',
      color: '#10B981',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_TIER_DOWNGRADE]: {
      label: 'Tier Downgrade',
      description: 'Analytics for seller tier downgrades',
      icon: 'TrendingDown',
      color: '#EF4444',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_PERFORMANCE_REVIEW]: {
      label: 'Performance Review',
      description: 'Analytics for seller performance reviews',
      icon: 'Activity',
      color: '#8B5CF6',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_AUDIT]: {
      label: 'Audit',
      description: 'Analytics for seller audits',
      icon: 'Clipboard',
      color: '#6B7280',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_TRAINING]: {
      label: 'Training',
      description: 'Analytics for seller training programs',
      icon: 'Book',
      color: '#F59E0B',
      priority: 3,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_CERTIFICATION]: {
      label: 'Certification',
      description: 'Analytics for seller certifications',
      icon: 'Award',
      color: '#F472B6',
      priority: 3,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_INVENTORY_SYNC]: {
      label: 'Inventory Sync',
      description: 'Analytics for seller inventory synchronization',
      icon: 'Refresh',
      color: '#3B82F6',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_SALES]: {
      label: 'Sales',
      description: 'Analytics for seller sales performance',
      icon: 'TrendingUp',
      color: '#22C55E',
      priority: 1,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_COMMISSION]: {
      label: 'Commission',
      description: 'Analytics for seller commission tracking',
      icon: 'DollarSign',
      color: '#F59E0B',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_DISPUTE]: {
      label: 'Dispute Resolution',
      description: 'Analytics for seller dispute resolution',
      icon: 'Scale',
      color: '#F59E0B',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_RETURN]: {
      label: 'Return Management',
      description: 'Analytics for seller return management',
      icon: 'Undo',
      color: '#EF4444',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_SHIPPING]: {
      label: 'Shipping',
      description: 'Analytics for seller shipping performance',
      icon: 'Truck',
      color: '#10B981',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_MARKETING]: {
      label: 'Marketing',
      description: 'Analytics for seller marketing activities',
      icon: 'Megaphone',
      color: '#F97316',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_CUSTOMER_SERVICE]: {
      label: 'Customer Service',
      description: 'Analytics for seller customer service',
      icon: 'Headset',
      color: '#8B5CF6',
      priority: 2,
      isRealtime: true,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_QUALITY_CONTROL]: {
      label: 'Quality Control',
      description: 'Analytics for seller quality control',
      icon: 'Shield',
      color: '#22C55E',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_COMPLIANCE]: {
      label: 'Compliance',
      description: 'Analytics for seller compliance tracking',
      icon: 'FileCheck',
      color: '#6366F1',
      priority: 2,
      isRealtime: false,
      requiresSellerId: true,
    },
    [SellerAnalyticsType.VENDOR_FRAUD]: {
      label: 'Fraud Detection',
      description: 'Analytics for seller fraud detection',
      icon: 'ShieldOff',
      color: '#EF4444',
      priority: 1,
      isRealtime: true,
      requiresSellerId: true,
    },
  };

/**
 * Get seller analytics type label
 */
export function getSellerAnalyticsTypeLabel(type: SellerAnalyticsType): string {
  return SELLER_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get seller analytics type description
 */
export function getSellerAnalyticsTypeDescription(type: SellerAnalyticsType): string {
  return SELLER_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get seller analytics type category
 */
export function getSellerAnalyticsTypeCategory(type: SellerAnalyticsType): SellerAnalyticsCategory {
  return SELLER_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get seller analytics types by category
 */
export function getSellerAnalyticsTypesByCategory(
  category: SellerAnalyticsCategory
): SellerAnalyticsType[] {
  return Object.entries(SELLER_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as SellerAnalyticsType);
}

/**
 * Check if seller analytics type requires seller ID
 */
export function sellerAnalyticsTypeRequiresSellerId(type: SellerAnalyticsType): boolean {
  return SELLER_ANALYTICS_TYPE_CONFIG[type]?.requiresSellerId || false;
}

/**
 * Check if seller analytics type is real-time
 */
export function isSellerAnalyticsTypeRealtime(type: SellerAnalyticsType): boolean {
  return SELLER_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get seller analytics type priority
 */
export function getSellerAnalyticsTypePriority(type: SellerAnalyticsType): number {
  return SELLER_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Seller analytics type status
 */
export enum SellerAnalyticsTypeStatus {
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
 * Default status for seller analytics types
 */
export const SELLER_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  SellerAnalyticsType,
  SellerAnalyticsTypeStatus
> = {
  [SellerAnalyticsType.VENDOR_REGISTRATION]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_PRODUCT_ADD]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_PRODUCT_UPDATE]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_ORDER_RECEIVED]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_ORDER_FULFILLED]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_PAYMENT_RECEIVED]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_RATING_RECEIVED]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_REVIEW_RECEIVED]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_VERIFICATION]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_SUSPENSION]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_REINSTATEMENT]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_TIER_UPGRADE]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_TIER_DOWNGRADE]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_PERFORMANCE_REVIEW]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_AUDIT]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_TRAINING]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_CERTIFICATION]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_INVENTORY_SYNC]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_SALES]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_COMMISSION]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_DISPUTE]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_RETURN]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_SHIPPING]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_MARKETING]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_CUSTOMER_SERVICE]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_QUALITY_CONTROL]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_COMPLIANCE]: SellerAnalyticsTypeStatus.ACTIVE,
  [SellerAnalyticsType.VENDOR_FRAUD]: SellerAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get seller analytics type status
 */
export function getSellerAnalyticsTypeStatus(type: SellerAnalyticsType): SellerAnalyticsTypeStatus {
  return SELLER_ANALYTICS_TYPE_DEFAULT_STATUS[type] || SellerAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set seller analytics type status
 */
export function setSellerAnalyticsTypeStatus(
  type: SellerAnalyticsType,
  status: SellerAnalyticsTypeStatus
): void {
  SELLER_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Seller analytics priority levels
 */
export const SELLER_ANALYTICS_PRIORITY_LEVELS = {
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
 * Get seller analytics types by priority
 */
export function getSellerAnalyticsTypesByPriority(priority: number): SellerAnalyticsType[] {
  return Object.entries(SELLER_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as SellerAnalyticsType);
}

/**
 * Get critical seller analytics types
 */
export function getCriticalSellerAnalyticsTypes(): SellerAnalyticsType[] {
  return getSellerAnalyticsTypesByPriority(SELLER_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Seller analytics sub-categories
 */
export enum SellerAnalyticsSubCategory {
  /** Registration and onboarding */
  ONBOARDING = 'ONBOARDING',
  /** Product management */
  PRODUCT_MANAGEMENT = 'PRODUCT_MANAGEMENT',
  /** Order management */
  ORDER_MANAGEMENT = 'ORDER_MANAGEMENT',
  /** Financial management */
  FINANCIAL_MANAGEMENT = 'FINANCIAL_MANAGEMENT',
  /** Performance tracking */
  PERFORMANCE_TRACKING = 'PERFORMANCE_TRACKING',
  /** Compliance and legal */
  COMPLIANCE = 'COMPLIANCE',
  /** Operational management */
  OPERATIONAL_MANAGEMENT = 'OPERATIONAL_MANAGEMENT',
  /** Development and training */
  DEVELOPMENT = 'DEVELOPMENT',
}

/**
 * Mapping of seller analytics types to sub-categories
 */
export const SELLER_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  SellerAnalyticsType,
  SellerAnalyticsSubCategory
> = {
  [SellerAnalyticsType.VENDOR_REGISTRATION]: SellerAnalyticsSubCategory.ONBOARDING,
  [SellerAnalyticsType.VENDOR_VERIFICATION]: SellerAnalyticsSubCategory.ONBOARDING,
  [SellerAnalyticsType.VENDOR_SUSPENSION]: SellerAnalyticsSubCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_REINSTATEMENT]: SellerAnalyticsSubCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_AUDIT]: SellerAnalyticsSubCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_COMPLIANCE]: SellerAnalyticsSubCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_FRAUD]: SellerAnalyticsSubCategory.COMPLIANCE,
  [SellerAnalyticsType.VENDOR_PRODUCT_ADD]: SellerAnalyticsSubCategory.PRODUCT_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_PRODUCT_UPDATE]: SellerAnalyticsSubCategory.PRODUCT_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_INVENTORY_SYNC]: SellerAnalyticsSubCategory.PRODUCT_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_ORDER_RECEIVED]: SellerAnalyticsSubCategory.ORDER_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_ORDER_FULFILLED]: SellerAnalyticsSubCategory.ORDER_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_DISPUTE]: SellerAnalyticsSubCategory.ORDER_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_RETURN]: SellerAnalyticsSubCategory.ORDER_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_SHIPPING]: SellerAnalyticsSubCategory.ORDER_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_PAYMENT_RECEIVED]: SellerAnalyticsSubCategory.FINANCIAL_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_SALES]: SellerAnalyticsSubCategory.FINANCIAL_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_COMMISSION]: SellerAnalyticsSubCategory.FINANCIAL_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_RATING_RECEIVED]: SellerAnalyticsSubCategory.PERFORMANCE_TRACKING,
  [SellerAnalyticsType.VENDOR_REVIEW_RECEIVED]: SellerAnalyticsSubCategory.PERFORMANCE_TRACKING,
  [SellerAnalyticsType.VENDOR_TIER_UPGRADE]: SellerAnalyticsSubCategory.PERFORMANCE_TRACKING,
  [SellerAnalyticsType.VENDOR_TIER_DOWNGRADE]: SellerAnalyticsSubCategory.PERFORMANCE_TRACKING,
  [SellerAnalyticsType.VENDOR_PERFORMANCE_REVIEW]: SellerAnalyticsSubCategory.PERFORMANCE_TRACKING,
  [SellerAnalyticsType.VENDOR_QUALITY_CONTROL]: SellerAnalyticsSubCategory.PERFORMANCE_TRACKING,
  [SellerAnalyticsType.VENDOR_MARKETING]: SellerAnalyticsSubCategory.OPERATIONAL_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_CUSTOMER_SERVICE]: SellerAnalyticsSubCategory.OPERATIONAL_MANAGEMENT,
  [SellerAnalyticsType.VENDOR_TRAINING]: SellerAnalyticsSubCategory.DEVELOPMENT,
  [SellerAnalyticsType.VENDOR_CERTIFICATION]: SellerAnalyticsSubCategory.DEVELOPMENT,
};

/**
 * Get seller analytics type sub-category
 */
export function getSellerAnalyticsTypeSubCategory(
  type: SellerAnalyticsType
): SellerAnalyticsSubCategory {
  return SELLER_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get seller analytics types by sub-category
 */
export function getSellerAnalyticsTypesBySubCategory(
  subCategory: SellerAnalyticsSubCategory
): SellerAnalyticsType[] {
  return Object.entries(SELLER_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as SellerAnalyticsType);
}
