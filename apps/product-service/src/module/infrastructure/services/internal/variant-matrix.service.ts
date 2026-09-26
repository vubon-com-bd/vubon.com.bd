import { Injectable } from '@nestjs/common';
import { ProductVariantEntity } from '../../../domain/entities/product-variant.entity';

@Injectable()
export class VariantMatrixService {
  buildMatrix(variants: readonly ProductVariantEntity[]): ReadonlyArray<{
    id: string;
    sku: string;
    price: number;
    isDefault: boolean;
  }> {
    return variants.map((v) => ({
      id: v.id.value,
      sku: v.sku.value,
      price: v.price.value,
      isDefault: v.isDefault,
    }));
  }

  findCheapest(
    variants: readonly ProductVariantEntity[],
  ): ProductVariantEntity | null {
    if (variants.length === 0) return null;
    return variants.reduce((min, v) =>
      v.price.value < min.price.value ? v : min,
    );
  }
}
