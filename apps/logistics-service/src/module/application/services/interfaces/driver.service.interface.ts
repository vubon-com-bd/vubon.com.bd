import type {
  RegisterDriverRequestDTO, UpdateDriverRequestDTO, SetDriverStatusRequestDTO,
  AssignDriverVehicleRequestDTO, ReceiveDriverCashRequestDTO, RemitDriverCashRequestDTO,
  DriverListFilterDTO,
} from '../../dtos/requests/driver/driver.dto.js';
import type { DriverResponseDTO, DriverListResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';
export const DRIVER_SERVICE = Symbol('DRIVER_SERVICE');
export interface DriverListOptionsDTO {
  readonly page: number; readonly limit: number;
  readonly sortBy?: 'createdAt' | 'name' | 'rating' | 'totalDeliveries';
  readonly sortDir?: 'asc' | 'desc'; readonly filter?: DriverListFilterDTO;
}
export interface IDriverService {
  register(dto: RegisterDriverRequestDTO, actorId?: string): Promise<DriverResponseDTO>;
  update(dto: UpdateDriverRequestDTO, actorId?: string): Promise<DriverResponseDTO>;
  setStatus(dto: SetDriverStatusRequestDTO, actorId?: string): Promise<DriverResponseDTO>;
  assignVehicle(dto: AssignDriverVehicleRequestDTO, actorId?: string): Promise<DriverResponseDTO>;
  receiveCash(dto: ReceiveDriverCashRequestDTO, actorId?: string): Promise<DriverResponseDTO>;
  remitCash(dto: RemitDriverCashRequestDTO, actorId?: string): Promise<DriverResponseDTO>;
  getById(driverId: string): Promise<DriverResponseDTO>;
  list(options: DriverListOptionsDTO): Promise<DriverListResponseDTO>;
}
