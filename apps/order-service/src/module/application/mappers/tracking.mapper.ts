import { OrderTrackingEntity } from '../../domain/entities/order-tracking.entity';
import type { TrackingResponseDTO } from '../dtos/responses/tracking-response.dto';

export class TrackingMapper {
  static toResponse(t: OrderTrackingEntity): TrackingResponseDTO {
    return {
      id: t.id.value,
      orderId: t.orderId.value,
      status: t.status.value,
      trackingNumber: t.trackingNumber?.value ?? null,
      carrier: t.carrier,
      events: [...t.events],
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }
}
