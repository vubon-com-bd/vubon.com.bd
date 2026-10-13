/**
 * ProductInventoryPrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductInventoryEntity } from '../../../../domain/entities/product-inventory.entity.js';
import { ProductInventoryVO } from '../../../../domain/value-objects/composites/product-inventory.vo.js';
import { InventoryIdVO } from '../../../../domain/value-objects/primitives/inventory-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { InventoryStatusVO } from '../../../../domain/value-objects/primitives/inventory-status.vo.js';
import { InventoryQuantityVO } from '../../../../domain/value-objects/primitives/inventory-quantity.vo.js';
import { ProductSkuVO } from '../../../../domain/value-objects/primitives/product-sku.vo.js';

export interface PrismaProductInventoryRow {
  id: string;
  productId: string;
  variantId: string | null;
  vendorId: string | null;
  sku: string;
  quantity: number;
  reserved: number;
  status: string;
  lowStockThreshold: number;
  locationId: string | null;
  lastRestockedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
}

export class ProductInventoryPrismaMapper {
  static toDomain(raw: PrismaProductInventoryRow): ProductInventoryEntity {
    const vo = ProductInventoryVO.reconstitute({
      id: InventoryIdVO.reconstitute(raw.id),
      productId: ProductIdVO.reconstitute(raw.productId),
      variantId: raw.variantId ? VariantIdVO.reconstitute(raw.variantId) : undefined,
      vendorId: raw.vendorId ? VendorIdVO.reconstitute(raw.vendorId) : undefined,
      sku: ProductSkuVO.reconstitute(raw.sku),
      quantity: InventoryQuantityVO.reconstitute(raw.quantity),
      reserved: InventoryQuantityVO.reconstitute(raw.reserved),
      status: InventoryStatusVO.reconstitute(raw.status),
      lowStockThreshold: raw.lowStockThreshold,
      locationId: raw.locationId ?? undefined,
      lastRestockedAt: raw.lastRestockedAt
        ? new Date(raw.lastRestockedAt).toISOString()
        : undefined,
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return ProductInventoryEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
    });
  }

  static toPersistence(entity: ProductInventoryEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: vo.productId.value,
      variantId: vo.variantId?.value ?? null,
      vendorId: vo.vendorId?.value ?? null,
      sku: vo.sku.value,
      quantity: vo.quantity.value,
      reserved: vo.reserved.value,
      status: vo.status.value,
      lowStockThreshold: vo.lowStockThreshold,
      locationId: vo.locationId ?? null,
      lastRestockedAt: vo.lastRestockedAt ? new Date(vo.lastRestockedAt) : null,
      updatedAt: new Date(vo.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
