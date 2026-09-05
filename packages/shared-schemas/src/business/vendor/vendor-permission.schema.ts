/**
 * Vendor Permission Schema
 * ভেন্ডর পারমিশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_PERMISSIONS } from '@vubon/shared-constants';

export const VendorPermissionSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  permission: z.enum(Object.values(VENDOR_PERMISSIONS) as [string, ...string[]]),
  isGranted: z.boolean().default(true),
  grantedAt: z.date().default(() => new Date()),
  grantedBy: z.string().uuid(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorPermissionCreateSchema = VendorPermissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorPermissionUpdateSchema = VendorPermissionCreateSchema.partial();

export type VendorPermission = z.infer<typeof VendorPermissionSchema>;
export type VendorPermissionCreate = z.infer<typeof VendorPermissionCreateSchema>;
export type VendorPermissionUpdate = z.infer<typeof VendorPermissionUpdateSchema>;
