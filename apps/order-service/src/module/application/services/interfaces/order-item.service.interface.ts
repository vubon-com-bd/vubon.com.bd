import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { OrderItemEntity } from '../../../domain/entities/order-item.entity';
import type { AddOrderItemRequestDTO } from '../../dtos/requests/order-item/add-order-item.dto';
import type { UpdateOrderItemRequestDTO } from '../../dtos/requests/order-item/update-order-item.dto';
import type { OrderItemResponseDTO } from '../../dtos/responses/order-item-response.dto';

export interface OrderItemServiceInterface
  extends BaseServiceInterface<OrderItemEntity, string> {
  add(input: AddOrderItemRequestDTO): Promise<OrderItemResponseDTO>;
  update(input: UpdateOrderItemRequestDTO): Promise<OrderItemResponseDTO>;
  remove(itemId: string): Promise<void>;
  listByOrder(orderId: string): Promise<readonly OrderItemResponseDTO[]>;
}
