/**
 * SEO Type Schema
 * @module shared-schemas/platform/seo
 */

import { z } from 'zod';
import { SEO_TYPE } from '@vubon/shared-constants/platform';

export const SeoTypeSchema = z.enum(Object.values(SEO_TYPE) as [string, ...string[]]);

export type SeoTypeSchemaType = z.infer<typeof SeoTypeSchema>;
