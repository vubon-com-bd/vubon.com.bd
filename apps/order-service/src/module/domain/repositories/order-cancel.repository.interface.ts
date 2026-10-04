/**
 * Order Cancel Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderCancelEntity } from '../entities/order-cancel.entity.js';
import { CancelIdVO } from '../value-objects/primitives/cancel-id.vo.js';
import { CancelStatusVO } from '../value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

export const ORDER_CANCEL_REPOSITORY = Symbol('ORDER_CANCEL_REPOSITORY');

export interface OrderCancelRepository
  extends BaseRepository<OrderCancelEntity, string> {
  findByIdVO(id: CancelIdVO): Promise<OrderCancelEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly OrderCancelEntity[]>;
  findActiveByOrder(orderId: OrderIdVO): Promise<OrderCancelEntity | null>;
  findByStatus(status: CancelStatusVO): Promise<readonly OrderCancelEntity[]>;
  findByCustomerId(
    customerId: CustomerIdVO,
  ): Promise<readonly OrderCancelEntity[]>;
  existsByOrderId(orderId: OrderIdVO): Promise<boolean>;
}
