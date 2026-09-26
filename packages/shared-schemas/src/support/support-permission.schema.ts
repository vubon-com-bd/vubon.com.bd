/**
 * Support Permission Schema
 * @module shared-schemas/support
 *
 * Values আসে shared-constants/support/support-permission.constants থেকে।
 */

import { z } from 'zod';
import { SUPPORT_PERMISSION } from '@vubon/shared-constants/support';

export const SupportPermissionSchema = z.enum(
  Object.values(SUPPORT_PERMISSION) as [string, ...string[]]
);

export const SupportPermissionGrantSchema = z.object({
  userId: z.string().min(1),
  permission: SupportPermissionSchema,
  grantedBy: z.string().min(1),
  grantedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

export type SupportPermissionSchemaType = z.infer<typeof SupportPermissionSchema>;
export type SupportPermissionGrantSchemaType = z.infer<typeof SupportPermissionGrantSchema>;
