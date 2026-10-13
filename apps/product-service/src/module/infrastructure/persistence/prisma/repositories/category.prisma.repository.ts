/**
 * CategoryPrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  CategoryRepository,
  CategoryListOptions,
  CategoryListFilter,
  CategoryPaginationResult,
  CategoryStats,
} from '../../../../domain/repositories/category.repository.interface.js';
import { CategoryEntity } from '../../../../domain/entities/category.entity.js';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  CategoryPrismaMapper,
  type PrismaCategoryRow,
} from '../mappers/category.prisma.mapper.js';

interface CategoryDelegate {
  findFirst(args: unknown): Promise<PrismaCategoryRow | null>;
  findUnique(args: unknown): Promise<PrismaCategoryRow | null>;
  findMany(args?: unknown): Promise<PrismaCategoryRow[]>;
  create(args: unknown): Promise<PrismaCategoryRow>;
  update(args: unknown): Promise<PrismaCategoryRow>;
  delete(args: unknown): Promise<PrismaCategoryRow>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<unknown>;
  groupBy(args: unknown): Promise<unknown[]>;
  updateMany(args: unknown): Promise<{ count: number }>;
}

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
  private readonly logger = new Logger(CategoryPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): CategoryDelegate {
    return this.prisma.getModel<CategoryDelegate>('category');
  }

  async findById(id: string): Promise<CategoryEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? CategoryPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CategoryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map(CategoryPrismaMapper.toDomain);
  }

  async save(entity: CategoryEntity): Promise<CategoryEntity> {
    const data = CategoryPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);
    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return CategoryPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return CategoryPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByIdVO(id: CategoryIdVO): Promise<CategoryEntity | null> {
    return this.findById(id.value);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { slug, deletedAt: null } });
    return c > 0;
  }

  async findBySlug(slug: string): Promise<CategoryEntity | null> {
    const raw = await this.delegate.findFirst({ where: { slug, deletedAt: null } });
    return raw ? CategoryPrismaMapper.toDomain(raw) : null;
  }

  async findRoots(): Promise<readonly CategoryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { parentId: null, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map(CategoryPrismaMapper.toDomain);
  }

  async findChildren(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { parentId: parentId.value, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map(CategoryPrismaMapper.toDomain);
  }

  async findDescendants(path: readonly string[]): Promise<readonly CategoryEntity[]> {
    if (path.length === 0) return [];
    const rows = await this.delegate.findMany({
      where: { path: { hasSome: [...path] }, deletedAt: null },
    } as never);
    return rows.map(CategoryPrismaMapper.toDomain);
  }

  async findAncestors(id: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const self = await this.findById(id.value);
    if (!self) return [];
    const parentIds = self.path.value.slice(0, -1);
    if (parentIds.length === 0) return [];
    const rows = await this.delegate.findMany({
      where: { id: { in: parentIds }, deletedAt: null },
    });
    return rows.map(CategoryPrismaMapper.toDomain);
  }

  async findFeatured(limit = 20): Promise<readonly CategoryEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isFeatured: true, deletedAt: null },
      take: limit,
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map(CategoryPrismaMapper.toDomain);
  }

  async findByStatus(status: string): Promise<readonly CategoryEntity[]> {
    const rows = await this.delegate.findMany({ where: { status, deletedAt: null } });
    return rows.map(CategoryPrismaMapper.toDomain);
  }

  async findPaginated(options: CategoryListOptions): Promise<CategoryPaginationResult> {
    const where = this.buildWhere(options.filter);
    const orderBy = options.sortBy
      ? { [options.sortBy]: options.sortDir ?? 'asc' }
      : { sortOrder: 'asc' as const };

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
      items: rows.map(CategoryPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(filter?: CategoryListFilter): Promise<CategoryStats> {
    const where = this.buildWhere(filter);
    const [total, activeCount, rootCount, maxDepthAgg, sumAgg, groups] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.count({ where: { ...where, status: 'active' } }),
      this.delegate.count({ where: { ...where, parentId: null } }),
      this.delegate.aggregate({ where, _max: { depth: true } } as never),
      this.delegate.aggregate({ where, _sum: { productCount: true } } as never),
      this.delegate.groupBy({
        where,
        by: ['depth'],
        _count: { _all: true },
      } as never),
    ]);

    const byDepth: Record<number, number> = {};
    for (const g of groups as Array<{ depth: number; _count: { _all: number } }>) {
      byDepth[g.depth] = g._count._all;
    }

    return {
      total,
      activeCount,
      rootCount,
      maxDepth: (maxDepthAgg as { _max?: { depth?: number | null } })._max?.depth ?? 0,
      totalProducts:
        (sumAgg as { _sum?: { productCount?: number | null } })._sum?.productCount ?? 0,
      byDepth,
    };
  }

  async countChildren(parentId: CategoryIdVO): Promise<number> {
    return this.delegate.count({
      where: { parentId: parentId.value, deletedAt: null },
    });
  }

  async loadTree(rootId?: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    if (rootId) {
      const root = await this.findById(rootId.value);
      if (!root) return [];
      const descendants = await this.findDescendants([rootId.value]);
      return [root, ...descendants];
    }
    return this.findAll();
  }

  async reorder(orders: readonly { id: string; sortOrder: number }[]): Promise<void> {
    for (const o of orders) {
      await this.delegate.update({
        where: { id: o.id },
        data: { sortOrder: o.sortOrder },
      });
    }
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy: deletedBy ?? null, status: 'deleted' },
    });
  }

  private buildWhere(filter: CategoryListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.status) {
      w['status'] = Array.isArray(filter.status) ? { in: filter.status } : filter.status;
    }
    if (filter.parentId) w['parentId'] = filter.parentId;
    if (filter.depth !== undefined) w['depth'] = filter.depth;
    if (filter.isFeatured !== undefined) w['isFeatured'] = filter.isFeatured;
    if (filter.hasProducts === true) w['productCount'] = { gt: 0 };
    if (filter.search) w['name'] = { contains: filter.search, mode: 'insensitive' };
    return w;
  }
}
