/**
 * VehicleControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateVehicleHttpDTO,
  UpdateVehicleHttpDTO,
  AssignDriverHttpDTO,
  VehicleReasonHttpDTO,
  ListVehiclesHttpQueryDTO,
} from '../dtos/requests/vehicle/vehicle.request.dto.js';
import type { CreateVehicleRequestDTO } from '@application/dtos/requests/vehicle/create-vehicle.dto.js';
import type {
  VehicleResponseDTO,
  VehicleSummaryResponseDTO,
  VehicleListResponseDTO,
  VehicleStatsResponseDTO,
} from '@application/dtos/responses/vehicle/index.js';
import type {
  VehicleHttpResponseDTO,
  VehicleSummaryHttpResponseDTO,
  VehicleListHttpResponseDTO,
  VehicleStatsHttpResponseDTO,
} from '../dtos/responses/vehicle/vehicle.response.dto.js';

export class VehicleControllerMapper {
  static toCreateAppDto(http: CreateVehicleHttpDTO): CreateVehicleRequestDTO {
    return {
      registrationNumber: http.registrationNumber,
      type: http.type as CreateVehicleRequestDTO['type'],
      fuelType: http.fuelType as CreateVehicleRequestDTO['fuelType'],
      make: http.make,
      model: http.model,
      year: http.year,
      color: http.color,
      maxWeightKg: http.maxWeightKg,
      maxVolumeM3: http.maxVolumeM3,
      capacity: http.capacity,
      mileageKm: http.mileageKm,
      insuranceExpiresAt: http.insuranceExpiresAt,
      registrationExpiresAt: http.registrationExpiresAt,
      warehouseId: http.warehouseId,
    };
  }

  static toUpdateAppDto(vehicleId: string, http: UpdateVehicleHttpDTO): Record<string, unknown> {
    return { vehicleId, ...http };
  }

  static toAssignDriverAppDto(vehicleId: string, http: AssignDriverHttpDTO): Record<string, unknown> {
    return { vehicleId, driverId: http.driverId };
  }

  static toReasonAppDto(vehicleId: string, http: VehicleReasonHttpDTO): Record<string, unknown> {
    return { vehicleId, reason: http.reason };
  }

  static toListOptions(http: ListVehiclesHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        warehouseId: http.warehouseId,
        driverId: http.driverId,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: VehicleResponseDTO): VehicleHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
      fuelType: typeof app.fuelType === 'string' ? app.fuelType : String(app.fuelType),
    } as unknown as VehicleHttpResponseDTO;
  }

  static toSummaryHttp(app: VehicleSummaryResponseDTO): VehicleSummaryHttpResponseDTO {
    return {
      ...app,
      type: typeof app.type === 'string' ? app.type : String(app.type),
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as VehicleSummaryHttpResponseDTO;
  }

  static toListHttp(app: VehicleListResponseDTO): VehicleListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: VehicleStatsResponseDTO): VehicleStatsHttpResponseDTO {
    return app as unknown as VehicleStatsHttpResponseDTO;
  }
}
