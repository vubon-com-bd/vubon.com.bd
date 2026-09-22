import { ProductVariantEntity } from '../entities/product-variant.entity';

export class VariantSelectionService {
  static selectDefault(
    variants: readonly ProductVariantEntity[],
  ): ProductVariantEntity | null {
    const def = variants.find((v) => v.isDefault);
    if (def) return def;
    return variants.length > 0 ? variants[0] : null;
  }

  static findLowestPrice(
    variants: readonly ProductVariantEntity[],
  ): ProductVariantEntity | null {
    if (variants.length === 0) return null;
    return variants.reduce((min, v) =>
      v.price.value < min.price.value ? v : min,
    );
  }
}
