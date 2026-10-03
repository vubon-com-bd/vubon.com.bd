/**
 * IOrderItemService
 */
import type { AddOrderItemRequestDTO } from '../../dtos/requests/order-item/add-order-item.dto.js';
import type { UpdateOrderItemRequestDTO } from '../../dtos/requests/order-item/update-order-item.dto.js';
import type { RemoveOrderItemRequestDTO } from '../../dtos/requests/order-item/remove-order-item.dto.js';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-response.dto.js';
import type { OrderItemListResponseDTO } from '../../dtos/responses/order-item-response.dto.js';

export const ORDER_ITEM_SERVICE = Symbol('ORDER_ITEM_SERVICE');

export interface IOrderItemService {
  add(dto: AddOrderItemRequestDTO, actorId?: string): Promise<OrderItemResponseDTO>;
  update(dto: UpdateOrderItemRequestDTO, actorId?: string): Promise<OrderItemResponseDTO>;
  remove(dto: RemoveOrderItemRequestDTO, actorId?: string): Promise<void>;
  getById(itemId: string): Promise<OrderItemResponseDTO>;
  listByOrder(orderId: string): Promise<OrderItemListResponseDTO>;
}
