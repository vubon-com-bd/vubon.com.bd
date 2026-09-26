import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { OrderEntity } from '../../../domain/entities/order.entity';
import type { CreateOrderRequestDTO } from '../../dtos/requests/order/create-order.dto';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto';
import type { OrderDetailResponseDTO } from '../../dtos/responses/order-detail-response.dto';
import type { OrderListResponseDTO } from '../../dtos/responses/order-list-response.dto';
import type { OrderStatsResponseDTO } from '../../dtos/responses/order-stats-response.dto';

export interface OrderServiceInterface
  extends BaseServiceInterface<OrderEntity, string> {
  create(input: CreateOrderRequestDTO): Promise<OrderResponseDTO>;
  findById(orderId: string): Promise<OrderDetailResponseDTO | null>;
  findByNumber(orderNumber: string): Promise<OrderDetailResponseDTO | null>;
  list(page: number, limit: number): Promise<OrderListResponseDTO>;
  listByCustomer(customerId: string): Promise<readonly OrderResponseDTO[]>;
  listByVendor(vendorId: string): Promise<readonly OrderResponseDTO[]>;
  confirm(orderId: string, paymentId: string): Promise<OrderResponseDTO>;
  hold(orderId: string, reason: string): Promise<void>;
  release(orderId: string): Promise<void>;
  delete(orderId: string): Promise<void>;
  getStats(): Promise<OrderStatsResponseDTO>;
}
