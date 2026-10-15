/**
 * Merge Response DTOs
 * @module cart-service/application/dtos/responses
 */
import type { MergeStrategyValue } from '../../../domain/value-objects/primitives/merge-strategy.vo.js';

export interface MergePlanItemDTO {
  readonly productId: string;
  readonly variantId?: string;
  readonly sourceItemId: string;
  readonly targetItemId?: string;
  readonly resolvedQuantity: number;
  readonly isConflict: boolean;
}

export interface MergeResponseDTO {
  readonly mergerId: string;
  readonly sourceCartId: string;
  readonly targetCartId: string;
  readonly strategy: MergeStrategyValue;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedItems: readonly MergePlanItemDTO[];
  readonly mergedAt: string;
}

export interface MergeSummaryResponseDTO {
  readonly success: true;
  readonly mergerId: string;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedAt: string;
}
