import type {
  DispatchResponseDTO,
  DispatchListResponseDTO,
  DispatchStatsResponseDTO,
} from '@application/dtos/responses/dispatch/index.js';
import type {
  CreateDispatchRequestDTO,
  AssignDispatchRequestDTO,
  DispatchActionRequestDTO,
  DispatchWithManifestRequestDTO,
  FailDispatchRequestDTO,
  CancelDispatchRequestDTO,
  ReturnDispatchRequestDTO,
} from '@application/dtos/requests/dispatch/index.js';
import type { DispatchStatusValue } from '@domain/primitives/dispatch-status.vo';

export const DISPATCH_SERVICE = Symbol('DISPATCH_SERVICE');

export interface DispatchListFilterDTO {
  readonly status?: DispatchStatusValue;
  readonly type?: string;
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}
export interface DispatchListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'dispatchedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DispatchListFilterDTO;
}

export interface IDispatchService {
  create(dto: CreateDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO>;
  assign(dto: AssignDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO>;
  dispatch(dto: DispatchWithManifestRequestDTO, actorId: string): Promise<DispatchResponseDTO>;
  startTransit(dto: DispatchActionRequestDTO, actorId: string): Promise<DispatchResponseDTO>;
  markDelivered(dto: DispatchActionRequestDTO, actorId: string): Promise<DispatchResponseDTO>;
  markFailed(dto: FailDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO>;
  markReturned(dto: ReturnDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO>;
  cancel(dto: CancelDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO>;

  getById(id: string): Promise<DispatchResponseDTO>;
  getByNumber(num: string): Promise<DispatchResponseDTO>;
  list(options: DispatchListOptionsDTO): Promise<DispatchListResponseDTO>;
  listByCourier(courierId: string): Promise<DispatchListResponseDTO>;
  listByDriver(driverId: string): Promise<DispatchListResponseDTO>;
  listPending(): Promise<DispatchListResponseDTO>;
  listInTransit(): Promise<DispatchListResponseDTO>;
  listContainingShipment(shipmentId: string): Promise<DispatchListResponseDTO>;
  getStats(): Promise<DispatchStatsResponseDTO>;
}
