/**
 * ShipmentMapper — Entity → Response DTO
 * @module logistics-service/application/mappers/shipment
 *
 * Static methods (Payment pattern). No state, no DI.
 */
import type { ShipmentEntity } from '@domain/entities/shipment.entity';
import type {
  ShipmentResponseDTO,
  ShipmentPublicResponseDTO,
  ShipmentSummaryResponseDTO,
  ShipmentListResponseDTO,
  ShipmentTimelineResponseDTO,
  ShipmentTimelineEntryDTO,
  ShipmentStatsResponseDTO,
} from '@application/dtos/responses/shipment/index.js';

export class ShipmentMapper {
  // ═══ Full admin view ═══
  static toResponse(e: ShipmentEntity): ShipmentResponseDTO {
    return {
      id: e.id,
      shipmentNumber: e.shipmentNumber.value,
      trackingNumber: e.trackingNumber,
      status: e.status.value,
      type: e.type.value,
      priority: e.priority.value,

      orderId: e.orderId,
      userId: e.userId,
      vendorId: e.vendorId,
      warehouseId: e.warehouseId,
      courierId: e.courierId,
      courierTrackingNumber: e.courierTrackingNumber,

      shippingAddress: e.shippingAddress,
      pickupAddress: e.pickupAddress,

      itemCount: e.itemCount,
      totalWeightKg: e.totalWeightKg,
      totalVolumeM3: e.totalVolumeM3,

      declaredValue: e.declaredValue,
      currency: e.currency,
      shippingCost: e.shippingCost,
      codAmount: e.codAmount,
      isCOD: e.isCOD,
      isInsured: e.isInsured,

      labelUrl: e.labelUrl,

      estimatedDeliveryAt: e.estimatedDeliveryAt,
      confirmedAt: e.confirmedAt,
      processingStartedAt: e.processingStartedAt,
      packedAt: e.packedAt,
      pickedUpAt: e.pickedUpAt,
      inTransitAt: e.inTransitAt,
      outForDeliveryAt: e.outForDeliveryAt,
      deliveredAt: e.deliveredAt,
      failedAt: e.failedAt,
      returnedAt: e.returnedAt,
      cancelledAt: e.cancelledAt,
      onHoldAt: e.onHoldAt,
      delayedAt: e.delayedAt,

      cancelledBy: e.cancelledBy,
      failureReason: e.failureReason,
      cancelReason: e.cancelReason,
      holdReason: e.holdReason,
      delayReason: e.delayReason,
      notes: e.notes,
      metadata: e.metadata,

      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  // ═══ Customer-safe ═══
  static toPublicResponse(e: ShipmentEntity): ShipmentPublicResponseDTO {
    return {
      id: e.id,
      trackingNumber: e.trackingNumber,
      status: e.status.value,
      type: e.type.value,
      itemCount: e.itemCount,
      estimatedDeliveryAt: e.estimatedDeliveryAt,
      deliveredAt: e.deliveredAt,
      createdAt: e.createdAt,
    };
  }

  // ═══ List summary ═══
  static toSummary(e: ShipmentEntity): ShipmentSummaryResponseDTO {
    return {
      id: e.id,
      shipmentNumber: e.shipmentNumber.value,
      trackingNumber: e.trackingNumber,
      status: e.status.value,
      type: e.type.value,
      priority: e.priority.value,
      itemCount: e.itemCount,
      createdAt: e.createdAt,
    };
  }

  static toListResponse(
    entities: readonly ShipmentEntity[],
    total: number,
    page: number,
    limit: number,
  ): ShipmentListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ═══ Timeline ═══
  static toTimelineResponse(e: ShipmentEntity): ShipmentTimelineResponseDTO {
    const entries: ShipmentTimelineEntryDTO[] = [];
    const push = (
      status: ShipmentStatusValue,
      occurredAt?: string,
      reason?: string,
    ) => {
      if (!occurredAt) return;
      entries.push({ status, occurredAt, reason });
    };

    push('pending', e.createdAt);
    push('confirmed', e.confirmedAt);
    push('processing', e.processingStartedAt);
    push('packed', e.packedAt);
    push('picked_up', e.pickedUpAt);
    push('in_transit', e.inTransitAt);
    push('out_for_delivery', e.outForDeliveryAt);
    push('delivered', e.deliveredAt);
    push('failed', e.failedAt, e.failureReason);
    push('returned', e.returnedAt);
    push('cancelled', e.cancelledAt, e.cancelReason);
    push('on_hold', e.onHoldAt, e.holdReason);
    push('delayed', e.delayedAt, e.delayReason);

    entries.sort(
      (a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime(),
    );

    return {
      shipmentId: e.id,
      currentStatus: e.status.value,
      entries,
    };
  }

  // ═══ Stats passthrough ═══
  static toStatsResponse(stats: {
    total: number;
    totalRevenue: number;
    totalCOD: number;
    currency: string;
    byStatus: Readonly<Record<string, number>>;
    byType: Readonly<Record<string, number>>;
    byPriority: Readonly<Record<string, number>>;
    averageWeightKg: number;
    averageItemCount: number;
    fromDate?: string;
    toDate?: string;
  }): ShipmentStatsResponseDTO {
    return {
      ...stats,
      generatedAt: new Date().toISOString(),
    };
  }
}

// Type alias to satisfy DTO import
import type { ShipmentStatusValue } from '@domain/primitives/shipment-status.vo';
