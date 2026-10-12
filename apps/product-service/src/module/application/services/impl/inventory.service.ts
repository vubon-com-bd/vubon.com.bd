/**
 * InventoryService — orchestrates inventory use cases + emits domain events.
 *
 * Note: ProductInventoryEntity is a CHILD entity (extends BaseEntity),
 * so domain events are emitted from the application layer (service).
 * This is DDD-compliant: application orchestrates child-entity lifecycle.
 */
import { Injectable, Inject } from '@nestjs/common';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import type { IInventoryService } from '../interfaces/inventory.service.interface.js';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepository,
} from '../../../domain/repositories/inventory.repository.interface.js';
import { ProductInventoryEntity } from '../../../domain/entities/product-inventory.entity.js';
import { InventoryMapper } from '../../mappers/inventory.mapper.js';
import type { UpdateInventoryRequestDTO } from '../../dtos/requests/inventory/update-inventory.dto.js';
import type { AdjustInventoryRequestDTO } from '../../dtos/requests/inventory/adjust-inventory.dto.js';
import type { ReserveInventoryRequestDTO } from '../../dtos/requests/inventory/reserve-inventory.dto.js';
import type { ReleaseInventoryRequestDTO } from '../../dtos/requests/inventory/release-inventory.dto.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';
import { InventoryNotFoundApplicationError } from '../../errors/inventory.errors.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';

import {
  InventoryAdjustedEvent,
  StockReservedEvent,
  StockReleasedEvent,
  StockRestockedEvent,
  LowStockAlertEvent,
  OutOfStockAlertEvent,
} from '../../../domain/events/inventory.events.js';

@Injectable()
export class InventoryService implements IInventoryService {
  constructor(
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepo: InventoryRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async update(dto: UpdateInventoryRequestDTO, actorId: string): Promise<InventoryResponseDTO> {
    const inv = await this.load(dto.inventoryId);
    const oldQuantity = inv.quantity;
    const now = new Date().toISOString();
    const adjustedBy = actorId || 'system';

    if (dto.delta > 0) inv.addStock(dto.delta, now);
    else if (dto.delta < 0) inv.removeStock(Math.abs(dto.delta));

    const saved = await this.inventoryRepo.save(inv);

    await this.eventBridge.publish(
      new InventoryAdjustedEvent({
        aggregateId: saved.id,
        payload: {
          inventoryId: saved.id,
          productId: saved.productId.value,
          variantId: saved.variantId?.value,
          oldQuantity,
          newQuantity: saved.quantity,
          delta: dto.delta,
          reason: dto.reason ?? 'update',
          adjustedBy,
        },
        version: 1,
      }),
    );

    if (dto.delta > 0) {
      await this.eventBridge.publish(
        new StockRestockedEvent({
          aggregateId: saved.id,
          payload: {
            inventoryId: saved.id,
            productId: saved.productId.value,
            variantId: saved.variantId?.value,
            amount: dto.delta,
            newQuantity: saved.quantity,
            restockedAt: now,
          },
          version: 1,
        }),
      );
    }

    await this.emitStockAlerts(saved);
    return InventoryMapper.toResponse(saved);
  }

  async adjust(dto: AdjustInventoryRequestDTO): Promise<InventoryResponseDTO> {
    const inv = await this.load(dto.inventoryId);
    const oldQuantity = inv.quantity;
    const now = new Date().toISOString();

    if (dto.delta > 0) inv.addStock(dto.delta, now);
    else if (dto.delta < 0) inv.removeStock(Math.abs(dto.delta));

    const saved = await this.inventoryRepo.save(inv);

    await this.eventBridge.publish(
      new InventoryAdjustedEvent({
        aggregateId: saved.id,
        payload: {
          inventoryId: saved.id,
          productId: saved.productId.value,
          variantId: saved.variantId?.value,
          oldQuantity,
          newQuantity: saved.quantity,
          delta: dto.delta,
          reason: 'adjust',
          adjustedBy: 'system',
        },
        version: 1,
      }),
    );

    await this.emitStockAlerts(saved);
    return InventoryMapper.toResponse(saved);
  }

  async reserve(dto: ReserveInventoryRequestDTO): Promise<InventoryResponseDTO> {
    const inv = await this.load(dto.inventoryId);
    inv.reserve(dto.amount);
    const saved = await this.inventoryRepo.save(inv);

    await this.eventBridge.publish(
      new StockReservedEvent({
        aggregateId: saved.id,
        payload: {
          inventoryId: saved.id,
          productId: saved.productId.value,
          variantId: saved.variantId?.value,
          amount: dto.amount,
          reservedTotal: saved.reserved,
          reference: (dto as { reference?: string }).reference ?? 'system',
        },
        version: 1,
      }),
    );

    return InventoryMapper.toResponse(saved);
  }

  async release(dto: ReleaseInventoryRequestDTO): Promise<InventoryResponseDTO> {
    const inv = await this.load(dto.inventoryId);
    inv.release(dto.amount);
    const saved = await this.inventoryRepo.save(inv);

    await this.eventBridge.publish(
      new StockReleasedEvent({
        aggregateId: saved.id,
        payload: {
          inventoryId: saved.id,
          productId: saved.productId.value,
          variantId: saved.variantId?.value,
          amount: dto.amount,
          reservedTotal: saved.reserved,
          reason: (dto as { reason?: string }).reason ?? 'release',
        },
        version: 1,
      }),
    );

    return InventoryMapper.toResponse(saved);
  }

  async listByProduct(productId: string): Promise<readonly InventoryResponseDTO[]> {
    const inv = await this.inventoryRepo.findByProductId(ProductIdVO.create(productId));
    return InventoryMapper.toResponseList(inv);
  }

  async listLowStock(): Promise<readonly InventoryResponseDTO[]> {
    const inv = await this.inventoryRepo.findLowStock();
    return InventoryMapper.toResponseList(inv);
  }

  // ═══ Private helpers ═══

  private async load(inventoryId: string): Promise<ProductInventoryEntity> {
    const inv = await this.inventoryRepo.findById(inventoryId);
    if (!inv) throw new InventoryNotFoundApplicationError(inventoryId);
    return inv;
  }

  private async emitStockAlerts(inv: ProductInventoryEntity): Promise<void> {
    if (inv.quantity === 0 && !inv.allowBackorder) {
      await this.eventBridge.publish(
        new OutOfStockAlertEvent({
          aggregateId: inv.id,
          payload: {
            inventoryId: inv.id,
            productId: inv.productId.value,
            variantId: inv.variantId?.value,
            lastQuantity: inv.quantity,
          },
          version: 1,
        }),
      );
      return;
    }
    if (inv.isLowStock()) {
      await this.eventBridge.publish(
        new LowStockAlertEvent({
          aggregateId: inv.id,
          payload: {
            inventoryId: inv.id,
            productId: inv.productId.value,
            variantId: inv.variantId?.value,
            currentStock: inv.quantity,
            threshold: inv.threshold,
          },
          version: 1,
        }),
      );
    }
  }
}
