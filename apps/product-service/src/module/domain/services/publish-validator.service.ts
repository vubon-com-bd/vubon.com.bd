/**
 * PublishValidator Domain Service
 * @module product-service/domain/services
 *
 * Aggregated publishability check combining specification + variant + media.
 */
import { ProductEntity } from '../entities/product.entity.js';
import { ProductVariantEntity } from '../entities/product-variant.entity.js';
import { ProductMediaEntity } from '../entities/product-media.entity.js';
import { CanPublishProductSpecification } from '../specifications/can-publish-product.specification.js';

export interface PublishValidation {
  readonly allowed: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

export class PublishValidatorService {
  private readonly spec = new CanPublishProductSpecification();

  validate(
    product: ProductEntity,
    variants: readonly ProductVariantEntity[],
    media: readonly ProductMediaEntity[],
  ): PublishValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    const baseCheck = this.spec.check(product);
    if (!baseCheck.allowed && baseCheck.reason) {
      errors.push(baseCheck.reason);
    }

    // Rule: if variable product, must have at least one variant
    if (product.type.value === 'variable' && variants.length === 0) {
      errors.push('variable product must have at least one variant');
    }

    // Rule: image-only media
    const images = media.filter((m) => m.isImage());
    if (images.length === 0) {
      errors.push('at least one product image required');
    }

    // Warning: no variants have stock
    if (variants.length > 0 && variants.every((v) => v.stock === 0)) {
      warnings.push('all variants are out of stock');
    }

    // Warning: no primary image set
    if (images.length > 0 && !images.some((i) => i.isPrimary)) {
      warnings.push('no primary image set');
    }

    // Warning: no variants for non-variable physical product
    if (product.type.value === 'physical' && variants.length === 0) {
      warnings.push('physical product has no variants — considered simple product');
    }

    return {
      allowed: errors.length === 0,
      errors,
      warnings,
    };
  }
}
