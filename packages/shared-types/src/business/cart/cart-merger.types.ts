/**
 * Cart Merger Value Types
 * @module shared-types/business/cart
 */
import type { MERGE_STRATEGY } from '@vubon/shared-constants/business/cart';

export type MergeStrategyValue = (typeof MERGE_STRATEGY)[keyof typeof MERGE_STRATEGY];

export interface CartMerger {
  readonly id: string;
  readonly sourceCartId: string;
  readonly targetCartId: string;
  readonly strategy: MergeStrategyValue;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedAt: string;
}
