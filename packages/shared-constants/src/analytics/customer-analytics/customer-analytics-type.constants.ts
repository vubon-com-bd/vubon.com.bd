/**
 * Customer Analytics Type Constants
 * Types of customer analytics data and analysis
 */

export const CUSTOMER_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Behavioral Analysis
    BEHAVIORAL_ANALYSIS: 'behavioral_analysis',
    ENGAGEMENT_ANALYSIS: 'engagement_analysis',
    LOYALTY_ANALYSIS: 'loyalty_analysis',

    // Demographic Analysis
    DEMOGRAPHIC_ANALYSIS: 'demographic_analysis',
    GEOGRAPHIC_ANALYSIS: 'geographic_analysis',
    PSYCHOGRAPHIC_ANALYSIS: 'psychographic_analysis',

    // Value Analysis
    VALUE_ANALYSIS: 'value_analysis',
    LIFETIME_VALUE_ANALYSIS: 'lifetime_value_analysis',
    ACQUISITION_ANALYSIS: 'acquisition_analysis',

    // Retention Analysis
    RETENTION_ANALYSIS: 'retention_analysis',
    CHURN_ANALYSIS: 'churn_analysis',
    REACTIVATION_ANALYSIS: 'reactivation_analysis',

    // Segment Analysis
    SEGMENT_ANALYSIS: 'segment_analysis',
    COHORT_ANALYSIS: 'cohort_analysis',
    PERSONA_ANALYSIS: 'persona_analysis',

    // Satisfaction Analysis
    SATISFACTION_ANALYSIS: 'satisfaction_analysis',
    NPS_ANALYSIS: 'nps_analysis',
    CSAT_ANALYSIS: 'csat_analysis',

    // Comparative Analysis
    COMPARATIVE: 'comparative',
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',

    // Predictive Analysis
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
    PROPENSITY: 'propensity',
  } as const,

  // Data Types
  DATA_TYPES: {
    CUSTOMER_DATA: 'customer_data',
    DEMOGRAPHIC_DATA: 'demographic_data',
    BEHAVIORAL_DATA: 'behavioral_data',
    TRANSACTION_DATA: 'transaction_data',
    ENGAGEMENT_DATA: 'engagement_data',
    SATISFACTION_DATA: 'satisfaction_data',
    SEGMENT_DATA: 'segment_data',
    COHORT_DATA: 'cohort_data',
    TIME_SERIES: 'time_series',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,

  // Customer Status
  CUSTOMER_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    CHURNED: 'churned',
    ARCHIVED: 'archived',
    ON_HOLD: 'on_hold',
  } as const,

  // Customer Types
  CUSTOMER_TYPES: {
    INDIVIDUAL: 'individual',
    BUSINESS: 'business',
    ENTERPRISE: 'enterprise',
    PREMIUM: 'premium',
    STANDARD: 'standard',
    BASIC: 'basic',
  } as const,

  // Customer Tiers
  CUSTOMER_TIERS: {
    TIER_1: 'tier_1',
    TIER_2: 'tier_2',
    TIER_3: 'tier_3',
    TIER_4: 'tier_4',
    PLATINUM: 'platinum',
    GOLD: 'gold',
    SILVER: 'silver',
    BRONZE: 'bronze',
  } as const,

  // Customer Personas
  CUSTOMER_PERSONAS: {
    PRICE_SENSITIVE: 'price_sensitive',
    QUALITY_SEEKING: 'quality_seeking',
    CONVENIENCE_SEEKING: 'convenience_seeking',
    SOCIAL_BUYER: 'social_buyer',
    RESEARCHER: 'researcher',
    IMPULSE_BUYER: 'impulse_buyer',
    LOYAL_BUYER: 'loyal_buyer',
  } as const,

  // Engagement Levels
  ENGAGEMENT_LEVELS: {
    VERY_HIGH: 'very_high',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    VERY_LOW: 'very_low',
    NONE: 'none',
  } as const,

  // Loyalty Levels
  LOYALTY_LEVELS: {
    VERY_LOYAL: 'very_loyal',
    LOYAL: 'loyal',
    NEUTRAL: 'neutral',
    AT_RISK: 'at_risk',
    CHURNING: 'churning',
    CHURNED: 'churned',
  } as const,

  // Satisfaction Levels
  SATISFACTION_LEVELS: {
    VERY_SATISFIED: 'very_satisfied',
    SATISFIED: 'satisfied',
    NEUTRAL: 'neutral',
    UNSATISFIED: 'unsatisfied',
    VERY_UNSATISFIED: 'very_unsatisfied',
  } as const,

  // NPS Categories
  NPS_CATEGORIES: {
    PROMOTER: 'promoter',
    PASSIVE: 'passive',
    DETRACTOR: 'detractor',
  } as const,

  // Customer Lifecycle Stages
  LIFECYCLE_STAGES: {
    AWARENESS: 'awareness',
    ACQUISITION: 'acquisition',
    ACTIVATION: 'activation',
    RETENTION: 'retention',
    LOYALTY: 'loyalty',
    ADVOCACY: 'advocacy',
    CHURN: 'churn',
  } as const,
} as const;

// Customer Analytics Analysis Types
export type CustomerAnalyticsAnalysisType =
  (typeof CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Customer Analytics Data Types
export type CustomerAnalyticsDataType =
  (typeof CUSTOMER_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof CUSTOMER_ANALYTICS_TYPE.DATA_TYPES];

// Customer Analytics Customer Status
export type CustomerAnalyticsCustomerStatus =
  (typeof CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS)[keyof typeof CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS];

// Customer Analytics Customer Types
export type CustomerAnalyticsCustomerType =
  (typeof CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TYPES)[keyof typeof CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TYPES];

// Customer Analytics Customer Tiers
export type CustomerAnalyticsCustomerTier =
  (typeof CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS)[keyof typeof CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS];

// Customer Analytics Customer Personas
export type CustomerAnalyticsCustomerPersona =
  (typeof CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS)[keyof typeof CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS];

// Customer Analytics Engagement Levels
export type CustomerAnalyticsEngagementLevel =
  (typeof CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS)[keyof typeof CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS];

// Customer Analytics Loyalty Levels
export type CustomerAnalyticsLoyaltyLevel =
  (typeof CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS)[keyof typeof CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS];

// Customer Analytics Satisfaction Levels
export type CustomerAnalyticsSatisfactionLevel =
  (typeof CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS)[keyof typeof CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS];

// Customer Analytics NPS Categories
export type CustomerAnalyticsNPSCategory =
  (typeof CUSTOMER_ANALYTICS_TYPE.NPS_CATEGORIES)[keyof typeof CUSTOMER_ANALYTICS_TYPE.NPS_CATEGORIES];

// Customer Analytics Lifecycle Stages
export type CustomerAnalyticsLifecycleStage =
  (typeof CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES)[keyof typeof CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES];

// Customer Analytics Analysis Type Labels
export function getCustomerAnalyticsAnalysisTypeLabel(type: CustomerAnalyticsAnalysisType): string {
  const labels: Record<CustomerAnalyticsAnalysisType, string> = {
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.BEHAVIORAL_ANALYSIS]: 'Behavioral Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.ENGAGEMENT_ANALYSIS]: 'Engagement Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.LOYALTY_ANALYSIS]: 'Loyalty Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.DEMOGRAPHIC_ANALYSIS]: 'Demographic Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.GEOGRAPHIC_ANALYSIS]: 'Geographic Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.PSYCHOGRAPHIC_ANALYSIS]: 'Psychographic Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.VALUE_ANALYSIS]: 'Value Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.LIFETIME_VALUE_ANALYSIS]: 'Lifetime Value Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.ACQUISITION_ANALYSIS]: 'Acquisition Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.RETENTION_ANALYSIS]: 'Retention Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.CHURN_ANALYSIS]: 'Churn Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.REACTIVATION_ANALYSIS]: 'Reactivation Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.SEGMENT_ANALYSIS]: 'Segment Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.COHORT_ANALYSIS]: 'Cohort Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.PERSONA_ANALYSIS]: 'Persona Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.SATISFACTION_ANALYSIS]: 'Satisfaction Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.NPS_ANALYSIS]: 'NPS Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.CSAT_ANALYSIS]: 'CSAT Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE]: 'Comparative Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR]: 'Year Over Year',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER]: 'Quarter Over Quarter',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH]: 'Month Over Month',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
    [CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.PROPENSITY]: 'Propensity Analysis',
  };
  return labels[type] || 'Unknown';
}

// Customer Analytics Data Type Labels
export function getCustomerAnalyticsDataTypeLabel(type: CustomerAnalyticsDataType): string {
  const labels: Record<CustomerAnalyticsDataType, string> = {
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.CUSTOMER_DATA]: 'Customer Data',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.DEMOGRAPHIC_DATA]: 'Demographic Data',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.BEHAVIORAL_DATA]: 'Behavioral Data',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.TRANSACTION_DATA]: 'Transaction Data',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.ENGAGEMENT_DATA]: 'Engagement Data',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.SATISFACTION_DATA]: 'Satisfaction Data',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.SEGMENT_DATA]: 'Segment Data',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.COHORT_DATA]: 'Cohort Data',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.AGGREGATED]: 'Aggregated',
    [CUSTOMER_ANALYTICS_TYPE.DATA_TYPES.RAW]: 'Raw',
  };
  return labels[type] || 'Unknown';
}

// Customer Analytics Customer Status Labels
export function getCustomerAnalyticsCustomerStatusLabel(
  status: CustomerAnalyticsCustomerStatus
): string {
  const labels: Record<CustomerAnalyticsCustomerStatus, string> = {
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS.ACTIVE]: 'Active',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS.INACTIVE]: 'Inactive',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS.PENDING]: 'Pending',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS.SUSPENDED]: 'Suspended',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS.CHURNED]: 'Churned',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS.ARCHIVED]: 'Archived',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_STATUS.ON_HOLD]: 'On Hold',
  };
  return labels[status] || 'Unknown';
}

// Customer Analytics Customer Type Labels
export function getCustomerAnalyticsCustomerTypeLabel(type: CustomerAnalyticsCustomerType): string {
  const labels: Record<CustomerAnalyticsCustomerType, string> = {
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TYPES.INDIVIDUAL]: 'Individual',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TYPES.BUSINESS]: 'Business',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TYPES.ENTERPRISE]: 'Enterprise',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TYPES.PREMIUM]: 'Premium',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TYPES.STANDARD]: 'Standard',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TYPES.BASIC]: 'Basic',
  };
  return labels[type] || 'Unknown';
}

// Customer Analytics Customer Tier Labels
export function getCustomerAnalyticsCustomerTierLabel(tier: CustomerAnalyticsCustomerTier): string {
  const labels: Record<CustomerAnalyticsCustomerTier, string> = {
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS.TIER_1]: 'Tier 1',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS.TIER_2]: 'Tier 2',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS.TIER_3]: 'Tier 3',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS.TIER_4]: 'Tier 4',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS.PLATINUM]: 'Platinum',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS.GOLD]: 'Gold',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS.SILVER]: 'Silver',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_TIERS.BRONZE]: 'Bronze',
  };
  return labels[tier] || 'Unknown';
}

// Customer Analytics Customer Persona Labels
export function getCustomerAnalyticsCustomerPersonaLabel(
  persona: CustomerAnalyticsCustomerPersona
): string {
  const labels: Record<CustomerAnalyticsCustomerPersona, string> = {
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS.PRICE_SENSITIVE]: 'Price Sensitive',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS.QUALITY_SEEKING]: 'Quality Seeking',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS.CONVENIENCE_SEEKING]: 'Convenience Seeking',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS.SOCIAL_BUYER]: 'Social Buyer',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS.RESEARCHER]: 'Researcher',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS.IMPULSE_BUYER]: 'Impulse Buyer',
    [CUSTOMER_ANALYTICS_TYPE.CUSTOMER_PERSONAS.LOYAL_BUYER]: 'Loyal Buyer',
  };
  return labels[persona] || 'Unknown';
}

// Customer Analytics Engagement Level Labels
export function getCustomerAnalyticsEngagementLevelLabel(
  level: CustomerAnalyticsEngagementLevel
): string {
  const labels: Record<CustomerAnalyticsEngagementLevel, string> = {
    [CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH]: 'Very High',
    [CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH]: 'High',
    [CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM]: 'Medium',
    [CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW]: 'Low',
    [CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW]: 'Very Low',
    [CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.NONE]: 'None',
  };
  return labels[level] || 'Unknown';
}

// Customer Analytics Loyalty Level Labels
export function getCustomerAnalyticsLoyaltyLevelLabel(
  level: CustomerAnalyticsLoyaltyLevel
): string {
  const labels: Record<CustomerAnalyticsLoyaltyLevel, string> = {
    [CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.VERY_LOYAL]: 'Very Loyal',
    [CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.LOYAL]: 'Loyal',
    [CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.NEUTRAL]: 'Neutral',
    [CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.AT_RISK]: 'At Risk',
    [CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.CHURNING]: 'Churning',
    [CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.CHURNED]: 'Churned',
  };
  return labels[level] || 'Unknown';
}

// Customer Analytics Satisfaction Level Labels
export function getCustomerAnalyticsSatisfactionLevelLabel(
  level: CustomerAnalyticsSatisfactionLevel
): string {
  const labels: Record<CustomerAnalyticsSatisfactionLevel, string> = {
    [CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_SATISFIED]: 'Very Satisfied',
    [CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.SATISFIED]: 'Satisfied',
    [CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.NEUTRAL]: 'Neutral',
    [CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.UNSATISFIED]: 'Unsatisfied',
    [CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_UNSATISFIED]: 'Very Unsatisfied',
  };
  return labels[level] || 'Unknown';
}

// Customer Analytics NPS Category Labels
export function getCustomerAnalyticsNPSCategoryLabel(
  category: CustomerAnalyticsNPSCategory
): string {
  const labels: Record<CustomerAnalyticsNPSCategory, string> = {
    [CUSTOMER_ANALYTICS_TYPE.NPS_CATEGORIES.PROMOTER]: 'Promoter',
    [CUSTOMER_ANALYTICS_TYPE.NPS_CATEGORIES.PASSIVE]: 'Passive',
    [CUSTOMER_ANALYTICS_TYPE.NPS_CATEGORIES.DETRACTOR]: 'Detractor',
  };
  return labels[category] || 'Unknown';
}

// Customer Analytics Lifecycle Stage Labels
export function getCustomerAnalyticsLifecycleStageLabel(
  stage: CustomerAnalyticsLifecycleStage
): string {
  const labels: Record<CustomerAnalyticsLifecycleStage, string> = {
    [CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES.AWARENESS]: 'Awareness',
    [CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ACQUISITION]: 'Acquisition',
    [CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ACTIVATION]: 'Activation',
    [CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES.RETENTION]: 'Retention',
    [CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES.LOYALTY]: 'Loyalty',
    [CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ADVOCACY]: 'Advocacy',
    [CUSTOMER_ANALYTICS_TYPE.LIFECYCLE_STAGES.CHURN]: 'Churn',
  };
  return labels[stage] || 'Unknown';
}

// Check if analysis is behavioral analysis
export function isCustomerAnalyticsBehavioralAnalysis(
  type: CustomerAnalyticsAnalysisType
): boolean {
  const behavioralTypes: CustomerAnalyticsAnalysisType[] = [
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.BEHAVIORAL_ANALYSIS,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.ENGAGEMENT_ANALYSIS,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.LOYALTY_ANALYSIS,
  ];
  return behavioralTypes.includes(type);
}

// Check if analysis is value analysis
export function isCustomerAnalyticsValueAnalysis(type: CustomerAnalyticsAnalysisType): boolean {
  const valueTypes: CustomerAnalyticsAnalysisType[] = [
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.VALUE_ANALYSIS,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.LIFETIME_VALUE_ANALYSIS,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.ACQUISITION_ANALYSIS,
  ];
  return valueTypes.includes(type);
}

// Check if analysis is retention analysis
export function isCustomerAnalyticsRetentionAnalysis(type: CustomerAnalyticsAnalysisType): boolean {
  const retentionTypes: CustomerAnalyticsAnalysisType[] = [
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.RETENTION_ANALYSIS,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.CHURN_ANALYSIS,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.REACTIVATION_ANALYSIS,
  ];
  return retentionTypes.includes(type);
}

// Check if analysis is comparative
export function isCustomerAnalyticsComparative(type: CustomerAnalyticsAnalysisType): boolean {
  const comparativeTypes: CustomerAnalyticsAnalysisType[] = [
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.COMPARATIVE,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.YEAR_OVER_YEAR,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.QUARTER_OVER_QUARTER,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.MONTH_OVER_MONTH,
  ];
  return comparativeTypes.includes(type);
}

// Check if analysis is predictive
export function isCustomerAnalyticsPredictive(type: CustomerAnalyticsAnalysisType): boolean {
  const predictiveTypes: CustomerAnalyticsAnalysisType[] = [
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
    CUSTOMER_ANALYTICS_TYPE.ANALYSIS_TYPES.PROPENSITY,
  ];
  return predictiveTypes.includes(type);
}

// Get engagement level from score
export function getCustomerAnalyticsEngagementLevel(
  score: number
): CustomerAnalyticsEngagementLevel {
  if (score > 0.8) return CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH;
  if (score > 0.6) return CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH;
  if (score > 0.4) return CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM;
  if (score > 0.2) return CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW;
  if (score > 0.01) return CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW;
  return CUSTOMER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.NONE;
}

// Get loyalty level from score
export function getCustomerAnalyticsLoyaltyLevel(score: number): CustomerAnalyticsLoyaltyLevel {
  if (score >= 80) return CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.VERY_LOYAL;
  if (score >= 60) return CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.LOYAL;
  if (score >= 40) return CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.NEUTRAL;
  if (score >= 20) return CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.AT_RISK;
  if (score >= 5) return CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.CHURNING;
  return CUSTOMER_ANALYTICS_TYPE.LOYALTY_LEVELS.CHURNED;
}

// Get satisfaction level from score
export function getCustomerAnalyticsSatisfactionLevel(
  score: number
): CustomerAnalyticsSatisfactionLevel {
  if (score >= 4.5) return CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_SATISFIED;
  if (score >= 3.5) return CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.SATISFIED;
  if (score >= 2.5) return CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.NEUTRAL;
  if (score >= 1.5) return CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.UNSATISFIED;
  return CUSTOMER_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_UNSATISFIED;
}

// Get NPS category from score
export function getCustomerAnalyticsNPSCategory(score: number): CustomerAnalyticsNPSCategory {
  if (score >= 9) return CUSTOMER_ANALYTICS_TYPE.NPS_CATEGORIES.PROMOTER;
  if (score >= 7) return CUSTOMER_ANALYTICS_TYPE.NPS_CATEGORIES.PASSIVE;
  return CUSTOMER_ANALYTICS_TYPE.NPS_CATEGORIES.DETRACTOR;
}
