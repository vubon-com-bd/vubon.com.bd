/**
 * Application Config Schema
 * @module shared-schemas/common/config
 */

import { z } from 'zod';
import { EnvironmentSchema } from './env.schema';
import { LocaleSchema, LanguageSchema, TimezoneSchema } from '../enums/locale.schema';

export const FeatureFlagsSchema = z.object({
  enableNotifications: z.boolean().default(true),
  enableAnalytics: z.boolean().default(true),
  enableAiFeatures: z.boolean().default(false),
  enableRecommendations: z.boolean().default(true),
  enableLiveChat: z.boolean().default(false),
  enableNewCheckout: z.boolean().default(false),
  enableFlashSales: z.boolean().default(true),
  enableLoyaltyProgram: z.boolean().default(true),
  enableReferralProgram: z.boolean().default(true),
  enableMultiVendor: z.boolean().default(true),
});

export const AppConfigSchema = z.object({
  name: z.string().min(1).max(100),
  version: z.string().min(1).max(50),
  environment: EnvironmentSchema,
  baseUrl: z.string().url(),
  apiUrl: z.string().url(),
  defaultLocale: LocaleSchema,
  defaultLanguage: LanguageSchema,
  defaultCurrency: z.string().length(3),
  defaultTimezone: TimezoneSchema,
  features: FeatureFlagsSchema,
});

export const AppMetadataSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  build: z.string().min(1),
  buildDate: z.string().datetime(),
  commit: z.string().optional(),
});

export type FeatureFlagsSchemaType = z.infer<typeof FeatureFlagsSchema>;
export type AppConfigSchemaType = z.infer<typeof AppConfigSchema>;
export type AppMetadataSchemaType = z.infer<typeof AppMetadataSchema>;
