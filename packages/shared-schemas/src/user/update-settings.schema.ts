/**
 * Update Settings Request Schema
 * @module shared-schemas/user/requests
 */

import { z } from 'zod';
import { LocaleSchema, LanguageSchema, TimezoneSchema } from '../common/enums/locale.schema';
import { ThemeSchema } from './user-settings.schema';

export const UpdateSettingsRequestSchema = z
  .object({
    theme: ThemeSchema.optional(),
    language: LanguageSchema.optional(),
    locale: LocaleSchema.optional(),
    timezone: TimezoneSchema.optional(),
    currency: z.string().length(3).optional(),
    dateFormat: z.string().min(1).max(30).optional(),
    timeFormat: z.string().min(1).max(30).optional(),
    itemsPerPage: z.number().int().min(5).max(200).optional(),
    notifications: z.boolean().optional(),
    twoFactor: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one setting must be provided',
  });

export type UpdateSettingsRequestSchemaType = z.infer<typeof UpdateSettingsRequestSchema>;
