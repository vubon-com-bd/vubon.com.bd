/**
 * @fileoverview Acquisition analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Acquisition analytics types enum for different acquisition-related analytics
 */
export enum AcquisitionAnalyticsType {
  /** Lead generation analytics */
  LEAD_GENERATION_ANALYTICS = 'LEAD_GENERATION_ANALYTICS',
  /** Conversion analytics */
  CONVERSION_ANALYTICS = 'CONVERSION_ANALYTICS',
  /** Funnel analytics */
  FUNNEL_ANALYTICS = 'FUNNEL_ANALYTICS',
  /** Attribution analytics */
  ATTRIBUTION_ANALYTICS = 'ATTRIBUTION_ANALYTICS',
  /** Cost analytics */
  COST_ANALYTICS = 'COST_ANALYTICS',
  /** ROI analytics */
  ROI_ANALYTICS = 'ROI_ANALYTICS',
  /** Channel performance analytics */
  CHANNEL_PERFORMANCE_ANALYTICS = 'CHANNEL_PERFORMANCE_ANALYTICS',
  /** Campaign performance analytics */
  CAMPAIGN_PERFORMANCE_ANALYTICS = 'CAMPAIGN_PERFORMANCE_ANALYTICS',
  /** Landing page analytics */
  LANDING_PAGE_ANALYTICS = 'LANDING_PAGE_ANALYTICS',
  /** Form analytics */
  FORM_ANALYTICS = 'FORM_ANALYTICS',
  /** Click-to-impression analytics */
  CTI_ANALYTICS = 'CTI_ANALYTICS',
  /** Quality analytics */
  QUALITY_ANALYTICS = 'QUALITY_ANALYTICS',
  /** Speed analytics */
  SPEED_ANALYTICS = 'SPEED_ANALYTICS',
  /** Volume analytics */
  VOLUME_ANALYTICS = 'VOLUME_ANALYTICS',
  /** Trend analytics */
  TREND_ANALYTICS = 'TREND_ANALYTICS',
  /** Seasonal analytics */
  SEASONAL_ANALYTICS = 'SEASONAL_ANALYTICS',
  /** Comparative analytics */
  COMPARATIVE_ANALYTICS = 'COMPARATIVE_ANALYTICS',
  /** Benchmark analytics */
  BENCHMARK_ANALYTICS = 'BENCHMARK_ANALYTICS',
  /** Forecast analytics */
  FORECAST_ANALYTICS = 'FORECAST_ANALYTICS',
  /** Optimization analytics */
  OPTIMIZATION_ANALYTICS = 'OPTIMIZATION_ANALYTICS',
  /** Funnel abandonment analytics */
  FUNNEL_ABANDONMENT_ANALYTICS = 'FUNNEL_ABANDONMENT_ANALYTICS',
  /** Multi-channel analytics */
  MULTI_CHANNEL_ANALYTICS = 'MULTI_CHANNEL_ANALYTICS',
  /** Cross-device analytics */
  CROSS_DEVICE_ANALYTICS = 'CROSS_DEVICE_ANALYTICS',
  /** Journey analytics */
  JOURNEY_ANALYTICS = 'JOURNEY_ANALYTICS',
  /** Retention analytics */
  RETENTION_ANALYTICS = 'RETENTION_ANALYTICS',
}

/**
 * Acquisition analytics category for grouping
 */
export enum AcquisitionAnalyticsCategory {
  /** Generation analytics */
  GENERATION = 'GENERATION',
  /** Conversion analytics */
  CONVERSION = 'CONVERSION',
  /** Performance analytics */
  PERFORMANCE = 'PERFORMANCE',
  /** Financial analytics */
  FINANCIAL = 'FINANCIAL',
  /** Behavioral analytics */
  BEHAVIORAL = 'BEHAVIORAL',
  /** Strategic analytics */
  STRATEGIC = 'STRATEGIC',
  /** Optimization analytics */
  OPTIMIZATION = 'OPTIMIZATION',
}

/**
 * Acquisition analytics category mapping
 */
export const ACQUISITION_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsCategory
> = {
  [AcquisitionAnalyticsType.LEAD_GENERATION_ANALYTICS]: AcquisitionAnalyticsCategory.GENERATION,
  [AcquisitionAnalyticsType.CONVERSION_ANALYTICS]: AcquisitionAnalyticsCategory.CONVERSION,
  [AcquisitionAnalyticsType.FUNNEL_ANALYTICS]: AcquisitionAnalyticsCategory.CONVERSION,
  [AcquisitionAnalyticsType.FUNNEL_ABANDONMENT_ANALYTICS]: AcquisitionAnalyticsCategory.CONVERSION,
  [AcquisitionAnalyticsType.ATTRIBUTION_ANALYTICS]: AcquisitionAnalyticsCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.COST_ANALYTICS]: AcquisitionAnalyticsCategory.FINANCIAL,
  [AcquisitionAnalyticsType.ROI_ANALYTICS]: AcquisitionAnalyticsCategory.FINANCIAL,
  [AcquisitionAnalyticsType.CHANNEL_PERFORMANCE_ANALYTICS]:
    AcquisitionAnalyticsCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.CAMPAIGN_PERFORMANCE_ANALYTICS]:
    AcquisitionAnalyticsCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.LANDING_PAGE_ANALYTICS]: AcquisitionAnalyticsCategory.BEHAVIORAL,
  [AcquisitionAnalyticsType.FORM_ANALYTICS]: AcquisitionAnalyticsCategory.BEHAVIORAL,
  [AcquisitionAnalyticsType.CTI_ANALYTICS]: AcquisitionAnalyticsCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.QUALITY_ANALYTICS]: AcquisitionAnalyticsCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.SPEED_ANALYTICS]: AcquisitionAnalyticsCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.VOLUME_ANALYTICS]: AcquisitionAnalyticsCategory.GENERATION,
  [AcquisitionAnalyticsType.TREND_ANALYTICS]: AcquisitionAnalyticsCategory.STRATEGIC,
  [AcquisitionAnalyticsType.SEASONAL_ANALYTICS]: AcquisitionAnalyticsCategory.STRATEGIC,
  [AcquisitionAnalyticsType.COMPARATIVE_ANALYTICS]: AcquisitionAnalyticsCategory.STRATEGIC,
  [AcquisitionAnalyticsType.BENCHMARK_ANALYTICS]: AcquisitionAnalyticsCategory.STRATEGIC,
  [AcquisitionAnalyticsType.FORECAST_ANALYTICS]: AcquisitionAnalyticsCategory.STRATEGIC,
  [AcquisitionAnalyticsType.OPTIMIZATION_ANALYTICS]: AcquisitionAnalyticsCategory.OPTIMIZATION,
  [AcquisitionAnalyticsType.MULTI_CHANNEL_ANALYTICS]: AcquisitionAnalyticsCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.CROSS_DEVICE_ANALYTICS]: AcquisitionAnalyticsCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.JOURNEY_ANALYTICS]: AcquisitionAnalyticsCategory.BEHAVIORAL,
  [AcquisitionAnalyticsType.RETENTION_ANALYTICS]: AcquisitionAnalyticsCategory.CONVERSION,
};

/**
 * Acquisition analytics type configuration
 */
export interface AcquisitionAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresCampaignId: boolean;
}

export const ACQUISITION_ANALYTICS_TYPE_CONFIG: Record<
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsTypeConfig
> = {
  [AcquisitionAnalyticsType.LEAD_GENERATION_ANALYTICS]: {
    label: 'Lead Generation Analytics',
    description: 'Analytics for lead generation activities',
    icon: 'UserPlus',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.CONVERSION_ANALYTICS]: {
    label: 'Conversion Analytics',
    description: 'Analytics for conversion tracking and optimization',
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 1,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [AcquisitionAnalyticsType.FUNNEL_ANALYTICS]: {
    label: 'Funnel Analytics',
    description: 'Analytics for conversion funnel analysis',
    icon: 'Filter',
    color: '#8B5CF6',
    priority: 1,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.FUNNEL_ABANDONMENT_ANALYTICS]: {
    label: 'Funnel Abandonment Analytics',
    description: 'Analytics for funnel abandonment tracking',
    icon: 'XCircle',
    color: '#EF4444',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.ATTRIBUTION_ANALYTICS]: {
    label: 'Attribution Analytics',
    description: 'Analytics for multi-channel attribution',
    icon: 'PieChart',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [AcquisitionAnalyticsType.COST_ANALYTICS]: {
    label: 'Cost Analytics',
    description: 'Analytics for acquisition costs',
    icon: 'DollarSign',
    color: '#EF4444',
    priority: 1,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [AcquisitionAnalyticsType.ROI_ANALYTICS]: {
    label: 'ROI Analytics',
    description: 'Analytics for acquisition ROI',
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 1,
    isRealtime: false,
    requiresCampaignId: true,
  },
  [AcquisitionAnalyticsType.CHANNEL_PERFORMANCE_ANALYTICS]: {
    label: 'Channel Performance Analytics',
    description: 'Analytics for channel performance metrics',
    icon: 'Layers',
    color: '#6366F1',
    priority: 1,
    isRealtime: true,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.CAMPAIGN_PERFORMANCE_ANALYTICS]: {
    label: 'Campaign Performance Analytics',
    description: 'Analytics for campaign performance',
    icon: 'Megaphone',
    color: '#F59E0B',
    priority: 1,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [AcquisitionAnalyticsType.LANDING_PAGE_ANALYTICS]: {
    label: 'Landing Page Analytics',
    description: 'Analytics for landing page performance',
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.FORM_ANALYTICS]: {
    label: 'Form Analytics',
    description: 'Analytics for form submissions and behavior',
    icon: 'FormInput',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.CTI_ANALYTICS]: {
    label: 'Click-to-Impression Analytics',
    description: 'Analytics for click-to-impression ratio',
    icon: 'MousePointer',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: true,
  },
  [AcquisitionAnalyticsType.QUALITY_ANALYTICS]: {
    label: 'Quality Analytics',
    description: 'Analytics for lead and conversion quality',
    icon: 'Shield',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.SPEED_ANALYTICS]: {
    label: 'Speed Analytics',
    description: 'Analytics for acquisition speed metrics',
    icon: 'Zap',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.VOLUME_ANALYTICS]: {
    label: 'Volume Analytics',
    description: 'Analytics for acquisition volume metrics',
    icon: 'BarChart',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.TREND_ANALYTICS]: {
    label: 'Trend Analytics',
    description: 'Analytics for acquisition trends',
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.SEASONAL_ANALYTICS]: {
    label: 'Seasonal Analytics',
    description: 'Analytics for seasonal patterns in acquisition',
    icon: 'Calendar',
    color: '#F472B6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.COMPARATIVE_ANALYTICS]: {
    label: 'Comparative Analytics',
    description: 'Analytics for comparative acquisition analysis',
    icon: 'GitCompare',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.BENCHMARK_ANALYTICS]: {
    label: 'Benchmark Analytics',
    description: 'Analytics for acquisition benchmarking',
    icon: 'Target',
    color: '#3B82F6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.FORECAST_ANALYTICS]: {
    label: 'Forecast Analytics',
    description: 'Analytics for acquisition forecasting',
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.OPTIMIZATION_ANALYTICS]: {
    label: 'Optimization Analytics',
    description: 'Analytics for acquisition optimization',
    icon: 'Settings',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.MULTI_CHANNEL_ANALYTICS]: {
    label: 'Multi-Channel Analytics',
    description: 'Analytics for multi-channel acquisition',
    icon: 'Layers',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.CROSS_DEVICE_ANALYTICS]: {
    label: 'Cross-Device Analytics',
    description: 'Analytics for cross-device acquisition',
    icon: 'Smartphone',
    color: '#10B981',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.JOURNEY_ANALYTICS]: {
    label: 'Journey Analytics',
    description: 'Analytics for customer journey analysis',
    icon: 'Map',
    color: '#F59E0B',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
  [AcquisitionAnalyticsType.RETENTION_ANALYTICS]: {
    label: 'Retention Analytics',
    description: 'Analytics for customer retention analysis',
    icon: 'UserCheck',
    color: '#22C55E',
    priority: 2,
    isRealtime: false,
    requiresCampaignId: false,
  },
};

/**
 * Get acquisition analytics type label
 */
export function getAcquisitionAnalyticsTypeLabel(type: AcquisitionAnalyticsType): string {
  return ACQUISITION_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get acquisition analytics type description
 */
export function getAcquisitionAnalyticsTypeDescription(type: AcquisitionAnalyticsType): string {
  return ACQUISITION_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get acquisition analytics type category
 */
export function getAcquisitionAnalyticsTypeCategory(
  type: AcquisitionAnalyticsType
): AcquisitionAnalyticsCategory {
  return ACQUISITION_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get acquisition analytics types by category
 */
export function getAcquisitionAnalyticsTypesByCategory(
  category: AcquisitionAnalyticsCategory
): AcquisitionAnalyticsType[] {
  return Object.entries(ACQUISITION_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as AcquisitionAnalyticsType);
}

/**
 * Check if acquisition analytics type requires campaign ID
 */
export function acquisitionAnalyticsTypeRequiresCampaignId(
  type: AcquisitionAnalyticsType
): boolean {
  return ACQUISITION_ANALYTICS_TYPE_CONFIG[type]?.requiresCampaignId || false;
}

/**
 * Check if acquisition analytics type is real-time
 */
export function isAcquisitionAnalyticsTypeRealtime(type: AcquisitionAnalyticsType): boolean {
  return ACQUISITION_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get acquisition analytics type priority
 */
export function getAcquisitionAnalyticsTypePriority(type: AcquisitionAnalyticsType): number {
  return ACQUISITION_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Acquisition analytics type status
 */
export enum AcquisitionAnalyticsTypeStatus {
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
 * Default status for acquisition analytics types
 */
export const ACQUISITION_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsTypeStatus
> = {
  [AcquisitionAnalyticsType.LEAD_GENERATION_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.CONVERSION_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.FUNNEL_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.FUNNEL_ABANDONMENT_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.ATTRIBUTION_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.COST_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.ROI_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.CHANNEL_PERFORMANCE_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.CAMPAIGN_PERFORMANCE_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.LANDING_PAGE_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.FORM_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.CTI_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.QUALITY_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.SPEED_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.VOLUME_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.TREND_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.SEASONAL_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.COMPARATIVE_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.BENCHMARK_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.FORECAST_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.OPTIMIZATION_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.MULTI_CHANNEL_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.CROSS_DEVICE_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.JOURNEY_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
  [AcquisitionAnalyticsType.RETENTION_ANALYTICS]: AcquisitionAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get acquisition analytics type status
 */
export function getAcquisitionAnalyticsTypeStatus(
  type: AcquisitionAnalyticsType
): AcquisitionAnalyticsTypeStatus {
  return ACQUISITION_ANALYTICS_TYPE_DEFAULT_STATUS[type] || AcquisitionAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set acquisition analytics type status
 */
export function setAcquisitionAnalyticsTypeStatus(
  type: AcquisitionAnalyticsType,
  status: AcquisitionAnalyticsTypeStatus
): void {
  ACQUISITION_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Acquisition analytics priority levels
 */
export const ACQUISITION_ANALYTICS_PRIORITY_LEVELS = {
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
 * Get acquisition analytics types by priority
 */
export function getAcquisitionAnalyticsTypesByPriority(
  priority: number
): AcquisitionAnalyticsType[] {
  return Object.entries(ACQUISITION_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as AcquisitionAnalyticsType);
}

/**
 * Get critical acquisition analytics types
 */
export function getCriticalAcquisitionAnalyticsTypes(): AcquisitionAnalyticsType[] {
  return getAcquisitionAnalyticsTypesByPriority(ACQUISITION_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Acquisition analytics sub-categories
 */
export enum AcquisitionAnalyticsSubCategory {
  /** Lead generation analysis */
  LEAD_GENERATION = 'LEAD_GENERATION',
  /** Conversion analysis */
  CONVERSION = 'CONVERSION',
  /** Funnel analysis */
  FUNNEL = 'FUNNEL',
  /** Performance analysis */
  PERFORMANCE = 'PERFORMANCE',
  /** Financial analysis */
  FINANCIAL = 'FINANCIAL',
  /** Behavioral analysis */
  BEHAVIORAL = 'BEHAVIORAL',
  /** Strategic analysis */
  STRATEGIC = 'STRATEGIC',
}

/**
 * Mapping of acquisition analytics types to sub-categories
 */
export const ACQUISITION_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsSubCategory
> = {
  [AcquisitionAnalyticsType.LEAD_GENERATION_ANALYTICS]:
    AcquisitionAnalyticsSubCategory.LEAD_GENERATION,
  [AcquisitionAnalyticsType.VOLUME_ANALYTICS]: AcquisitionAnalyticsSubCategory.LEAD_GENERATION,
  [AcquisitionAnalyticsType.CONVERSION_ANALYTICS]: AcquisitionAnalyticsSubCategory.CONVERSION,
  [AcquisitionAnalyticsType.RETENTION_ANALYTICS]: AcquisitionAnalyticsSubCategory.CONVERSION,
  [AcquisitionAnalyticsType.FUNNEL_ANALYTICS]: AcquisitionAnalyticsSubCategory.FUNNEL,
  [AcquisitionAnalyticsType.FUNNEL_ABANDONMENT_ANALYTICS]: AcquisitionAnalyticsSubCategory.FUNNEL,
  [AcquisitionAnalyticsType.CHANNEL_PERFORMANCE_ANALYTICS]:
    AcquisitionAnalyticsSubCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.CAMPAIGN_PERFORMANCE_ANALYTICS]:
    AcquisitionAnalyticsSubCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.ATTRIBUTION_ANALYTICS]: AcquisitionAnalyticsSubCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.CTI_ANALYTICS]: AcquisitionAnalyticsSubCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.QUALITY_ANALYTICS]: AcquisitionAnalyticsSubCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.SPEED_ANALYTICS]: AcquisitionAnalyticsSubCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.MULTI_CHANNEL_ANALYTICS]: AcquisitionAnalyticsSubCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.CROSS_DEVICE_ANALYTICS]: AcquisitionAnalyticsSubCategory.PERFORMANCE,
  [AcquisitionAnalyticsType.COST_ANALYTICS]: AcquisitionAnalyticsSubCategory.FINANCIAL,
  [AcquisitionAnalyticsType.ROI_ANALYTICS]: AcquisitionAnalyticsSubCategory.FINANCIAL,
  [AcquisitionAnalyticsType.LANDING_PAGE_ANALYTICS]: AcquisitionAnalyticsSubCategory.BEHAVIORAL,
  [AcquisitionAnalyticsType.FORM_ANALYTICS]: AcquisitionAnalyticsSubCategory.BEHAVIORAL,
  [AcquisitionAnalyticsType.JOURNEY_ANALYTICS]: AcquisitionAnalyticsSubCategory.BEHAVIORAL,
  [AcquisitionAnalyticsType.TREND_ANALYTICS]: AcquisitionAnalyticsSubCategory.STRATEGIC,
  [AcquisitionAnalyticsType.SEASONAL_ANALYTICS]: AcquisitionAnalyticsSubCategory.STRATEGIC,
  [AcquisitionAnalyticsType.COMPARATIVE_ANALYTICS]: AcquisitionAnalyticsSubCategory.STRATEGIC,
  [AcquisitionAnalyticsType.BENCHMARK_ANALYTICS]: AcquisitionAnalyticsSubCategory.STRATEGIC,
  [AcquisitionAnalyticsType.FORECAST_ANALYTICS]: AcquisitionAnalyticsSubCategory.STRATEGIC,
  [AcquisitionAnalyticsType.OPTIMIZATION_ANALYTICS]: AcquisitionAnalyticsSubCategory.STRATEGIC,
};

/**
 * Get acquisition analytics type sub-category
 */
export function getAcquisitionAnalyticsTypeSubCategory(
  type: AcquisitionAnalyticsType
): AcquisitionAnalyticsSubCategory {
  return ACQUISITION_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get acquisition analytics types by sub-category
 */
export function getAcquisitionAnalyticsTypesBySubCategory(
  subCategory: AcquisitionAnalyticsSubCategory
): AcquisitionAnalyticsType[] {
  return Object.entries(ACQUISITION_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as AcquisitionAnalyticsType);
}
