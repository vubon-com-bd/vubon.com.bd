/**
 * User Preferences Schema
 * @module shared-schemas/user
 *
 * Values আসে shared-constants/user/user-preferences.constants থেকে।
 */

import { z } from 'zod';
import { USER_PREFERENCE_CHANNEL } from '@vubon/shared-constants/user';

export const PreferenceChannelSchema = z.enum(
  Object.values(USER_PREFERENCE_CHANNEL) as [string, ...string[]]
);

export const PreferenceChannelSettingSchema = z.object({
  channel: PreferenceChannelSchema,
  enabled: z.boolean(),
});

export const UserPreferencesSchema = z.object({
  userId: z.string().min(1),
  newsletter: z.boolean(),
  promotions: z.boolean(),
  orderUpdates: z.boolean(),
  productRecommendations: z.boolean(),
  securityAlerts: z.boolean(),
  channels: z.array(PreferenceChannelSettingSchema).max(10),
  updatedAt: z.string().datetime(),
});

export const UserPreferencesInputSchema = z.object({
  newsletter: z.boolean().optional(),
  promotions: z.boolean().optional(),
  orderUpdates: z.boolean().optional(),
  productRecommendations: z.boolean().optional(),
  securityAlerts: z.boolean().optional(),
  channels: z.array(PreferenceChannelSettingSchema).max(10).optional(),
});

export type PreferenceChannelSchemaType = z.infer<typeof PreferenceChannelSchema>;
export type UserPreferencesSchemaType = z.infer<typeof UserPreferencesSchema>;
export type UserPreferencesInputSchemaType = z.infer<typeof UserPreferencesInputSchema>;
