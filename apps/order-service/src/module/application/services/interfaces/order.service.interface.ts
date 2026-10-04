/**
 * IOrderService — contract
 * @module order-service/application/services/interfaces
 */
import type { CreateOrderRequestDTO } from '../../dtos/requests/order/create-order.dto.js';
import type { UpdateOrderRequestDTO } from '../../dtos/requests/order/update-order.dto.js';
import type { ConfirmOrderStatusRequestDTO } from '../../dtos/requests/order/confirm-order.dto.js';
import type { HoldOrderRequestDTO } from '../../dtos/requests/order/hold-order.dto.js';
import type { ReleaseOrderRequestDTO } from '../../dtos/requests/order/release-order.dto.js';
import type {
  OrderResponseDTO,
} from '../../dtos/responses/order-response.dto.js';
import type { OrderPublicResponseDTO } from '../../dtos/responses/order-public-response.dto.js';
import type {
  OrderListResponseDTO,
  OrderSummaryResponseDTO,
} from '../../dtos/responses/order-list-response.dto.js';
import type { OrderDetailResponseDTO } from '../../dtos/responses/order-detail-response.dto.js';

export const ORDER_SERVICE = Symbol('ORDER_SERVICE');

export interface OrderListFilterDTO {
  readonly customerId?: string;
  readonly vendorId?: string;
  readonly status?: string;
  readonly priority?: string;
  readonly type?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minTotal?: number;
  readonly maxTotal?: number;
  readonly search?: string;
}

export interface OrderListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'total' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: OrderListFilterDTO;
}

export interface OrderStatsDTO {
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly averageOrderValue: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface IOrderService {
  create(dto: CreateOrderRequestDTO, actorId?: string): Promise<OrderResponseDTO>;
  update(dto: UpdateOrderRequestDTO, actorId?: string): Promise<OrderResponseDTO>;
  delete(orderId: string, actorId?: string): Promise<void>;
  confirm(dto: ConfirmOrderStatusRequestDTO, actorId?: string): Promise<OrderResponseDTO>;
  hold(dto: HoldOrderRequestDTO, actorId?: string): Promise<OrderResponseDTO>;
  release(dto: ReleaseOrderRequestDTO, actorId?: string): Promise<OrderResponseDTO>;
  getById(orderId: string): Promise<OrderResponseDTO>;
  getByNumber(orderNumber: string): Promise<OrderResponseDTO>;
  getPublic(orderId: string): Promise<OrderPublicResponseDTO>;
  getDetail(orderId: string): Promise<OrderDetailResponseDTO>;
  list(options: OrderListOptionsDTO): Promise<OrderListResponseDTO>;
  listByCustomer(customerId: string, options: OrderListOptionsDTO): Promise<OrderListResponseDTO>;
  listByVendor(vendorId: string, options: OrderListOptionsDTO): Promise<OrderListResponseDTO>;
  getStats(customerId?: string, vendorId?: string): Promise<OrderStatsDTO>;
  ship(orderId: string, trackingNumber?: string, courierId?: string, actorId?: string): Promise<OrderResponseDTO>;
  deliver(orderId: string, receivedBy?: string, actorId?: string): Promise<OrderResponseDTO>;
  complete(orderId: string, actorId?: string): Promise<OrderResponseDTO>;
}

export type { OrderSummaryResponseDTO };
