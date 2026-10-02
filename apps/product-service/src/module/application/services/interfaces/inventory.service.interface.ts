/**
 * IInventoryService Interface
 */
import type { UpdateInventoryRequestDTO } from '../../dtos/requests/inventory/update-inventory.dto.js';
import type { AdjustInventoryRequestDTO } from '../../dtos/requests/inventory/adjust-inventory.dto.js';
import type { ReserveInventoryRequestDTO } from '../../dtos/requests/inventory/reserve-inventory.dto.js';
import type { ReleaseInventoryRequestDTO } from '../../dtos/requests/inventory/release-inventory.dto.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

export const INVENTORY_SERVICE = Symbol('INVENTORY_SERVICE');

export interface IInventoryService {
  update(dto: UpdateInventoryRequestDTO, actorId: string): Promise<InventoryResponseDTO>;
  adjust(dto: AdjustInventoryRequestDTO): Promise<InventoryResponseDTO>;
  reserve(dto: ReserveInventoryRequestDTO): Promise<InventoryResponseDTO>;
  release(dto: ReleaseInventoryRequestDTO): Promise<InventoryResponseDTO>;
  listByProduct(productId: string): Promise<readonly InventoryResponseDTO[]>;
  listLowStock(): Promise<readonly InventoryResponseDTO[]>;
}
