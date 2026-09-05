/**
 * Vendor Schema
 * ভেন্ডর সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_STATUS } from '@vubon/shared-constants';

export const VendorSchema = BaseSchema.extend({
  userId: z.string().uuid(),
  name: z.string().min(2, 'Vendor name must be at least 2 characters').max(255),
  nameBangla: z.string().max(255).optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().max(2000).optional(),
  descriptionBangla: z.string().max(2000).optional(),
  logo: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  status: z.enum(Object.values(VENDOR_STATUS) as [string, ...string[]]),
  type: z.enum([
    'individual',
    'business',
    'manufacturer',
    'distributor',
    'wholesaler',
    'retailer',
    'importer',
    'exporter',
    'dropshipper',
  ]),
  tier: z.enum(['basic', 'silver', 'gold', 'platinum', 'diamond', 'enterprise']),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().min(0).default(0),
  productCount: z.number().int().min(0).default(0),
  orderCount: z.number().int().min(0).default(0),
  revenue: z.number().min(0).default(0),
  isVerified: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  approvedAt: z.date().optional(),
  verifiedAt: z.date().optional(),
  joinedAt: z.date().default(() => new Date()),
  lastActiveAt: z.date().optional(),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const VendorCreateSchema = VendorSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  rating: true,
  reviewCount: true,
  productCount: true,
  orderCount: true,
  revenue: true,
  isVerified: true,
  isApproved: true,
  approvedAt: true,
  verifiedAt: true,
  joinedAt: true,
});

export const VendorUpdateSchema = VendorCreateSchema.partial();

export type Vendor = z.infer<typeof VendorSchema>;
export type VendorCreate = z.infer<typeof VendorCreateSchema>;
export type VendorUpdate = z.infer<typeof VendorUpdateSchema>;
