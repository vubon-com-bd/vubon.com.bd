/**
 * Order History Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderHistoryEntity } from '../entities/order-history.entity.js';
import { HistoryIdVO } from '../value-objects/primitives/history-id.vo.js';
import { HistoryTypeVO } from '../value-objects/primitives/history-type.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';

export const ORDER_HISTORY_REPOSITORY = Symbol('ORDER_HISTORY_REPOSITORY');

export interface OrderHistoryRepository
  extends BaseRepository<OrderHistoryEntity, string> {
  findByIdVO(id: HistoryIdVO): Promise<OrderHistoryEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly OrderHistoryEntity[]>;
  findByType(
    orderId: OrderIdVO,
    type: HistoryTypeVO,
  ): Promise<readonly OrderHistoryEntity[]>;
  findRecentByOrder(
    orderId: OrderIdVO,
    limit: number,
  ): Promise<readonly OrderHistoryEntity[]>;
  countByOrder(orderId: OrderIdVO): Promise<number>;
  deleteByOrder(orderId: OrderIdVO): Promise<void>;
}
