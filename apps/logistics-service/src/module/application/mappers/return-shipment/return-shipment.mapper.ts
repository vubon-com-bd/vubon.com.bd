import type { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity';
import type {
  ReturnShipmentResponseDTO,
  ReturnShipmentSummaryResponseDTO,
  ReturnShipmentListResponseDTO,
  ReturnShipmentStatsResponseDTO,
} from '@application/dtos/responses/return-shipment/index.js';

export class ReturnShipmentMapper {
  static toResponse(e: ReturnShipmentEntity): ReturnShipmentResponseDTO {
    return {
      id: e.id,
      rmaNumber: e.rmaNumber,
      orderId: e.orderId,
      originalShipmentId: e.originalShipmentId,
      userId: e.userId,
      status: e.status.value,
      type: e.type.value,
      reason: e.reason.value,
      description: e.description,
      images: e.images,
      itemIds: e.itemIds,
      itemCount: e.itemCount,
      pickupAddress: e.pickupAddress,
      pickupScheduledAt: e.pickupScheduledAt,
      pickedUpAt: e.pickedUpAt,
      inTransitAt: e.inTransitAt,
      receivedAt: e.receivedAt,
      inspectedAt: e.inspectedAt,
      inspectedBy: e.inspectedBy,
      completedAt: e.completedAt,
      cancelledAt: e.cancelledAt,
      rejectedAt: e.rejectedAt,
      lostAt: e.lostAt,
      restockable: e.restockable,
      refundAmount: e.refundAmount,
      refundCurrency: e.refundCurrency,
      restockFeeAmount: e.restockFeeAmount,
      trackingNumber: e.trackingNumber,
      approveBy: e.approveBy,
      rejectReason: e.rejectReason,
      cancelReason: e.cancelReason,
      notes: e.notes,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: ReturnShipmentEntity): ReturnShipmentSummaryResponseDTO {
    return {
      id: e.id,
      rmaNumber: e.rmaNumber,
      status: e.status.value,
      type: e.type.value,
      itemCount: e.itemCount,
      refundAmount: e.refundAmount,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly ReturnShipmentEntity[],
    total: number,
    page: number,
    limit: number,
  ): ReturnShipmentListResponseDTO {
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
    byType: Readonly<Record<string, number>>;
    totalRefunded: number;
    currency: string;
    averageRefund: number;
  }): ReturnShipmentStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
