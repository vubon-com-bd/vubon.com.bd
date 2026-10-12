/**
 * IRouteService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  CreateRouteRequestDTO, AddRouteStopRequestDTO, RemoveRouteStopRequestDTO,
  ReorderRouteStopsRequestDTO, CompleteRouteStopRequestDTO, OptimizeRouteRequestDTO,
  StartRouteRequestDTO, CompleteRouteRequestDTO, CancelRouteRequestDTO, PlanRouteRequestDTO,
  RouteListFilterDTO,
} from '../../dtos/requests/route/route.dto.js';
import type { RouteResponseDTO, RouteListResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

export const ROUTE_SERVICE = Symbol('ROUTE_SERVICE');

export interface RouteListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'scheduledDate' | 'name' | 'totalDistanceKm';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: RouteListFilterDTO;
}

export interface IRouteService {
  create(dto: CreateRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  addStop(dto: AddRouteStopRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  removeStop(dto: RemoveRouteStopRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  reorderStops(dto: ReorderRouteStopsRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  completeStop(dto: CompleteRouteStopRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  optimize(dto: OptimizeRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  plan(dto: PlanRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  start(dto: StartRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  complete(dto: CompleteRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO>;
  cancel(dto: CancelRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO>;

  getById(routeId: string): Promise<RouteResponseDTO>;
  list(options: RouteListOptionsDTO): Promise<RouteListResponseDTO>;
}
