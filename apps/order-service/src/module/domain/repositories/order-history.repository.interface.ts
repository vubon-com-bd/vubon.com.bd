import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderHistoryEntity } from '../entities/order-history.entity';
import { HistoryIdVO } from '../value-objects/primitives/history-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface OrderHistoryRepository
  extends BaseRepository<OrderHistoryEntity, HistoryIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<readonly OrderHistoryEntity[]>;
  findRecent(orderId: OrderIdVO, limit: number): Promise<readonly OrderHistoryEntity[]>;
}
