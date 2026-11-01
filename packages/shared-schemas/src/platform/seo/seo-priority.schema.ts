/**
 * SEO Priority Schema
 * @module shared-schemas/platform/seo
 */

import { z } from 'zod';
import { SEO_PRIORITY } from '@vubon/shared-constants/platform';

export const SeoPrioritySchema = z.enum(Object.values(SEO_PRIORITY) as [string, ...string[]]);

export type SeoPrioritySchemaType = z.infer<typeof SeoPrioritySchema>;
