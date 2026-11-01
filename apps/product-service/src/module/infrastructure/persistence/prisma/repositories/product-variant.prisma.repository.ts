/**
 * ProductVariantPrismaRepository — implements ProductVariantRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ProductVariantRepository,
  VariantListOptions,
  VariantListFilter,
  VariantPaginationResult,
  VariantStats,
} from '../../../../domain/repositories/product-variant.repository.interface.js';
import { ProductVariantEntity } from '../../../../domain/entities/product-variant.entity.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  ProductVariantPrismaMapper,
  type PrismaProductVariantRow,
} from '../mappers/product-variant.prisma.mapper.js';

interface VariantDelegate {
  findFirst(args: unknown): Promise<PrismaProductVariantRow | null>;
  findUnique(args: unknown): Promise<PrismaProductVariantRow | null>;
  findMany(args?: unknown): Promise<PrismaProductVariantRow[]>;
  create(args: unknown): Promise<PrismaProductVariantRow>;
  update(args: unknown): Promise<PrismaProductVariantRow>;
  delete(args: unknown): Promise<PrismaProductVariantRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
  aggregate(args: unknown): Promise<unknown>;
}

@Injectable()
export class ProductVariantPrismaRepository implements ProductVariantRepository {
  private readonly logger = new Logger(ProductVariantPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): VariantDelegate {
    return this.prisma.getModel<VariantDelegate>('productVariant');
  }

  // ═══════ BaseRepository ═══════
  async findById(id: string): Promise<ProductVariantEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? ProductVariantPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map(ProductVariantPrismaMapper.toDomain);
  }

  async save(entity: ProductVariantEntity): Promise<ProductVariantEntity> {
    const data = ProductVariantPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return ProductVariantPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return ProductVariantPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  // ═══════ Custom ═══════
  async findByIdVO(id: VariantIdVO): Promise<ProductVariantEntity | null> {
    return this.findById(id.value);
  }

  async existsBySku(sku: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { sku, deletedAt: null } });
    return c > 0;
  }

  async findBySku(sku: string): Promise<ProductVariantEntity | null> {
    const raw = await this.delegate.findFirst({ where: { sku, deletedAt: null } });
    return raw ? ProductVariantPrismaMapper.toDomain(raw) : null;
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId: productId.value, deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map(ProductVariantPrismaMapper.toDomain);
  }

  async findActiveByProduct(productId: ProductIdVO): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId: productId.value, isActive: true, deletedAt: null },
    });
    return rows.map(ProductVariantPrismaMapper.toDomain);
  }

  async findPaginated(options: VariantListOptions): Promise<VariantPaginationResult> {
    const where = this.buildWhere(options.filter);
    const orderBy = options.sortBy
      ? { [options.sortBy === 'name' ? 'name' : 'createdAt']: options.sortDir ?? 'desc' }
      : { createdAt: 'desc' as const };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map(ProductVariantPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(productId?: string): Promise<VariantStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (productId) where['productId'] = productId;

    const [total, activeCount, outOfStockCount, stockAgg] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.count({ where: { ...where, isActive: true } }),
      this.delegate.count({ where: { ...where, stock: 0 } }),
      this.delegate.aggregate({ where, _sum: { stock: true } } as never),
    ]);

    const stockSum = (stockAgg as { _sum?: { stock?: number | null } })._sum?.stock ?? 0;

    return {
      total,
      activeCount,
      outOfStockCount,
      totalStockUnits: stockSum,
    };
  }

  async countByProduct(productId: ProductIdVO): Promise<number> {
    return this.delegate.count({
      where: { productId: productId.value, deletedAt: null },
    });
  }

  async saveMany(
    entities: readonly ProductVariantEntity[],
  ): Promise<readonly ProductVariantEntity[]> {
    const saved: ProductVariantEntity[] = [];
    for (const e of entities) saved.push(await this.save(e));
    return saved;
  }

  async deleteByProduct(productId: ProductIdVO): Promise<number> {
    const r = await this.delegate.updateMany({
      where: { productId: productId.value },
      data: { deletedAt: new Date() },
    });
    return r.count;
  }

  async findLowStock(threshold: number): Promise<readonly ProductVariantEntity[]> {
    const rows = await this.delegate.findMany({
      where: { stock: { lte: threshold, gt: 0 }, deletedAt: null },
    });
    return rows.map(ProductVariantPrismaMapper.toDomain);
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  private buildWhere(filter: VariantListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.productId) w['productId'] = filter.productId;
    if (filter.isActive !== undefined) w['isActive'] = filter.isActive;
    if (filter.inStock === true) w['stock'] = { gt: 0 };
    if (filter.sku) w['sku'] = filter.sku;
    return w;
  }
}
