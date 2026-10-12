import type { RouteEntity } from '../../domain/entities/route.entity.js';
import type { RouteResponseDTO, RouteListResponseDTO, RouteStopResponseDTO } from '../dtos/responses/route/route-response.dto.js';
import type { RouteTypeValue, RouteStatusValue, RouteOptimizationValue } from '@vubon/shared-types/logistics';
export class RouteMapper {
  static toResponse(e: RouteEntity): RouteResponseDTO {
    const stops: RouteStopResponseDTO[] = e.stopsSorted.map((s) => ({
      id: s.id, order: s.order, location: s.location, address: s.address,
      latitude: s.latitude, longitude: s.longitude, shipmentIds: s.shipmentIds,
      estimatedArrivalAt: s.estimatedArrivalAt, actualArrivalAt: s.actualArrivalAt,
      completed: s.completed, notes: s.notes,
    }));
    return {
      id: e.id, name: e.name, code: e.code.value,
      type: e.type.value as RouteTypeValue,
      status: e.status.value as RouteStatusValue,
      optimization: e.optimization.value as RouteOptimizationValue,
      stops,
      totalDistanceKm: e.totalDistanceKm?.value,
      totalDurationMinutes: e.totalDurationMinutes?.value,
      warehouseId: e.warehouseId?.value, vehicleId: e.vehicleId?.value, driverId: e.driverId?.value,
      scheduledDate: e.scheduledDate, startedAt: e.startedAt, completedAt: e.completedAt,
      isOptimized: e.isOptimized, isRecurring: e.isRecurring, recurrenceRule: e.recurrenceRule,
      stopCount: e.stopCount, completedStops: e.completedStops, progressPercent: e.progressPercent,
      createdAt: e.createdAt, updatedAt: e.updatedAt,
    };
  }
  static toListResponse(items: readonly RouteEntity[], total: number, page: number, limit: number): RouteListResponseDTO {
    return { items: items.map((e) => this.toResponse(e)), total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
