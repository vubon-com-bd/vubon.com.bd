/**
 * ProductInventoryPrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ProductInventoryRepository,
  InventoryListOptions,
  InventoryListFilter,
  InventoryPaginationResult,
  InventoryStats,
} from '../../../../domain/repositories/product-inventory.repository.interface.js';
import { ProductInventoryEntity } from '../../../../domain/entities/product-inventory.entity.js';
import { InventoryIdVO } from '../../../../domain/value-objects/primitives/inventory-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  ProductInventoryPrismaMapper,
  type PrismaProductInventoryRow,
} from '../mappers/product-inventory.prisma.mapper.js';

interface InventoryDelegate {
  findFirst(args: unknown): Promise<PrismaProductInventoryRow | null>;
  findUnique(args: unknown): Promise<PrismaProductInventoryRow | null>;
  findMany(args?: unknown): Promise<PrismaProductInventoryRow[]>;
  create(args: unknown): Promise<PrismaProductInventoryRow>;
  update(args: unknown): Promise<PrismaProductInventoryRow>;
  delete(args: unknown): Promise<PrismaProductInventoryRow>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<unknown>;
}

@Injectable()
export class ProductInventoryPrismaRepository implements ProductInventoryRepository {
  private readonly logger = new Logger(ProductInventoryPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): InventoryDelegate {
    return this.prisma.getModel<InventoryDelegate>('productInventory');
  }

  async findById(id: string): Promise<ProductInventoryEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? ProductInventoryPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map(ProductInventoryPrismaMapper.toDomain);
  }

  async save(entity: ProductInventoryEntity): Promise<ProductInventoryEntity> {
    const data = ProductInventoryPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);
    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return ProductInventoryPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return ProductInventoryPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByIdVO(id: InventoryIdVO): Promise<ProductInventoryEntity | null> {
    return this.findById(id.value);
  }

  async findByProduct(productId: ProductIdVO): Promise<ProductInventoryEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { productId: productId.value, variantId: null, deletedAt: null },
    });
    return raw ? ProductInventoryPrismaMapper.toDomain(raw) : null;
  }

  async findByVariant(variantId: VariantIdVO): Promise<ProductInventoryEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { variantId: variantId.value, deletedAt: null },
    });
    return raw ? ProductInventoryPrismaMapper.toDomain(raw) : null;
  }

  async findBySku(sku: string): Promise<ProductInventoryEntity | null> {
    const raw = await this.delegate.findFirst({ where: { sku, deletedAt: null } });
    return raw ? ProductInventoryPrismaMapper.toDomain(raw) : null;
  }

  async findPaginated(options: InventoryListOptions): Promise<InventoryPaginationResult> {
    const where = this.buildWhere(options.filter);
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);
    return {
      items: rows.map(ProductInventoryPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(filter?: InventoryListFilter): Promise<InventoryStats> {
    const where = this.buildWhere(filter);
    const [totalRecords, inStockCount, lowStockCount, outOfStockCount, agg] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.count({ where: { ...where, status: 'in_stock' } }),
      this.delegate.count({ where: { ...where, status: 'low_stock' } }),
      this.delegate.count({ where: { ...where, status: 'out_of_stock' } }),
      this.delegate.aggregate({
        where,
        _sum: { quantity: true, reserved: true },
      } as never),
    ]);

    const sums = agg as {
      _sum?: { quantity?: number | null; reserved?: number | null };
    };
    const totalQuantity = sums._sum?.quantity ?? 0;
    const totalReserved = sums._sum?.reserved ?? 0;

    return {
      totalRecords,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      totalQuantity,
      totalReserved,
      totalAvailable: totalQuantity - totalReserved,
    };
  }

  async findBelowThreshold(threshold: number): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { quantity: { lte: threshold, gt: 0 }, deletedAt: null },
    });
    return rows.map(ProductInventoryPrismaMapper.toDomain);
  }

  async findOutOfStock(): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { quantity: 0, deletedAt: null },
    });
    return rows.map(ProductInventoryPrismaMapper.toDomain);
  }

  async findCritical(threshold: number): Promise<readonly ProductInventoryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { quantity: { lte: threshold, gt: 0 }, deletedAt: null },
    });
    return rows.map(ProductInventoryPrismaMapper.toDomain);
  }

  async adjustBatch(
    adjustments: readonly { id: string; delta: number }[],
  ): Promise<void> {
    for (const adj of adjustments) {
      const existing = await this.findById(adj.id);
      if (!existing) continue;
      try {
        existing.adjust(adj.delta);
        await this.save(existing);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.warn(`adjustBatch skipped ${adj.id}: ${msg.slice(0, 80)}`);
      }
    }
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  private buildWhere(filter: InventoryListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.productId) w['productId'] = filter.productId;
    if (filter.variantId) w['variantId'] = filter.variantId;
    if (filter.status) {
      w['status'] = Array.isArray(filter.status) ? { in: filter.status } : filter.status;
    }
    if (filter.belowThreshold !== undefined) {
      w['quantity'] = { lte: filter.belowThreshold };
    }
    return w;
  }
}
