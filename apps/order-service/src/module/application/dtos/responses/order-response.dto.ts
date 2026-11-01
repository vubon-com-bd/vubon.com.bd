/**
 * Order Response DTOs
 * @module order-service/application/dtos/responses
 *
 * Multi-shape output:
 *  - Full: admin (all fields)
 *  - Public: customer-safe
 *  - Summary: list views
 *  - List: paginated
 *  - Detail: with children
 *  - Stats: aggregated
 */
import type {
  OrderStatusValue,
  OrderPriorityValue,
} from '@vubon/shared-types/business/order';

// ─── Full (admin) ─────────────────────────
export interface OrderResponseDTO {
  readonly id: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly status: OrderStatusValue;
  readonly priority: OrderPriorityValue;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly paymentId?: string;
  readonly paymentMethod?: string;
  readonly notes?: string;
  readonly customerNotes?: string;
  readonly confirmedAt?: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
  readonly cancelledAt?: string;
  readonly completedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Public (customer-safe) ───────────────
export interface OrderPublicResponseDTO {
  readonly id: string;
  readonly orderNumber: string;
  readonly status: OrderStatusValue;
  readonly priority: OrderPriorityValue;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
}

// ─── Summary (list) ───────────────────────
export interface OrderSummaryResponseDTO {
  readonly id: string;
  readonly orderNumber: string;
  readonly status: OrderStatusValue;
  readonly total: number;
  readonly currency: string;
  readonly itemCount: number;
  readonly createdAt: string;
}

// ─── List (paginated) ─────────────────────
export interface OrderListResponseDTO {
  readonly items: readonly OrderSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Detail (with children) ───────────────
export interface OrderDetailResponseDTO {
  readonly order: OrderResponseDTO;
  readonly items: readonly import('./order-item-response.dto.js').OrderItemSummaryDTO[];
  readonly statusHistory?: readonly OrderStatusHistoryEntryDTO[];
}

export interface OrderStatusHistoryEntryDTO {
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedAt: string;
  readonly changedBy?: string;
}

// ─── Stats (aggregated) ───────────────────
export interface OrderStatsResponseDTO {
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly averageOrderValue: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
}

// ─── Create/action response ───────────────
export interface OrderCreateResponseDTO {
  readonly success: true;
  readonly orderId: string;
  readonly orderNumber: string;
  readonly status: OrderStatusValue;
}
