import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { ATTRIBUTE } from '@vubon/shared-constants/src/business/product/attribute.constants';

const attributeTypeKeys = Object.keys(ATTRIBUTE.TYPES) as [string, ...string[]];

export const AttributeSchema = BaseSchema.extend({
  attributeId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  type: z.enum(attributeTypeKeys),
  values: z.array(
    z.object({
      id: z.string().uuid(),
      value: z.string(),
      label: z.string(),
      order: z.number().int().min(0),
    })
  ),
  isRequired: z.boolean().default(false),
  isFilterable: z.boolean().default(true),
  isSearchable: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
  metadata: z.record(z.unknown()).optional(),
});
