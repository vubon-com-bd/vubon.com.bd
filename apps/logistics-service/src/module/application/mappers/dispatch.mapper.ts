import type { DispatchEntity } from '../../domain/entities/dispatch.entity.js';
import type { DispatchResponseDTO, DispatchListResponseDTO } from '../dtos/responses/dispatch/dispatch-response.dto.js';
import type { DispatchTypeValue, DispatchStatusValue } from '@vubon/shared-types/logistics';
export class DispatchMapper {
  static toResponse(e: DispatchEntity): DispatchResponseDTO {
    return {
      id: e.id, dispatchNumber: e.dispatchNumber.value,
      status: e.status.value as DispatchStatusValue,
      type: e.type.value as DispatchTypeValue,
      shipmentIds: e.shipmentIds, shipmentCount: e.shipmentCount, itemCount: e.itemCount,
      courierId: e.courierId?.value, vehicleId: e.vehicleId?.value,
      driverId: e.driverId?.value, warehouseId: e.warehouseId?.value,
      manifestUrl: e.manifestUrl, totalWeightKg: e.totalWeight?.value,
      dispatchedAt: e.dispatchedAt, estimatedArrivalAt: e.estimatedArrivalAt,
      deliveredAt: e.deliveredAt, cancelledAt: e.cancelledAt,
      notes: e.notes?.value,
      createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly DispatchEntity[], total: number, page: number, limit: number): DispatchListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
