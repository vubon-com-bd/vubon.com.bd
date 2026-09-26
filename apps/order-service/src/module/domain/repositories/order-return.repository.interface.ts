import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderReturnEntity } from '../entities/order-return.entity';
import { ReturnIdVO } from '../value-objects/primitives/return-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface OrderReturnRepository
  extends BaseRepository<OrderReturnEntity, ReturnIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<OrderReturnEntity | null>;
  findByStatus(status: string): Promise<readonly OrderReturnEntity[]>;
}
