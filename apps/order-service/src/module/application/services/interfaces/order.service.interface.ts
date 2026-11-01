/**
 * IOrderService — contract
 * @module order-service/application/services/interfaces
 */
import type {
  CreateOrderCommandDTO,
  UpdateOrderCommandDTO,
  DeleteOrderCommandDTO,
  ConfirmOrderCommandDTO,
  HoldOrderCommandDTO,
  ReleaseOrderCommandDTO,
} from '../../dtos/requests/order/index.js';
import type {
  OrderResponseDTO,
  OrderPublicResponseDTO,
  OrderListResponseDTO,
  OrderDetailResponseDTO,
  OrderStatsResponseDTO,
  OrderCreateResponseDTO,
} from '../../dtos/responses/order-response.dto.js';

// ─── DI Token ──────────────────────────────
export const ORDER_SERVICE = Symbol('ORDER_SERVICE');

// ─── Filter / Options ──────────────────────
export interface OrderListFilterDTO {
  readonly customerId?: string;
  readonly vendorId?: string;
  readonly status?: string;
  readonly priority?: string;
  readonly channel?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minTotal?: number;
  readonly maxTotal?: number;
  readonly search?: string;
}

export interface OrderListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'totalAmount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: OrderListFilterDTO;
}

// ─── Main Interface ────────────────────────
export interface IOrderService {
  create(dto: CreateOrderCommandDTO, userId: string): Promise<OrderCreateResponseDTO>;
  update(dto: UpdateOrderCommandDTO, actorId?: string): Promise<OrderResponseDTO>;
  delete(dto: DeleteOrderCommandDTO, actorId?: string): Promise<void>;
  confirm(dto: ConfirmOrderCommandDTO, actorId?: string): Promise<OrderResponseDTO>;
  hold(dto: HoldOrderCommandDTO, actorId?: string): Promise<OrderResponseDTO>;
  release(dto: ReleaseOrderCommandDTO, actorId?: string): Promise<OrderResponseDTO>;

  getById(id: string): Promise<OrderResponseDTO>;
  getByNumber(orderNumber: string): Promise<OrderResponseDTO>;
  getPublic(id: string): Promise<OrderPublicResponseDTO>;
  getDetail(id: string): Promise<OrderDetailResponseDTO>;
  list(options: OrderListOptionsDTO): Promise<OrderListResponseDTO>;
  listByCustomer(
    customerId: string,
    options: OrderListOptionsDTO,
  ): Promise<OrderListResponseDTO>;
  listByVendor(
    vendorId: string,
    options: OrderListOptionsDTO,
  ): Promise<OrderListResponseDTO>;
  getStats(customerId?: string): Promise<OrderStatsResponseDTO>;
}
