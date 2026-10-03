/**
 * TrackingMapper — Entity → DTO
 * @module order-service/application/mappers
 */
import type { OrderTrackingEntity } from '../../domain/entities/order-tracking.entity.js';
import type {
  TrackingResponseDTO,
  TrackingSummaryResponseDTO,
} from '../dtos/responses/tracking-response.dto.js';

export class TrackingMapper {
  static toResponse(entity: OrderTrackingEntity): TrackingResponseDTO {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      event: entity.event.value,
      message: entity.message,
      location: entity.location,
      latitude: entity.latitude,
      longitude: entity.longitude,
      trackingNumber: entity.trackingNumber,
      createdBy: entity.createdBy,
      metadata: entity.metadata,
      occurredAt: entity.occurredAt,
      createdAt: entity.createdAt,
    };
  }

  static toList(entities: readonly OrderTrackingEntity[]): TrackingResponseDTO[] {
    return entities.map((e) => this.toResponse(e));
  }

  static toSummary(
    orderId: string,
    entities: readonly OrderTrackingEntity[],
  ): TrackingSummaryResponseDTO {
    const sorted = [...entities].sort(
      (a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt),
    );
    const latest = sorted[0];
    return {
      orderId,
      currentEvent: latest?.event.value ?? 'order_placed',
      currentMessage: latest?.message ?? 'Order tracking not available',
      lastUpdatedAt: latest?.occurredAt ?? new Date().toISOString(),
      events: this.toList(entities),
    };
  }
}
