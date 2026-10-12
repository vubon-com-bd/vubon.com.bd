import type { TrackingEntity } from '../../domain/entities/tracking.entity.js';
import type {
  TrackingResponseDTO, TrackingPublicResponseDTO, TrackingListResponseDTO, TrackingEventResponseDTO,
} from '../dtos/responses/tracking/tracking-response.dto.js';
import type { TrackingStatusValue } from '@vubon/shared-types/logistics';
export class TrackingMapper {
  static toResponse(e: TrackingEntity): TrackingResponseDTO {
    const events: TrackingEventResponseDTO[] = e.eventsSorted.map((ev) => ({
      id: ev.id, event: ev.event.value, status: ev.status.value as TrackingStatusValue,
      source: ev.source.value, message: ev.message, location: ev.location,
      latitude: ev.latitude, longitude: ev.longitude,
      occurredAt: ev.occurredAt, receivedAt: ev.receivedAt,
    }));
    return {
      id: e.id, trackingNumber: e.trackingNumber.value,
      shipmentId: e.shipmentId?.value, orderId: e.orderId?.value, courierCode: e.courierCode,
      status: e.status.value as TrackingStatusValue,
      currentLocation: e.currentLocation,
      estimatedDeliveryAt: e.estimatedDeliveryAt,
      eventCount: e.eventCount, events,
      publicAccess: e.publicAccess, lastUpdatedAt: e.lastUpdatedAt,
      createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toPublicResponse(e: TrackingEntity): TrackingPublicResponseDTO {
    const events: TrackingEventResponseDTO[] = e.eventsSorted.map((ev) => ({
      id: ev.id, event: ev.event.value, status: ev.status.value as TrackingStatusValue,
      source: ev.source.value, message: ev.message, location: ev.location,
      latitude: ev.latitude, longitude: ev.longitude,
      occurredAt: ev.occurredAt, receivedAt: ev.receivedAt,
    }));
    return {
      trackingNumber: e.trackingNumber.value,
      status: e.status.value as TrackingStatusValue,
      currentEvent: e.currentEvent?.event.value,
      currentLocation: e.currentLocation,
      estimatedDeliveryAt: e.estimatedDeliveryAt,
      events,
    };
  }
  static toListResponse(items: readonly TrackingEntity[], total: number, page: number, limit: number): TrackingListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
