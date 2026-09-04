/**
 * Category Schema
 * ক্যাটাগরি সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { CATEGORY_STATUS } from '@vubon/shared-constants';

export const CategorySchema = BaseSchema.extend({
  name: z.string().min(2, 'Category name must be at least 2 characters').max(100),
  nameBangla: z.string().max(100).optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().max(500).optional(),
  descriptionBangla: z.string().max(500).optional(),
  parentId: z.string().uuid().optional(),
  status: z.enum(Object.values(CATEGORY_STATUS) as [string, ...string[]]),
  sortOrder: z.number().int().min(0).default(0),
  image: z.string().url().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().default(true),
  level: z.number().int().min(0).default(0),
  productCount: z.number().int().min(0).default(0),
});

export const CategoryCreateSchema = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  level: true,
  productCount: true,
});

export const CategoryUpdateSchema = CategoryCreateSchema.partial();

export type Category = z.infer<typeof CategorySchema>;
export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof CategoryUpdateSchema>;
