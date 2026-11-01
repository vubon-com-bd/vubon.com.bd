/**
 * Marketing Permission Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/marketing-permission.constants থেকে।
 */

import { z } from 'zod';
import { MARKETING_PERMISSION } from '@vubon/shared-constants/marketing';

export const MarketingPermissionSchema = z.enum(
  Object.values(MARKETING_PERMISSION) as [string, ...string[]]
);

export const MarketingPermissionGrantSchema = z.object({
  userId: z.string().min(1),
  permission: MarketingPermissionSchema,
  grantedBy: z.string().min(1),
  grantedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

export type MarketingPermissionSchemaType = z.infer<typeof MarketingPermissionSchema>;
export type MarketingPermissionGrantSchemaType = z.infer<typeof MarketingPermissionGrantSchema>;
