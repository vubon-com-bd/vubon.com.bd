import type {
  InventoryLocationResponseDTO,
  InventoryLocationListResponseDTO,
  InventoryLocationStatsResponseDTO,
} from '@application/dtos/responses/inventory-location/index.js';
import type {
  CreateInventoryLocationRequestDTO,
  UpdateInventoryLocationRequestDTO,
  InventoryLocationActionRequestDTO,
  DeactivateInventoryLocationRequestDTO,
  QuarantineInventoryLocationRequestDTO,
  ArchiveInventoryLocationRequestDTO,
  AddInventoryStockRequestDTO,
  RemoveInventoryStockRequestDTO,
} from '@application/dtos/requests/inventory-location/index.js';
import type { InventoryLocationStatusValue } from '@domain/primitives/inventory-location-status.vo';

export const INVENTORY_LOCATION_SERVICE = Symbol('INVENTORY_LOCATION_SERVICE');

export interface InventoryLocationListFilterDTO {
  readonly warehouseId?: string;
  readonly zone?: string;
  readonly status?: InventoryLocationStatusValue;
  readonly isActive?: boolean;
  readonly isPickable?: boolean;
  readonly isQuarantine?: boolean;
  readonly minCapacityKg?: number;
  readonly search?: string;
}
export interface InventoryLocationListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'priority' | 'currentKg';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: InventoryLocationListFilterDTO;
}

export interface IInventoryLocationService {
  create(dto: CreateInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  update(dto: UpdateInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  activate(dto: InventoryLocationActionRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  deactivate(dto: DeactivateInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  quarantine(dto: QuarantineInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  unquarantine(dto: InventoryLocationActionRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  archive(dto: ArchiveInventoryLocationRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  addStock(dto: AddInventoryStockRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  removeStock(dto: RemoveInventoryStockRequestDTO, actorId: string): Promise<InventoryLocationResponseDTO>;
  updateCapacity(
    dto: { inventoryLocationId: string; maxCapacityKg?: number; maxCapacityM3?: number },
    actorId: string,
  ): Promise<InventoryLocationResponseDTO>;

  getById(id: string): Promise<InventoryLocationResponseDTO>;
  getByCode(code: string): Promise<InventoryLocationResponseDTO>;
  getByBarcode(barcode: string): Promise<InventoryLocationResponseDTO>;
  list(options: InventoryLocationListOptionsDTO): Promise<InventoryLocationListResponseDTO>;
  listByWarehouse(warehouseId: string): Promise<InventoryLocationListResponseDTO>;
  listByZone(warehouseId: string, zone: string): Promise<InventoryLocationListResponseDTO>;
  listPickable(warehouseId: string): Promise<InventoryLocationListResponseDTO>;
  getStats(warehouseId?: string): Promise<InventoryLocationStatsResponseDTO>;
}
