/**
 * Logistics Permission Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/logistics-permission.constants থেকে।
 */

import { z } from 'zod';
import { LOGISTICS_PERMISSION } from '@vubon/shared-constants/logistics';

export const LogisticsPermissionSchema = z.enum(
  Object.values(LOGISTICS_PERMISSION) as [string, ...string[]]
);

export const LogisticsPermissionGrantSchema = z.object({
  userId: z.string().min(1),
  permission: LogisticsPermissionSchema,
  grantedBy: z.string().min(1),
  grantedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

export type LogisticsPermissionSchemaType = z.infer<typeof LogisticsPermissionSchema>;
export type LogisticsPermissionGrantSchemaType = z.infer<typeof LogisticsPermissionGrantSchema>;
