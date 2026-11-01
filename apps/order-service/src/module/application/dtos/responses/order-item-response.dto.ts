/**
 * Order Item Response DTOs
 * @module order-service/application/dtos/responses
 */
import type { OrderItemStatusValue } from '@vubon/shared-types/business/order';

// ─── Full ─────────────────────────────────
export interface OrderItemResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly name: string;
  readonly status: OrderItemStatusValue;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
  readonly lineTotal: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Summary (used in OrderDetailResponse) ─
export interface OrderItemSummaryDTO {
  readonly id: string;
  readonly productId: string;
  readonly name: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly lineTotal: number;
  readonly status: OrderItemStatusValue;
}

// ─── List ─────────────────────────────────
export interface OrderItemListResponseDTO {
  readonly items: readonly OrderItemSummaryDTO[];
  readonly total: number;
}
