/**
 * Order Tracking Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderTrackingEntity } from '../entities/order-tracking.entity.js';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '../value-objects/primitives/tracking-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';

export const ORDER_TRACKING_REPOSITORY = Symbol('ORDER_TRACKING_REPOSITORY');

export interface OrderTrackingRepository
  extends BaseRepository<OrderTrackingEntity, string> {
  findByIdVO(id: TrackingIdVO): Promise<OrderTrackingEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly OrderTrackingEntity[]>;
  findByTrackingNumber(
    trackingNumber: string,
  ): Promise<readonly OrderTrackingEntity[]>;
  findLatestByOrder(orderId: OrderIdVO): Promise<OrderTrackingEntity | null>;
  findByEvent(
    orderId: OrderIdVO,
    event: TrackingStatusVO,
  ): Promise<readonly OrderTrackingEntity[]>;
  countByOrder(orderId: OrderIdVO): Promise<number>;
  findOldToPrune(before: string): Promise<readonly OrderTrackingEntity[]>;
}
