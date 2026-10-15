/**
 * Cart Response DTOs
 * @module cart-service/application/dtos/responses
 *
 * Multi-shape output:
 *  - Full: admin (all fields)
 *  - Public: customer-safe
 *  - Summary: list views
 *  - List: paginated
 *  - Detail: with items
 *  - Stats: aggregated
 */
import type { CartStatusValue } from '../../../domain/value-objects/primitives/cart-status.vo.js';
import type { CartTypeValue } from '../../../domain/value-objects/primitives/cart-type.vo.js';
import type { CartItemResponseDTO } from './cart-item-response.dto.js';
import type { CouponPublicResponseDTO } from './coupon-response.dto.js';
import type { VoucherPublicResponseDTO } from './voucher-response.dto.js';

// ─── Full (admin) ─────────────────────────
export interface CartResponseDTO {
  readonly id: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly type: CartTypeValue;
  readonly status: CartStatusValue;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly couponId?: string;
  readonly voucherId?: string;
  readonly notes?: string;
  readonly expiresAt: string;
  readonly lastActivityAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ────────────────
export interface CartPublicResponseDTO {
  readonly id: string;
  readonly type: CartTypeValue;
  readonly status: CartStatusValue;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly coupon?: CouponPublicResponseDTO;
  readonly voucher?: VoucherPublicResponseDTO;
  readonly items: readonly CartItemResponseDTO[];
}

// ─── Summary (list views) ──────────────────
export interface CartSummaryResponseDTO {
  readonly id: string;
  readonly itemCount: number;
  readonly total: number;
  readonly currency: string;
}

// ─── List (paginated) ──────────────────────
export interface CartListResponseDTO {
  readonly items: readonly CartSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Detail (with items) ───────────────────
export interface CartDetailResponseDTO {
  readonly cart: CartResponseDTO;
  readonly items: readonly CartItemResponseDTO[];
}

// ─── Count ─────────────────────────────────
export interface CartCountResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

// ─── Stats ─────────────────────────────────
export interface CartStatsResponseDTO {
  readonly total: number;
  readonly totalValue: number;
  readonly averageValue: number;
  readonly averageItemCount: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
}

// ─── Initiate (POST create) ────────────────
export interface CartInitiateResponseDTO {
  readonly success: true;
  readonly cartId: string;
  readonly type: CartTypeValue;
  readonly status: CartStatusValue;
  readonly createdAt: string;
}

// ─── Simple action response ────────────────
export interface CartActionResponseDTO {
  readonly success: true;
  readonly cartId: string;
  readonly message: string;
  readonly at: string;
}
