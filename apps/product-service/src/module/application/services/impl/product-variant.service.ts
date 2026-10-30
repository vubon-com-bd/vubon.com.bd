/**
 * ProductVariantService — orchestrates variant use cases
 * @module product-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  VARIANT_REPOSITORY,
  type ProductVariantRepository,
} from '../../../domain/repositories/product-variant.repository.interface.js';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '../../../domain/repositories/product.repository.interface.js';
import { ProductVariantEntity } from '../../../domain/entities/product-variant.entity.js';
import { ProductVariantVO } from '../../../domain/value-objects/composites/product-variant.vo.js';
import { VariantIdVO } from '../../../domain/value-objects/primitives/variant-id.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantNameVO } from '../../../domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../../../domain/value-objects/primitives/variant-sku.vo.js';
import { PriceAmountVO } from '../../../domain/value-objects/primitives/price-amount.vo.js';
import { PriceCurrencyVO } from '../../../domain/value-objects/primitives/price-currency.vo.js';
import { InventoryQuantityVO } from '../../../domain/value-objects/primitives/inventory-quantity.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import {
  INVENTORY_SERVICE,
  type IProductInventoryService,
} from '../interfaces/product-inventory.service.interface.js';

import { VariantMapper } from '../../mappers/variant.mapper.js';
import type {
  IProductVariantService,
  VariantListOptionsDTO,
  VariantListFilterDTO,
} from '../interfaces/product-variant.service.interface.js';
import {
  VariantNotFoundApplicationError,
  VariantSkuConflictApplicationError,
  VariantAddError,
} from '../../errors/variant.errors.js';
import type {
  AddVariantCommandDTO,
  UpdateVariantRequestDTO,
  RemoveVariantRequestDTO,
  SetDefaultVariantRequestDTO,
} from '../../dtos/requests/variant/index.js';
import type {
  VariantResponseDTO,
  VariantPublicResponseDTO,
  VariantSummaryResponseDTO,
  VariantListResponseDTO,
  VariantStatsResponseDTO,
} from '../../dtos/responses/variant-response.dto.js';

@Injectable()
export class ProductVariantService implements IProductVariantService {
  private readonly logger = new Logger(ProductVariantService.name);

  constructor(
    @Inject(VARIANT_REPOSITORY)
    private readonly repo: ProductVariantRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
    @Inject(INVENTORY_SERVICE)
    private readonly inventoryService: IProductInventoryService,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async add(dto: AddVariantCommandDTO, _actorId?: string): Promise<VariantResponseDTO> {
    if (await this.repo.existsBySku(dto.sku)) {
      throw new VariantSkuConflictApplicationError(dto.sku);
    }

    const product = await this.productRepo.findByIdVO(ProductIdVO.create(dto.productId));
    if (!product) throw new VariantAddError(`product "${dto.productId}" not found`);

    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    try {
      const productCurrency = product.vo.vendorId ? 'BDT' : 'BDT';
      const vo = ProductVariantVO.create({
        id: VariantIdVO.create(id),
        productId: ProductIdVO.create(dto.productId),
        name: VariantNameVO.create(dto.name),
        sku: VariantSkuVO.create(dto.sku),
        options: dto.options.map((o) => ({ name: o.name, value: o.value })),
        price: PriceAmountVO.create(dto.price),
        currency: PriceCurrencyVO.create(productCurrency),
        compareAtPrice: dto.compareAtPrice ? PriceAmountVO.create(dto.compareAtPrice) : undefined,
        cost: dto.cost ? PriceAmountVO.create(dto.cost) : undefined,
        weightGrams: dto.weight,
        stock: InventoryQuantityVO.zero(),
        isActive: true,
      });

      const entity = ProductVariantEntity.create({ id, vo, now });
      const saved = await this.repo.save(entity);

      // ─── Auto-create default inventory record ───
      try {
        const vendorId = product.vo.vendorId?.value;
        await this.inventoryService.createDefault({
          productId: dto.productId,
          variantId: saved.id,
          ...(vendorId ? { vendorId } : {}),
          sku: dto.sku,
          quantity: 0,
        });
        this.logger.log(`Default inventory created for variant ${saved.id}`);
      } catch (invErr) {
        const msg = invErr instanceof Error ? invErr.message : 'Unknown';
        this.logger.warn(`Inventory auto-create failed for variant ${saved.id}: ${msg}`);
      }

      this.logger.log(`Variant ${saved.id} added to product ${dto.productId}`);
      return VariantMapper.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new VariantAddError(msg);
    }
  }

  async update(dto: UpdateVariantRequestDTO): Promise<VariantResponseDTO> {
    const entity = await this.load(dto.variantId);
    const current = entity.vo.value;

    const nextVo = ProductVariantVO.create({
      ...current,
      name: dto.name ? VariantNameVO.create(dto.name) : current.name,
      sku: dto.sku ? VariantSkuVO.create(dto.sku) : current.sku,
      options: dto.options
        ? dto.options.map((o) => ({ name: o.name, value: o.value }))
        : current.options,
      price: dto.price !== undefined ? PriceAmountVO.create(dto.price) : current.price,
      compareAtPrice:
        dto.compareAtPrice !== undefined
          ? PriceAmountVO.create(dto.compareAtPrice)
          : current.compareAtPrice,
      cost: dto.cost !== undefined ? PriceAmountVO.create(dto.cost) : current.cost,
      weightGrams: dto.weight !== undefined ? dto.weight : current.weightGrams,
      imageUrl: dto.imageUrl !== undefined ? dto.imageUrl : current.imageUrl,
      isActive: dto.isActive !== undefined ? dto.isActive : current.isActive,
    });

    entity.updateVo(nextVo);
    const saved = await this.repo.save(entity);
    this.logger.log(`Variant ${saved.id} updated`);
    return VariantMapper.toResponse(saved);
  }

  async remove(
    dto: RemoveVariantRequestDTO,
  ): Promise<{ readonly success: true; readonly variantId: string }> {
    const entity = await this.load(dto.variantId);
    await this.repo.softDelete(entity.id, dto.actorId);
    this.logger.log(`Variant ${entity.id} removed from product ${dto.productId}`);
    return { success: true, variantId: entity.id };
  }

  async setDefault(dto: SetDefaultVariantRequestDTO): Promise<VariantResponseDTO> {
    const entity = await this.load(dto.variantId);
    entity.activate();
    const saved = await this.repo.save(entity);
    this.logger.log(`Variant ${saved.id} set as default for product ${dto.productId}`);
    return VariantMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<VariantResponseDTO> {
    const entity = await this.load(id);
    return VariantMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<VariantPublicResponseDTO> {
    const entity = await this.load(id);
    return VariantMapper.toPublicResponse(entity);
  }

  async listByProduct(productId: string): Promise<readonly VariantSummaryResponseDTO[]> {
    const entities = await this.repo.findByProduct(ProductIdVO.create(productId));
    return entities.map((e) => VariantMapper.toSummary(e));
  }

  async list(options: VariantListOptionsDTO): Promise<VariantListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as VariantListFilterDTO | undefined,
    } as never);
    return VariantMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async getStats(productId?: string): Promise<VariantStatsResponseDTO> {
    const stats = await this.repo.getStats(productId);
    return VariantMapper.toStatsResponse(stats);
  }

  private async load(id: string): Promise<ProductVariantEntity> {
    const vo = VariantIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VariantNotFoundApplicationError(id);
    return entity;
  }
}
