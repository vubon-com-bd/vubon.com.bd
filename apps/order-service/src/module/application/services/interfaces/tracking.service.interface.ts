import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { OrderTrackingEntity } from '../../../domain/entities/order-tracking.entity';
import type { TrackingResponseDTO } from '../../dtos/responses/tracking-response.dto';

export interface TrackingServiceInterface
  extends BaseServiceInterface<OrderTrackingEntity, string> {
  add(orderId: string, trackingNumber: string, carrier: string): Promise<TrackingResponseDTO>;
  update(trackingId: string, status: string): Promise<TrackingResponseDTO>;
  remove(trackingId: string): Promise<void>;
  findByOrder(orderId: string): Promise<readonly TrackingResponseDTO[]>;
}
