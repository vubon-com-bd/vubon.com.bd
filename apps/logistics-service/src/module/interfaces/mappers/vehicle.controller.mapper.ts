import type {
  RegisterVehicleRequestDTO, UpdateVehicleRequestDTO, SetVehicleStatusRequestDTO,
  AssignVehicleDriverRequestDTO, UpdateVehicleMileageRequestDTO,
} from '../../application/dtos/requests/vehicle/vehicle.dto.js';
import type { VehicleListOptionsDTO } from '../../application/services/interfaces/vehicle.service.interface.js';
import type {
  RegisterVehicleHttpDTO, UpdateVehicleHttpDTO, SetVehicleStatusHttpDTO,
  AssignVehicleDriverHttpDTO, UpdateVehicleMileageHttpDTO, ListVehiclesHttpQueryDTO,
} from '../dtos/requests/vehicle.request.dto.js';
import type { VehicleTypeValue, VehicleStatusValue, VehicleFuelTypeValue } from '@vubon/shared-types/logistics';

export class VehicleControllerMapper {
  static toRegisterDto(dto: RegisterVehicleHttpDTO): RegisterVehicleRequestDTO {
    return {
      registrationNumber: dto.registrationNumber,
      type: dto.type as VehicleTypeValue,
      fuelType: dto.fuelType as VehicleFuelTypeValue,
      make: dto.make, model: dto.model, year: dto.year, color: dto.color,
      maxWeightKg: dto.maxWeightKg, maxVolumeM3: dto.maxVolumeM3, capacity: dto.capacity,
      mileageKm: dto.mileageKm, insuranceExpiresAt: dto.insuranceExpiresAt,
      registrationExpiresAt: dto.registrationExpiresAt,
    };
  }
  static toUpdateDto(vehicleId: string, dto: UpdateVehicleHttpDTO): UpdateVehicleRequestDTO {
    return { vehicleId, ...dto };
  }
  static toSetStatusDto(vehicleId: string, dto: SetVehicleStatusHttpDTO): SetVehicleStatusRequestDTO {
    return { vehicleId, status: dto.status as VehicleStatusValue, reason: dto.reason };
  }
  static toAssignDriverDto(vehicleId: string, dto: AssignVehicleDriverHttpDTO): AssignVehicleDriverRequestDTO {
    return { vehicleId, driverId: dto.driverId };
  }
  static toUpdateMileageDto(vehicleId: string, dto: UpdateVehicleMileageHttpDTO): UpdateVehicleMileageRequestDTO {
    return { vehicleId, mileageKm: dto.mileageKm };
  }
  static toListOptions(q: ListVehiclesHttpQueryDTO): VehicleListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        status: q.status ? (q.status as VehicleStatusValue) : undefined,
        type: q.type ? (q.type as VehicleTypeValue) : undefined,
        fuelType: q.fuelType ? (q.fuelType as VehicleFuelTypeValue) : undefined,
      },
    };
  }
}
