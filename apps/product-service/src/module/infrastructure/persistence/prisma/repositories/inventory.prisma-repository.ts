/**
 * InventoryPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { ProductInventoryEntity } from '../../../../domain/entities/product-inventory.entity.js';
import type { InventoryRepository } from '../../../../domain/repositories/inventory.repository.interface.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { InventoryIdVO } from '../../../../domain/value-objects/primitives/inventory-id.vo.js';
import { InventoryQuantityVO } from '../../../../domain/value-objects/primitives/inventory-quantity.vo.js';
import { InventoryThresholdVO } from '../../../../domain/value-objects/primitives/inventory-threshold.vo.js';

interface PrismaInventoryRow {
  id: string;
  productId: string;
  variantId: string | null;
  sku: string;
  quantity: number;
  reserved: number;
  lowStockThreshold: number;
  trackQuantity: boolean;
  allowBackorder: boolean;
  locationId: string | null;
  lastRestockedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class InventoryPrismaRepository
  extends BasePrismaRepository<ProductInventoryEntity, PrismaInventoryRow, string>
  implements InventoryRepository
{
  protected readonly model: PrismaDelegate<PrismaInventoryRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { productInventory: PrismaDelegate<PrismaInventoryRow> };
    this.model = client.productInventory;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  protected toDomain(raw: PrismaInventoryRow): ProductInventoryEntity {
    return ProductInventoryEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        productId: ProductIdVO.reconstitute(raw.productId),
        variantId: raw.variantId ? VariantIdVO.reconstitute(raw.variantId) : undefined,
        sku: raw.sku,
        quantity: InventoryQuantityVO.reconstitute(raw.quantity),
        reserved: InventoryQuantityVO.reconstitute(raw.reserved),
        lowStockThreshold: InventoryThresholdVO.reconstitute(raw.lowStockThreshold),
        trackQuantity: raw.trackQuantity,
        allowBackorder: raw.allowBackorder,
        locationId: raw.locationId ?? undefined,
        lastRestockedAt: raw.lastRestockedAt ? raw.lastRestockedAt.toISOString() : undefined,
      },
    });
  }

  protected toPersistence(domain: ProductInventoryEntity): Record<string, unknown> {
    return {
      id: domain.id,
      productId: domain.productId.value,
      variantId: domain.variantId?.value ?? null,
      sku: domain.sku,
      quantity: domain.quantity,
      reserved: domain.reserved,
      lowStockThreshold: domain.threshold,
      trackQuantity: domain.trackQuantity,
      allowBackorder: domain.allowBackorder,
      locationId: domain.locationId ?? null,
      lastRestockedAt: domain.lastRestockedAt ? new Date(domain.lastRestockedAt) : null,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: ProductInventoryEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findByIdVO(id: InventoryIdVO): Promise<ProductInventoryEntity | null> {
    return this.findById(id.value);
  }

  async findByProductId(productId: ProductIdVO): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.client.productInventory.findMany({
      where: { productId: productId.value, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaInventoryRow));
  }

  async findByVariantId(variantId: VariantIdVO): Promise<ProductInventoryEntity | null> {
    const raw = await this.client.productInventory.findFirst({
      where: { variantId: variantId.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw as unknown as PrismaInventoryRow) : null;
  }

  async findBySku(sku: string): Promise<ProductInventoryEntity | null> {
    const raw = await this.client.productInventory.findFirst({ where: { sku, deletedAt: null } });
    return raw ? this.toDomain(raw as unknown as PrismaInventoryRow) : null;
  }

  async findLowStock(): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.client.productInventory.findMany({
      where: { deletedAt: null },
    });
    const mapped = rows.map((r) => this.toDomain(r as unknown as PrismaInventoryRow));
    return mapped.filter((inv) => inv.isLowStock());
  }

  async findOutOfStock(): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.client.productInventory.findMany({
      where: { quantity: 0, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaInventoryRow));
  }

  async findByIds(ids: readonly string[]): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.client.productInventory.findMany({ where: { id: { in: [...ids] } } });
    return rows.map((r) => this.toDomain(r as unknown as PrismaInventoryRow));
  }

  async countByProductId(productId: ProductIdVO): Promise<number> {
    return this.client.productInventory.count({ where: { productId: productId.value, deletedAt: null } });
  }

  async deleteByProductId(productId: ProductIdVO): Promise<number> {
    const result = await this.client.productInventory.deleteMany({ where: { productId: productId.value } });
    return result.count;
  }

  async sumAvailableByProductId(productId: ProductIdVO): Promise<number> {
    const items = await this.findByProductId(productId);
    return items.reduce((sum, inv) => sum + inv.available, 0);
  }
}
