/**
 * Vendor Permission Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-permission.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_PERMISSION } from '@vubon/shared-constants/business';

export const VendorPermissionSchema = z.enum(
  Object.values(VENDOR_PERMISSION) as [string, ...string[]]
);

export const VendorPermissionGrantSchema = z.object({
  vendorId: z.string().min(1),
  userId: z.string().min(1),
  permission: VendorPermissionSchema,
  grantedBy: z.string().min(1),
  grantedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

export const VendorPermissionCheckSchema = z.object({
  vendorId: z.string().min(1),
  userId: z.string().min(1),
  permission: VendorPermissionSchema,
  granted: z.boolean(),
  checkedAt: z.string().datetime(),
});

export type VendorPermissionSchemaType = z.infer<typeof VendorPermissionSchema>;
export type VendorPermissionGrantSchemaType = z.infer<typeof VendorPermissionGrantSchema>;
export type VendorPermissionCheckSchemaType = z.infer<typeof VendorPermissionCheckSchema>;
