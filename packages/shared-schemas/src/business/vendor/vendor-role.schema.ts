/**
 * Vendor Role Schema
 * @module shared-schemas/business/vendor
 *
 * Values আসে shared-constants/business/vendor-role.constants থেকে।
 */

import { z } from 'zod';
import { VENDOR_ROLE } from '@vubon/shared-constants/business';

export const VendorRoleSchema = z.enum(Object.values(VENDOR_ROLE) as [string, ...string[]]);

export const VendorRoleAssignmentSchema = z.object({
  vendorId: z.string().min(1),
  userId: z.string().min(1),
  role: VendorRoleSchema,
  assignedBy: z.string().min(1),
  assignedAt: z.string().datetime(),
  expiresAt: z.string().datetime().optional(),
});

export type VendorRoleSchemaType = z.infer<typeof VendorRoleSchema>;
export type VendorRoleAssignmentSchemaType = z.infer<typeof VendorRoleAssignmentSchema>;
