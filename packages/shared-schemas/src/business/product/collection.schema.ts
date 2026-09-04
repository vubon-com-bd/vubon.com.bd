/**
 * Collection Schema
 * কালেকশন সম্পর্কিত স্কিমা
 */

import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { COLLECTION_STATUS } from '@vubon/shared-constants';

const CollectionProductSchema = z.object({
  productId: z.string().uuid(),
  position: z.number().int().min(0).default(0),
  addedAt: z.date().default(() => new Date()),
});

const ConditionRuleSchema = z.object({
  field: z.string(),
  operator: z.string(),
  value: z.unknown(),
});

const ConditionSchema = z.object({
  type: z.enum(['all', 'any', 'none']),
  rules: z.array(ConditionRuleSchema),
});

export const CollectionSchema = BaseSchema.extend({
  name: z.string().min(2, 'Collection name must be at least 2 characters').max(100),
  nameBangla: z.string().max(100).optional(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  description: z.string().max(500).optional(),
  descriptionBangla: z.string().max(500).optional(),
  status: z.enum(Object.values(COLLECTION_STATUS) as [string, ...string[]]),
  type: z.enum(['manual', 'automated', 'seasonal', 'holiday', 'promotional', 'curated']),
  products: z.array(CollectionProductSchema).default([]),
  image: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  conditions: ConditionSchema.optional(),
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  productCount: z.number().int().min(0).default(0),
});

export const CollectionCreateSchema = CollectionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  productCount: true,
});

export const CollectionUpdateSchema = CollectionCreateSchema.partial();

export type Collection = z.infer<typeof CollectionSchema>;
export type CollectionCreate = z.infer<typeof CollectionCreateSchema>;
export type CollectionUpdate = z.infer<typeof CollectionUpdateSchema>;
