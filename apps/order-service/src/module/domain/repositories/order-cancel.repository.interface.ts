import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderCancelEntity } from '../entities/order-cancel.entity';
import { CancelIdVO } from '../value-objects/primitives/cancel-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface OrderCancelRepository
  extends BaseRepository<OrderCancelEntity, CancelIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<OrderCancelEntity | null>;
  findByStatus(status: string): Promise<readonly OrderCancelEntity[]>;
}
