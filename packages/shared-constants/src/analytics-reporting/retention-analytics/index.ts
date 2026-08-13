/**
 * @fileoverview Retention analytics exports
 * @package @vubun/shared-constants
 */

// External libraries - none needed for exports

// Shared packages - none needed for exports

// Project files
export {
  // Enums
  CustomerLifecycleStage,
  // Constants
  DEFAULT_RETENTION_PERIOD_SETTINGS,
  DEFAULT_CHURN_DETECTION_THRESHOLDS,
  DEFAULT_REENGAGEMENT_CAMPAIGN_SETTINGS,
  DEFAULT_LOYALTY_PROGRAM_TIER_SETTINGS,
  DEFAULT_RETENTION_COST_BUDGET_SETTINGS,
  DEFAULT_LIFECYCLE_STAGE_THRESHOLDS,
  DEFAULT_RETENTION_SURVEY_SETTINGS,
  DEFAULT_CUSTOMER_FEEDBACK_LOOP_SETTINGS,
  DEFAULT_RETENTION_PLAN_TRACKING_SETTINGS,
  DEFAULT_CHURN_PREDICTION_SETTINGS,
  RETENTION_ANALYTICS_CONFIG,
  // Functions
  getLifecycleStageLabel,
  getRetentionPeriodLabel,
} from './retention-analytics.constants';

// Types
export type {
  RetentionPeriodSettings,
  ChurnDetectionThresholds,
  ReengagementCampaignSettings,
  LoyaltyProgramTierSettings,
  RetentionCostBudgetSettings,
  LifecycleStageThresholds,
  RetentionSurveySettings,
  CustomerFeedbackLoopSettings,
  RetentionPlanTrackingSettings,
  ChurnPredictionSettings,
} from './retention-analytics.constants';
