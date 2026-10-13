/**
 * ProductVariantPrismaMapper — Row ↔ Domain Entity
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductVariantEntity } from '../../../../domain/entities/product-variant.entity.js';
import { ProductVariantVO } from '../../../../domain/value-objects/composites/product-variant.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantNameVO } from '../../../../domain/value-objects/primitives/variant-name.vo.js';
import { VariantSkuVO } from '../../../../domain/value-objects/primitives/variant-sku.vo.js';
import { PriceAmountVO } from '../../../../domain/value-objects/primitives/price-amount.vo.js';
import { PriceCurrencyVO } from '../../../../domain/value-objects/primitives/price-currency.vo.js';
import { InventoryQuantityVO } from '../../../../domain/value-objects/primitives/inventory-quantity.vo.js';

export interface PrismaVariantOption {
  name: string;
  value: string;
}

export interface PrismaProductVariantRow {
  id: string;
  productId: string;
  name: string;
  sku: string;
  barcode: string | null;
  options: unknown;
  price: unknown;
  compareAtPrice: unknown | null;
  cost: unknown | null;
  currency: string;
  weightGrams: number | null;
  imageUrl: string | null;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

export class ProductVariantPrismaMapper {
  static toDomain(raw: PrismaProductVariantRow): ProductVariantEntity {
    const options = Array.isArray(raw.options)
      ? (raw.options as PrismaVariantOption[])
      : [];

    const vo = ProductVariantVO.reconstitute({
      id: VariantIdVO.reconstitute(raw.id),
      productId: ProductIdVO.reconstitute(raw.productId),
      name: VariantNameVO.reconstitute(raw.name),
      sku: VariantSkuVO.reconstitute(raw.sku),
      options: options.map((o) => ({ name: o.name, value: o.value })),
      price: PriceAmountVO.reconstitute(toNum(raw.price)),
      currency: PriceCurrencyVO.reconstitute(raw.currency),
      compareAtPrice:
        raw.compareAtPrice !== null
          ? PriceAmountVO.reconstitute(toNum(raw.compareAtPrice))
          : undefined,
      cost: raw.cost !== null ? PriceAmountVO.reconstitute(toNum(raw.cost)) : undefined,
      weightGrams: raw.weightGrams ?? undefined,
      imageUrl: raw.imageUrl ?? undefined,
      stock: InventoryQuantityVO.reconstitute(raw.stock),
      isActive: raw.isActive,
    });

    return ProductVariantEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
    });
  }

  static toPersistence(entity: ProductVariantEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      name: vo.name.value,
      sku: vo.sku.value,
      barcode: null,
      options: vo.options.map((o) => ({ name: o.name, value: o.value })),
      price: vo.price.value,
      compareAtPrice: vo.compareAtPrice?.value ?? null,
      cost: vo.cost?.value ?? null,
      currency: vo.currency.value,
      weightGrams: vo.weightGrams ?? null,
      imageUrl: vo.imageUrl ?? null,
      stock: vo.stock.value,
      isActive: vo.isActive,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
