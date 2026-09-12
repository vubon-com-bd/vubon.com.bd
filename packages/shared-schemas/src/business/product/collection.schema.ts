import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { COLLECTION } from '@vubon/shared-constants/src/business/product/collection.constants';

const collectionStatusKeys = Object.keys(COLLECTION.STATUS) as [string, ...string[]];
const collectionTypeKeys = Object.keys(COLLECTION.TYPES) as [string, ...string[]];

export const CollectionSchema = BaseSchema.extend({
  collectionId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(500).optional(),
  status: z.enum(collectionStatusKeys),
  type: z.enum(collectionTypeKeys),
  productCount: z.number().int().min(0).default(0),
  image: z.string().url().optional(),
  banner: z.string().url().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
  startsAt: z.date().optional(),
  endsAt: z.date().optional(),
  metadata: z.record(z.unknown()).optional(),
});
