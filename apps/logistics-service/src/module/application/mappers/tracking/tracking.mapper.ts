import type { TrackingEntity } from '@domain/entities/tracking.entity';
import type {
  TrackingResponseDTO,
  TrackingPublicResponseDTO,
  TrackingSummaryResponseDTO,
  TrackingListResponseDTO,
  TrackingStatsResponseDTO,
} from '@application/dtos/responses/tracking/index.js';

export class TrackingMapper {
  static toResponse(e: TrackingEntity): TrackingResponseDTO {
    return {
      id: e.id,
      trackingNumber: e.trackingNumber.value,
      shipmentId: e.shipmentId,
      orderId: e.orderId,
      courierCode: e.courierCode,
      status: e.status.value,
      source: e.source.value,
      currentEvent: e.currentEvent,
      currentLocation: e.currentLocation,
      estimatedDeliveryAt: e.estimatedDeliveryAt,
      expiresAt: e.expiresAt,
      eventCount: e.eventCount,
      lastUpdatedAt: e.lastUpdatedAt,
      completedAt: e.completedAt,
      failedAt: e.failedAt,
      expiredAt: e.expiredAt,
      failureReason: e.failureReason,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toPublicResponse(e: TrackingEntity): TrackingPublicResponseDTO {
    return {
      trackingNumber: e.trackingNumber.value,
      status: e.status.value,
      currentEvent: e.currentEvent,
      currentLocation: e.currentLocation,
      estimatedDeliveryAt: e.estimatedDeliveryAt,
      deliveredAt: e.completedAt,
      lastUpdatedAt: e.lastUpdatedAt,
    };
  }
  static toSummary(e: TrackingEntity): TrackingSummaryResponseDTO {
    return {
      id: e.id,
      trackingNumber: e.trackingNumber.value,
      status: e.status.value,
      eventCount: e.eventCount,
      lastUpdatedAt: e.lastUpdatedAt,
    };
  }
  static toListResponse(
    entities: readonly TrackingEntity[],
    total: number,
    page: number,
    limit: number,
  ): TrackingListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  static toStatsResponse(stats: {
    total: number;
    byStatus: Readonly<Record<string, number>>;
    bySource: Readonly<Record<string, number>>;
    averageEventCount: number;
  }): TrackingStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
