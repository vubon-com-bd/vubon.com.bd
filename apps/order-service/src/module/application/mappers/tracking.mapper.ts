/**
 * Tracking Mapper
 * @module order-service/application/mappers
 */
import type { OrderTrackingEntity } from '../../domain/entities/order-tracking.entity.js';
import type {
  TrackingEntryResponseDTO,
  TrackingSummaryResponseDTO,
  TrackingListResponseDTO,
} from '../dtos/responses/tracking-response.dto.js';

export class TrackingMapper {
  static toResponse(entity: OrderTrackingEntity): TrackingEntryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      orderId: vo.orderId.value,
      status: vo.status.value,
      trackingNumber: vo.trackingNumber.value,
      message: vo.message,
      location: vo.location,
      carrier: vo.carrier,
      occurredAt: vo.occurredAt,
    };
  }

  static toSummary(
    orderId: string,
    entities: readonly OrderTrackingEntity[],
  ): TrackingSummaryResponseDTO {
    const latest = entities[0];
    return {
      orderId,
      trackingNumber: latest?.vo.trackingNumber.value ?? '',
      currentStatus: latest?.vo.status.value ?? 'pending',
      currentMessage: latest?.vo.message ?? '',
      lastUpdatedAt: latest?.vo.occurredAt ?? new Date().toISOString(),
      events: entities.map((e) => this.toResponse(e)),
    };
  }

  static toListResponse(
    entities: readonly OrderTrackingEntity[],
  ): TrackingListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total: entities.length,
    };
  }
}
