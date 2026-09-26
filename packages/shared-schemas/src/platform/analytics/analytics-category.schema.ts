/**
 * Analytics Category Schema
 * @module shared-schemas/platform/analytics
 */

import { z } from 'zod';
import { ANALYTICS_CATEGORY } from '@vubon/shared-constants/platform';

export const AnalyticsCategorySchema = z.enum(
  Object.values(ANALYTICS_CATEGORY) as [string, ...string[]]
);

export type AnalyticsCategorySchemaType = z.infer<typeof AnalyticsCategorySchema>;
