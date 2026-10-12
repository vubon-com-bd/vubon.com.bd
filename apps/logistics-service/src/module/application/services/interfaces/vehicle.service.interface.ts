import type {
  RegisterVehicleRequestDTO, UpdateVehicleRequestDTO, SetVehicleStatusRequestDTO,
  AssignVehicleDriverRequestDTO, UpdateVehicleMileageRequestDTO, VehicleListFilterDTO,
} from '../../dtos/requests/vehicle/vehicle.dto.js';
import type { VehicleResponseDTO, VehicleListResponseDTO } from '../../dtos/responses/vehicle/vehicle-response.dto.js';
export const VEHICLE_SERVICE = Symbol('VEHICLE_SERVICE');
export interface VehicleListOptionsDTO {
  readonly page: number; readonly limit: number;
  readonly sortBy?: 'createdAt' | 'registrationNumber' | 'maxWeightKg';
  readonly sortDir?: 'asc' | 'desc'; readonly filter?: VehicleListFilterDTO;
}
export interface IVehicleService {
  register(dto: RegisterVehicleRequestDTO, actorId?: string): Promise<VehicleResponseDTO>;
  update(dto: UpdateVehicleRequestDTO, actorId?: string): Promise<VehicleResponseDTO>;
  setStatus(dto: SetVehicleStatusRequestDTO, actorId?: string): Promise<VehicleResponseDTO>;
  assignDriver(dto: AssignVehicleDriverRequestDTO, actorId?: string): Promise<VehicleResponseDTO>;
  updateMileage(dto: UpdateVehicleMileageRequestDTO, actorId?: string): Promise<VehicleResponseDTO>;
  getById(vehicleId: string): Promise<VehicleResponseDTO>;
  list(options: VehicleListOptionsDTO): Promise<VehicleListResponseDTO>;
}
