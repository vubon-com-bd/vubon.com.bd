/**
 * Preferences Response Schema
 * @module shared-schemas/user/responses
 */

import { z } from 'zod';
import { UserPreferencesSchema } from './user-preferences.schema';
import { UserSettingsSchema } from './user-settings.schema';

export const PreferencesResponseSchema = z.object({
  success: z.literal(true),
  preferences: UserPreferencesSchema,
});

export const SettingsResponseSchema = z.object({
  success: z.literal(true),
  settings: UserSettingsSchema,
});

export const PreferencesUpdateResponseSchema = z.object({
  success: z.literal(true),
  preferences: UserPreferencesSchema,
  updatedAt: z.string().datetime(),
});

export type PreferencesResponseSchemaType = z.infer<typeof PreferencesResponseSchema>;
export type SettingsResponseSchemaType = z.infer<typeof SettingsResponseSchema>;
export type PreferencesUpdateResponseSchemaType = z.infer<typeof PreferencesUpdateResponseSchema>;
