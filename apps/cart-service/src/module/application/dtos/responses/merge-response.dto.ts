/**
 * MergeResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface MergeConflictDTO {
  readonly productId: string;
  readonly variantId?: string;
  readonly sourceQty: number;
  readonly targetQty: number;
  readonly mergedQty: number;
  readonly reason: string;
}

export interface MergeResponseDTO {
  readonly mergerId: string;
  readonly sourceCartId: string;
  readonly targetCartId: string;
  readonly strategy: string;
  readonly itemsMerged: number;
  readonly itemsDropped: number;
  readonly conflicts: readonly MergeConflictDTO[];
  readonly mergedAt: string;
}
