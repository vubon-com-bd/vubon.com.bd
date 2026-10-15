/**
 * CartItem Response DTOs
 * @module cart-service/application/dtos/responses
 *
 * Multi-shape output:
 *  - Full: admin
 *  - Public: customer-safe (no internal status)
 *  - Summary: list views
 */
import type { CartItemStatusValue } from '../../../domain/value-objects/primitives/cart-item-status.vo.js';

// ─── Full (admin) ─────────────────────────
export interface CartItemResponseDTO {
  readonly id: string;
  readonly cartId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly status: CartItemStatusValue;
  readonly unitPrice: number;
  readonly currency: string;
  readonly subtotal: number;
  readonly note?: string;
  readonly addedAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ───────────────
export interface CartItemPublicResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly subtotal: number;
  readonly currency: string;
  readonly isAvailable: boolean;
  readonly note?: string;
}

// ─── Summary (list) ───────────────────────
export interface CartItemSummaryResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly quantity: number;
  readonly subtotal: number;
}
