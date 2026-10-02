/**
 * InventoryService
 */
import { Injectable, Inject } from '@nestjs/common';
import type { IInventoryService } from '../interfaces/inventory.service.interface.js';
import { INVENTORY_REPOSITORY, type InventoryRepository } from '../../../domain/repositories/inventory.repository.interface.js';
import { InventoryMapper } from '../../mappers/inventory.mapper.js';
import type { UpdateInventoryRequestDTO } from '../../dtos/requests/inventory/update-inventory.dto.js';
import type { AdjustInventoryRequestDTO } from '../../dtos/requests/inventory/adjust-inventory.dto.js';
import type { ReserveInventoryRequestDTO } from '../../dtos/requests/inventory/reserve-inventory.dto.js';
import type { ReleaseInventoryRequestDTO } from '../../dtos/requests/inventory/release-inventory.dto.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';
import { InventoryNotFoundApplicationError } from '../../errors/inventory.errors.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';

@Injectable()
export class InventoryService implements IInventoryService {
  constructor(
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepo: InventoryRepository,
  ) {}

  async update(dto: UpdateInventoryRequestDTO, actorId: string): Promise<InventoryResponseDTO> {
    const inv = await this.inventoryRepo.findById(dto.inventoryId);
    if (!inv) throw new InventoryNotFoundApplicationError(dto.inventoryId);
    if (dto.delta > 0) inv.addStock(dto.delta, new Date().toISOString());
    else if (dto.delta < 0) inv.removeStock(Math.abs(dto.delta));
    await this.inventoryRepo.save(inv);
    void actorId;
    return InventoryMapper.toResponse(inv);
  }

  async adjust(dto: AdjustInventoryRequestDTO): Promise<InventoryResponseDTO> {
    const inv = await this.inventoryRepo.findById(dto.inventoryId);
    if (!inv) throw new InventoryNotFoundApplicationError(dto.inventoryId);
    if (dto.delta > 0) inv.addStock(dto.delta, new Date().toISOString());
    else if (dto.delta < 0) inv.removeStock(Math.abs(dto.delta));
    await this.inventoryRepo.save(inv);
    return InventoryMapper.toResponse(inv);
  }

  async reserve(dto: ReserveInventoryRequestDTO): Promise<InventoryResponseDTO> {
    const inv = await this.inventoryRepo.findById(dto.inventoryId);
    if (!inv) throw new InventoryNotFoundApplicationError(dto.inventoryId);
    inv.reserve(dto.amount);
    await this.inventoryRepo.save(inv);
    return InventoryMapper.toResponse(inv);
  }

  async release(dto: ReleaseInventoryRequestDTO): Promise<InventoryResponseDTO> {
    const inv = await this.inventoryRepo.findById(dto.inventoryId);
    if (!inv) throw new InventoryNotFoundApplicationError(dto.inventoryId);
    inv.release(dto.amount);
    await this.inventoryRepo.save(inv);
    return InventoryMapper.toResponse(inv);
  }

  async listByProduct(productId: string): Promise<readonly InventoryResponseDTO[]> {
    const inv = await this.inventoryRepo.findByProductId(ProductIdVO.create(productId));
    return InventoryMapper.toResponseList(inv);
  }

  async listLowStock(): Promise<readonly InventoryResponseDTO[]> {
    const inv = await this.inventoryRepo.findLowStock();
    return InventoryMapper.toResponseList(inv);
  }
}
