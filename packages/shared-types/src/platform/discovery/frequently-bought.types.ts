/**
 * Frequently Bought Types
 * @module shared-types/platform/discovery
 */

import type { FREQUENTLY_BOUGHT_TYPE } from '@vubon/shared-constants/platform';

export type FrequentlyBoughtTypeValue =
  (typeof FREQUENTLY_BOUGHT_TYPE)[keyof typeof FREQUENTLY_BOUGHT_TYPE];

export interface FrequentlyBoughtItem {
  readonly productId: string;
  readonly coOccurrences: number;
  readonly confidence: number;
  readonly lift: number;
  readonly support: number;
}

export interface FrequentlyBoughtResult {
  readonly sourceProductId: string;
  readonly type: FrequentlyBoughtTypeValue;
  readonly items: readonly FrequentlyBoughtItem[];
  readonly lookbackDays: number;
  readonly generatedAt: string;
}
