/**
 * SavedForLaterResponseDTO
 * @module cart-service/application/dtos/responses
 */
export interface SavedForLaterResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly status: string;
  readonly notes?: string;
  readonly addedAt: string;
  readonly updatedAt: string;
}

export interface SavedListResponseDTO {
  readonly items: readonly SavedForLaterResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
