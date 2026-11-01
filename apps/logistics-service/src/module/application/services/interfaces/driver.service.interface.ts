import type {
  DriverResponseDTO,
  DriverListResponseDTO,
  DriverStatsResponseDTO,
} from '@application/dtos/responses/driver/index.js';
import type {
  CreateDriverRequestDTO,
  UpdateDriverRequestDTO,
  DriverActionRequestDTO,
  DeactivateDriverRequestDTO,
  SuspendDriverRequestDTO,
  OnLeaveDriverRequestDTO,
  AssignVehicleToDriverRequestDTO,
  CollectCashRequestDTO,
  DepositCashRequestDTO,
  RecordDeliveryRequestDTO,
} from '@application/dtos/requests/driver/index.js';
import type { DriverStatusValue } from '@domain/primitives/driver-status.vo';

export const DRIVER_SERVICE = Symbol('DRIVER_SERVICE');

export interface DriverListFilterDTO {
  readonly status?: DriverStatusValue;
  readonly type?: string;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly isAvailable?: boolean;
  readonly minRating?: number;
  readonly licenseExpiringInDays?: number;
  readonly search?: string;
}
export interface DriverListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'rating' | 'totalDeliveries';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DriverListFilterDTO;
}

export interface IDriverService {
  create(dto: CreateDriverRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  update(dto: UpdateDriverRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  markAvailable(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  goOnDuty(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  goOnBreak(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  goOffDuty(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  goOnLeave(dto: OnLeaveDriverRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  suspend(dto: SuspendDriverRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  deactivate(dto: DeactivateDriverRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  assignVehicle(dto: AssignVehicleToDriverRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  unassignVehicle(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  collectCash(dto: CollectCashRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  depositCash(dto: DepositCashRequestDTO, actorId: string): Promise<DriverResponseDTO>;
  recordDelivery(dto: RecordDeliveryRequestDTO, actorId: string): Promise<DriverResponseDTO>;

  getById(id: string): Promise<DriverResponseDTO>;
  getByLicense(license: string): Promise<DriverResponseDTO>;
  getByPhone(phone: string): Promise<DriverResponseDTO>;
  list(options: DriverListOptionsDTO): Promise<DriverListResponseDTO>;
  listAvailable(): Promise<DriverListResponseDTO>;
  listByWarehouse(warehouseId: string): Promise<DriverListResponseDTO>;
  getStats(): Promise<DriverStatsResponseDTO>;
}
