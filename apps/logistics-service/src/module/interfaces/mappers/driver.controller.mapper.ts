/**
 * DriverControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateDriverHttpDTO,
  UpdateDriverHttpDTO,
  AssignVehicleHttpDTO,
  CashTransactionHttpDTO,
  DriverReasonHttpDTO,
  ListDriversHttpQueryDTO,
} from '../dtos/requests/driver/driver.request.dto.js';
import type { CreateDriverRequestDTO } from '@application/dtos/requests/driver/create-driver.dto.js';
import type {
  DriverResponseDTO,
  DriverSummaryResponseDTO,
  DriverListResponseDTO,
  DriverStatsResponseDTO,
} from '@application/dtos/responses/driver/index.js';
import type {
  DriverHttpResponseDTO,
  DriverSummaryHttpResponseDTO,
  DriverListHttpResponseDTO,
  DriverStatsHttpResponseDTO,
} from '../dtos/responses/driver/driver.response.dto.js';

export class DriverControllerMapper {
  static toCreateAppDto(http: CreateDriverHttpDTO): CreateDriverRequestDTO {
    return {
      userId: http.userId,
      name: http.name,
      phone: http.phone,
      email: http.email,
      type: http.type as CreateDriverRequestDTO['type'],
      licenseNumber: http.licenseNumber,
      licenseType: http.licenseType as CreateDriverRequestDTO['licenseType'],
      licenseExpiresAt: http.licenseExpiresAt,
      dateOfBirth: http.dateOfBirth,
      address: http.address,
      warehouseId: http.warehouseId,
      cashLimit: http.cashLimit,
    };
  }

  static toUpdateAppDto(driverId: string, http: UpdateDriverHttpDTO): Record<string, unknown> {
    return { driverId, ...http };
  }

  static toAssignVehicleAppDto(driverId: string, http: AssignVehicleHttpDTO): Record<string, unknown> {
    return { driverId, vehicleId: http.vehicleId };
  }

  static toCashAppDto(driverId: string, http: CashTransactionHttpDTO): Record<string, unknown> {
    return { driverId, amount: http.amount, note: http.note };
  }

  static toReasonAppDto(driverId: string, http: DriverReasonHttpDTO): Record<string, unknown> {
    return { driverId, reason: http.reason };
  }

  static toListOptions(http: ListDriversHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        warehouseId: http.warehouseId,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: DriverResponseDTO): DriverHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
      licenseType: typeof app.licenseType === 'string' ? app.licenseType : String(app.licenseType),
    } as unknown as DriverHttpResponseDTO;
  }

  static toSummaryHttp(app: DriverSummaryResponseDTO): DriverSummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
      type: typeof app.type === 'string' ? app.type : String(app.type),
    } as unknown as DriverSummaryHttpResponseDTO;
  }

  static toListHttp(app: DriverListResponseDTO): DriverListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: DriverStatsResponseDTO): DriverStatsHttpResponseDTO {
    return app as unknown as DriverStatsHttpResponseDTO;
  }
}
