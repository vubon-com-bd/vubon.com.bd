/**
 * ProductService — orchestrates product use cases
 * @module product-service/application/services/impl
 *
 * Real business logic:
 *  - Domain service integration (slug, sku, eligibility)
 *  - Event publishing via DomainEventBridgeService
 *  - Rich logging
 *  - Cross-aggregate orchestration (variants, attributes)
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
  type ProductListFilter,
  type ProductListOptions,
} from '../../../domain/repositories/product.repository.interface.js';
import {
  VARIANT_REPOSITORY,
  type ProductVariantRepository,
} from '../../../domain/repositories/product-variant.repository.interface.js';
import {
  ATTRIBUTE_REPOSITORY,
  type ProductAttributeRepository,
} from '../../../domain/repositories/product-attribute.repository.interface.js';
import { ProductEntity } from '../../../domain/entities/product.entity.js';
import { ProductVO } from '../../../domain/value-objects/composites/product.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { VendorClient } from '../../../infrastructure/services/external/vendor.client.js';
import {
  MEDIA_REPOSITORY,
  type ProductMediaRepository,
} from '../../../domain/repositories/product-media.repository.interface.js';
import { ProductNameVO } from '../../../domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../../../domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../../domain/value-objects/primitives/product-sku.vo.js';
import { ProductStatusVO } from '../../../domain/value-objects/primitives/product-status.vo.js';
import { ProductTypeVO } from '../../../domain/value-objects/primitives/product-type.vo.js';
import { CategoryIdVO } from '../../../domain/value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../../../domain/value-objects/primitives/brand-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ProductDescriptionVO } from '../../../domain/value-objects/primitives/product-description.vo.js';
import { ProductBarcodeVO } from '../../../domain/value-objects/primitives/product-barcode.vo.js';
import { ProductWeightVO } from '../../../domain/value-objects/primitives/product-weight.vo.js';
import { ProductDimensionVO } from '../../../domain/value-objects/primitives/product-dimension.vo.js';
import { ProductSlugService } from '../../../domain/services/product-slug.service.js';
import { ProductSkuService } from '../../../domain/services/product-sku.service.js';
import { ProductEligibilityService } from '../../../domain/services/product-eligibility.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { PRICING_REPOSITORY, type ProductPricingRepository } from '../../../domain/repositories/product-pricing.repository.interface.js';
import { ProductPricingVO } from '../../../domain/value-objects/composites/product-pricing.vo.js';
import { ProductPricingEntity } from '../../../domain/entities/product-pricing.entity.js';
import { PriceIdVO } from '../../../domain/value-objects/primitives/price-id.vo.js';
import { PriceAmountVO } from '../../../domain/value-objects/primitives/price-amount.vo.js';
import { PriceCurrencyVO } from '../../../domain/value-objects/primitives/price-currency.vo.js';
import { PricingRuleTypeVO } from '../../../domain/value-objects/primitives/pricing-rule-type.vo.js';
import { ProductMapper } from '../../mappers/product.mapper.js';

import type {
  IProductService,
  ProductListOptionsDTO,
  ProductListFilterDTO,
} from '../interfaces/product.service.interface.js';
import {
  ProductNotFoundApplicationError,
  ProductCreationError,
  ProductSlugConflictApplicationError,
  ProductValidationError,
  ProductPublishError,
  ProductDeleteError,
} from '../../errors/product.errors.js';
import type {
  CreateProductCommandDTO,
  UpdateProductCommandDTO,
  DeleteProductRequestDTO,
  PublishProductRequestDTO,
  ArchiveProductRequestDTO,
  DuplicateProductRequestDTO,
} from '../../dtos/requests/product/index.js';
import type {
  ProductResponseDTO,
  ProductPublicResponseDTO,
  ProductSummaryResponseDTO,
  ProductListResponseDTO,
  ProductStatsResponseDTO,
  ProductDetailResponseDTO,
  ProductCreateResponseDTO,
} from '../../dtos/responses/product-response.dto.js';

@Injectable()
export class ProductService implements IProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
    @Inject(PRICING_REPOSITORY)
    private readonly pricingRepo: ProductPricingRepository,
    @Inject(VARIANT_REPOSITORY)
    private readonly variantRepo: ProductVariantRepository,
    @Inject(ATTRIBUTE_REPOSITORY)
    private readonly attributeRepo: ProductAttributeRepository,
    @Inject(MEDIA_REPOSITORY)
    private readonly mediaRepo: ProductMediaRepository,
    private readonly vendorClient: VendorClient,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async create(
    dto: CreateProductCommandDTO,
    userId: string,
    _actorId?: string,
  ): Promise<ProductCreateResponseDTO> {
    const now = new Date().toISOString();

    // ─── Slug uniqueness ───
    if (await this.repo.existsBySlug(dto.slug)) {
      throw new ProductSlugConflictApplicationError(dto.slug);
    }

    // ─── SKU uniqueness ───
    if (await this.repo.existsBySku(dto.sku)) {
      throw new ProductValidationError(`SKU "${dto.sku}" already exists`, 'sku');
    }

    // ─── Build VOs ───
    const id = randomUUID();
    let entity: ProductEntity;
    try {
      const vo = ProductVO.create({
        id: ProductIdVO.create(id),
        name: ProductNameVO.create(dto.name),
        slug: ProductSlugVO.create(dto.slug),
        sku: ProductSkuVO.create(dto.sku),
        description: dto.description ? ProductDescriptionVO.create(dto.description) : undefined,
        shortDescription: dto.shortDescription
          ? ProductDescriptionVO.create(dto.shortDescription)
          : undefined,
        type: ProductTypeVO.create(dto.type),
        status: ProductStatusVO.draft(),
        categoryId: CategoryIdVO.create(dto.categoryId),
        brandId: dto.brandId ? BrandIdVO.create(dto.brandId) : undefined,
        vendorId: dto.vendorId ? VendorIdVO.create(dto.vendorId) : undefined,
        tags: dto.tags ?? [],
        images: dto.images ?? [],
        barcode: dto.barcode ? ProductBarcodeVO.create(dto.barcode) : undefined,
        weight: dto.weight ? ProductWeightVO.create(dto.weight) : undefined,
        dimensions: dto.dimensions
          ? ProductDimensionVO.create(dto.dimensions)
          : undefined,
        totalStock: 0,
        isFeatured: false,
        isPublished: false,
      });

      entity = ProductEntity.create({ id: vo.id, vo, now });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new ProductCreationError(msg);
    }

    const saved = await this.repo.save(entity);

      // ─── Auto-create initial pricing entity ───
      try {
        const now = new Date().toISOString();
        const pricingVo = ProductPricingVO.create({
          id: PriceIdVO.create(randomUUID()),
          productId: ProductIdVO.create(saved.id),
          type: PricingRuleTypeVO.create('fixed'),
          basePrice: PriceAmountVO.create(dto.price ?? 0),
          sellingPrice: PriceAmountVO.create(dto.price ?? 0),
          currency: PriceCurrencyVO.create(dto.currency),
          taxInclusive: false,
          updatedAt: now,
        });
        const pricingEntity = ProductPricingEntity.create({
          id: pricingVo.value.id.value,
          vo: pricingVo,
          now,
        });
        await this.pricingRepo.save(pricingEntity);
        this.logger.log(`✅ Initial pricing created for product ${saved.id}`);
      } catch (pricingErr) {
        this.logger.warn(
          `Failed to create initial pricing for product ${saved.id}: ${pricingErr instanceof Error ? pricingErr.message : 'unknown'}`,
        );
      }
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`Product ${saved.id} created — sku=${saved.vo.sku.value} by ${userId}`);

    return {
      success: true,
      productId: saved.id,
      status: saved.status.value as never,
      slug: saved.vo.slug.value,
    };
  }

  async update(
    dto: UpdateProductCommandDTO,
    _actorId?: string,
  ): Promise<ProductResponseDTO> {
    const entity = await this.load(dto.productId);

    const patch = dto.patch;
    entity.updateMetadata(
      {
        name: patch.name ? ProductNameVO.create(patch.name) : undefined,
        description: patch.description
          ? ProductDescriptionVO.create(patch.description)
          : undefined,
        tags: patch.tags,
        images: patch.images,
        isFeatured: patch.isFeatured,
      },
    );

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${saved.id} updated`);
    return ProductMapper.toResponse(saved);
  }

  async delete(
    dto: DeleteProductRequestDTO,
  ): Promise<{ readonly success: true; readonly productId: string }> {
    const entity = await this.load(dto.productId);

    try {
      entity.delete(dto.actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new ProductDeleteError(dto.productId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${saved.id} deleted`);
    return { success: true, productId: saved.id };
  }

  async submit(productId: string): Promise<ProductResponseDTO> {
    const entity = await this.load(productId);
    entity.submit();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${saved.id} submitted for approval`);

    // ─── Auto-approve for trusted vendors ───
    try {
      const vendorId = saved.vo.vendorId?.value;
      if (vendorId) {
        const vendor = await this.vendorClient.getById(vendorId);
        const isTrusted = vendor && (vendor as unknown as { tier?: string }).tier === 'gold' || (vendor as unknown as { tier?: string }).tier === 'platinum';
        if (vendor?.isApproved && isTrusted) {
          saved.approve('auto-approve:trusted-vendor');
          const autoSaved = await this.repo.save(saved);
          await this.eventBridge.publishFromEntity(autoSaved);
          this.logger.log(`Product ${saved.id} auto-approved (trusted vendor ${vendorId})`);
          return ProductMapper.toResponse(autoSaved);
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown';
      this.logger.warn(`Auto-approve check failed: ${msg}`);
    }

    return ProductMapper.toResponse(saved);
  }

  async approve(productId: string, approvedBy?: string): Promise<ProductResponseDTO> {
    const entity = await this.load(productId);
    entity.approve(approvedBy);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${saved.id} approved`);
    return ProductMapper.toResponse(saved);
  }

  async reject(productId: string, reason: string, rejectedBy?: string): Promise<ProductResponseDTO> {
    const entity = await this.load(productId);
    entity.reject(reason, rejectedBy);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${saved.id} rejected: ${reason}`);
    return ProductMapper.toResponse(saved);
  }

  async publish(dto: PublishProductRequestDTO): Promise<ProductResponseDTO> {
    const entity = await this.load(dto.productId);

    // ─── Auto-aggregate stock from variants ───
    const variants = await this.variantRepo.findByProduct(ProductIdVO.create(dto.productId));
    const totalStock = variants.reduce((sum, v) => sum + (v.vo.stock?.value ?? 0), 0);
    if (totalStock > 0 && entity.vo.totalStock !== totalStock) {
      entity.updateStock(totalStock, 'auto-aggregate-from-variants');
      this.logger.log(`Auto-aggregated stock for product ${dto.productId}: ${totalStock}`);
    }

    // ─── Auto-aggregate images from media repo ───
    const mediaList = await this.mediaRepo.findAllByProduct(ProductIdVO.create(dto.productId));
    if (mediaList && mediaList.length > 0 && entity.vo.images.length === 0) {
      const imageUrls: string[] = [];
      for (const m of mediaList) {
        const items = (m.vo as unknown as { items?: readonly { url: string; type: string }[] }).items;
        if (items) {
          for (const item of items) {
            if (item.type === 'image') imageUrls.push(item.url);
          }
        }
      }
      if (imageUrls.length > 0) {
        entity.updateMetadata({ images: imageUrls });
        this.logger.log(`Auto-aggregated ${imageUrls.length} images for product ${dto.productId}`);
      }
    }

    // ─── Eligibility (via domain service) ───
    const eligibility = ProductEligibilityService.canPublish(entity);
    if (!eligibility.eligible) {
      throw new ProductPublishError(dto.productId, eligibility.reasons.join('; '));
    }

    entity.publish();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${saved.id} published`);
    return ProductMapper.toResponse(saved);
  }

  async archive(dto: ArchiveProductRequestDTO): Promise<ProductResponseDTO> {
    const entity = await this.load(dto.productId);
    entity.archive();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${saved.id} archived`);
    return ProductMapper.toResponse(saved);
  }

  async duplicate(dto: DuplicateProductRequestDTO): Promise<ProductCreateResponseDTO> {
    const source = await this.load(dto.productId);
    const now = new Date().toISOString();

    // ─── New slug via domain service ───
    const existingSlugs = await this.collectSlugs();
    const newName = dto.newName ?? `${source.vo.name.value} (Copy)`;
    const slugResult = ProductSlugService.generate({ name: newName, existingSlugs });

    // ─── New SKU ───
    const skuResult = ProductSkuService.generate({
      vendorCode: source.vo.vendorId?.value.slice(0, 3) ?? 'VBN',
      categoryCode: source.vo.categoryId.value.slice(0, 3),
      sequence: existingSlugs.length + 1,
    });

    const newId = randomUUID();
    const vo = ProductVO.create({
      id: ProductIdVO.create(newId),
      name: ProductNameVO.create(newName),
      slug: slugResult.slug,
      sku: skuResult,
      description: source.vo.description,
      shortDescription: source.vo.shortDescription,
      type: source.vo.type,
      status: ProductStatusVO.draft(),
      categoryId: source.vo.categoryId,
      brandId: source.vo.brandId,
      vendorId: source.vo.vendorId,
      tags: [...source.vo.tags],
      images: dto.copyImages === false ? [] : [...source.vo.images],
      thumbnailUrl: dto.copyImages === false ? undefined : source.vo.thumbnailUrl,
      barcode: undefined,
      weight: source.vo.weight,
      dimensions: source.vo.dimensions,
      totalStock: 0,
      isFeatured: false,
      isPublished: false,
    });

    const entity = ProductEntity.create({ id: vo.id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${source.id} duplicated → ${saved.id}`);

    return {
      success: true,
      productId: saved.id,
      status: saved.status.value as never,
      slug: saved.vo.slug.value,
    };
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<ProductResponseDTO> {
    const entity = await this.load(id);
    return ProductMapper.toResponse(entity);
  }

  async getBySlug(slug: string): Promise<ProductResponseDTO> {
    const entity = await this.repo.findBySlug(slug);
    if (!entity) throw new ProductNotFoundApplicationError(slug);
    return ProductMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<ProductPublicResponseDTO> {
    const entity = await this.load(id);
    const base = ProductMapper.toPublicResponse(entity);

    // ─── Enrich with price (from pricing or variant) ───
    let price: number | undefined;
    let currency: string | undefined;
    let sku: string | undefined;

    try {
      // Try pricing first
      const pricing = await this.pricingRepo.findByProduct(ProductIdVO.create(id));
      if (pricing) {
        price = (pricing as unknown as { vo?: { basePrice?: { value: number }; currency?: { value: string } } }).vo?.basePrice?.value;
        currency = (pricing as unknown as { vo?: { currency?: { value: string } } }).vo?.currency?.value;
      }

      // Fallback: variant price
      if (price === undefined) {
        const variants = await this.variantRepo.findByProduct(ProductIdVO.create(id));
        if (variants.length > 0 && variants[0]) {
          price = variants[0].vo.price?.value;
          currency = variants[0].vo.currency?.value;
          sku = variants[0].vo.sku?.value;
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown';
      this.logger.warn(`Price enrich failed for ${id}: ${msg}`);
    }

    return {
      ...base,
      ...(price !== undefined ? { price } : {}),
      ...(currency ? { currency } : {}),
      ...(sku ? { sku } : {}),
      ...(price !== undefined && price > 0 ? { isAvailable: true } : { isAvailable: false }),
    };
  }

  async getDetail(id: string): Promise<ProductDetailResponseDTO> {
    const entity = await this.load(id);
    const variants = await this.variantRepo.findByProduct(entity.productId);
    const attributes = await this.attributeRepo.findByProduct(entity.productId);
    return ProductMapper.toDetail(entity, variants, attributes);
  }

  async list(options: ProductListOptionsDTO): Promise<ProductListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as ProductListFilter | undefined,
      includeDeleted: options.includeDeleted,
    } as ProductListOptions);
    return ProductMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async search(term: string, limit = 20): Promise<readonly ProductSummaryResponseDTO[]> {
    const entities = await this.repo.search(term, limit);
    return entities.map((e) => ProductMapper.toSummary(e));
  }

  async getFeatured(limit = 20): Promise<readonly ProductSummaryResponseDTO[]> {
    const entities = await this.repo.findFeatured(limit);
    return entities.map((e) => ProductMapper.toSummary(e));
  }

  async getRelated(productId: string, limit = 10): Promise<readonly ProductSummaryResponseDTO[]> {
    const source = await this.load(productId);
    const entities = await this.repo.findByCategory(source.vo.categoryId);
    const filtered = entities.filter((e) => e.id !== productId).slice(0, limit);
    return filtered.map((e) => ProductMapper.toSummary(e));
  }

  async getStats(filter?: ProductListFilterDTO): Promise<ProductStatsResponseDTO> {
    const stats = await this.repo.getStats(filter as ProductListFilter | undefined);
    return {
      total: stats.total,
      publishedCount: stats.publishedCount,
      draftCount: stats.draftCount,
      outOfStockCount: stats.outOfStockCount,
      totalStockUnits: stats.totalStockUnits,
      byStatus: stats.byStatus,
      byType: stats.byType,
    };
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<ProductEntity> {
    const vo = ProductIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new ProductNotFoundApplicationError(id);
    return entity;
  }

  private async collectSlugs(): Promise<readonly string[]> {
    const all = await this.repo.findAll();
    return all.map((p) => p.vo.slug.value);
  }
}
