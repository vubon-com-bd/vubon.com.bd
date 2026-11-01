import type { RouteEntity } from '@domain/entities/route.entity';
import type {
  RouteResponseDTO,
  RouteSummaryResponseDTO,
  RouteListResponseDTO,
  RouteStatsResponseDTO,
} from '@application/dtos/responses/route/index.js';

export class RouteMapper {
  static toResponse(e: RouteEntity): RouteResponseDTO {
    return {
      id: e.id,
      name: e.name.value,
      code: e.code,
      type: e.type.value,
      status: e.status.value,
      optimization: e.optimization.value,
      stops: e.stops.map((s) => ({
        id: s.id,
        order: s.order,
        location: s.location,
        address: s.address,
        latitude: s.latitude,
        longitude: s.longitude,
        shipmentIds: s.shipmentIds,
        estimatedArrivalAt: s.estimatedArrivalAt,
        actualArrivalAt: s.actualArrivalAt,
        completed: s.completed,
        notes: s.notes,
      })),
      totalDistanceKm: e.totalDistanceKm,
      totalDurationMinutes: e.totalDurationMinutes,
      warehouseId: e.warehouseId,
      vehicleId: e.vehicleId,
      driverId: e.driverId,
      scheduledDate: e.scheduledDate,
      startedAt: e.startedAt,
      completedAt: e.completedAt,
      cancelledAt: e.cancelledAt,
      cancelReason: e.cancelReason,
      isOptimized: e.isOptimized,
      isRecurring: e.isRecurring,
      recurrenceRule: e.recurrenceRule,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }
  static toSummary(e: RouteEntity): RouteSummaryResponseDTO {
    return {
      id: e.id,
      name: e.name.value,
      code: e.code,
      type: e.type.value,
      status: e.status.value,
      stopCount: e.stopCount,
      completedStops: e.completedStops,
      scheduledDate: e.scheduledDate,
      createdAt: e.createdAt,
    };
  }
  static toListResponse(
    entities: readonly RouteEntity[],
    total: number,
    page: number,
    limit: number,
  ): RouteListResponseDTO {
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
    totalDistanceKm: number;
    totalStops: number;
    averageStopsPerRoute: number;
  }): RouteStatsResponseDTO {
    return { ...stats, generatedAt: new Date().toISOString() };
  }
}
