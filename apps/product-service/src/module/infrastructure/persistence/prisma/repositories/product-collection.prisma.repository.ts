/**
 * ProductCollectionPrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ProductCollectionRepository,
  CollectionListOptions,
  CollectionListFilter,
  CollectionPaginationResult,
  CollectionStats,
} from '../../../../domain/repositories/product-collection.repository.interface.js';
import { ProductCollectionEntity } from '../../../../domain/entities/product-collection.entity.js';
import { CollectionIdVO } from '../../../../domain/value-objects/primitives/collection-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  ProductCollectionPrismaMapper,
  type PrismaProductCollectionRow,
} from '../mappers/product-collection.prisma.mapper.js';

interface CollectionDelegate {
  findFirst(args: unknown): Promise<PrismaProductCollectionRow | null>;
  findUnique(args: unknown): Promise<PrismaProductCollectionRow | null>;
  findMany(args?: unknown): Promise<PrismaProductCollectionRow[]>;
  create(args: unknown): Promise<PrismaProductCollectionRow>;
  update(args: unknown): Promise<PrismaProductCollectionRow>;
  delete(args: unknown): Promise<PrismaProductCollectionRow>;
  count(args?: unknown): Promise<number>;
  groupBy(args: unknown): Promise<unknown[]>;
}

@Injectable()
export class ProductCollectionPrismaRepository implements ProductCollectionRepository {
  private readonly logger = new Logger(ProductCollectionPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): CollectionDelegate {
    return this.prisma.getModel<CollectionDelegate>('collection');
  }

  private readonly withProducts = { products: { select: { productId: true } } };

  async findById(id: string): Promise<ProductCollectionEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id, deletedAt: null },
      include: this.withProducts,
    });
    return raw ? ProductCollectionPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductCollectionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      include: this.withProducts,
    });
    return rows.map(ProductCollectionPrismaMapper.toDomain);
  }

  async save(entity: ProductCollectionEntity): Promise<ProductCollectionEntity> {
    const data = ProductCollectionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data,
        include: this.withProducts,
      });
      return ProductCollectionPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({
      data,
      include: this.withProducts,
    });
    return ProductCollectionPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByIdVO(id: CollectionIdVO): Promise<ProductCollectionEntity | null> {
    return this.findById(id.value);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { slug, deletedAt: null } });
    return c > 0;
  }

  async findBySlug(slug: string): Promise<ProductCollectionEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { slug, deletedAt: null },
      include: this.withProducts,
    });
    return raw ? ProductCollectionPrismaMapper.toDomain(raw) : null;
  }

  async findByType(type: string): Promise<readonly ProductCollectionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
      include: this.withProducts,
    });
    return rows.map(ProductCollectionPrismaMapper.toDomain);
  }

  async findFeatured(limit = 20): Promise<readonly ProductCollectionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isFeatured: true, deletedAt: null },
      take: limit,
      include: this.withProducts,
    });
    return rows.map(ProductCollectionPrismaMapper.toDomain);
  }

  async findActive(at: string): Promise<readonly ProductCollectionEntity[]> {
    const now = new Date(at);
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        deletedAt: null,
        OR: [
          { startAt: null },
          { startAt: { lte: now } },
        ],
        AND: [
          {
            OR: [
              { endAt: null },
              { endAt: { gte: now } },
            ],
          },
        ],
      },
      include: this.withProducts,
    } as never);
    return rows.map(ProductCollectionPrismaMapper.toDomain);
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ProductCollectionEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        products: { some: { productId: productId.value } },
      },
      include: this.withProducts,
    } as never);
    return rows.map(ProductCollectionPrismaMapper.toDomain);
  }

  async findPaginated(options: CollectionListOptions): Promise<CollectionPaginationResult> {
    const where = this.buildWhere(options.filter);
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { sortOrder: 'asc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        include: this.withProducts,
      }),
      this.delegate.count({ where }),
    ]);
    return {
      items: rows.map(ProductCollectionPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(filter?: CollectionListFilter): Promise<CollectionStats> {
    const where = this.buildWhere(filter);
    const [total, activeCount, featuredCount, groups] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.count({ where: { ...where, status: 'active' } }),
      this.delegate.count({ where: { ...where, isFeatured: true } }),
      this.delegate.groupBy({
        where,
        by: ['type'],
        _count: { _all: true },
      } as never),
    ]);

    const byType: Record<string, number> = {};
    for (const g of groups as Array<{ type: string; _count: { _all: number } }>) {
      byType[g.type] = g._count._all;
    }

    return {
      total,
      activeCount,
      featuredCount,
      totalProductRefs: 0,
      byType,
    };
  }

  async findExpired(at: string): Promise<readonly ProductCollectionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { endAt: { lt: new Date(at) }, deletedAt: null },
      include: this.withProducts,
    });
    return rows.map(ProductCollectionPrismaMapper.toDomain);
  }

  async findScheduledToActivate(at: string): Promise<readonly ProductCollectionEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'scheduled',
        startAt: { lte: new Date(at) },
        deletedAt: null,
      },
      include: this.withProducts,
    });
    return rows.map(ProductCollectionPrismaMapper.toDomain);
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy: deletedBy ?? null, status: 'deleted' },
    });
  }

  private buildWhere(filter: CollectionListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.type) {
      w['type'] = Array.isArray(filter.type) ? { in: filter.type } : filter.type;
    }
    if (filter.isActive !== undefined) w['status'] = filter.isActive ? 'active' : 'inactive';
    if (filter.isFeatured !== undefined) w['isFeatured'] = filter.isFeatured;
    if (filter.search) w['name'] = { contains: filter.search, mode: 'insensitive' };
    if (filter.hasProduct) w['products'] = { some: { productId: filter.hasProduct } };
    return w;
  }
}
