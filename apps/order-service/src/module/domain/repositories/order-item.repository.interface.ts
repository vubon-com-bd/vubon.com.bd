import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderItemEntity } from '../entities/order-item.entity';
import { OrderItemIdVO } from '../value-objects/primitives/order-item-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface OrderItemRepository
  extends BaseRepository<OrderItemEntity, OrderItemIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<readonly OrderItemEntity[]>;
  deleteByOrder(orderId: OrderIdVO): Promise<void>;
}
