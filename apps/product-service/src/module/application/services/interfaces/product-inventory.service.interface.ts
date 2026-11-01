/**
 * IProductInventoryService — contract
 * @module product-service/application/services/interfaces
 */
import type {
  UpdateInventoryCommandDTO,
  AdjustInventoryRequestDTO,
  ReserveInventoryRequestDTO,
  ReleaseInventoryRequestDTO,
} from '../../dtos/requests/inventory/index.js';
import type {
  InventoryResponseDTO,
  InventoryPublicResponseDTO,
  InventorySummaryResponseDTO,
  InventoryListResponseDTO,
  InventoryStatsResponseDTO,
  StockCheckResponseDTO,
} from '../../dtos/responses/inventory-response.dto.js';

export const INVENTORY_SERVICE = Symbol('INVENTORY_SERVICE');

export interface InventoryListFilterDTO {
  readonly productId?: string;
  readonly variantId?: string;
  readonly status?: string | readonly string[];
  readonly belowThreshold?: number;
}

export interface InventoryListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'quantity' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: InventoryListFilterDTO;
}

export interface CreateDefaultInventoryDTO {
  readonly productId: string;
  readonly variantId?: string;
  readonly vendorId?: string;
  readonly sku: string;
  readonly quantity?: number;
  readonly lowStockThreshold?: number;
}

export interface IProductInventoryService {
  // Commands
  createDefault(dto: CreateDefaultInventoryDTO): Promise<InventoryResponseDTO>;
  update(dto: UpdateInventoryCommandDTO): Promise<InventoryResponseDTO>;
  adjust(dto: AdjustInventoryRequestDTO): Promise<InventoryResponseDTO>;
  reserve(dto: ReserveInventoryRequestDTO): Promise<InventoryResponseDTO>;
  release(dto: ReleaseInventoryRequestDTO): Promise<InventoryResponseDTO>;

  // Queries
  getById(id: string): Promise<InventoryResponseDTO>;
  getPublic(id: string): Promise<InventoryPublicResponseDTO>;
  getByProduct(productId: string): Promise<InventoryResponseDTO>;
  getByVariant(variantId: string): Promise<InventoryResponseDTO>;
  checkStock(productId: string, quantity: number): Promise<StockCheckResponseDTO>;
  list(options: InventoryListOptionsDTO): Promise<InventoryListResponseDTO>;
  listLowStock(threshold?: number): Promise<readonly InventorySummaryResponseDTO[]>;
  getStats(filter?: InventoryListFilterDTO): Promise<InventoryStatsResponseDTO>;
}
