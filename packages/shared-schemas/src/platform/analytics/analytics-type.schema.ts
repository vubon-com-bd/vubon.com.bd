/**
 * Analytics Type Schema
 * @module shared-schemas/platform/analytics
 */

import { z } from 'zod';
import { ANALYTICS_TYPE } from '@vubon/shared-constants/platform';

export const AnalyticsTypeSchema = z.enum(Object.values(ANALYTICS_TYPE) as [string, ...string[]]);

export type AnalyticsTypeSchemaType = z.infer<typeof AnalyticsTypeSchema>;
