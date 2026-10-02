/**
 * Feature flag helpers
 * @module shared-config/common/feature-flag
 */
import { FEATURE_FLAGS } from './feature-flag.config.js';
import type { FeatureFlagKey } from './feature-flag.types.js';

export function isFeatureEnabled(flag: FeatureFlagKey): boolean {
  return FEATURE_FLAGS[flag];
}

export function getEnabledFeatures(): readonly FeatureFlagKey[] {
  return (Object.keys(FEATURE_FLAGS) as FeatureFlagKey[]).filter((key) => FEATURE_FLAGS[key]);
}

export function getDisabledFeatures(): readonly FeatureFlagKey[] {
  return (Object.keys(FEATURE_FLAGS) as FeatureFlagKey[]).filter((key) => !FEATURE_FLAGS[key]);
}
