/**
 * @fileoverview Retention analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Retention period settings
 */
export interface RetentionPeriodSettings {
  /** Retention period in days */
  retentionPeriodDays: number;
  /** Analysis window in days */
  analysisWindowDays: number;
  /** Cohort period in days */
  cohortPeriodDays: number;
  /** Granularity of retention tracking */
  granularity: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  /** Retention tracking start date offset in days */
  startDateOffsetDays: number;
}

export const DEFAULT_RETENTION_PERIOD_SETTINGS: RetentionPeriodSettings = {
  retentionPeriodDays: 30,
  analysisWindowDays: 90,
  cohortPeriodDays: 7,
  granularity: 'DAILY',
  startDateOffsetDays: 0,
};

/**
 * Churn detection thresholds
 */
export interface ChurnDetectionThresholds {
  /** Inactivity period for churn in days */
  inactivityPeriodDays: number;
  /** Churn risk threshold percentage */
  churnRiskThreshold: number;
  /** High churn risk threshold percentage */
  highChurnRiskThreshold: number;
  /** Churn detection sensitivity */
  sensitivity: 'LOW' | 'MEDIUM' | 'HIGH';
  /** Minimum data points for churn detection */
  minDataPoints: number;
  /** Churn prediction window in days */
  predictionWindowDays: number;
}

export const DEFAULT_CHURN_DETECTION_THRESHOLDS: ChurnDetectionThresholds = {
  inactivityPeriodDays: 30,
  churnRiskThreshold: 30,
  highChurnRiskThreshold: 50,
  sensitivity: 'MEDIUM',
  minDataPoints: 14,
  predictionWindowDays: 14,
};

/**
 * Re-engagement campaign settings
 */
export interface ReengagementCampaignSettings {
  /** Enable re-engagement campaigns */
  enableCampaigns: boolean;
  /** Re-engagement trigger days */
  triggerDays: number;
  /** Maximum re-engagement attempts */
  maxAttempts: number;
  /** Campaign channels */
  channels: ('EMAIL' | 'SMS' | 'PUSH' | 'IN_APP' | 'SOCIAL')[];
  /** Campaign budget */
  budget: number;
  /** Campaign duration in days */
  durationDays: number;
  /** Success criteria for re-engagement */
  successCriteria: {
    action: string;
    timeframeDays: number;
  }[];
}

export const DEFAULT_REENGAGEMENT_CAMPAIGN_SETTINGS: ReengagementCampaignSettings = {
  enableCampaigns: true,
  triggerDays: 14,
  maxAttempts: 3,
  channels: ['EMAIL', 'PUSH'],
  budget: 500,
  durationDays: 30,
  successCriteria: [
    { action: 'login', timeframeDays: 7 },
    { action: 'purchase', timeframeDays: 14 },
    { action: 'engagement', timeframeDays: 7 },
  ],
};

/**
 * Loyalty program tier settings
 */
export interface LoyaltyProgramTierSettings {
  /** Enable loyalty program */
  enableLoyaltyProgram: boolean;
  /** Loyalty tiers configuration */
  tiers: {
    name: string;
    level: number;
    minPoints: number;
    benefits: string[];
    discountRate: number;
  }[];
  /** Points expiration in days */
  pointsExpirationDays: number;
  /** Points earning rate */
  pointsEarningRate: number;
  /** Minimum points for redemption */
  minPointsForRedemption: number;
}

export const DEFAULT_LOYALTY_PROGRAM_TIER_SETTINGS: LoyaltyProgramTierSettings = {
  enableLoyaltyProgram: true,
  tiers: [
    { name: 'Bronze', level: 1, minPoints: 0, benefits: ['Basic rewards'], discountRate: 5 },
    {
      name: 'Silver',
      level: 2,
      minPoints: 500,
      benefits: ['Priority support', 'Extra points'],
      discountRate: 10,
    },
    {
      name: 'Gold',
      level: 3,
      minPoints: 2000,
      benefits: ['VIP support', 'Exclusive offers'],
      discountRate: 15,
    },
    {
      name: 'Platinum',
      level: 4,
      minPoints: 5000,
      benefits: ['All access', 'Premium support'],
      discountRate: 20,
    },
  ],
  pointsExpirationDays: 365,
  pointsEarningRate: 10,
  minPointsForRedemption: 500,
};

/**
 * Retention cost budget settings
 */
export interface RetentionCostBudgetSettings {
  /** Total retention budget */
  totalBudget: number;
  /** Budget allocation by channel */
  channelAllocation: Record<string, number>;
  /** Budget allocation by tier */
  tierAllocation: Record<string, number>;
  /** Budget review frequency in days */
  reviewFrequencyDays: number;
  /** Budget alert threshold percentage */
  alertThreshold: number;
  /** Budget auto-adjust enabled */
  autoAdjustEnabled: boolean;
}

export const DEFAULT_RETENTION_COST_BUDGET_SETTINGS: RetentionCostBudgetSettings = {
  totalBudget: 10000,
  channelAllocation: {
    EMAIL: 30,
    SMS: 20,
    PUSH: 25,
    SOCIAL: 25,
  },
  tierAllocation: {
    BRONZE: 20,
    SILVER: 25,
    GOLD: 30,
    PLATINUM: 25,
  },
  reviewFrequencyDays: 30,
  alertThreshold: 80,
  autoAdjustEnabled: true,
};

/**
 * Customer lifecycle stage settings
 */
export enum CustomerLifecycleStage {
  /** New customer */
  NEW = 'NEW',
  /** Active customer */
  ACTIVE = 'ACTIVE',
  /** Engaged customer */
  ENGAGED = 'ENGAGED',
  /** At risk customer */
  AT_RISK = 'AT_RISK',
  /** Churned customer */
  CHURNED = 'CHURNED',
  /** Reactivated customer */
  REACTIVATED = 'REACTIVATED',
  /** VIP customer */
  VIP = 'VIP',
}

/**
 * Lifecycle stage thresholds
 */
export interface LifecycleStageThresholds {
  /** Days to consider customer active */
  activeDaysThreshold: number;
  /** Days to consider customer engaged */
  engagedDaysThreshold: number;
  /** Days to consider customer at risk */
  atRiskDaysThreshold: number;
  /** Days to consider customer churned */
  churnedDaysThreshold: number;
  /** Purchase count for VIP status */
  vipPurchaseCount: number;
  /** Total spend for VIP status */
  vipTotalSpend: number;
}

export const DEFAULT_LIFECYCLE_STAGE_THRESHOLDS: LifecycleStageThresholds = {
  activeDaysThreshold: 7,
  engagedDaysThreshold: 14,
  atRiskDaysThreshold: 30,
  churnedDaysThreshold: 60,
  vipPurchaseCount: 10,
  vipTotalSpend: 1000,
};

/**
 * Retention survey settings
 */
export interface RetentionSurveySettings {
  /** Enable retention surveys */
  enableSurveys: boolean;
  /** Survey frequency in days */
  surveyFrequencyDays: number;
  /** Survey trigger points */
  triggerPoints: ('AFTER_PURCHASE' | 'AFTER_SUPPORT' | 'PERIODIC' | 'AT_RISK')[];
  /** Survey questions */
  questions: {
    id: string;
    text: string;
    type: 'RATING' | 'TEXT' | 'MULTIPLE_CHOICE';
    required: boolean;
  }[];
  /** Minimum response rate target */
  minResponseRateTarget: number;
}

export const DEFAULT_RETENTION_SURVEY_SETTINGS: RetentionSurveySettings = {
  enableSurveys: true,
  surveyFrequencyDays: 30,
  triggerPoints: ['AFTER_PURCHASE', 'AT_RISK'],
  questions: [
    {
      id: 'satisfaction',
      text: 'How satisfied are you with our service?',
      type: 'RATING',
      required: true,
    },
    { id: 'feedback', text: 'What can we improve?', type: 'TEXT', required: false },
    {
      id: 'recommend',
      text: 'How likely are you to recommend us?',
      type: 'RATING',
      required: true,
    },
  ],
  minResponseRateTarget: 20,
};

/**
 * Customer feedback loop settings
 */
export interface CustomerFeedbackLoopSettings {
  /** Enable feedback loop */
  enableFeedbackLoop: boolean;
  /** Feedback collection channels */
  channels: ('EMAIL' | 'SMS' | 'IN_APP' | 'SOCIAL' | 'WEBSITE')[];
  /** Feedback analysis frequency in days */
  analysisFrequencyDays: number;
  /** Action trigger threshold */
  actionTriggerThreshold: number;
  /** Feedback response time in hours */
  responseTimeHours: number;
  /** Feedback escalation rules */
  escalationRules: {
    condition: string;
    action: string;
  }[];
}

export const DEFAULT_CUSTOMER_FEEDBACK_LOOP_SETTINGS: CustomerFeedbackLoopSettings = {
  enableFeedbackLoop: true,
  channels: ['EMAIL', 'IN_APP'],
  analysisFrequencyDays: 7,
  actionTriggerThreshold: 70,
  responseTimeHours: 24,
  escalationRules: [
    { condition: 'satisfaction_score < 3', action: 'escalate_to_manager' },
    { condition: 'complaint_received', action: 'prioritize_resolution' },
  ],
};

/**
 * Retention plan tracking settings
 */
export interface RetentionPlanTrackingSettings {
  /** Enable plan tracking */
  enablePlanTracking: boolean;
  /** Retention plan types */
  planTypes: ('LOYALTY' | 'SUBSCRIPTION' | 'MEMBERSHIP' | 'PARTNERSHIP')[];
  /** Plan review frequency in days */
  reviewFrequencyDays: number;
  /** Success metrics for plans */
  successMetrics: {
    metric: string;
    target: number;
    weight: number;
  }[];
  /** Plan optimization enabled */
  enableOptimization: boolean;
}

export const DEFAULT_RETENTION_PLAN_TRACKING_SETTINGS: RetentionPlanTrackingSettings = {
  enablePlanTracking: true,
  planTypes: ['LOYALTY', 'SUBSCRIPTION'],
  reviewFrequencyDays: 30,
  successMetrics: [
    { metric: 'retention_rate', target: 80, weight: 40 },
    { metric: 'customer_satisfaction', target: 4.0, weight: 30 },
    { metric: 'repeat_purchase_rate', target: 50, weight: 30 },
  ],
  enableOptimization: true,
};

/**
 * Churn prediction settings
 */
export interface ChurnPredictionSettings {
  /** Enable churn prediction */
  enablePrediction: boolean;
  /** Prediction model type */
  modelType: 'LOGISTIC_REGRESSION' | 'RANDOM_FOREST' | 'XGBOOST' | 'NEURAL_NETWORK';
  /** Training data period in days */
  trainingPeriodDays: number;
  /** Prediction frequency in days */
  predictionFrequencyDays: number;
  /** Feature set for prediction */
  features: ('ACTIVITY' | 'PURCHASE' | 'SUPPORT' | 'ENGAGEMENT' | 'DEMOGRAPHIC')[];
  /** Prediction confidence threshold */
  confidenceThreshold: number;
}

export const DEFAULT_CHURN_PREDICTION_SETTINGS: ChurnPredictionSettings = {
  enablePrediction: true,
  modelType: 'RANDOM_FOREST',
  trainingPeriodDays: 90,
  predictionFrequencyDays: 7,
  features: ['ACTIVITY', 'PURCHASE', 'ENGAGEMENT'],
  confidenceThreshold: 70,
};

/**
 * Retention analytics configuration
 */
export const RETENTION_ANALYTICS_CONFIG = {
  /** Maximum customers to process */
  MAX_CUSTOMERS: 100000,
  /** Retention analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Retention query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum customers in report */
  MAX_CUSTOMERS_IN_REPORT: 10000,
  /** Retention data export limit */
  EXPORT_LIMIT: 50000,
  /** Retention analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Retention functions
 */
export function getLifecycleStageLabel(stage: CustomerLifecycleStage): string {
  return stage;
}

export function getRetentionPeriodLabel(period: string): string {
  return period;
}
