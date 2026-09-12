import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { TAG } from '@vubon/shared-constants/src/business/product/tag.constants';

const tagStatusKeys = Object.keys(TAG.STATUS) as [string, ...string[]];
const tagTypeKeys = Object.keys(TAG.TYPES) as [string, ...string[]];

export const TagSchema = BaseSchema.extend({
  tagId: z.string().uuid(),
  name: z.string().min(1).max(50),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: z.enum(tagStatusKeys),
  type: z.enum(tagTypeKeys),
  productCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
