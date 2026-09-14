/**
 * Application Config Types
 * @module shared-types/common/config
 */

import type { EnvironmentValue } from './env-config.types';
import type { LocaleCode } from '../primitives/locale.types';
import type { LanguageCode } from '../primitives/language.types';
import type { CurrencyCode } from '../primitives/currency.types';

export interface AppConfig {
  readonly name: string;
  readonly version: string;
  readonly environment: EnvironmentValue;
  readonly baseUrl: string;
  readonly apiUrl: string;
  readonly defaultLocale: LocaleCode;
  readonly defaultLanguage: LanguageCode;
  readonly defaultCurrency: CurrencyCode;
  readonly defaultTimezone: string;
  readonly features: FeatureFlags;
}

export interface FeatureFlags {
  readonly enableNotifications: boolean;
  readonly enableAnalytics: boolean;
  readonly enableAiFeatures: boolean;
  readonly enableRecommendations: boolean;
  readonly enableLiveChat: boolean;
  readonly enableNewCheckout: boolean;
  readonly enableFlashSales: boolean;
  readonly enableLoyaltyProgram: boolean;
  readonly enableReferralProgram: boolean;
  readonly enableMultiVendor: boolean;
}

export interface FeatureFlagToggle {
  readonly name: string;
  readonly enabled: boolean;
  readonly rolloutPercent: number;
  readonly allowedRoles?: readonly string[];
  readonly allowedUserIds?: readonly string[];
}

export interface AppMetadata {
  readonly name: string;
  readonly version: string;
  readonly build: string;
  readonly buildDate: string;
  readonly commit?: string;
}
