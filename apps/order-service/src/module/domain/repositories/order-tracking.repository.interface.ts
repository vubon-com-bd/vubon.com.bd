import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderTrackingEntity } from '../entities/order-tracking.entity';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo';

export interface OrderTrackingRepository
  extends BaseRepository<OrderTrackingEntity, TrackingIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<readonly OrderTrackingEntity[]>;
  findByTrackingNumber(number: TrackingNumberVO): Promise<OrderTrackingEntity | null>;
}
