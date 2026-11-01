/**
 * Recommendation Type Schema
 * @module shared-schemas/platform/discovery
 *
 * Values আসে shared-constants/platform/recommendation-type.constants থেকে।
 */

import { z } from 'zod';
import { RECOMMENDATION_TYPE } from '@vubon/shared-constants/platform';

export const RecommendationTypeSchema = z.enum(
  Object.values(RECOMMENDATION_TYPE) as [string, ...string[]]
);

export type RecommendationTypeSchemaType = z.infer<typeof RecommendationTypeSchema>;
