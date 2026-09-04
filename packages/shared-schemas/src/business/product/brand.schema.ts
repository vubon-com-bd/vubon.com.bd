/**
 * Brand Schema
 * ব্র্যান্ড সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { BRAND_STATUS, REGEX } from '@vubon/shared-constants';

export const BrandSchema = BaseSchema.extend({
  name: z.string().min(2, 'Brand name must be at least 2 characters').max(100),
  nameBangla: z.string().max(100).optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().max(500).optional(),
  descriptionBangla: z.string().max(500).optional(),
  logo: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().regex(REGEX.PHONE, 'Invalid phone number').optional(),
  address: z.string().optional(),
  status: z.enum(Object.values(BRAND_STATUS) as [string, ...string[]]),
  isActive: z.boolean().default(true),
  productCount: z.number().int().min(0).default(0),
  rating: z.number().min(0).max(5).default(0),
});

export const BrandCreateSchema = BrandSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  productCount: true,
  rating: true,
});

export const BrandUpdateSchema = BrandCreateSchema.partial();

export type Brand = z.infer<typeof BrandSchema>;
export type BrandCreate = z.infer<typeof BrandCreateSchema>;
export type BrandUpdate = z.infer<typeof BrandUpdateSchema>;
