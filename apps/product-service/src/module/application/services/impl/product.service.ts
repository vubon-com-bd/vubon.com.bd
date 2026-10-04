/**
 * ProductService — Implements IProductService
 */
import { Injectable, Inject } from '@nestjs/common';
import type { IProductService } from '../interfaces/product.service.interface.js';
import { PRODUCT_REPOSITORY, type ProductRepository } from '../../../domain/repositories/product.repository.interface.js';
import { VARIANT_REPOSITORY, type VariantRepository } from '../../../domain/repositories/variant.repository.interface.js';
import { INVENTORY_REPOSITORY, type InventoryRepository } from '../../../domain/repositories/inventory.repository.interface.js';
import { PRICING_REPOSITORY, type PricingRepository } from '../../../domain/repositories/pricing.repository.interface.js';
import { ATTRIBUTE_REPOSITORY, type AttributeRepository } from '../../../domain/repositories/attribute.repository.interface.js';
import { ProductEntity } from '../../../domain/entities/product.entity.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductNameVO } from '../../../domain/value-objects/primitives/product-name.vo.js';
import { ProductSlugVO } from '../../../domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../../domain/value-objects/primitives/product-sku.vo.js';
import { ProductTypeVO } from '../../../domain/value-objects/primitives/product-type.vo.js';
import { ProductStatusVO } from '../../../domain/value-objects/primitives/product-status.vo.js';
import { ProductDescriptionVO } from '../../../domain/value-objects/primitives/product-description.vo.js';
import { CategoryIdVO } from '../../../domain/value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../../../domain/value-objects/primitives/brand-id.vo.js';
import { PriceVO } from '../../../domain/value-objects/primitives/price.vo.js';
import { PRODUCT_STATUS, PRODUCT_TYPE } from '@vubon/shared-constants/business/product';
import { randomUUID } from 'node:crypto';
import type { CurrencyCode } from '@vubon/shared-types/common';
import { ProductMapper } from '../../mappers/product.mapper.js';
import type { CreateProductRequestDTO } from '../../dtos/requests/product/create-product.dto.js';
import type { UpdateProductRequestDTO } from '../../dtos/requests/product/update-product.dto.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';
import type { ProductDetailResponseDTO } from '../../dtos/responses/product-detail-response.dto.js';
import {
  ProductNotFoundApplicationError,
  ProductSlugConflictError,
  ProductSkuConflictError,
} from '../../errors/product.errors.js';
import { ProductDetailAssembler } from '../../mappers/product-detail.assembler.js';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
    @Inject(VARIANT_REPOSITORY) private readonly variantRepo: VariantRepository,
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepo: InventoryRepository,
    @Inject(PRICING_REPOSITORY) private readonly pricingRepo: PricingRepository,
    @Inject(ATTRIBUTE_REPOSITORY) private readonly attributeRepo: AttributeRepository,
  ) {}

  async create(dto: CreateProductRequestDTO, actorId: string): Promise<ProductResponseDTO> {
    const slug = ProductSlugVO.create(dto.slug);
    if (await this.productRepo.existsBySlug(slug)) {
      throw new ProductSlugConflictError(dto.slug);
    }
    const sku = ProductSkuVO.create(dto.sku);
    if (await this.productRepo.existsBySku(sku)) {
      throw new ProductSkuConflictError(dto.sku);
    }

    const now = new Date().toISOString();
    const product = ProductEntity.create({
      id: randomUUID(),
      now,
      props: {
        name: ProductNameVO.create(dto.name),
        slug,
        sku,
        type: ProductTypeVO.create(dto.type),
        status: ProductStatusVO.create(PRODUCT_STATUS.DRAFT),
        description: ProductDescriptionVO.create(dto.description ?? ''),
        shortDescription: dto.shortDescription,
        categoryId: CategoryIdVO.create(dto.categoryId),
        brandId: dto.brandId ? BrandIdVO.create(dto.brandId) : undefined,
        vendorId: dto.vendorId,
        price: PriceVO.create(dto.price, dto.currency as CurrencyCode),
        compareAtPrice: dto.compareAtPrice !== undefined
          ? PriceVO.create(dto.compareAtPrice, dto.currency as CurrencyCode)
          : undefined,
        tags: dto.tags ?? [],
        images: dto.images ?? [],
        totalStock: 0,
        variantIds: [],
        isFeatured: false,
        isPublished: false,
        weight: dto.weight,
        barcode: dto.barcode,
      },
    });

    await this.productRepo.save(product);
    void actorId;
    return ProductMapper.toResponse(product);
  }

  async update(productId: string, dto: UpdateProductRequestDTO, actorId: string): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundApplicationError(productId);

    const now = new Date().toISOString();
    product.updateDetails({
      description: dto.description !== undefined
        ? ProductDescriptionVO.create(dto.description)
        : undefined,
      shortDescription: dto.shortDescription,
      tags: dto.tags,
      images: dto.images,
    }, actorId, now);

    if (dto.price !== undefined) {
      product.changePrice(
        PriceVO.create(dto.price, product.price.currency),
        actorId,
      );
    }
    if (dto.status !== undefined) {
      product.changeStatus(ProductStatusVO.create(dto.status), actorId);
    }
    if (dto.isFeatured !== undefined) {
      if (dto.isFeatured) product.feature(actorId);
      else product.unfeature(actorId);
    }

    await this.productRepo.save(product);
    return ProductMapper.toResponse(product);
  }

  async publish(productId: string, actorId: string): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundApplicationError(productId);
    product.publish(actorId, new Date().toISOString());
    await this.productRepo.save(product);
    return ProductMapper.toResponse(product);
  }

  async unpublish(productId: string, actorId: string, reason?: string): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundApplicationError(productId);
    product.unpublish(actorId, reason, new Date().toISOString());
    await this.productRepo.save(product);
    return ProductMapper.toResponse(product);
  }

  async archive(productId: string, actorId: string): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundApplicationError(productId);
    product.archive(actorId, new Date().toISOString());
    await this.productRepo.save(product);
    return ProductMapper.toResponse(product);
  }

  async softDelete(productId: string, actorId: string): Promise<void> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundApplicationError(productId);
    product.softDelete(actorId, new Date().toISOString());
    await this.productRepo.save(product);
  }

  async feature(productId: string, actorId: string): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundApplicationError(productId);
    product.feature(actorId);
    await this.productRepo.save(product);
    return ProductMapper.toResponse(product);
  }

  async unfeature(productId: string, actorId: string): Promise<ProductResponseDTO> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundApplicationError(productId);
    product.unfeature(actorId);
    await this.productRepo.save(product);
    return ProductMapper.toResponse(product);
  }

  async duplicate(productId: string, newName: string, actorId: string): Promise<ProductResponseDTO> {
    const original = await this.productRepo.findById(productId);
    if (!original) throw new ProductNotFoundApplicationError(productId);

    const newSlugBase = ProductSlugVO.fromName(newName);
    let slug = newSlugBase.value;
    let counter = 1;
    while (await this.productRepo.existsBySlug(ProductSlugVO.create(slug))) {
      slug = `${newSlugBase.value}-${counter++}`;
    }
    let skuBase = ProductSkuVO.create(original.sku.value).value + '-COPY';
    let sku = skuBase;
    counter = 1;
    while (await this.productRepo.existsBySku(ProductSkuVO.create(sku))) {
      sku = `${skuBase}${counter++}`;
    }

    const now = new Date().toISOString();
    const copy = ProductEntity.create({
      id: randomUUID(),
      now,
      props: {
        name: ProductNameVO.create(newName),
        slug: ProductSlugVO.create(slug),
        sku: ProductSkuVO.create(sku),
        type: original.type,
        status: ProductStatusVO.create(PRODUCT_STATUS.DRAFT),
        description: original.description,
        shortDescription: original.shortDescription,
        categoryId: original.categoryId,
        brandId: original.brandId,
        vendorId: original.vendorId,
        price: original.price,
        compareAtPrice: original.compareAtPrice,
        tags: original.tags,
        images: original.images,
        totalStock: 0,
        variantIds: [],
        isFeatured: false,
        isPublished: false,
        weight: original.weight,
        barcode: undefined,
      },
    });
    await this.productRepo.save(copy);
    void actorId;
    return ProductMapper.toResponse(copy);
  }

  async getDetail(productId: string): Promise<ProductDetailResponseDTO> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new ProductNotFoundApplicationError(productId);
    const productIdVO = ProductIdVO.reconstitute(product.id);
    const variants = await this.variantRepo.findByProductId(productIdVO);
    const inventory = await this.inventoryRepo.findByProductId(productIdVO);
    const pricing = await this.pricingRepo.findByProductId(productIdVO);
    const attributes = await this.attributeRepo.findByProductId(product.id);
    return ProductDetailAssembler.assemble({ product, variants, inventory, pricing, attributes });
  }
}
