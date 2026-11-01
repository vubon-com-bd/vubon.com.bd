import type { FulfillmentEntity } from '@domain/entities/fulfillment.entity';
import type {
  FulfillmentResponseDTO,
  FulfillmentSummaryResponseDTO,
  FulfillmentListResponseDTO,
  FulfillmentStatsResponseDTO,
} from '@application/dtos/responses/fulfillment/index.js';

export class FulfillmentMapper {
  static toResponse(e: FulfillmentEntity): FulfillmentResponseDTO {
    return {
      id: e.id,
      orderId: e.orderId,
      vendorId: e.vendorId,
      warehouseId: e.warehouseId,
      status: e.status.value,
      type: e.type.value,
      priority: e.priority.value,
      itemIds: e.itemIds,
      itemCount: e.itemCount,
      assignedTo: e.assignedTo,
      pickedAt: e.pickedAt,
      packedAt: e.packedAt,
      shippedAt: e.shippedAt,
      fulfilledAt: e.fulfilledAt,
      cancelledAt: e.cancelledAt,
      failedAt: e.failedAt,
      onHoldAt: e.onHoldAt,
      slaDueAt: e.slaDueAt,
      failureReason: e.failureReason,
      cancelReason: e.cancelReason,
      holdReason: e.holdReason,
      notes: e.notes,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: FulfillmentEntity): FulfillmentSummaryResponseDTO {
    return {
      id: e.id,
      orderId: e.orderId,
      status: e.status.value,
      type: e.type.value,
      priority: e.priority.value,
      itemCount: e.itemCount,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly FulfillmentEntity[],
    total: number,
    page: number,
    limit: number,
  ): FulfillmentListResponseDTO {
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
    byPriority: Readonly<Record<string, number>>;
    averageItemCount: number;
    slaBreachedCount: number;
  }): FulfillmentStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
