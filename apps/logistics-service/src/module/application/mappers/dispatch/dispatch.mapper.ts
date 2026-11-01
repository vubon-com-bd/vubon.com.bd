import type { DispatchEntity } from '@domain/entities/dispatch.entity';
import type {
  DispatchResponseDTO,
  DispatchSummaryResponseDTO,
  DispatchListResponseDTO,
  DispatchStatsResponseDTO,
} from '@application/dtos/responses/dispatch/index.js';

export class DispatchMapper {
  static toResponse(e: DispatchEntity): DispatchResponseDTO {
    return {
      id: e.id,
      dispatchNumber: e.dispatchNumber.value,
      status: e.status.value,
      type: e.type.value,
      shipmentIds: e.shipmentIds,
      itemCount: e.itemCount,
      courierId: e.courierId,
      vehicleId: e.vehicleId,
      driverId: e.driverId,
      warehouseId: e.warehouseId,
      manifestUrl: e.manifestUrl,
      totalWeight: e.totalWeight,
      dispatchedAt: e.dispatchedAt,
      inTransitAt: e.inTransitAt,
      estimatedArrivalAt: e.estimatedArrivalAt,
      deliveredAt: e.deliveredAt,
      failedAt: e.failedAt,
      returnedAt: e.returnedAt,
      cancelledAt: e.cancelledAt,
      failureReason: e.failureReason,
      cancelReason: e.cancelReason,
      returnReason: e.returnReason,
      notes: e.notes,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: DispatchEntity): DispatchSummaryResponseDTO {
    return {
      id: e.id,
      dispatchNumber: e.dispatchNumber.value,
      status: e.status.value,
      type: e.type.value,
      itemCount: e.itemCount,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly DispatchEntity[],
    total: number,
    page: number,
    limit: number,
  ): DispatchListResponseDTO {
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
    totalShipments: number;
    averageShipmentsPerDispatch: number;
  }): DispatchStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
