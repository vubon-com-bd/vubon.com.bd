import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { SEO_SCHEMA } from '@vubon/shared-constants/src/platform/seo/seo-schema.constants';

const seoSchemaTypeKeys = Object.keys(SEO_SCHEMA.TYPES) as [string, ...string[]];

export const SEOSchemaSchema = BaseSchema.extend({
  schemaId: z.string().uuid(),
  seoId: z.string().uuid(),
  type: z.enum(seoSchemaTypeKeys),
  properties: z.record(z.unknown()),
  isActive: z.boolean().default(true),
  version: z.string().default('1.0'),
  metadata: z.record(z.unknown()).optional(),
});
