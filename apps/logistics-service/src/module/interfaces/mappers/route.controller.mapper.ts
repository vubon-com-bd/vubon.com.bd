/**
 * RouteControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateRouteHttpDTO,
  UpdateRouteHttpDTO,
  OptimizeRouteHttpDTO,
  CompleteStopHttpDTO,
  RouteReasonHttpDTO,
  ListRoutesHttpQueryDTO,
} from '../dtos/requests/route/route.request.dto.js';
import type { CreateRouteRequestDTO } from '@application/dtos/requests/route/create-route.dto.js';
import type {
  RouteResponseDTO,
  RouteSummaryResponseDTO,
  RouteListResponseDTO,
  RouteStatsResponseDTO,
} from '@application/dtos/responses/route/index.js';
import type {
  RouteHttpResponseDTO,
  RouteSummaryHttpResponseDTO,
  RouteListHttpResponseDTO,
  RouteStatsHttpResponseDTO,
} from '../dtos/responses/route/route.response.dto.js';

export class RouteControllerMapper {
  static toCreateAppDto(http: CreateRouteHttpDTO): CreateRouteRequestDTO {
    return {
      name: http.name,
      code: http.code,
      type: http.type as CreateRouteRequestDTO['type'],
      optimization: http.optimization as CreateRouteRequestDTO['optimization'],
      stops: http.stops.map((s) => ({
        id: s.id,
        order: s.order,
        location: s.location,
        address: s.address,
        latitude: s.latitude,
        longitude: s.longitude,
        shipmentIds: s.shipmentIds,
        estimatedArrivalAt: s.estimatedArrivalAt,
        notes: s.notes,
      })),
      warehouseId: http.warehouseId,
      vehicleId: http.vehicleId,
      driverId: http.driverId,
      scheduledDate: http.scheduledDate,
      isRecurring: http.isRecurring,
      recurrenceRule: http.recurrenceRule,
    };
  }

  static toUpdateAppDto(routeId: string, http: UpdateRouteHttpDTO): Record<string, unknown> {
    return { routeId, ...http };
  }

  static toOptimizeAppDto(routeId: string, http: OptimizeRouteHttpDTO): Record<string, unknown> {
    return { routeId, algorithm: http.algorithm };
  }

  static toCompleteStopAppDto(routeId: string, http: CompleteStopHttpDTO): Record<string, unknown> {
    return { routeId, stopId: http.stopId };
  }

  static toReasonAppDto(routeId: string, http: RouteReasonHttpDTO): Record<string, unknown> {
    return { routeId, reason: http.reason };
  }

  static toListOptions(http: ListRoutesHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        warehouseId: http.warehouseId,
        driverId: http.driverId,
        vehicleId: http.vehicleId,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: RouteResponseDTO): RouteHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
      optimization: typeof app.optimization === 'string' ? app.optimization : String(app.optimization),
    } as unknown as RouteHttpResponseDTO;
  }

  static toSummaryHttp(app: RouteSummaryResponseDTO): RouteSummaryHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as RouteSummaryHttpResponseDTO;
  }

  static toListHttp(app: RouteListResponseDTO): RouteListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: RouteStatsResponseDTO): RouteStatsHttpResponseDTO {
    return app as unknown as RouteStatsHttpResponseDTO;
  }
}
