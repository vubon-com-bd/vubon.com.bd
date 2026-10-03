/**
 * Order Return Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderReturnEntity } from '../entities/order-return.entity.js';
import { ReturnIdVO } from '../value-objects/primitives/return-id.vo.js';
import { ReturnStatusVO } from '../value-objects/primitives/return-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

export const ORDER_RETURN_REPOSITORY = Symbol('ORDER_RETURN_REPOSITORY');

export interface OrderReturnRepository
  extends BaseRepository<OrderReturnEntity, string> {
  findByIdVO(id: ReturnIdVO): Promise<OrderReturnEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly OrderReturnEntity[]>;
  findByCustomerId(
    customerId: CustomerIdVO,
  ): Promise<readonly OrderReturnEntity[]>;
  findByStatus(status: ReturnStatusVO): Promise<readonly OrderReturnEntity[]>;
  findActiveByOrder(orderId: OrderIdVO): Promise<OrderReturnEntity | null>;
  findPendingOlderThan(hours: number): Promise<readonly OrderReturnEntity[]>;
}
