/**
 * InventoryLocationControllerMapper — HTTP DTO ↔ App DTO
 */
import type {
  CreateInventoryLocationHttpDTO,
  UpdateInventoryLocationHttpDTO,
  StockChangeHttpDTO,
  QuarantineHttpDTO,
  InventoryLocationReasonHttpDTO,
  ListInventoryLocationsHttpQueryDTO,
} from '../dtos/requests/inventory-location/inventory-location.request.dto.js';
import type { CreateInventoryLocationRequestDTO } from '@application/dtos/requests/inventory-location/create-inventory-location.dto.js';
import type {
  InventoryLocationResponseDTO,
  InventoryLocationSummaryResponseDTO,
  InventoryLocationListResponseDTO,
  InventoryLocationStatsResponseDTO,
} from '@application/dtos/responses/inventory-location/index.js';
import type {
  InventoryLocationHttpResponseDTO,
  InventoryLocationSummaryHttpResponseDTO,
  InventoryLocationListHttpResponseDTO,
  InventoryLocationStatsHttpResponseDTO,
} from '../dtos/responses/inventory-location/inventory-location.response.dto.js';

export class InventoryLocationControllerMapper {
  static toCreateAppDto(http: CreateInventoryLocationHttpDTO): CreateInventoryLocationRequestDTO {
    return {
      warehouseId: http.warehouseId,
      code: http.code,
      name: http.name,
      zone: http.zone,
      aisle: http.aisle,
      rack: http.rack,
      shelf: http.shelf,
      bin: http.bin,
      barcode: http.barcode,
      maxCapacityKg: http.maxCapacityKg,
      maxCapacityM3: http.maxCapacityM3,
      isPickable: http.isPickable,
      priority: http.priority,
    };
  }

  static toUpdateAppDto(inventoryLocationId: string, http: UpdateInventoryLocationHttpDTO): Record<string, unknown> {
    return { inventoryLocationId, ...http };
  }

  static toAddStockAppDto(inventoryLocationId: string, http: StockChangeHttpDTO): Record<string, unknown> {
    return { inventoryLocationId, weightKg: http.weightKg, volumeM3: http.volumeM3 };
  }

  static toRemoveStockAppDto(inventoryLocationId: string, http: StockChangeHttpDTO): Record<string, unknown> {
    return { inventoryLocationId, weightKg: http.weightKg, volumeM3: http.volumeM3 };
  }

  static toQuarantineAppDto(inventoryLocationId: string, http: QuarantineHttpDTO): Record<string, unknown> {
    return { inventoryLocationId, reason: http.reason };
  }

  static toReasonAppDto(inventoryLocationId: string, http: InventoryLocationReasonHttpDTO): Record<string, unknown> {
    return { inventoryLocationId, reason: http.reason };
  }

  static toListOptions(http: ListInventoryLocationsHttpQueryDTO): Record<string, unknown> {
    return {
      page: http.page ?? 1,
      limit: http.limit ?? 20,
      sortBy: http.sortBy ?? 'createdAt',
      sortDir: http.sortDir ?? 'desc',
      filter: {
        status: http.status,
        warehouseId: http.warehouseId,
        zone: http.zone,
        search: http.search,
      },
    };
  }

  static toHttpResponse(app: InventoryLocationResponseDTO): InventoryLocationHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as InventoryLocationHttpResponseDTO;
  }

  static toSummaryHttp(app: InventoryLocationSummaryResponseDTO): InventoryLocationSummaryHttpResponseDTO {
    return {
      ...app,
      status: typeof app.status === 'string' ? app.status : String(app.status),
    } as unknown as InventoryLocationSummaryHttpResponseDTO;
  }

  static toListHttp(app: InventoryLocationListResponseDTO): InventoryLocationListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }

  static toStatsHttp(app: InventoryLocationStatsResponseDTO): InventoryLocationStatsHttpResponseDTO {
    return app as unknown as InventoryLocationStatsHttpResponseDTO;
  }
}
