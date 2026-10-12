/**
 * IWarehouseService — contract
 * @module logistics-service/application/services/interfaces
 */
import type {
  CreateWarehouseRequestDTO,
  UpdateWarehouseRequestDTO,
  ActivateWarehouseRequestDTO,
  DeactivateWarehouseRequestDTO,
  StartMaintenanceRequestDTO,
  CompleteMaintenanceRequestDTO,
  ReserveCapacityRequestDTO,
  ReleaseCapacityRequestDTO,
  WarehouseListFilterDTO,
} from '../../dtos/requests/warehouse/warehouse.dto.js';
import type { WarehouseResponseDTO, WarehouseListResponseDTO } from '../../dtos/responses/warehouse/warehouse-response.dto.js';

export const WAREHOUSE_SERVICE = Symbol('WAREHOUSE_SERVICE');

export interface WarehouseListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'utilization';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: WarehouseListFilterDTO;
}

export interface IWarehouseService {
  create(dto: CreateWarehouseRequestDTO, actorId?: string): Promise<WarehouseResponseDTO>;
  update(dto: UpdateWarehouseRequestDTO, actorId?: string): Promise<WarehouseResponseDTO>;
  activate(dto: ActivateWarehouseRequestDTO, actorId?: string): Promise<WarehouseResponseDTO>;
  deactivate(dto: DeactivateWarehouseRequestDTO, actorId?: string): Promise<WarehouseResponseDTO>;
  startMaintenance(dto: StartMaintenanceRequestDTO, actorId?: string): Promise<WarehouseResponseDTO>;
  completeMaintenance(dto: CompleteMaintenanceRequestDTO, actorId?: string): Promise<WarehouseResponseDTO>;
  reserveCapacity(dto: ReserveCapacityRequestDTO, actorId?: string): Promise<WarehouseResponseDTO>;
  releaseCapacity(dto: ReleaseCapacityRequestDTO, actorId?: string): Promise<WarehouseResponseDTO>;

  getById(warehouseId: string): Promise<WarehouseResponseDTO>;
  list(options: WarehouseListOptionsDTO): Promise<WarehouseListResponseDTO>;
  getDefault(): Promise<WarehouseResponseDTO | null>;
}
