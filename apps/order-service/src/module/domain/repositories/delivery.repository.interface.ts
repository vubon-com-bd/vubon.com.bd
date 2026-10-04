/**
 * Delivery Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeliveryEntity } from '../entities/delivery.entity.js';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';

export const DELIVERY_REPOSITORY = Symbol('DELIVERY_REPOSITORY');

export interface DeliveryRepository extends BaseRepository<DeliveryEntity, string> {
  findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly DeliveryEntity[]>;
  findByStatus(status: DeliveryStatusVO): Promise<readonly DeliveryEntity[]>;
  findByTrackingNumber(trackingNumber: string): Promise<DeliveryEntity | null>;
  findByCourierId(courierId: string): Promise<readonly DeliveryEntity[]>;
  findActiveByOrder(orderId: OrderIdVO): Promise<DeliveryEntity | null>;
  findOverdue(before: string): Promise<readonly DeliveryEntity[]>;
  softDelete(id: string): Promise<void>;
}
