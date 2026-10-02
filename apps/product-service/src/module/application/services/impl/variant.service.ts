/**
 * VariantService
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IVariantService } from '../interfaces/variant.service.interface.js';
import { VARIANT_REPOSITORY, type VariantRepository } from '../../../domain/repositories/variant.repository.interface.js';
import { PRODUCT_REPOSITORY, type ProductRepository } from '../../../domain/repositories/product.repository.interface.js';
import { ProductVariantEntity } from '../../../domain/entities/product-variant.entity.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantNameVO } from '../../../domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../../../domain/value-objects/primitives/variant-sku.vo.js';
import { PriceVO } from '../../../domain/value-objects/primitives/price.vo.js';
import { VariantMapper } from '../../mappers/variant.mapper.js';
import type { AddVariantRequestDTO } from '../../dtos/requests/variant/add-variant.dto.js';
import type { UpdateVariantRequestDTO } from '../../dtos/requests/variant/update-variant.dto.js';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto.js';
import { VariantNotFoundApplicationError, VariantSkuConflictError } from '../../errors/variant.errors.js';
import { ProductNotFoundApplicationError } from '../../errors/product.errors.js';

@Injectable()
export class VariantService implements IVariantService {
  constructor(
    @Inject(VARIANT_REPOSITORY) private readonly variantRepo: VariantRepository,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
  ) {}

  async add(dto: AddVariantRequestDTO, actorId: string): Promise<VariantResponseDTO> {
    const productIdVO = ProductIdVO.create(dto.productId);
    const product = await this.productRepo.findById(dto.productId);
    if (!product) throw new ProductNotFoundApplicationError(dto.productId);

    const sku = VariantSkuVO.create(dto.sku);
    if (await this.variantRepo.existsBySku(sku)) throw new VariantSkuConflictError(dto.sku);

    const now = new Date().toISOString();
    const variant = ProductVariantEntity.create({
      id: randomUUID(),
      now,
      props: {
        productId: productIdVO,
        name: VariantNameVO.create(dto.name),
        sku,
        barcode: dto.barcode,
        type: dto.type,
        options: dto.options,
        price: PriceVO.create(dto.price, product.price.currency),
        compareAtPrice: dto.compareAtPrice ? PriceVO.create(dto.compareAtPrice, product.price.currency) : undefined,
        cost: dto.cost ? PriceVO.create(dto.cost, product.price.currency) : undefined,
        weight: dto.weight,
        status: 'active',
        stock: 0,
      },
    });
    await this.variantRepo.save(variant);
    product.addVariant(variant.id);
    await this.productRepo.save(product);
    void actorId;
    return VariantMapper.toResponse(variant);
  }

  async update(dto: UpdateVariantRequestDTO): Promise<VariantResponseDTO> {
    const variant = await this.variantRepo.findById(dto.variantId);
    if (!variant) throw new VariantNotFoundApplicationError(dto.variantId);
    const now = new Date().toISOString();
    if (dto.price !== undefined) variant.changePrice(PriceVO.create(dto.price, variant.price.currency), now);
    if (dto.weight !== undefined) variant.updateWeight(dto.weight);
    if (dto.imageUrl !== undefined) variant.updateImage(dto.imageUrl);
    if (dto.cost !== undefined) variant.updateCost(PriceVO.create(dto.cost, variant.price.currency));
    await this.variantRepo.save(variant);
    return VariantMapper.toResponse(variant);
  }

  async remove(variantId: string, actorId: string): Promise<void> {
    const variant = await this.variantRepo.findById(variantId);
    if (!variant) throw new VariantNotFoundApplicationError(variantId);
    await this.variantRepo.delete(variantId);
    const product = await this.productRepo.findById(variant.productId.value);
    if (product) {
      product.removeVariant(variantId);
      await this.productRepo.save(product);
    }
    void actorId;
  }

  async listByProduct(productId: string): Promise<readonly VariantResponseDTO[]> {
    const variants = await this.variantRepo.findByProductId(ProductIdVO.create(productId));
    return VariantMapper.toResponseList(variants);
  }

  async regenerateMatrix(productId: string, actorId: string): Promise<readonly VariantResponseDTO[]> {
    const variants = await this.variantRepo.findByProductId(ProductIdVO.create(productId));
    void actorId;
    return VariantMapper.toResponseList(variants);
  }
}
