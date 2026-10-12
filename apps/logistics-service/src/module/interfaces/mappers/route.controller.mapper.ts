import type {
  CreateRouteRequestDTO, AddRouteStopRequestDTO, RemoveRouteStopRequestDTO,
  ReorderRouteStopsRequestDTO, CompleteRouteStopRequestDTO, OptimizeRouteRequestDTO,
  StartRouteRequestDTO, CompleteRouteRequestDTO, CancelRouteRequestDTO, PlanRouteRequestDTO,
} from '../../application/dtos/requests/route/route.dto.js';
import type { RouteListOptionsDTO } from '../../application/services/interfaces/route.service.interface.js';
import type {
  CreateRouteHttpDTO, AddRouteStopHttpDTO, ReorderRouteStopsHttpDTO,
  OptimizeRouteHttpDTO, CancelRouteHttpDTO, ListRoutesHttpQueryDTO,
} from '../dtos/requests/route.request.dto.js';
import type { RouteTypeValue, RouteStatusValue, RouteOptimizationValue } from '@vubon/shared-types/logistics';

export class RouteControllerMapper {
  static toCreateDto(dto: CreateRouteHttpDTO): CreateRouteRequestDTO {
    return {
      name: dto.name, code: dto.code,
      type: dto.type as RouteTypeValue, optimization: dto.optimization as RouteOptimizationValue,
      warehouseId: dto.warehouseId, vehicleId: dto.vehicleId, driverId: dto.driverId,
      scheduledDate: dto.scheduledDate, isRecurring: dto.isRecurring, recurrenceRule: dto.recurrenceRule,
    };
  }
  static toAddStopDto(routeId: string, dto: AddRouteStopHttpDTO): AddRouteStopRequestDTO {
    return { routeId, ...dto };
  }
  static toRemoveStopDto(routeId: string, stopId: string): RemoveRouteStopRequestDTO {
    return { routeId, stopId };
  }
  static toReorderDto(routeId: string, dto: ReorderRouteStopsHttpDTO): ReorderRouteStopsRequestDTO {
    return { routeId, orderedStopIds: dto.orderedStopIds };
  }
  static toCompleteStopDto(routeId: string, stopId: string): CompleteRouteStopRequestDTO {
    return { routeId, stopId };
  }
  static toOptimizeDto(routeId: string, dto: OptimizeRouteHttpDTO): OptimizeRouteRequestDTO {
    return { routeId, startLat: dto.startLat, startLng: dto.startLng };
  }
  static toPlanDto(routeId: string): PlanRouteRequestDTO { return { routeId }; }
  static toStartDto(routeId: string): StartRouteRequestDTO { return { routeId }; }
  static toCompleteDto(routeId: string): CompleteRouteRequestDTO { return { routeId }; }
  static toCancelDto(routeId: string, dto: CancelRouteHttpDTO): CancelRouteRequestDTO {
    return { routeId, reason: dto.reason };
  }
  static toListOptions(q: ListRoutesHttpQueryDTO): RouteListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        status: q.status ? (q.status as RouteStatusValue) : undefined,
        type: q.type ? (q.type as RouteTypeValue) : undefined,
        driverId: q.driverId, vehicleId: q.vehicleId, warehouseId: q.warehouseId, search: q.search,
      },
    };
  }
}
