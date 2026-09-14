/**
 * Collection Schema
 * @module shared-schemas/business/product
 *
 * Values আসে shared-constants/business/collection.constants থেকে।
 */

import { z } from 'zod';
import { COLLECTION_TYPE, COLLECTION_STATUS, COLLECTION } from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { SlugSchema } from '../../common/primitives/slug.schema';

export const CollectionTypeSchema = z.enum(Object.values(COLLECTION_TYPE) as [string, ...string[]]);

export const CollectionStatusSchema = z.enum(
  Object.values(COLLECTION_STATUS) as [string, ...string[]]
);

export const CollectionSchema = z.object({
  id: UuidSchema,
  name: z.string().trim().min(1).max(COLLECTION.NAME_MAX_LENGTH),
  slug: SlugSchema,
  description: z.string().trim().max(COLLECTION.DESCRIPTION_MAX_LENGTH).optional(),
  type: CollectionTypeSchema,
  status: CollectionStatusSchema,
  imageUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  productIds: z.array(UuidSchema).max(COLLECTION.MAX_PRODUCTS),
  productCount: z.number().int().nonnegative(),
  isFeatured: z.boolean(),
  sortOrder: z.number().int().min(0),
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CollectionPublicSchema = CollectionSchema.pick({
  id: true,
  name: true,
  slug: true,
  imageUrl: true,
  productCount: true,
});

export type CollectionTypeSchemaType = z.infer<typeof CollectionTypeSchema>;
export type CollectionStatusSchemaType = z.infer<typeof CollectionStatusSchema>;
export type CollectionSchemaType = z.infer<typeof CollectionSchema>;
export type CollectionPublicSchemaType = z.infer<typeof CollectionPublicSchema>;
