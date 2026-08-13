/**
 * @fileoverview Channel analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Channel category classification
 */
export enum ChannelCategory {
  /** Direct sales channel */
  DIRECT = 'DIRECT',
  /** Indirect sales channel */
  INDIRECT = 'INDIRECT',
  /** Digital channel */
  DIGITAL = 'DIGITAL',
  /** Physical channel */
  PHYSICAL = 'PHYSICAL',
  /** Partner channel */
  PARTNER = 'PARTNER',
  /** Hybrid channel */
  HYBRID = 'HYBRID',
  /** Online channel */
  ONLINE = 'ONLINE',
  /** Offline channel */
  OFFLINE = 'OFFLINE',
  /** Social channel */
  SOCIAL = 'SOCIAL',
  /** Mobile channel */
  MOBILE = 'MOBILE',
}

/**
 * Channel performance benchmarks
 */
export interface ChannelPerformanceBenchmark {
  /** Conversion rate benchmark */
  conversionRateBenchmark: number;
  /** Customer acquisition cost benchmark */
  customerAcquisitionCostBenchmark: number;
  /** Customer lifetime value benchmark */
  customerLifetimeValueBenchmark: number;
  /** Revenue per channel benchmark */
  revenuePerChannelBenchmark: number;
  /** Channel growth rate benchmark */
  growthRateBenchmark: number;
  /** Channel retention rate benchmark */
  retentionRateBenchmark: number;
}

export const DEFAULT_CHANNEL_PERFORMANCE_BENCHMARK: ChannelPerformanceBenchmark = {
  conversionRateBenchmark: 0.03,
  customerAcquisitionCostBenchmark: 50,
  customerLifetimeValueBenchmark: 500,
  revenuePerChannelBenchmark: 10000,
  growthRateBenchmark: 10,
  retentionRateBenchmark: 60,
};

/**
 * Channel attribution model settings
 */
export interface ChannelAttributionModelSettings {
  /** Attribution model type */
  modelType: 'FIRST_TOUCH' | 'LAST_TOUCH' | 'LINEAR' | 'TIME_DECAY' | 'POSITION_BASED' | 'CUSTOM';
  /** Attribution window in days */
  attributionWindowDays: number;
  /** Multi-touch attribution enabled */
  enableMultiTouch: boolean;
  /** Cross-channel attribution enabled */
  enableCrossChannel: boolean;
  /** Attribution weight settings */
  weights: {
    firstTouch: number;
    lastTouch: number;
    middleTouches: number;
  };
}

export const DEFAULT_CHANNEL_ATTRIBUTION_MODEL_SETTINGS: ChannelAttributionModelSettings = {
  modelType: 'LINEAR',
  attributionWindowDays: 30,
  enableMultiTouch: true,
  enableCrossChannel: true,
  weights: {
    firstTouch: 40,
    lastTouch: 40,
    middleTouches: 20,
  },
};

/**
 * Channel cost allocation settings
 */
export interface ChannelCostAllocationSettings {
  /** Cost allocation method */
  allocationMethod: 'PROPORTIONAL' | 'FIXED' | 'ACTIVITY_BASED' | 'HYBRID';
  /** Fixed cost allocation percentage */
  fixedCostPercentage: number;
  /** Variable cost allocation enabled */
  enableVariableCostAllocation: boolean;
  /** Cost allocation period in days */
  allocationPeriodDays: number;
  /** Cost categories */
  costCategories: ('FIXED' | 'VARIABLE' | 'DIRECT' | 'INDIRECT' | 'OVERHEAD')[];
}

export const DEFAULT_CHANNEL_COST_ALLOCATION_SETTINGS: ChannelCostAllocationSettings = {
  allocationMethod: 'PROPORTIONAL',
  fixedCostPercentage: 30,
  enableVariableCostAllocation: true,
  allocationPeriodDays: 30,
  costCategories: ['FIXED', 'VARIABLE', 'DIRECT', 'INDIRECT'],
};

/**
 * Channel conversion thresholds
 */
export interface ChannelConversionThresholds {
  /** Low conversion threshold */
  lowConversionThreshold: number;
  /** Medium conversion threshold */
  mediumConversionThreshold: number;
  /** High conversion threshold */
  highConversionThreshold: number;
  /** Critical conversion threshold */
  criticalConversionThreshold: number;
  /** Alert threshold percentage */
  alertThresholdPercentage: number;
}

export const DEFAULT_CHANNEL_CONVERSION_THRESHOLDS: ChannelConversionThresholds = {
  lowConversionThreshold: 0.01,
  mediumConversionThreshold: 0.03,
  highConversionThreshold: 0.05,
  criticalConversionThreshold: 0.08,
  alertThresholdPercentage: 20,
};

/**
 * Channel ROI calculation settings
 */
export interface ChannelROICalculationSettings {
  /** ROI calculation method */
  calculationMethod: 'SIMPLE' | 'ADVANCED' | 'TIME_BASED';
  /** ROI calculation period in days */
  calculationPeriodDays: number;
  /** Include indirect costs */
  includeIndirectCosts: boolean;
  /** Include opportunity costs */
  includeOpportunityCosts: boolean;
  /** ROI target percentage */
  targetROI: number;
  /** Minimum ROI threshold */
  minimumROI: number;
}

export const DEFAULT_CHANNEL_ROI_CALCULATION_SETTINGS: ChannelROICalculationSettings = {
  calculationMethod: 'ADVANCED',
  calculationPeriodDays: 30,
  includeIndirectCosts: true,
  includeOpportunityCosts: false,
  targetROI: 20,
  minimumROI: 10,
};

/**
 * Channel synergy settings
 */
export interface ChannelSynergySettings {
  /** Enable synergy analysis */
  enableSynergyAnalysis: boolean;
  /** Synergy analysis period in days */
  analysisPeriodDays: number;
  /** Cross-channel synergy effect threshold */
  synergyEffectThreshold: number;
  /** Cannibalization threshold */
  cannibalizationThreshold: number;
  /** Synergy score calculation method */
  scoreCalculationMethod: 'ADDITIVE' | 'MULTIPLICATIVE' | 'HYBRID';
}

export const DEFAULT_CHANNEL_SYNERGY_SETTINGS: ChannelSynergySettings = {
  enableSynergyAnalysis: true,
  analysisPeriodDays: 90,
  synergyEffectThreshold: 1.1,
  cannibalizationThreshold: 0.9,
  scoreCalculationMethod: 'HYBRID',
};

/**
 * Channel competition settings
 */
export interface ChannelCompetitionSettings {
  /** Enable competition analysis */
  enableCompetitionAnalysis: boolean;
  /** Competition analysis period in days */
  analysisPeriodDays: number;
  /** Competitive intensity threshold */
  intensityThreshold: number;
  /** Market share threshold */
  marketShareThreshold: number;
  /** Channel saturation threshold */
  saturationThreshold: number;
}

export const DEFAULT_CHANNEL_COMPETITION_SETTINGS: ChannelCompetitionSettings = {
  enableCompetitionAnalysis: true,
  analysisPeriodDays: 90,
  intensityThreshold: 0.7,
  marketShareThreshold: 30,
  saturationThreshold: 80,
};

/**
 * Channel customer preference tracking
 */
export interface ChannelCustomerPreferenceTracking {
  /** Enable preference tracking */
  enablePreferenceTracking: boolean;
  /** Preference tracking period in days */
  trackingPeriodDays: number;
  /** Track channel selection patterns */
  trackSelectionPatterns: boolean;
  /** Track channel switching behavior */
  trackSwitchingBehavior: boolean;
  /** Track channel satisfaction */
  trackSatisfaction: boolean;
  /** Preference update frequency in days */
  updateFrequencyDays: number;
}

export const DEFAULT_CHANNEL_CUSTOMER_PREFERENCE_TRACKING: ChannelCustomerPreferenceTracking = {
  enablePreferenceTracking: true,
  trackingPeriodDays: 90,
  trackSelectionPatterns: true,
  trackSwitchingBehavior: true,
  trackSatisfaction: true,
  updateFrequencyDays: 30,
};

/**
 * Channel trend detection settings
 */
export interface ChannelTrendDetectionSettings {
  /** Enable trend detection */
  enableTrendDetection: boolean;
  /** Trend detection period in days */
  detectionPeriodDays: number;
  /** Trend confidence threshold */
  confidenceThreshold: number;
  /** Minimum data points for trend */
  minDataPoints: number;
  /** Trend detection algorithms */
  algorithms: ('MOVING_AVERAGE' | 'EXPONENTIAL_SMOOTHING' | 'LINEAR_REGRESSION' | 'ARIMA')[];
}

export const DEFAULT_CHANNEL_TREND_DETECTION_SETTINGS: ChannelTrendDetectionSettings = {
  enableTrendDetection: true,
  detectionPeriodDays: 30,
  confidenceThreshold: 0.8,
  minDataPoints: 10,
  algorithms: ['MOVING_AVERAGE', 'LINEAR_REGRESSION'],
};

/**
 * Channel analytics configuration
 */
export const CHANNEL_ANALYTICS_CONFIG = {
  /** Maximum channels to process */
  MAX_CHANNELS: 100,
  /** Channel analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Channel query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum channels in report */
  MAX_CHANNELS_IN_REPORT: 50,
  /** Channel data export limit */
  EXPORT_LIMIT: 50000,
  /** Channel analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Channel functions
 */
export function getChannelCategoryLabel(category: ChannelCategory): string {
  return category;
}
