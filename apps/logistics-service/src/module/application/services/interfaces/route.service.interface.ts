import type {
  RouteResponseDTO,
  RouteListResponseDTO,
  RouteStatsResponseDTO,
} from '@application/dtos/responses/route/index.js';
import type {
  CreateRouteRequestDTO,
  UpdateRouteRequestDTO,
  RouteActionRequestDTO,
  OptimizeRouteRequestDTO,
  StartRouteRequestDTO,
  CompleteStopRequestDTO,
  CancelRouteRequestDTO,
} from '@application/dtos/requests/route/index.js';
import type { RouteStatusValue } from '@domain/primitives/route-status.vo';

export const ROUTE_SERVICE = Symbol('ROUTE_SERVICE');

export interface RouteListFilterDTO {
  readonly status?: RouteStatusValue;
  readonly type?: string;
  readonly optimization?: string;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly scheduledDateFrom?: string;
  readonly scheduledDateTo?: string;
  readonly isOptimized?: boolean;
  readonly search?: string;
}
export interface RouteListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'scheduledDate';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: RouteListFilterDTO;
}

export interface IRouteService {
  create(dto: CreateRouteRequestDTO, actorId: string): Promise<RouteResponseDTO>;
  update(dto: UpdateRouteRequestDTO, actorId: string): Promise<RouteResponseDTO>;
  plan(dto: RouteActionRequestDTO, actorId: string): Promise<RouteResponseDTO>;
  optimize(dto: OptimizeRouteRequestDTO, actorId: string): Promise<RouteResponseDTO>;
  start(dto: StartRouteRequestDTO, actorId: string): Promise<RouteResponseDTO>;
  completeStop(dto: CompleteStopRequestDTO, actorId: string): Promise<RouteResponseDTO>;
  complete(dto: RouteActionRequestDTO, actorId: string): Promise<RouteResponseDTO>;
  cancel(dto: CancelRouteRequestDTO, actorId: string): Promise<RouteResponseDTO>;
  archive(dto: RouteActionRequestDTO, actorId: string): Promise<RouteResponseDTO>;

  getById(id: string): Promise<RouteResponseDTO>;
  getByCode(code: string): Promise<RouteResponseDTO>;
  list(options: RouteListOptionsDTO): Promise<RouteListResponseDTO>;
  listByWarehouse(warehouseId: string): Promise<RouteListResponseDTO>;
  listByDriver(driverId: string): Promise<RouteListResponseDTO>;
  listByScheduledDate(date: string): Promise<RouteListResponseDTO>;
  listActive(): Promise<RouteListResponseDTO>;
  listPendingOptimization(): Promise<RouteListResponseDTO>;
  getStats(): Promise<RouteStatsResponseDTO>;
}
