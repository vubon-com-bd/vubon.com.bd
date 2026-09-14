/**
 * Feature flags configuration
 * @module shared-config/common/feature-flag
 *
 * ⚠️ Env var নাম সবসময় FF_ prefix দিয়ে শুরু হবে।
 */
import { getOptionalEnvBool } from '../env/env.helper';
import type { FeatureFlagDefinition } from './feature-flag.types';

export const FEATURE_FLAG_DEFINITIONS: readonly FeatureFlagDefinition[] = Object.freeze([
  {
    key: 'newCheckout',
    envVar: 'FF_NEW_CHECKOUT',
    defaultValue: false,
    description: 'Enable new checkout flow',
  },
  {
    key: 'aiRecommendation',
    envVar: 'FF_AI_RECOMMENDATION',
    defaultValue: true,
    description: 'Enable AI-based product recommendations',
  },
  {
    key: 'darkMode',
    envVar: 'FF_DARK_MODE',
    defaultValue: true,
    description: 'Enable dark mode toggle in UI',
  },
  {
    key: 'liveChat',
    envVar: 'FF_LIVE_CHAT',
    defaultValue: false,
    description: 'Enable live chat with support agents',
  },
  {
    key: 'loyaltyProgram',
    envVar: 'FF_LOYALTY_PROGRAM',
    defaultValue: true,
    description: 'Enable loyalty points program',
  },
  {
    key: 'referralProgram',
    envVar: 'FF_REFERRAL_PROGRAM',
    defaultValue: true,
    description: 'Enable customer referral rewards',
  },
  {
    key: 'multiVendor',
    envVar: 'FF_MULTI_VENDOR',
    defaultValue: true,
    description: 'Enable multi-vendor marketplace',
  },
  {
    key: 'flashSales',
    envVar: 'FF_FLASH_SALES',
    defaultValue: true,
    description: 'Enable flash sale campaigns',
  },
]);

export const FEATURE_FLAGS = Object.freeze({
  newCheckout: getOptionalEnvBool('FF_NEW_CHECKOUT', false),
  aiRecommendation: getOptionalEnvBool('FF_AI_RECOMMENDATION', true),
  darkMode: getOptionalEnvBool('FF_DARK_MODE', true),
  liveChat: getOptionalEnvBool('FF_LIVE_CHAT', false),
  loyaltyProgram: getOptionalEnvBool('FF_LOYALTY_PROGRAM', true),
  referralProgram: getOptionalEnvBool('FF_REFERRAL_PROGRAM', true),
  multiVendor: getOptionalEnvBool('FF_MULTI_VENDOR', true),
  flashSales: getOptionalEnvBool('FF_FLASH_SALES', true),
} as const);

export type FeatureFlags = typeof FEATURE_FLAGS;
