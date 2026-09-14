/**
 * Substitute Types
 * @module shared-types/platform/discovery
 */

import type { SUBSTITUTE_TYPE } from '@vubon/shared-constants/platform';

export type SubstituteTypeValue = (typeof SUBSTITUTE_TYPE)[keyof typeof SUBSTITUTE_TYPE];

export interface SubstituteItem {
  readonly productId: string;
  readonly type: SubstituteTypeValue;
  readonly similarity: number;
  readonly priceDifference?: number;
  readonly ratingDifference?: number;
}

export interface SubstituteResult {
  readonly sourceProductId: string;
  readonly items: readonly SubstituteItem[];
  readonly generatedAt: string;
}
