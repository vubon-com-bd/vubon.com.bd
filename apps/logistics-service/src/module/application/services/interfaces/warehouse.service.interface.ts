import type {
  WarehouseResponseDTO,
  WarehouseListResponseDTO,
  WarehouseStatsResponseDTO,
} from '@application/dtos/responses/warehouse/index.js';
import type {
  CreateWarehouseRequestDTO,
  UpdateWarehouseRequestDTO,
  ActivateWarehouseRequestDTO,
  DeactivateWarehouseRequestDTO,
  StartMaintenanceRequestDTO,
  EndMaintenanceRequestDTO,
  CloseWarehouseRequestDTO,
  ArchiveWarehouseRequestDTO,
  UpdateCapacityRequestDTO,
} from '@application/dtos/requests/warehouse/index.js';
import type { WarehouseStatusValue } from '@domain/primitives/warehouse-status.vo';

export const WAREHOUSE_SERVICE = Symbol('WAREHOUSE_SERVICE');

export interface WarehouseListFilterDTO {
  readonly status?: WarehouseStatusValue;
  readonly type?: string;
  readonly zone?: string;
  readonly isDefault?: boolean;
  readonly minCapacityM3?: number;
  readonly search?: string;
}
export interface WarehouseListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'capacityM3';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: WarehouseListFilterDTO;
}

export interface IWarehouseService {
  // Commands
  create(dto: CreateWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;
  update(dto: UpdateWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;
  activate(dto: ActivateWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;
  deactivate(dto: DeactivateWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;
  startMaintenance(dto: StartMaintenanceRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;
  endMaintenance(dto: EndMaintenanceRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;
  close(dto: CloseWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;
  archive(dto: ArchiveWarehouseRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;
  updateCapacity(dto: UpdateCapacityRequestDTO, actorId: string): Promise<WarehouseResponseDTO>;

  // Queries
  getById(id: string): Promise<WarehouseResponseDTO>;
  getByCode(code: string): Promise<WarehouseResponseDTO>;
  list(options: WarehouseListOptionsDTO): Promise<WarehouseListResponseDTO>;
  listOperational(): Promise<WarehouseListResponseDTO>;
  listByZone(zone: string): Promise<WarehouseListResponseDTO>;
  getDefault(): Promise<WarehouseResponseDTO | null>;
  getStats(): Promise<WarehouseStatsResponseDTO>;
}
