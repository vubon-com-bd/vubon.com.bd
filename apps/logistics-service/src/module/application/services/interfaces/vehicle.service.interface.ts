import type {
  VehicleResponseDTO,
  VehicleListResponseDTO,
  VehicleStatsResponseDTO,
} from '@application/dtos/responses/vehicle/index.js';
import type {
  CreateVehicleRequestDTO,
  UpdateVehicleRequestDTO,
  VehicleActionRequestDTO,
  AssignVehicleRequestDTO,
  StartVehicleMaintenanceRequestDTO,
  RetireVehicleRequestDTO,
  AssignDriverToVehicleRequestDTO,
} from '@application/dtos/requests/vehicle/index.js';
import type { VehicleStatusValue } from '@domain/primitives/vehicle-status.vo';

export const VEHICLE_SERVICE = Symbol('VEHICLE_SERVICE');

export interface VehicleListFilterDTO {
  readonly status?: VehicleStatusValue;
  readonly type?: string;
  readonly fuelType?: string;
  readonly warehouseId?: string;
  readonly assignedDriverId?: string;
  readonly minWeightKg?: number;
  readonly search?: string;
}
export interface VehicleListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'year' | 'maxWeightKg';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VehicleListFilterDTO;
}

export interface IVehicleService {
  create(dto: CreateVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  update(dto: UpdateVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  assign(dto: AssignVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  release(dto: VehicleActionRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  startMaintenance(dto: StartVehicleMaintenanceRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  completeMaintenance(dto: VehicleActionRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  retire(dto: RetireVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  assignDriver(dto: AssignDriverToVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  unassignDriver(dto: VehicleActionRequestDTO, actorId: string): Promise<VehicleResponseDTO>;
  updateMileage(
    dto: { vehicleId: string; km: number },
    actorId: string,
  ): Promise<VehicleResponseDTO>;

  getById(id: string): Promise<VehicleResponseDTO>;
  getByRegistrationNumber(reg: string): Promise<VehicleResponseDTO>;
  list(options: VehicleListOptionsDTO): Promise<VehicleListResponseDTO>;
  listAvailable(): Promise<VehicleListResponseDTO>;
  listByWarehouse(warehouseId: string): Promise<VehicleListResponseDTO>;
  listByDriver(driverId: string): Promise<VehicleListResponseDTO>;
  getStats(): Promise<VehicleStatsResponseDTO>;
}
