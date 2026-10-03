import type { OrderItemResponseDTO } from './order-response.dto.js';

export interface OrderItemListResponseDTO {
  readonly items: readonly OrderItemResponseDTO[];
  readonly total: number;
}
