import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { VehicleEntity } from '../../../domain/entities/vehicle.entity';
import type { RegisterVehicleRequestDTO } from '../../dtos/requests/vehicle/register-vehicle.dto';
import type { UpdateVehicleRequestDTO } from '../../dtos/requests/vehicle/update-vehicle.dto';
import type { SetVehicleStatusRequestDTO } from '../../dtos/requests/vehicle/set-vehicle-status.dto';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle-response.dto';

export interface VehicleServiceInterface
  extends BaseServiceInterface<VehicleEntity, string> {
  register(input: RegisterVehicleRequestDTO): Promise<VehicleResponseDTO>;
  update(input: UpdateVehicleRequestDTO): Promise<VehicleResponseDTO>;
  setStatus(input: SetVehicleStatusRequestDTO): Promise<VehicleResponseDTO>;
  listAvailable(): Promise<readonly VehicleResponseDTO[]>;
}
