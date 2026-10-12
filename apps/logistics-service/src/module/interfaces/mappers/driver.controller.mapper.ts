import type {
  RegisterDriverRequestDTO, UpdateDriverRequestDTO, SetDriverStatusRequestDTO,
  AssignDriverVehicleRequestDTO, ReceiveDriverCashRequestDTO, RemitDriverCashRequestDTO,
} from '../../application/dtos/requests/driver/driver.dto.js';
import type { DriverListOptionsDTO } from '../../application/services/interfaces/driver.service.interface.js';
import type {
  RegisterDriverHttpDTO, UpdateDriverHttpDTO, SetDriverStatusHttpDTO,
  AssignDriverVehicleHttpDTO, DriverCashHttpDTO, ListDriversHttpQueryDTO,
} from '../dtos/requests/driver.request.dto.js';
import type { DriverTypeValue, DriverStatusValue, DriverLicenseTypeValue } from '@vubon/shared-types/logistics';

export class DriverControllerMapper {
  static toRegisterDto(dto: RegisterDriverHttpDTO): RegisterDriverRequestDTO {
    return {
      userId: dto.userId, name: dto.name, phone: dto.phone, email: dto.email,
      type: dto.type as DriverTypeValue,
      licenseNumber: dto.licenseNumber,
      licenseType: dto.licenseType as DriverLicenseTypeValue,
      licenseExpiresAt: dto.licenseExpiresAt,
      dateOfBirth: dto.dateOfBirth, address: dto.address,
      warehouseId: dto.warehouseId, cashLimit: dto.cashLimit,
    };
  }
  static toUpdateDto(driverId: string, dto: UpdateDriverHttpDTO): UpdateDriverRequestDTO {
    return { driverId, ...dto };
  }
  static toSetStatusDto(driverId: string, dto: SetDriverStatusHttpDTO): SetDriverStatusRequestDTO {
    return { driverId, status: dto.status as DriverStatusValue, reason: dto.reason };
  }
  static toAssignVehicleDto(driverId: string, dto: AssignDriverVehicleHttpDTO): AssignDriverVehicleRequestDTO {
    return { driverId, vehicleId: dto.vehicleId };
  }
  static toReceiveCashDto(driverId: string, dto: DriverCashHttpDTO): ReceiveDriverCashRequestDTO {
    return { driverId, amount: dto.amount };
  }
  static toRemitCashDto(driverId: string, dto: DriverCashHttpDTO): RemitDriverCashRequestDTO {
    return { driverId, amount: dto.amount };
  }
  static toListOptions(q: ListDriversHttpQueryDTO): DriverListOptionsDTO {
    return {
      page: q.page ?? 1, limit: q.limit ?? 20,
      filter: {
        status: q.status ? (q.status as DriverStatusValue) : undefined,
        type: q.type ? (q.type as DriverTypeValue) : undefined,
        warehouseId: q.warehouseId, vehicleId: q.vehicleId,
      },
    };
  }
}
