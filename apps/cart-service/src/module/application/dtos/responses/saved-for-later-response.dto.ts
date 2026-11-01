/**
 * Saved For Later Response DTOs
 * @module cart-service/application/dtos/responses
 */
import type { SavedItemStatusValue } from '../../../domain/value-objects/primitives/saved-item-status.vo.js';

// ─── Full (admin) ─────────────────────────
export interface SavedForLaterResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly status: SavedItemStatusValue;
  readonly note?: string;
  readonly savedAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ───────────────
export interface SavedForLaterPublicResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly status: SavedItemStatusValue;
  readonly note?: string;
  readonly savedAt: string;
}

// ─── List (paginated) ─────────────────────
export interface SavedForLaterListResponseDTO {
  readonly items: readonly SavedForLaterPublicResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
