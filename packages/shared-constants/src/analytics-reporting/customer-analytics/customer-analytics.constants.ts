/**
 * @fileoverview Customer analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Customer segmentation thresholds
 */
export interface CustomerSegmentationThresholds {
  /** High value customer threshold */
  highValueThreshold: number;
  /** Medium value customer threshold */
  mediumValueThreshold: number;
  /** Low value customer threshold */
  lowValueThreshold: number;
  /** VIP customer threshold */
  vipThreshold: number;
  /** Loyal customer threshold (days) */
  loyalCustomerDays: number;
  /** At risk customer threshold (days since last activity) */
  atRiskDays: number;
  /** Churned customer threshold (days since last activity) */
  churnedDays: number;
}

export const DEFAULT_CUSTOMER_SEGMENTATION_THRESHOLDS: CustomerSegmentationThresholds = {
  highValueThreshold: 1000,
  mediumValueThreshold: 100,
  lowValueThreshold: 50,
  vipThreshold: 5000,
  loyalCustomerDays: 180,
  atRiskDays: 30,
  churnedDays: 60,
};

/**
 * Customer lifetime value calculation settings
 */
export interface CLVCalculationSettings {
  /** Calculation method */
  calculationMethod: 'HISTORICAL' | 'PREDICTIVE' | 'HYBRID';
  /** Historical period in days */
  historicalPeriodDays: number;
  /** Prediction period in months */
  predictionPeriodMonths: number;
  /** Discount rate percentage */
  discountRate: number;
  /** Retention rate factor */
  retentionRateFactor: number;
  /** Average order value factor */
  averageOrderValueFactor: number;
  /** Purchase frequency factor */
  purchaseFrequencyFactor: number;
}

export const DEFAULT_CLV_CALCULATION_SETTINGS: CLVCalculationSettings = {
  calculationMethod: 'HYBRID',
  historicalPeriodDays: 365,
  predictionPeriodMonths: 12,
  discountRate: 10,
  retentionRateFactor: 0.8,
  averageOrderValueFactor: 1.0,
  purchaseFrequencyFactor: 1.0,
};

/**
 * Customer churn alert settings
 */
export interface CustomerChurnAlertSettings {
  /** Enable churn alerts */
  enableAlerts: boolean;
  /** Churn risk threshold percentage */
  churnRiskThreshold: number;
  /** High churn risk threshold percentage */
  highChurnRiskThreshold: number;
  /** Alert frequency in days */
  alertFrequencyDays: number;
  /** Notification channels */
  notificationChannels: ('EMAIL' | 'SMS' | 'PUSH' | 'IN_APP')[];
  /** Minimum customers for alert */
  minCustomersForAlert: number;
}

export const DEFAULT_CUSTOMER_CHURN_ALERT_SETTINGS: CustomerChurnAlertSettings = {
  enableAlerts: true,
  churnRiskThreshold: 30,
  highChurnRiskThreshold: 50,
  alertFrequencyDays: 7,
  notificationChannels: ['EMAIL', 'SMS'],
  minCustomersForAlert: 10,
};

/**
 * Customer satisfaction survey settings
 */
export interface CustomerSatisfactionSurveySettings {
  /** Enable surveys */
  enableSurveys: boolean;
  /** Survey frequency in days */
  surveyFrequencyDays: number;
  /** Survey trigger type */
  triggerType: 'AFTER_PURCHASE' | 'AFTER_SUPPORT' | 'PERIODIC' | 'RANDOM';
  /** Maximum surveys per customer per year */
  maxSurveysPerYear: number;
  /** Minimum response rate target percentage */
  minResponseRateTarget: number;
  /** Satisfaction score thresholds */
  scoreThresholds: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
}

export const DEFAULT_CUSTOMER_SATISFACTION_SURVEY_SETTINGS: CustomerSatisfactionSurveySettings = {
  enableSurveys: true,
  surveyFrequencyDays: 30,
  triggerType: 'AFTER_PURCHASE',
  maxSurveysPerYear: 4,
  minResponseRateTarget: 20,
  scoreThresholds: {
    excellent: 4.5,
    good: 4.0,
    average: 3.0,
    poor: 2.0,
  },
};

/**
 * Customer loyalty program settings
 */
export interface CustomerLoyaltyProgramSettings {
  /** Enable loyalty program */
  enableLoyaltyProgram: boolean;
  /** Points per dollar */
  pointsPerDollar: number;
  /** Points expiration in days */
  pointsExpirationDays: number;
  /** Minimum points for redemption */
  minPointsForRedemption: number;
  /** Loyalty tiers */
  loyaltyTiers: {
    name: string;
    minPoints: number;
    benefits: string[];
  }[];
  /** Referral bonus points */
  referralBonusPoints: number;
}

export const DEFAULT_CUSTOMER_LOYALTY_PROGRAM_SETTINGS: CustomerLoyaltyProgramSettings = {
  enableLoyaltyProgram: true,
  pointsPerDollar: 10,
  pointsExpirationDays: 365,
  minPointsForRedemption: 500,
  loyaltyTiers: [
    { name: 'Silver', minPoints: 0, benefits: ['Basic rewards'] },
    { name: 'Gold', minPoints: 1000, benefits: ['Priority support', 'Extra points'] },
    {
      name: 'Platinum',
      minPoints: 5000,
      benefits: ['VIP support', 'Free shipping', 'Exclusive offers'],
    },
  ],
  referralBonusPoints: 200,
};

/**
 * Customer campaign targeting settings
 */
export interface CustomerCampaignTargetingSettings {
  /** Enable campaign targeting */
  enableTargeting: boolean;
  /** Targeting methods */
  targetingMethods: ('SEGMENT' | 'BEHAVIOR' | 'DEMOGRAPHIC' | 'GEOGRAPHIC' | 'PURCHASE_HISTORY')[];
  /** Minimum segment size for targeting */
  minSegmentSize: number;
  /** Maximum campaign frequency per customer per month */
  maxCampaignFrequency: number;
  /** Personalization enabled */
  enablePersonalization: boolean;
  /** A/B testing enabled */
  enableABTesting: boolean;
}

export const DEFAULT_CUSTOMER_CAMPAIGN_TARGETING_SETTINGS: CustomerCampaignTargetingSettings = {
  enableTargeting: true,
  targetingMethods: ['SEGMENT', 'BEHAVIOR', 'PURCHASE_HISTORY'],
  minSegmentSize: 50,
  maxCampaignFrequency: 2,
  enablePersonalization: true,
  enableABTesting: true,
};

/**
 * Customer data privacy settings
 */
export interface CustomerDataPrivacySettings {
  /** GDPR compliance */
  gdprCompliant: boolean;
  /** CCPA compliance */
  ccpaCompliant: boolean;
  /** Data retention period in days */
  dataRetentionDays: number;
  /** Anonymization period in days */
  anonymizationPeriodDays: number;
  /** Consent tracking enabled */
  consentTrackingEnabled: boolean;
  /** Data sharing allowed */
  dataSharingAllowed: boolean;
  /** Third-party data sharing allowed */
  thirdPartySharingAllowed: boolean;
}

export const DEFAULT_CUSTOMER_DATA_PRIVACY_SETTINGS: CustomerDataPrivacySettings = {
  gdprCompliant: true,
  ccpaCompliant: true,
  dataRetentionDays: 730,
  anonymizationPeriodDays: 180,
  consentTrackingEnabled: true,
  dataSharingAllowed: false,
  thirdPartySharingAllowed: false,
};

/**
 * Customer preference tracking settings
 */
export interface CustomerPreferenceTrackingSettings {
  /** Enable preference tracking */
  enableTracking: boolean;
  /** Track communication preferences */
  trackCommunicationPreferences: boolean;
  /** Track product preferences */
  trackProductPreferences: boolean;
  /** Track channel preferences */
  trackChannelPreferences: boolean;
  /** Track frequency preferences */
  trackFrequencyPreferences: boolean;
  /** Preference update alert threshold in days */
  updateAlertThresholdDays: number;
}

export const DEFAULT_CUSTOMER_PREFERENCE_TRACKING_SETTINGS: CustomerPreferenceTrackingSettings = {
  enableTracking: true,
  trackCommunicationPreferences: true,
  trackProductPreferences: true,
  trackChannelPreferences: true,
  trackFrequencyPreferences: true,
  updateAlertThresholdDays: 90,
};

/**
 * Customer support tier settings
 */
export interface CustomerSupportTierSettings {
  /** Support tiers */
  supportTiers: {
    name: string;
    level: number;
    responseTimeHours: number;
    resolutionTimeHours: number;
    supportChannels: string[];
  }[];
  /** Default support tier */
  defaultTierLevel: number;
  /** Tier upgrade threshold */
  upgradeThreshold: number;
  /** Tier downgrade threshold */
  downgradeThreshold: number;
}

export const DEFAULT_CUSTOMER_SUPPORT_TIER_SETTINGS: CustomerSupportTierSettings = {
  supportTiers: [
    {
      name: 'Basic',
      level: 1,
      responseTimeHours: 24,
      resolutionTimeHours: 72,
      supportChannels: ['Email'],
    },
    {
      name: 'Standard',
      level: 2,
      responseTimeHours: 12,
      resolutionTimeHours: 48,
      supportChannels: ['Email', 'Chat'],
    },
    {
      name: 'Premium',
      level: 3,
      responseTimeHours: 4,
      resolutionTimeHours: 24,
      supportChannels: ['Email', 'Chat', 'Phone'],
    },
    {
      name: 'Enterprise',
      level: 4,
      responseTimeHours: 1,
      resolutionTimeHours: 12,
      supportChannels: ['Email', 'Chat', 'Phone', 'Dedicated'],
    },
  ],
  defaultTierLevel: 1,
  upgradeThreshold: 5000,
  downgradeThreshold: 1000,
};

/**
 * Customer onboarding milestones
 */
export interface CustomerOnboardingMilestones {
  /** Milestone steps */
  milestones: {
    id: string;
    name: string;
    description: string;
    order: number;
    expectedCompletionDays: number;
  }[];
  /** Completion threshold percentage */
  completionThreshold: number;
  /** Enable progress tracking */
  enableProgressTracking: boolean;
}

export const DEFAULT_CUSTOMER_ONBOARDING_MILESTONES: CustomerOnboardingMilestones = {
  milestones: [
    {
      id: 'PROFILE',
      name: 'Complete Profile',
      description: 'Complete user profile setup',
      order: 1,
      expectedCompletionDays: 1,
    },
    {
      id: 'FIRST_PURCHASE',
      name: 'First Purchase',
      description: 'Make first purchase',
      order: 2,
      expectedCompletionDays: 3,
    },
    {
      id: 'EXPLORE',
      name: 'Explore Platform',
      description: 'Explore key platform features',
      order: 3,
      expectedCompletionDays: 7,
    },
    {
      id: 'SET_PREFERENCES',
      name: 'Set Preferences',
      description: 'Set communication and product preferences',
      order: 4,
      expectedCompletionDays: 7,
    },
    {
      id: 'ENGAGE',
      name: 'Engage with Content',
      description: 'Engage with marketing and educational content',
      order: 5,
      expectedCompletionDays: 14,
    },
    {
      id: 'REFERRAL',
      name: 'Referral',
      description: 'Refer a friend to the platform',
      order: 6,
      expectedCompletionDays: 30,
    },
    {
      id: 'LOYALTY',
      name: 'Loyalty',
      description: 'Achieve loyalty status',
      order: 7,
      expectedCompletionDays: 60,
    },
  ],
  completionThreshold: 60,
  enableProgressTracking: true,
};

/**
 * Customer analytics configuration
 */
export const CUSTOMER_ANALYTICS_CONFIG = {
  /** Maximum customers to process */
  MAX_CUSTOMERS: 100000,
  /** Customer analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Customer query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 30,
  /** Maximum customers in report */
  MAX_CUSTOMERS_IN_REPORT: 10000,
  /** Customer data export limit */
  EXPORT_LIMIT: 50000,
  /** Customer analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Customer status
 */
export enum CustomerStatus {
  /** Active customer */
  ACTIVE = 'ACTIVE',
  /** Inactive customer */
  INACTIVE = 'INACTIVE',
  /** Suspended customer */
  SUSPENDED = 'SUSPENDED',
  /** Churned customer */
  CHURNED = 'CHURNED',
  /** VIP customer */
  VIP = 'VIP',
}

/**
 * Customer functions
 */
export function getCustomerStatusLabel(status: CustomerStatus): string {
  return status;
}
