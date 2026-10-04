/**
 * Variant HTTP validator
 */
import { Injectable, Inject } from '@nestjs/common';
import { VariantSkuVO } from '../../domain/value-objects/primitives/variant-sku.vo.js';
import { VARIANT_REPOSITORY, type VariantRepository } from '../../domain/repositories/variant.repository.interface.js';
import { VariantSkuConflictError } from '../../application/errors/variant.errors.js';

export const VARIANT_VALIDATOR = Symbol('VARIANT_VALIDATOR');

@Injectable()
export class VariantValidator {
  constructor(
    @Inject(VARIANT_REPOSITORY) private readonly variantRepo: VariantRepository,
  ) {}

  async assertUniqueSku(sku: string, ignoreId?: string): Promise<void> {
    const skuVO = VariantSkuVO.create(sku);
    const existing = await this.variantRepo.findBySku(skuVO);
    if (existing && existing.id !== ignoreId) {
      throw new VariantSkuConflictError(sku);
    }
  }
}
