/**
 * ProductPrismaRepository — implements ProductRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ProductRepository,
  ProductListOptions,
  ProductListFilter,
  ProductPaginationResult,
  ProductStats,
} from '../../../../domain/repositories/product.repository.interface.js';
import { ProductEntity } from '../../../../domain/entities/product.entity.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo.js';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import { ProductPrismaMapper } from '../mappers/product.prisma.mapper.js';
import type { PrismaProductRow } from '../mappers/product.prisma.mapper.js';

interface ProductDelegate {
  findFirst(args: unknown): Promise<PrismaProductRow | null>;
  findUnique(args: unknown): Promise<PrismaProductRow | null>;
  findMany(args?: unknown): Promise<PrismaProductRow[]>;
  create(args: unknown): Promise<PrismaProductRow>;
  update(args: unknown): Promise<PrismaProductRow>;
  delete(args: unknown): Promise<PrismaProductRow>;
  count(args?: unknown): Promise<number>;
  updateMany(args: unknown): Promise<{ count: number }>;
  groupBy(args: unknown): Promise<unknown[]>;
  aggregate(args: unknown): Promise<unknown>;
}

@Injectable()
export class ProductPrismaRepository implements ProductRepository {
  private readonly logger = new Logger(ProductPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): ProductDelegate {
    return this.prisma.getModel<ProductDelegate>('product');
  }

  // ═══════════ BaseRepository ═══════════
  async findById(id: string): Promise<ProductEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? ProductPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  async save(entity: ProductEntity): Promise<ProductEntity> {
    const data = ProductPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data,
      });
      return ProductPrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data });
    return ProductPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  // ═══════════ Custom: VO-based ═══════════
  async findByIdVO(id: ProductIdVO): Promise<ProductEntity | null> {
    return this.findById(id.value);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { slug, deletedAt: null } });
    return c > 0;
  }

  async existsBySku(sku: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { sku, deletedAt: null } });
    return c > 0;
  }

  async findBySlug(slug: string): Promise<ProductEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { slug, deletedAt: null },
    });
    return raw ? ProductPrismaMapper.toDomain(raw) : null;
  }

  async findBySku(sku: string): Promise<ProductEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { sku, deletedAt: null },
    });
    return raw ? ProductPrismaMapper.toDomain(raw) : null;
  }

  async findByCategory(categoryId: CategoryIdVO): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: { categoryId: categoryId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  async findByBrand(brandId: BrandIdVO): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: { brandId: brandId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  async findByVendor(vendorId: VendorIdVO): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: { vendorId: vendorId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  async findByStatus(status: string): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  async findFeatured(limit = 20): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isFeatured: true, isPublished: true, deletedAt: null },
      take: limit,
      orderBy: { updatedAt: 'desc' },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  async findPublished(limit = 20): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isPublished: true, deletedAt: null },
      take: limit,
      orderBy: { publishedAt: 'desc' },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  // ═══════════ Pagination ═══════════
  async findPaginated(options: ProductListOptions): Promise<ProductPaginationResult> {
    const where = this.buildWhere(options.filter, options.includeDeleted);
    const orderBy = this.buildOrderBy(options.sortBy, options.sortDir);
    const skip = (options.page - 1) * options.limit;

    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where, orderBy, skip, take: options.limit }),
      this.delegate.count({ where }),
    ]);

    const totalPages = Math.ceil(total / options.limit);
    return {
      items: rows.map(ProductPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages,
      hasNext: options.page < totalPages,
      hasPrev: options.page > 1,
    };
  }

  // ═══════════ Search ═══════════
  async search(term: string, limit = 20): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        isPublished: true,
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { sku: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
        ],
      },
      take: limit,
      orderBy: { updatedAt: 'desc' },
    } as never);
    return rows.map(ProductPrismaMapper.toDomain);
  }

  // ═══════════ Stats ═══════════
  async getStats(filter?: ProductListFilter): Promise<ProductStats> {
    const where = this.buildWhere(filter, false);

    const [total, publishedCount, draftCount, outOfStockCount, stockAgg, statusGroups] =
      await Promise.all([
        this.delegate.count({ where }),
        this.delegate.count({ where: { ...where, isPublished: true } }),
        this.delegate.count({ where: { ...where, status: 'draft' } }),
        this.delegate.count({ where: { ...where, totalStock: 0 } }),
        this.delegate.aggregate({
          where,
          _sum: { totalStock: true },
        } as never),
        this.delegate.groupBy({
          where,
          by: ['status'],
          _count: { _all: true },
        } as never),
      ]);

    const stockSum = (stockAgg as { _sum?: { totalStock?: number | null } })._sum?.totalStock ?? 0;

    const byStatus: Record<string, number> = {};
    for (const g of statusGroups as Array<{
      status: string;
      _count: { _all: number };
    }>) {
      byStatus[g.status] = g._count._all;
    }

    return {
      total,
      publishedCount,
      draftCount,
      outOfStockCount,
      totalStockUnits: stockSum,
      byStatus,
      byType: {},
    };
  }

  // ═══════════ Count helpers ═══════════
  async countByCategory(categoryId: CategoryIdVO): Promise<number> {
    return this.delegate.count({
      where: { categoryId: categoryId.value, deletedAt: null },
    });
  }

  async countByBrand(brandId: BrandIdVO): Promise<number> {
    return this.delegate.count({
      where: { brandId: brandId.value, deletedAt: null },
    });
  }

  async countByVendor(vendorId: VendorIdVO): Promise<number> {
    return this.delegate.count({
      where: { vendorId: vendorId.value, deletedAt: null },
    });
  }

  // ═══════════ Cron / background ═══════════
  async findStaleDrafts(olderThanHours: number): Promise<readonly ProductEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'draft',
        updatedAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  async findLowStock(threshold: number): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        totalStock: { lte: threshold, gt: 0 },
        isPublished: true,
        deletedAt: null,
      },
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  async findOutOfStock(limit = 50): Promise<readonly ProductEntity[]> {
    const rows = await this.delegate.findMany({
      where: { totalStock: 0, isPublished: true, deletedAt: null },
      take: limit,
    });
    return rows.map(ProductPrismaMapper.toDomain);
  }

  // ═══════════ Bulk ═══════════
  async saveMany(entities: readonly ProductEntity[]): Promise<readonly ProductEntity[]> {
    const saved: ProductEntity[] = [];
    for (const e of entities) saved.push(await this.save(e));
    return saved;
  }

  // ═══════════ Soft delete ═══════════
  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy: deletedBy ?? null },
    });
  }

  async restore(id: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: null, deletedBy: null },
    });
  }

  // ═══════════ Helpers ═══════════
  private buildWhere(
    filter: ProductListFilter | undefined,
    includeDeleted = false,
  ): Record<string, unknown> {
    const w: Record<string, unknown> = {};
    if (!includeDeleted) w['deletedAt'] = null;

    if (!filter) return w;

    if (filter.status) {
      w['status'] = Array.isArray(filter.status) ? { in: filter.status } : filter.status;
    }
    if (filter.type) {
      w['type'] = Array.isArray(filter.type) ? { in: filter.type } : filter.type;
    }
    if (filter.categoryId) w['categoryId'] = filter.categoryId;
    if (filter.brandId) w['brandId'] = filter.brandId;
    if (filter.vendorId) w['vendorId'] = filter.vendorId;
    if (filter.isFeatured !== undefined) w['isFeatured'] = filter.isFeatured;
    if (filter.isPublished !== undefined) w['isPublished'] = filter.isPublished;
    if (filter.inStock === true) w['totalStock'] = { gt: 0 };
    if (filter.tags && filter.tags.length > 0) w['tags'] = { hasEvery: filter.tags };
    if (filter.createdFrom || filter.createdTo) {
      w['createdAt'] = {
        ...(filter.createdFrom ? { gte: new Date(filter.createdFrom) } : {}),
        ...(filter.createdTo ? { lte: new Date(filter.createdTo) } : {}),
      };
    }
    if (filter.search) {
      w['OR'] = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { sku: { contains: filter.search, mode: 'insensitive' } },
      ];
    }
    return w;
  }

  private buildOrderBy(
    sortBy: string | undefined,
    sortDir: 'asc' | 'desc' | undefined,
  ): Record<string, 'asc' | 'desc'> {
    const dir = sortDir ?? 'desc';
    const field = sortBy === 'totalStock' || sortBy === 'name' ? sortBy : 'createdAt';
    return { [field]: dir };
  }
}
