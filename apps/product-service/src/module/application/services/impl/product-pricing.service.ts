/**
 * ProductPricingService — orchestrates pricing use cases
 * @module product-service/application/services/impl
 *
 * Real business logic:
 *  - Price update with cost-guard
 *  - Price calculation (VAT/AIT via domain service)
 *  - Margin analysis
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import {
  PRICING_REPOSITORY,
  type ProductPricingRepository,
  type PricingListFilter,
  type PricingListOptions,
} from '../../../domain/repositories/product-pricing.repository.interface.js';
import { ProductPricingEntity } from '../../../domain/entities/product-pricing.entity.js';
import { PriceIdVO } from '../../../domain/value-objects/primitives/price-id.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { PriceAmountVO } from '../../../domain/value-objects/primitives/price-amount.vo.js';
import { ProductPriceService } from '../../../domain/services/product-price.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { PricingMapper } from '../../mappers/pricing.mapper.js';
import type {
  IProductPricingService,
  PricingListOptionsDTO,
  PricingListFilterDTO,
  PriceCalculationInputDTO,
} from '../interfaces/product-pricing.service.interface.js';
import {
  PricingNotFoundApplicationError,
  PriceUpdateError,
  PriceBelowCostApplicationError,
} from '../../errors/pricing.errors.js';
import type { UpdatePriceRequestDTO } from '../../dtos/requests/pricing/index.js';
import type {
  PricingResponseDTO,
  PricingPublicResponseDTO,
  PricingListResponseDTO,
  PricingStatsResponseDTO,
  PriceCalculationResponseDTO,
} from '../../dtos/responses/pricing-response.dto.js';

@Injectable()
export class ProductPricingApplicationService implements IProductPricingService {
  private readonly logger = new Logger(ProductPricingApplicationService.name);

  constructor(
    @Inject(PRICING_REPOSITORY)
    private readonly repo: ProductPricingRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async updatePrice(dto: UpdatePriceRequestDTO): Promise<PricingResponseDTO> {
    const entity = await this.loadByProduct(dto.productId);

    const newPrice = PriceAmountVO.create(dto.sellingPrice);
    const cost = entity.vo.costPrice?.value;
    if (cost !== undefined && newPrice.value < cost) {
      throw new PriceBelowCostApplicationError(newPrice.value, cost);
    }

    try {
      entity.updatePrice(newPrice);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new PriceUpdateError(dto.productId, msg);
    }

    const saved = await this.repo.save(entity);
    // NOTE: child entity (pricing) → no domain events; parent aggregate (product) emits.
    this.logger.log(
      `Price updated for product ${dto.productId} → ${newPrice.value} ${saved.currency.value}`,
    );
    return PricingMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<PricingResponseDTO> {
    const entity = await this.load(id);
    return PricingMapper.toResponse(entity);
  }

  async getByProduct(productId: string): Promise<PricingResponseDTO> {
    const entity = await this.loadByProduct(productId);
    return PricingMapper.toResponse(entity);
  }

  async getPublic(productId: string): Promise<PricingPublicResponseDTO> {
    const entity = await this.loadByProduct(productId);
    return PricingMapper.toPublicResponse(entity);
  }

  async calculate(input: PriceCalculationInputDTO): Promise<PriceCalculationResponseDTO> {
    const pricing = await this.loadByProduct(input.productId);
    const basePrice = pricing.vo.sellingPrice.value;
    const currency = input.currency ?? pricing.currency.value;
    const grossInput = basePrice * input.quantity;

    // ─── Apply discount via domain service ───
    const discountPercent = pricing.vo.discountPercent ?? 0;
    const discount = ProductPriceService.applyDiscount({
      basePrice: grossInput,
      discountPercent,
      currency,
    });

    // ─── Tax via domain service (BD VAT + AIT) ───
    const tax = ProductPriceService.calculateTax({
      amount: discount.finalPrice,
      currency,
      taxInclusive: pricing.vo.taxInclusive,
      applyAit: input.applyAit,
    });

    return PricingMapper.toCalculationResponse({
      basePrice: discount.basePrice,
      discountAmount: discount.discountAmount,
      finalPrice: discount.finalPrice,
      discountPercent: discount.discountPercent,
      vat: tax.vat,
      ait: tax.ait,
      grossAmount: tax.grossAmount,
      netAmount: tax.netAmount,
      currency,
    });
  }

  async list(options: PricingListOptionsDTO): Promise<PricingListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as PricingListFilter | undefined,
    } as PricingListOptions);
    return PricingMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async getStats(filter?: PricingListFilterDTO): Promise<PricingStatsResponseDTO> {
    const stats = await this.repo.getStats(filter as PricingListFilter | undefined);
    return PricingMapper.toStatsResponse(stats);
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<ProductPricingEntity> {
    const vo = PriceIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new PricingNotFoundApplicationError(id);
    return entity;
  }

  private async loadByProduct(productId: string): Promise<ProductPricingEntity> {
    const entity = await this.repo.findByProduct(ProductIdVO.create(productId));
    if (!entity) throw new PricingNotFoundApplicationError(productId);
    return entity;
  }
}
