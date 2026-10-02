/**
 * ProductReferenceService — validates cross-service references
 * (category, brand, vendor IDs) against local caches/repos.
 * @module product-service/infrastructure/services/internal
 */
import { Injectable, Logger, Inject } from '@nestjs/common';
import { CATEGORY_REPOSITORY, type CategoryRepository } from '../../../domain/repositories/category.repository.interface.js';
import { BRAND_REPOSITORY, type BrandRepository } from '../../../domain/repositories/brand.repository.interface.js';

export interface ReferenceCheckResult {
  readonly valid: boolean;
  readonly missing: readonly string[];
}

export const PRODUCT_REFERENCE_SERVICE = Symbol('PRODUCT_REFERENCE_SERVICE');

@Injectable()
export class ProductReferenceService {
  private readonly logger = new Logger(ProductReferenceService.name);

  constructor(
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepo: CategoryRepository,
    @Inject(BRAND_REPOSITORY) private readonly brandRepo: BrandRepository,
  ) {}

  async checkCategory(categoryId: string): Promise<boolean> {
    try {
      const found = await this.categoryRepo.findById(categoryId);
      return found !== null;
    } catch (err) {
      this.logger.warn(`Category lookup failed: ${err instanceof Error ? err.message : String(err)}`);
      return false;
    }
  }

  async checkBrand(brandId: string): Promise<boolean> {
    try {
      const found = await this.brandRepo.findById(brandId);
      return found !== null;
    } catch (err) {
      this.logger.warn(`Brand lookup failed: ${err instanceof Error ? err.message : String(err)}`);
      return false;
    }
  }

  async checkAll(refs: {
    categoryId?: string;
    brandId?: string;
  }): Promise<ReferenceCheckResult> {
    const missing: string[] = [];
    if (refs.categoryId && !(await this.checkCategory(refs.categoryId))) {
      missing.push(`category:${refs.categoryId}`);
    }
    if (refs.brandId && !(await this.checkBrand(refs.brandId))) {
      missing.push(`brand:${refs.brandId}`);
    }
    return { valid: missing.length === 0, missing };
  }
}
