/**
 * Analytics Permission Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-permission.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_PERMISSION } from '@vubon/shared-constants/platform';

export const AnalyticsPermissionSchema = z.enum(
  Object.values(ANALYTICS_PERMISSION) as [string, ...string[]]
);

export const AnalyticsPermissionGrantSchema = z.object({
  userId: z.string().min(1),
  permission: AnalyticsPermissionSchema,
  grantedBy: z.string().min(1),
  grantedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

export type AnalyticsPermissionSchemaType = z.infer<typeof AnalyticsPermissionSchema>;
export type AnalyticsPermissionGrantSchemaType = z.infer<typeof AnalyticsPermissionGrantSchema>;
