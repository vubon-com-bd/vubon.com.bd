/**
 * Feature Flag Types
 * @module shared-types/common/config
 */

export interface FeatureFlag {
  readonly key: string;
  readonly enabled: boolean;
  readonly description?: string;
  readonly rolloutPercent: number;
  readonly allowedRoles?: readonly string[];
  readonly allowedUserIds?: readonly string[];
  readonly allowedEnvironments?: readonly string[];
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface FeatureFlagOverride {
  readonly flagKey: string;
  readonly userId: string;
  readonly enabled: boolean;
  readonly reason?: string;
  readonly expiresAt?: string;
}

export interface FeatureFlagEvaluation {
  readonly flagKey: string;
  readonly enabled: boolean;
  readonly reason: string;
  readonly evaluatedAt: string;
}

export type FeatureFlagKey =
  | 'enableNotifications'
  | 'enableAnalytics'
  | 'enableAiFeatures'
  | 'enableRecommendations'
  | 'enableLiveChat'
  | 'enableNewCheckout'
  | 'enableFlashSales'
  | 'enableLoyaltyProgram'
  | 'enableReferralProgram'
  | 'enableMultiVendor';
