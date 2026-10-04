/**
 * CanDeleteBrand Specification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { BrandEntity } from '../entities/brand.entity.js';

export class CanDeleteBrandSpecification extends Specification<BrandEntity> {
  isSatisfiedBy(brand: BrandEntity): boolean {
    if (brand.isDeleted()) return false;
    if (brand.hasProducts()) return false;
    return true;
  }

  reason(brand: BrandEntity): string | undefined {
    if (brand.isDeleted()) return 'already deleted';
    if (brand.hasProducts()) return `brand has ${brand.productCount} products`;
    return undefined;
  }
}
