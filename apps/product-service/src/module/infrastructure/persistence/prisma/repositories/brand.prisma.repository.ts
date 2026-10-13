/**
 * BrandPrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  BrandRepository,
  BrandListOptions,
  BrandListFilter,
  BrandPaginationResult,
  BrandStats,
} from '../../../../domain/repositories/brand.repository.interface.js';
import { BrandEntity } from '../../../../domain/entities/brand.entity.js';
import { BrandIdVO } from '../../../../domain/value-objects/primitives/brand-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  BrandPrismaMapper,
  type PrismaBrandRow,
} from '../mappers/brand.prisma.mapper.js';

interface BrandDelegate {
  findFirst(args: unknown): Promise<PrismaBrandRow | null>;
  findUnique(args: unknown): Promise<PrismaBrandRow | null>;
  findMany(args?: unknown): Promise<PrismaBrandRow[]>;
  create(args: unknown): Promise<PrismaBrandRow>;
  update(args: unknown): Promise<PrismaBrandRow>;
  delete(args: unknown): Promise<PrismaBrandRow>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<unknown>;
}

@Injectable()
export class BrandPrismaRepository implements BrandRepository {
  private readonly logger = new Logger(BrandPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): BrandDelegate {
    return this.prisma.getModel<BrandDelegate>('brand');
  }

  async findById(id: string): Promise<BrandEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? BrandPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly BrandEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return rows.map(BrandPrismaMapper.toDomain);
  }

  async save(entity: BrandEntity): Promise<BrandEntity> {
    const data = BrandPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);
    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return BrandPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return BrandPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByIdVO(id: BrandIdVO): Promise<BrandEntity | null> {
    return this.findById(id.value);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { slug, deletedAt: null } });
    return c > 0;
  }

  async findBySlug(slug: string): Promise<BrandEntity | null> {
    const raw = await this.delegate.findFirst({ where: { slug, deletedAt: null } });
    return raw ? BrandPrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly BrandEntity[]> {
    const rows = await this.delegate.findMany({ where: { status, deletedAt: null } });
    return rows.map(BrandPrismaMapper.toDomain);
  }

  async findFeatured(limit = 20): Promise<readonly BrandEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isFeatured: true, deletedAt: null },
      take: limit,
      orderBy: { name: 'asc' },
    });
    return rows.map(BrandPrismaMapper.toDomain);
  }

  async findPaginated(options: BrandListOptions): Promise<BrandPaginationResult> {
    const where = this.buildWhere(options.filter);
    const orderBy = options.sortBy
      ? { [options.sortBy === 'productCount' ? 'productCount' : 'name']: options.sortDir ?? 'asc' }
      : { name: 'asc' as const };

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
      items: rows.map(BrandPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(filter?: BrandListFilter): Promise<BrandStats> {
    const where = this.buildWhere(filter);
    const [total, activeCount, featuredCount, agg] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.count({ where: { ...where, status: 'active' } }),
      this.delegate.count({ where: { ...where, isFeatured: true } }),
      this.delegate.aggregate({ where, _sum: { productCount: true } } as never),
    ]);

    const sum = (agg as { _sum?: { productCount?: number | null } })._sum?.productCount ?? 0;
    return { total, activeCount, featuredCount, totalProducts: sum };
  }

  async search(term: string, limit = 20): Promise<readonly BrandEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        name: { contains: term, mode: 'insensitive' },
      },
      take: limit,
    } as never);
    return rows.map(BrandPrismaMapper.toDomain);
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy: deletedBy ?? null, status: 'deleted' },
    });
  }

  private buildWhere(filter: BrandListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.status) {
      w['status'] = Array.isArray(filter.status) ? { in: filter.status } : filter.status;
    }
    if (filter.isFeatured !== undefined) w['isFeatured'] = filter.isFeatured;
    if (filter.country) w['country'] = filter.country;
    if (filter.search) w['name'] = { contains: filter.search, mode: 'insensitive' };
    return w;
  }
}
