/**
 * SEO Status Schema
 * @module shared-schemas/platform/seo
 *
 * Values আসে shared-constants/platform/seo-status.constants থেকে।
 */

import { z } from 'zod';
import { SEO_STATUS } from '@vubon/shared-constants/platform';

export const SeoStatusSchema = z.enum(Object.values(SEO_STATUS) as [string, ...string[]]);

export type SeoStatusSchemaType = z.infer<typeof SeoStatusSchema>;
