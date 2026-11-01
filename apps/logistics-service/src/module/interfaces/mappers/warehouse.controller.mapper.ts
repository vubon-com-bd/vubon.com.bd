/**
 * WarehouseControllerMapper — HTTP DTO ↔ App DTO
 * @module logistics-service/interfaces/mappers
 */
import type {
  CreateWarehouseHttpDTO,
  UpdateWarehouseHttpDTO,
  UpdateCapacityHttpDTO,
  WarehouseReasonHttpDTO,
  ListWarehousesHttpQueryDTO,
} from '../dtos/requests/warehouse/warehouse.request.dto.js';
import type { CreateWarehouseRequestDTO } from '@application/dtos/requests/warehouse/create-warehouse.dto.js';
import type {
  WarehouseResponseDTO,
  WarehouseSummaryResponseDTO,
  WarehouseListResponseDTO,
  WarehouseStatsResponseDTO,
} from '@application/dtos/responses/warehouse/index.js';
import type {
  WarehouseHttpResponseDTO,
  WarehouseSummaryHttpResponseDTO,
  WarehouseListHttpResponseDTO,
  WarehouseStatsHttpResponseDTO,
} from '../dtos/responses/warehouse/warehouse.response.dto.js';

export class WarehouseControllerMapper {
  // ═══ HTTP → App ═══
  static toCreateAppDto(http: CreateWarehouseHttpDTO): CreateWarehouseRequestDTO {
    return {
      code: http.code,
      name: http.name,
      type: http.type,
      address: http.address,
      contactName: http.contactName,
      contactPhone: http.contactPhone,
      contactEmail: http.contactEmail,
      managerId: http.managerId,
      capacityM3: http.capacityM3,
      capacityKg: http.capacityKg,
      maxSkus: http.maxSkus,
      zone: http.zone,
      operatingHoursStart: http.operatingHoursStart,
      operatingHoursEnd: http.operatingHoursEnd,
      timezone: http.timezone,
      isDefault: http.isDefault,
    };
  }

  static toUpdateAppDto(warehouseId: string, http: UpdateWarehouseHttpDTO): Record<string, unknown> {
    return { warehouseId, ...http };
  }

  static toCapacityAppDto(warehouseId: string, http: UpdateCapacityHttpDTO): Record<string, unknown> {
    return {
      warehouseId,
      capacityM3: http.capacityM3,
      capacityKg: http.capacityKg,
      maxSkus: http.maxSkus,
    };
  }

  static toReasonAppDto(warehouseId: string, http: WarehouseReasonHttpDTO): Record<string, unknown> {
    return { warehouseId, reason: http.reason };
  }

  static toListOptions(http: ListWarehousesHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        type: http.type,
        zone: http.zone,
        isDefault: http.isDefault,
        search: http.search,
      },
    };
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: WarehouseResponseDTO): WarehouseHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as WarehouseHttpResponseDTO;
  }

  static toSummaryHttp(app: WarehouseSummaryResponseDTO): WarehouseSummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as WarehouseSummaryHttpResponseDTO;
  }

  static toListHttp(app: WarehouseListResponseDTO): WarehouseListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: WarehouseStatsResponseDTO): WarehouseStatsHttpResponseDTO {
    return app as unknown as WarehouseStatsHttpResponseDTO;
  }
}
