/**
 * Order Response Types — wrappers for API responses
 * @module shared-types/business/order
 */
import type { OrderId, UserId, Money } from '../../common/primitives/index.js';
import type { OrderPublic } from './order.types.js';
import type { OrderStatusValue } from './order-status.types.js';

export interface OrderListDTO {
  readonly orders: readonly OrderSummaryDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface OrderSummaryDTO {
  readonly id: OrderId;
  readonly orderNumber: string;
  readonly status: OrderStatusValue;
  readonly itemCount: number;
  readonly total: Money;
  readonly currency: string;
  readonly createdAt: string;
}

export interface OrderDetailDTO {
  readonly order: OrderPublic;
  readonly items: readonly OrderDetailItemDTO[];
  readonly statusHistory: readonly OrderStatusHistoryEntryDTO[];
}

export interface OrderDetailItemDTO {
  readonly id: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly name: string;
  readonly sku: string;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly total: Money;
  readonly status: string;
}

export interface OrderStatusHistoryEntryDTO {
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedAt: string;
  readonly changedBy?: string;
}

export interface OrderStatsDTO {
  readonly totalOrders: number;
  readonly totalRevenue: Money;
  readonly averageOrderValue: Money;
  readonly currency: string;
  readonly byStatus: Readonly<Record<OrderStatusValue, number>>;
}

export interface OrderResponseDTO {
  readonly success: true;
  readonly order: OrderPublic;
}

export interface OrderListResponseDTO {
  readonly success: true;
  readonly orders: readonly OrderSummaryDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface OrderStatsResponseDTO {
  readonly success: true;
  readonly stats: OrderStatsDTO;
}
