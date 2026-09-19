/**
 * SEO Priority Value Types
 * @module shared-types/platform/seo
 */

import type { SEO_PRIORITY, SEO_PRIORITY_WEIGHT } from '@vubon/shared-constants/platform';

export type SeoPriorityValue = (typeof SEO_PRIORITY)[keyof typeof SEO_PRIORITY];

export type SeoPriorityWeight = typeof SEO_PRIORITY_WEIGHT;

export interface SeoPriorityMetadata {
  readonly value: SeoPriorityValue;
  readonly weight: number;
  readonly label: string;
}
