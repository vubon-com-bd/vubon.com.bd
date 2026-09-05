/**
 * Vendor Team Schema
 * ভেন্ডর টিম সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_TEAM } from '@vubon/shared-constants';

export const VendorTeamSchema = BaseSchema.extend({
  vendorId: z.string().uuid(),
  name: z.string().min(1, 'Team name is required'),
  nameBangla: z.string().optional(),
  description: z.string().optional(),
  descriptionBangla: z.string().optional(),
  status: z.enum(Object.values(VENDOR_TEAM.STATUS) as [string, ...string[]]),
  permissions: z
    .array(z.enum(Object.values(VENDOR_TEAM.PERMISSIONS) as [string, ...string[]]))
    .default([]),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorTeamCreateSchema = VendorTeamSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const VendorTeamUpdateSchema = VendorTeamCreateSchema.partial();

export type VendorTeam = z.infer<typeof VendorTeamSchema>;
export type VendorTeamCreate = z.infer<typeof VendorTeamCreateSchema>;
export type VendorTeamUpdate = z.infer<typeof VendorTeamUpdateSchema>;
