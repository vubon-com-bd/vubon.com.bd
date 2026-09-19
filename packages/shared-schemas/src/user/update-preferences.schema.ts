/**
 * Update Preferences Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { PreferenceChannelSettingSchema } from './user-preferences.schema';

export const UpdatePreferencesRequestSchema = z
  .object({
    newsletter: z.boolean().optional(),
    promotions: z.boolean().optional(),
    orderUpdates: z.boolean().optional(),
    productRecommendations: z.boolean().optional(),
    securityAlerts: z.boolean().optional(),
    channels: z.array(PreferenceChannelSettingSchema).max(10).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one preference must be provided',
  });

export type UpdatePreferencesRequestSchemaType = z.infer<typeof UpdatePreferencesRequestSchema>;
