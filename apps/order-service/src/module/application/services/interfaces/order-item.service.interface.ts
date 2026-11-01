/**
 * IOrderItemService — contract
 * @module order-service/application/services/interfaces
 */
import type {
  AddOrderItemCommandDTO,
  UpdateOrderItemCommandDTO,
  RemoveOrderItemCommandDTO,
} from '../../dtos/requests/order-item/index.js';
import type {
  OrderItemResponseDTO,
  OrderItemListResponseDTO,
} from '../../dtos/responses/order-item-response.dto.js';

// ─── DI Token ──────────────────────────────
export const ORDER_ITEM_SERVICE = Symbol('ORDER_ITEM_SERVICE');

// ─── Main Interface ────────────────────────
export interface IOrderItemService {
  // Commands
  add(dto: AddOrderItemCommandDTO, actorId?: string): Promise<OrderItemResponseDTO>;
  update(dto: UpdateOrderItemCommandDTO, actorId?: string): Promise<OrderItemResponseDTO>;
  remove(dto: RemoveOrderItemCommandDTO, actorId?: string): Promise<void>;

  // Queries
  getById(id: string): Promise<OrderItemResponseDTO>;
  listByOrder(orderId: string): Promise<OrderItemListResponseDTO>;
}
