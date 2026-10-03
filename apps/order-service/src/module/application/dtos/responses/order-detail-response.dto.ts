import type { OrderResponseDTO, OrderItemResponseDTO } from './order-response.dto.js';

export interface OrderStatusHistoryEntryDTO {
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedAt: string;
  readonly changedBy?: string;
}

export interface OrderDetailResponseDTO {
  readonly order: OrderResponseDTO;
  readonly items: readonly OrderItemResponseDTO[];
  readonly statusHistory: readonly OrderStatusHistoryEntryDTO[];
  readonly cancellations: readonly unknown[];
  readonly returns: readonly unknown[];
  readonly fulfillments: readonly unknown[];
  readonly tracking: readonly unknown[];
}
