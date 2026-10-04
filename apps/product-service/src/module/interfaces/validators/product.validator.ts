/**
 * Product HTTP validator
 * @module product-service/interfaces/validators
 */
import { Injectable, Inject } from '@nestjs/common';
import { ProductSlugVO } from '../../domain/value-objects/primitives/product-slug.vo.js';
import { ProductSkuVO } from '../../domain/value-objects/primitives/product-sku.vo.js';
import { PRODUCT_REPOSITORY, type ProductRepository } from '../../domain/repositories/product.repository.interface.js';
import {
  ProductSlugConflictError,
  ProductSkuConflictError,
} from '../../application/errors/product.errors.js';

export const PRODUCT_VALIDATOR = Symbol('PRODUCT_VALIDATOR');

@Injectable()
export class ProductValidator {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
  ) {}

  async assertUniqueSlug(slug: string, ignoreId?: string): Promise<void> {
    const slugVO = ProductSlugVO.create(slug);
    const existing = await this.productRepo.findBySlug(slugVO);
    if (existing && existing.id !== ignoreId) {
      throw new ProductSlugConflictError(slug);
    }
  }

  async assertUniqueSku(sku: string, ignoreId?: string): Promise<void> {
    const skuVO = ProductSkuVO.create(sku);
    const existing = await this.productRepo.findBySku(skuVO);
    if (existing && existing.id !== ignoreId) {
      throw new ProductSkuConflictError(sku);
    }
  }

  assertPriceRange(min: number, max: number): void {
    if (min < 0 || max < 0) {
      throw new Error('Price range cannot be negative');
    }
    if (min > max) {
      throw new Error('minPrice cannot exceed maxPrice');
    }
  }
}
