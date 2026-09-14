/**
 * Analytics Medium Schema
 * @module shared-schemas/platform/analytics
 */

import { z } from 'zod';
import { ANALYTICS_MEDIUM } from '@vubon/shared-constants/platform';

export const AnalyticsMediumSchema = z.enum(
  Object.values(ANALYTICS_MEDIUM) as [string, ...string[]]
);

export type AnalyticsMediumSchemaType = z.infer<typeof AnalyticsMediumSchema>;
