/**
 * ProductInventoryService — orchestrates inventory use cases
 * @module product-service/application/services/impl
 *
 * Real business logic:
 *  - Stock adjustments with reason validation
 *  - Reservation with oversell protection
 *  - Release with bounded quantity
 *  - Low-stock alert detection
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  INVENTORY_REPOSITORY,
  type ProductInventoryRepository,
  type InventoryListFilter,
  type InventoryListOptions,
} from '../../../domain/repositories/product-inventory.repository.interface.js';
import { ProductInventoryEntity } from '../../../domain/entities/product-inventory.entity.js';
import { ProductInventoryVO } from '../../../domain/value-objects/composites/product-inventory.vo.js';
import { InventoryIdVO } from '../../../domain/value-objects/primitives/inventory-id.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import {
  VARIANT_REPOSITORY,
  type ProductVariantRepository,
} from '../../../domain/repositories/product-variant.repository.interface.js';
import { VariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo.js';
import { InventoryQuantityVO } from '../../../domain/value-objects/primitives/inventory-quantity.vo.js';
import { InventoryStatusVO } from '../../../domain/value-objects/primitives/inventory-status.vo.js';
import { ProductSkuVO } from '../../../domain/value-objects/primitives/product-sku.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ProductInventoryService as InventoryDomainService } from '../../../domain/services/product-inventory.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { InventoryMapper } from '../../mappers/inventory.mapper.js';
import type {
  IProductInventoryService,
  InventoryListOptionsDTO,
  InventoryListFilterDTO,
  CreateDefaultInventoryDTO,
} from '../interfaces/product-inventory.service.interface.js';
import {
  InventoryNotFoundApplicationError,
  InventoryAdjustError,
  InventoryReserveError,
  InventoryInsufficientStockApplicationError,
  InventoryValidationError,
} from '../../errors/inventory.errors.js';
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

@Injectable()
export class ProductInventoryApplicationService implements IProductInventoryService {
  private readonly logger = new Logger(ProductInventoryApplicationService.name);

  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repo: ProductInventoryRepository,
    @Inject(VARIANT_REPOSITORY)
    private readonly variantRepo: ProductVariantRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async createDefault(dto: CreateDefaultInventoryDTO): Promise<InventoryResponseDTO> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const qty = dto.quantity ?? 0;

    const vo = ProductInventoryVO.create({
      id: InventoryIdVO.create(id),
      productId: ProductIdVO.create(dto.productId),
      ...(dto.variantId ? { variantId: VariantIdVO.create(dto.variantId) } : {}),
      ...(dto.vendorId ? { vendorId: VendorIdVO.create(dto.vendorId) } : {}),
      sku: ProductSkuVO.create(dto.sku),
      quantity: InventoryQuantityVO.create(qty),
      reserved: InventoryQuantityVO.zero(),
      status: InventoryStatusVO.create(qty > 0 ? 'in_stock' : 'out_of_stock'),
      lowStockThreshold: dto.lowStockThreshold ?? 10,
      updatedAt: now,
    });

    const entity = ProductInventoryEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    this.logger.log(`Inventory created for product ${dto.productId} (${qty} units)`);
    return InventoryMapper.toResponse(saved);
  }

  async update(dto: UpdateInventoryCommandDTO): Promise<InventoryResponseDTO> {
    const entity = await this.load(dto.inventoryId);
    const previous = entity.quantity.value;
    const delta = dto.delta;

    try {
      entity.adjust(delta);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new InventoryAdjustError(dto.inventoryId, msg);
    }

    const saved = await this.repo.save(entity);

    // ─── Sync stock to variant ───
    if (saved.vo.variantId?.value) {
      try {
        const variant = await this.variantRepo.findById(saved.vo.variantId.value);
        if (variant) {
          variant.adjustStock(delta);
          await this.variantRepo.save(variant);
          this.logger.log(`Variant ${variant.id} stock synced to ${variant.stock.value}`);
        }
      } catch (syncErr) {
        const msg = syncErr instanceof Error ? syncErr.message : 'Unknown';
        this.logger.warn(`Variant stock sync failed: ${msg}`);
      }
    }

    // NOTE: child entity (inventory) → no domain events; parent aggregate (product) emits.
    // Application-level alerts only:

    // Alert detection via domain service
    if (InventoryDomainService.shouldAlertLowStock(previous, saved.quantity.value, saved.vo.lowStockThreshold)) {
      this.logger.warn(`LOW STOCK: ${saved.id} (${saved.quantity.value} units)`);
    }
    if (InventoryDomainService.shouldAlertOutOfStock(previous, saved.quantity.value)) {
      this.logger.warn(`OUT OF STOCK: ${saved.id}`);
    }
    if (InventoryDomainService.shouldAlertBackInStock(previous, saved.quantity.value)) {
      this.logger.log(`BACK IN STOCK: ${saved.id}`);
    }

    this.logger.log(`Inventory ${saved.id} adjusted by ${delta} (${dto.reason})`);
    return InventoryMapper.toResponse(saved);
  }

  async adjust(dto: AdjustInventoryRequestDTO): Promise<InventoryResponseDTO> {
    if (dto.delta === 0) {
      throw new InventoryValidationError('Adjustment delta cannot be zero', 'delta');
    }
    return this.update({
      inventoryId: dto.inventoryId,
      delta: dto.delta,
      reason: dto.reason,
      reference: dto.reference,
      actorId: dto.actorId,
    });
  }

  async reserve(dto: ReserveInventoryRequestDTO): Promise<InventoryResponseDTO> {
    const entity = await this.load(dto.inventoryId);
    const available = entity.available.value;

    if (available < dto.quantity) {
      throw new InventoryInsufficientStockApplicationError(
        dto.inventoryId,
        available,
        dto.quantity,
      );
    }

    try {
      entity.reserve(dto.quantity);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new InventoryReserveError(dto.inventoryId, msg);
    }

    const saved = await this.repo.save(entity);
    this.logger.log(
      `Inventory ${saved.id} reserved ${dto.quantity} for ${dto.referenceId}`,
    );
    return InventoryMapper.toResponse(saved);
  }

  async release(dto: ReleaseInventoryRequestDTO): Promise<InventoryResponseDTO> {
    const entity = await this.load(dto.inventoryId);
    try {
      entity.releaseReservation(dto.quantity);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new InventoryReserveError(dto.inventoryId, msg);
    }

    const saved = await this.repo.save(entity);
    this.logger.log(
      `Inventory ${saved.id} released ${dto.quantity} for ${dto.referenceId}`,
    );
    return InventoryMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<InventoryResponseDTO> {
    const entity = await this.load(id);
    return InventoryMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<InventoryPublicResponseDTO> {
    const entity = await this.load(id);
    return InventoryMapper.toPublicResponse(entity);
  }

  async getByProduct(productId: string): Promise<InventoryResponseDTO> {
    const entity = await this.repo.findByProduct(ProductIdVO.create(productId));
    if (entity) return InventoryMapper.toResponse(entity);

    // Fallback: scan all inventory records for matching productId
    this.logger.log(`[DEBUG] getByProduct fallback for ${productId}`);
    const all = await this.repo.findAll();
    this.logger.log(`[DEBUG] total inventory: ${all.length}`);
    for (const it of all) {
      const pid = it.vo?.productId?.value;
      this.logger.log(`[DEBUG] inventory ${it.id} productId=${pid}`);
      if (pid === productId) {
        this.logger.log(`[DEBUG] MATCH found: ${it.id}`);
        return InventoryMapper.toResponse(it);
      }
    }

    throw new InventoryNotFoundApplicationError(productId);
  }

  async getByVariant(variantId: string): Promise<InventoryResponseDTO> {
    const entity = await this.repo.findByVariant(VariantIdVO.create(variantId));
    if (!entity) throw new InventoryNotFoundApplicationError(variantId);
    return InventoryMapper.toResponse(entity);
  }

  async checkStock(productId: string, quantity: number): Promise<StockCheckResponseDTO> {
    const entity = await this.repo.findByProduct(ProductIdVO.create(productId));
    if (!entity) throw new InventoryNotFoundApplicationError(productId);
    return InventoryMapper.toStockCheckResponse(entity, quantity);
  }

  async list(options: InventoryListOptionsDTO): Promise<InventoryListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as InventoryListFilter | undefined,
    } as InventoryListOptions);
    return InventoryMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async listLowStock(threshold = 10): Promise<readonly InventorySummaryResponseDTO[]> {
    const entities = await this.repo.findBelowThreshold(threshold);
    return entities.map((e) => InventoryMapper.toSummary(e));
  }

  async getStats(filter?: InventoryListFilterDTO): Promise<InventoryStatsResponseDTO> {
    const stats = await this.repo.getStats(filter as InventoryListFilter | undefined);
    return InventoryMapper.toStatsResponse(stats);
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<ProductInventoryEntity> {
    const vo = InventoryIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new InventoryNotFoundApplicationError(id);
    return entity;
  }
}
