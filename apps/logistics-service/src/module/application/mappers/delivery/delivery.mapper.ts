/**
 * DeliveryMapper — Entity → Response DTO
 */
import type { DeliveryEntity } from '@domain/entities/delivery.entity';
import type {
  DeliveryResponseDTO,
  DeliveryPublicResponseDTO,
  DeliverySummaryResponseDTO,
  DeliveryListResponseDTO,
  DeliveryStatsResponseDTO,
} from '@application/dtos/responses/delivery/index.js';

export class DeliveryMapper {
  static toResponse(e: DeliveryEntity): DeliveryResponseDTO {
    return {
      id: e.id,
      shipmentId: e.shipmentId,
      orderId: e.orderId,
      userId: e.userId,
      status: e.status.value,
      type: e.type.value,
      window: e.window ? { startAt: e.window.startAt, endAt: e.window.endAt } : undefined,
      driverId: e.driverId,
      vehicleId: e.vehicleId,
      routeId: e.routeId,
      recipientName: e.recipientName,
      recipientPhone: e.recipientPhone,
      deliveryAddress: e.deliveryAddress,
      scheduledAt: e.scheduledAt,
      pickedUpAt: e.pickedUpAt,
      inTransitAt: e.inTransitAt,
      outForDeliveryAt: e.outForDeliveryAt,
      arrivedAt: e.arrivedAt,
      deliveredAt: e.deliveredAt,
      failedAt: e.failedAt,
      cancelledAt: e.cancelledAt,
      refusedAt: e.refusedAt,
      rescheduledAt: e.rescheduledAt,
      attemptCount: e.attemptCount,
      failureReason: e.failureReason,
      cancelReason: e.cancelReason,
      refusedReason: e.refusedReason,
      notes: e.notes,
      metadata: e.metadata,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toPublicResponse(e: DeliveryEntity): DeliveryPublicResponseDTO {
    return {
      id: e.id,
      status: e.status.value,
      recipientName: e.recipientName,
      estimatedDeliveryAt: e.window?.endAt,
      deliveredAt: e.deliveredAt,
      attemptCount: e.attemptCount,
      createdAt: e.createdAt,
    };
  }

  static toSummary(e: DeliveryEntity): DeliverySummaryResponseDTO {
    return {
      id: e.id,
      shipmentId: e.shipmentId,
      orderId: e.orderId,
      status: e.status.value,
      type: e.type.value,
      attemptCount: e.attemptCount,
      createdAt: e.createdAt,
    };
  }

  static toListResponse(
    entities: readonly DeliveryEntity[],
    total: number,
    page: number,
    limit: number,
  ): DeliveryListResponseDTO {
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
    totalDelivered: number;
    totalFailed: number;
    successRate: number;
    averageAttempts: number;
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
  }): DeliveryStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
