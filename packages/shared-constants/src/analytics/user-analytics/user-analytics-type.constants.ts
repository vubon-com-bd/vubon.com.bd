/**
 * User Analytics Type Constants
 * Types of user analytics data and analysis
 */

export const USER_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    // Descriptive Analytics
    DESCRIPTIVE: 'descriptive',
    SUMMARY: 'summary',
    OVERVIEW: 'overview',
    PROFILE: 'profile',

    // Diagnostic Analytics
    DIAGNOSTIC: 'diagnostic',
    ROOT_CAUSE: 'root_cause',
    PATTERN: 'pattern',
    ANOMALY: 'anomaly',

    // Predictive Analytics
    PREDICTIVE: 'predictive',
    FORECAST: 'forecast',
    TREND: 'trend',
    PROPENSITY: 'propensity',

    // Prescriptive Analytics
    PRESCRIPTIVE: 'prescriptive',
    RECOMMENDATION: 'recommendation',
    OPTIMIZATION: 'optimization',

    // Behavioral Analytics
    BEHAVIORAL: 'behavioral',
    PSYCHOGRAPHIC: 'psychographic',
    ATTITUDINAL: 'attitudinal',
    INTENTIONAL: 'intentional',

    // Social Analytics
    SOCIAL: 'social',
    NETWORK: 'network',
    COMMUNITY: 'community',
    INFLUENCE: 'influence',
  } as const,

  // Data Types
  DATA_TYPES: {
    DEMOGRAPHIC: 'demographic',
    GEOGRAPHIC: 'geographic',
    PSYCHOGRAPHIC: 'psychographic',
    BEHAVIORAL: 'behavioral',
    TRANSACTIONAL: 'transactional',
    INTERACTIONAL: 'interactional',
    SOCIAL: 'social',
    ATTITUDINAL: 'attitudinal',
  } as const,

  // User Types
  USER_TYPES: {
    // Registration Types
    ANONYMOUS: 'anonymous',
    REGISTERED: 'registered',
    VERIFIED: 'verified',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',

    // Activity Types
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DORMANT: 'dormant',
    CHURNED: 'churned',

    // Role Types
    CUSTOMER: 'customer',
    VENDOR: 'vendor',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    SUPPORT: 'support',

    // Loyalty Types
    NEW: 'new',
    REGULAR: 'regular',
    LOYAL: 'loyal',
    VIP: 'vip',
    ADVOCATE: 'advocate',
  } as const,

  // Engagement Levels
  ENGAGEMENT_LEVELS: {
    VERY_LOW: 'very_low',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // User Lifecycle Stages
  LIFECYCLE_STAGES: {
    // Acquisition Stage
    AWARENESS: 'awareness',
    INTEREST: 'interest',
    CONSIDERATION: 'consideration',

    // Activation Stage
    SIGNUP: 'signup',
    VERIFICATION: 'verification',
    ONBOARDING: 'onboarding',
    FIRST_ACTION: 'first_action',

    // Retention Stage
    ENGAGEMENT: 'engagement',
    USAGE: 'usage',
    REPEAT: 'repeat',
    LOYALTY: 'loyalty',

    // Growth Stage
    ADVOCACY: 'advocacy',
    REFERRAL: 'referral',
    UPSELL: 'upsell',
    CROSS_SELL: 'cross_sell',

    // Decline Stage
    DISENGAGEMENT: 'disengagement',
    CHURN: 'churn',
    REACTIVATION: 'reactivation',
  } as const,

  // User Satisfaction Levels
  SATISFACTION_LEVELS: {
    VERY_UNSATISFIED: 'very_unsatisfied',
    UNSATISFIED: 'unsatisfied',
    NEUTRAL: 'neutral',
    SATISFIED: 'satisfied',
    VERY_SATISFIED: 'very_satisfied',
  } as const,

  // User Trust Levels
  TRUST_LEVELS: {
    UNKNOWN: 'unknown',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  } as const,

  // User Privacy Levels
  PRIVACY_LEVELS: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    SHARED: 'shared',
    RESTRICTED: 'restricted',
  } as const,
} as const;

// User Analytics Analysis Types
export type UserAnalyticsAnalysisType =
  (typeof USER_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof USER_ANALYTICS_TYPE.ANALYSIS_TYPES];

// User Analytics Data Types
export type UserAnalyticsDataType =
  (typeof USER_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof USER_ANALYTICS_TYPE.DATA_TYPES];

// User Analytics User Types
export type UserAnalyticsUserType =
  (typeof USER_ANALYTICS_TYPE.USER_TYPES)[keyof typeof USER_ANALYTICS_TYPE.USER_TYPES];

// User Analytics Engagement Levels
export type UserAnalyticsEngagementLevel =
  (typeof USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS)[keyof typeof USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS];

// User Analytics Lifecycle Stages
export type UserAnalyticsLifecycleStage =
  (typeof USER_ANALYTICS_TYPE.LIFECYCLE_STAGES)[keyof typeof USER_ANALYTICS_TYPE.LIFECYCLE_STAGES];

// User Analytics Satisfaction Levels
export type UserAnalyticsSatisfactionLevel =
  (typeof USER_ANALYTICS_TYPE.SATISFACTION_LEVELS)[keyof typeof USER_ANALYTICS_TYPE.SATISFACTION_LEVELS];

// User Analytics Trust Levels
export type UserAnalyticsTrustLevel =
  (typeof USER_ANALYTICS_TYPE.TRUST_LEVELS)[keyof typeof USER_ANALYTICS_TYPE.TRUST_LEVELS];

// User Analytics Privacy Levels
export type UserAnalyticsPrivacyLevel =
  (typeof USER_ANALYTICS_TYPE.PRIVACY_LEVELS)[keyof typeof USER_ANALYTICS_TYPE.PRIVACY_LEVELS];

// User Analytics Analysis Type Labels
export function getUserAnalyticsAnalysisTypeLabel(type: UserAnalyticsAnalysisType): string {
  const labels: Record<UserAnalyticsAnalysisType, string> = {
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.DESCRIPTIVE]: 'Descriptive',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.SUMMARY]: 'Summary',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.OVERVIEW]: 'Overview',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFILE]: 'Profile',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.DIAGNOSTIC]: 'Diagnostic',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.ROOT_CAUSE]: 'Root Cause',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PATTERN]: 'Pattern',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.ANOMALY]: 'Anomaly',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE]: 'Predictive',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecast',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PROPENSITY]: 'Propensity',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PRESCRIPTIVE]: 'Prescriptive',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.RECOMMENDATION]: 'Recommendation',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.OPTIMIZATION]: 'Optimization',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.BEHAVIORAL]: 'Behavioral',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PSYCHOGRAPHIC]: 'Psychographic',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.ATTITUDINAL]: 'Attitudinal',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.INTENTIONAL]: 'Intentional',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.SOCIAL]: 'Social',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.NETWORK]: 'Network',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.COMMUNITY]: 'Community',
    [USER_ANALYTICS_TYPE.ANALYSIS_TYPES.INFLUENCE]: 'Influence',
  };
  return labels[type] || 'Unknown';
}

// User Analytics Data Type Labels
export function getUserAnalyticsDataTypeLabel(type: UserAnalyticsDataType): string {
  const labels: Record<UserAnalyticsDataType, string> = {
    [USER_ANALYTICS_TYPE.DATA_TYPES.DEMOGRAPHIC]: 'Demographic',
    [USER_ANALYTICS_TYPE.DATA_TYPES.GEOGRAPHIC]: 'Geographic',
    [USER_ANALYTICS_TYPE.DATA_TYPES.PSYCHOGRAPHIC]: 'Psychographic',
    [USER_ANALYTICS_TYPE.DATA_TYPES.BEHAVIORAL]: 'Behavioral',
    [USER_ANALYTICS_TYPE.DATA_TYPES.TRANSACTIONAL]: 'Transactional',
    [USER_ANALYTICS_TYPE.DATA_TYPES.INTERACTIONAL]: 'Interactional',
    [USER_ANALYTICS_TYPE.DATA_TYPES.SOCIAL]: 'Social',
    [USER_ANALYTICS_TYPE.DATA_TYPES.ATTITUDINAL]: 'Attitudinal',
  };
  return labels[type] || 'Unknown';
}

// User Analytics User Type Labels
export function getUserAnalyticsUserTypeLabel(type: UserAnalyticsUserType): string {
  const labels: Record<UserAnalyticsUserType, string> = {
    [USER_ANALYTICS_TYPE.USER_TYPES.ANONYMOUS]: 'Anonymous',
    [USER_ANALYTICS_TYPE.USER_TYPES.REGISTERED]: 'Registered',
    [USER_ANALYTICS_TYPE.USER_TYPES.VERIFIED]: 'Verified',
    [USER_ANALYTICS_TYPE.USER_TYPES.PREMIUM]: 'Premium',
    [USER_ANALYTICS_TYPE.USER_TYPES.ENTERPRISE]: 'Enterprise',
    [USER_ANALYTICS_TYPE.USER_TYPES.ACTIVE]: 'Active',
    [USER_ANALYTICS_TYPE.USER_TYPES.INACTIVE]: 'Inactive',
    [USER_ANALYTICS_TYPE.USER_TYPES.DORMANT]: 'Dormant',
    [USER_ANALYTICS_TYPE.USER_TYPES.CHURNED]: 'Churned',
    [USER_ANALYTICS_TYPE.USER_TYPES.CUSTOMER]: 'Customer',
    [USER_ANALYTICS_TYPE.USER_TYPES.VENDOR]: 'Vendor',
    [USER_ANALYTICS_TYPE.USER_TYPES.ADMIN]: 'Admin',
    [USER_ANALYTICS_TYPE.USER_TYPES.MODERATOR]: 'Moderator',
    [USER_ANALYTICS_TYPE.USER_TYPES.SUPPORT]: 'Support',
    [USER_ANALYTICS_TYPE.USER_TYPES.NEW]: 'New',
    [USER_ANALYTICS_TYPE.USER_TYPES.REGULAR]: 'Regular',
    [USER_ANALYTICS_TYPE.USER_TYPES.LOYAL]: 'Loyal',
    [USER_ANALYTICS_TYPE.USER_TYPES.VIP]: 'VIP',
    [USER_ANALYTICS_TYPE.USER_TYPES.ADVOCATE]: 'Advocate',
  };
  return labels[type] || 'Unknown';
}

// User Analytics Engagement Level Labels
export function getUserAnalyticsEngagementLevelLabel(level: UserAnalyticsEngagementLevel): string {
  const labels: Record<UserAnalyticsEngagementLevel, string> = {
    [USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW]: 'Very Low',
    [USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW]: 'Low',
    [USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM]: 'Medium',
    [USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH]: 'High',
    [USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH]: 'Very High',
  };
  return labels[level] || 'Unknown';
}

// User Analytics Lifecycle Stage Labels
export function getUserAnalyticsLifecycleStageLabel(stage: UserAnalyticsLifecycleStage): string {
  const labels: Record<UserAnalyticsLifecycleStage, string> = {
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.AWARENESS]: 'Awareness',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.INTEREST]: 'Interest',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.CONSIDERATION]: 'Consideration',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.SIGNUP]: 'Signup',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.VERIFICATION]: 'Verification',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ONBOARDING]: 'Onboarding',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.FIRST_ACTION]: 'First Action',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ENGAGEMENT]: 'Engagement',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.USAGE]: 'Usage',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.REPEAT]: 'Repeat',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.LOYALTY]: 'Loyalty',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ADVOCACY]: 'Advocacy',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.REFERRAL]: 'Referral',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.UPSELL]: 'Upsell',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.CROSS_SELL]: 'Cross-sell',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.DISENGAGEMENT]: 'Disengagement',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.CHURN]: 'Churn',
    [USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.REACTIVATION]: 'Reactivation',
  };
  return labels[stage] || 'Unknown';
}

// User Analytics Satisfaction Level Labels
export function getUserAnalyticsSatisfactionLevelLabel(
  level: UserAnalyticsSatisfactionLevel
): string {
  const labels: Record<UserAnalyticsSatisfactionLevel, string> = {
    [USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_UNSATISFIED]: 'Very Unsatisfied',
    [USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.UNSATISFIED]: 'Unsatisfied',
    [USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.NEUTRAL]: 'Neutral',
    [USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.SATISFIED]: 'Satisfied',
    [USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_SATISFIED]: 'Very Satisfied',
  };
  return labels[level] || 'Unknown';
}

// User Analytics Trust Level Labels
export function getUserAnalyticsTrustLevelLabel(level: UserAnalyticsTrustLevel): string {
  const labels: Record<UserAnalyticsTrustLevel, string> = {
    [USER_ANALYTICS_TYPE.TRUST_LEVELS.UNKNOWN]: 'Unknown',
    [USER_ANALYTICS_TYPE.TRUST_LEVELS.LOW]: 'Low',
    [USER_ANALYTICS_TYPE.TRUST_LEVELS.MEDIUM]: 'Medium',
    [USER_ANALYTICS_TYPE.TRUST_LEVELS.HIGH]: 'High',
    [USER_ANALYTICS_TYPE.TRUST_LEVELS.VERY_HIGH]: 'Very High',
  };
  return labels[level] || 'Unknown';
}

// User Analytics Privacy Level Labels
export function getUserAnalyticsPrivacyLevelLabel(level: UserAnalyticsPrivacyLevel): string {
  const labels: Record<UserAnalyticsPrivacyLevel, string> = {
    [USER_ANALYTICS_TYPE.PRIVACY_LEVELS.PUBLIC]: 'Public',
    [USER_ANALYTICS_TYPE.PRIVACY_LEVELS.PRIVATE]: 'Private',
    [USER_ANALYTICS_TYPE.PRIVACY_LEVELS.SHARED]: 'Shared',
    [USER_ANALYTICS_TYPE.PRIVACY_LEVELS.RESTRICTED]: 'Restricted',
  };
  return labels[level] || 'Unknown';
}

// Check if user analytics is descriptive
export function isUserAnalyticsDescriptive(type: UserAnalyticsAnalysisType): boolean {
  const descriptiveTypes: UserAnalyticsAnalysisType[] = [
    USER_ANALYTICS_TYPE.ANALYSIS_TYPES.DESCRIPTIVE,
    USER_ANALYTICS_TYPE.ANALYSIS_TYPES.SUMMARY,
    USER_ANALYTICS_TYPE.ANALYSIS_TYPES.OVERVIEW,
    USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PROFILE,
  ];
  return descriptiveTypes.includes(type);
}

// Check if user analytics is predictive
export function isUserAnalyticsPredictive(type: UserAnalyticsAnalysisType): boolean {
  const predictiveTypes: UserAnalyticsAnalysisType[] = [
    USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PREDICTIVE,
    USER_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST,
    USER_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND,
    USER_ANALYTICS_TYPE.ANALYSIS_TYPES.PROPENSITY,
  ];
  return predictiveTypes.includes(type);
}

// Get engagement level from value
export function getUserAnalyticsEngagementLevel(value: number): UserAnalyticsEngagementLevel {
  if (value >= 0.8) return USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_HIGH;
  if (value >= 0.6) return USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.HIGH;
  if (value >= 0.4) return USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.MEDIUM;
  if (value >= 0.2) return USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.LOW;
  return USER_ANALYTICS_TYPE.ENGAGEMENT_LEVELS.VERY_LOW;
}

// Get satisfaction level from score
export function getUserAnalyticsSatisfactionLevel(score: number): UserAnalyticsSatisfactionLevel {
  if (score >= 4.5) return USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_SATISFIED;
  if (score >= 3.5) return USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.SATISFIED;
  if (score >= 2.5) return USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.NEUTRAL;
  if (score >= 1.5) return USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.UNSATISFIED;
  return USER_ANALYTICS_TYPE.SATISFACTION_LEVELS.VERY_UNSATISFIED;
}

// Get lifecycle stage from user age
export function getUserAnalyticsLifecycleStage(
  daysSinceSignup: number
): UserAnalyticsLifecycleStage {
  if (daysSinceSignup < 1) return USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.SIGNUP;
  if (daysSinceSignup < 7) return USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ONBOARDING;
  if (daysSinceSignup < 30) return USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ENGAGEMENT;
  if (daysSinceSignup < 90) return USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.USAGE;
  if (daysSinceSignup < 180) return USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.LOYALTY;
  if (daysSinceSignup < 365) return USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.ADVOCACY;
  return USER_ANALYTICS_TYPE.LIFECYCLE_STAGES.LOYALTY;
}
