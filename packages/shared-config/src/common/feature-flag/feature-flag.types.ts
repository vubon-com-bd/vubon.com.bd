/**
 * Feature flag types
 * @module shared-config/common/feature-flag
 */

export type FeatureFlagKey =
  | 'newCheckout'
  | 'aiRecommendation'
  | 'darkMode'
  | 'liveChat'
  | 'loyaltyProgram'
  | 'referralProgram'
  | 'multiVendor'
  | 'flashSales';

export interface FeatureFlagDefinition {
  readonly key: FeatureFlagKey;
  readonly envVar: string;
  readonly defaultValue: boolean;
  readonly description: string;
}
