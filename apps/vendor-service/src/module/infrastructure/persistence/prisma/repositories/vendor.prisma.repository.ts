/**
 * VendorPrismaRepository — implements VendorRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import {
  type VendorRepository,
  type VendorListFilter,
  type VendorListOptions,
  type VendorPaginationResult,
  type VendorStats,
} from '../../../../domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../../domain/entities/vendor.entity.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorPrismaMapper,
  type VendorPrismaRow,
} from '../mappers/vendor.prisma.mapper.js';

// ═══ Prisma Delegate Typing ═══
interface VendorDelegate {
  findFirst(args: unknown): Promise<VendorPrismaRow | null>;
  findUnique(args: unknown): Promise<VendorPrismaRow | null>;
  findMany(args: unknown): Promise<VendorPrismaRow[]>;
  create(args: unknown): Promise<VendorPrismaRow>;
  update(args: unknown): Promise<VendorPrismaRow>;
  updateMany(args: unknown): Promise<{ count: number }>;
  delete(args: unknown): Promise<VendorPrismaRow>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<{
    _sum?: { totalSales?: unknown };
  }>;
  groupBy(args: unknown): Promise<Array<{ status?: string; type?: string; tier?: string; _count: number }>>;
}

@Injectable()
export class VendorPrismaRepository implements VendorRepository {
  private readonly logger = new Logger(VendorPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): VendorDelegate {
    return this.prisma.getModel<VendorDelegate>('vendor');
  }

  // ═══════════════════════════════════════════
  // BaseRepository methods
  // ═══════════════════════════════════════════

  async findById(id: string): Promise<VendorEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? VendorPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorEntity): Promise<VendorEntity> {
    const data = VendorPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data,
      });
      return VendorPrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data });
    return VendorPrismaMapper.toDomain(created);
  }

  async saveMany(entities: readonly VendorEntity[]): Promise<readonly VendorEntity[]> {
    const results: VendorEntity[] = [];
    for (const e of entities) {
      results.push(await this.save(e));
    }
    return results;
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'deleted' },
    });
  }

  async restore(id: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  // ═══════════════════════════════════════════
  // Vendor-specific: VO-based
  // ═══════════════════════════════════════════

  async findByIdVO(id: VendorIdVO): Promise<VendorEntity | null> {
    return this.findById(id.value);
  }

  // ═══════════════════════════════════════════
  // Uniqueness checks
  // ═══════════════════════════════════════════

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { slug } });
    return count > 0;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { email } });
    return count > 0;
  }

  async existsByUserId(userId: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { userId, deletedAt: null },
    });
    return count > 0;
  }

  async findBySlug(slug: string): Promise<VendorEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { slug, deletedAt: null },
    });
    return raw ? VendorPrismaMapper.toDomain(raw) : null;
  }

  async findByEmail(email: string): Promise<VendorEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { email, deletedAt: null },
    });
    return raw ? VendorPrismaMapper.toDomain(raw) : null;
  }

  async findByUserId(userId: UserIdVO | string): Promise<VendorEntity | null> {
    const idStr = typeof userId === 'string' ? userId : userId.value;
    const raw = await this.delegate.findFirst({
      where: { userId: idStr, deletedAt: null },
    });
    return raw ? VendorPrismaMapper.toDomain(raw) : null;
  }

  // ═══════════════════════════════════════════
  // Lookups
  // ═══════════════════════════════════════════

  async findByStatus(status: string): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async findByTier(tier: string): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: { tier, deletedAt: null },
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async findByType(type: string): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: { type, deletedAt: null },
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async findFeatured(limit = 20): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isFeatured: true, status: 'active', deletedAt: null },
      orderBy: { rating: 'desc' },
      take: limit,
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async findVerified(limit = 20): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isVerified: true, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async findTopRated(limit = 20): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'active', deletedAt: null },
      orderBy: { rating: 'desc' },
      take: limit,
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  // ═══════════════════════════════════════════
  // Pagination + Filtering
  // ═══════════════════════════════════════════

  async findPaginated(options: VendorListOptions): Promise<VendorPaginationResult> {
    const where = this.buildWhere(options.filter, options.includeDeleted);
    const orderBy = this.buildOrderBy(options.sortBy, options.sortDir);

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    const totalPages = Math.ceil(total / options.limit);
    return {
      items: rows.map(VendorPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages,
      hasNext: options.page < totalPages,
      hasPrev: options.page > 1,
    };
  }

  // ═══════════════════════════════════════════
  // Search
  // ═══════════════════════════════════════════

  async search(term: string, limit = 20): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: term, mode: 'insensitive' } },
          { displayName: { contains: term, mode: 'insensitive' } },
          { slug: { contains: term, mode: 'insensitive' } },
        ],
      },
      orderBy: { rating: 'desc' },
      take: limit,
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  // ═══════════════════════════════════════════
  // Stats
  // ═══════════════════════════════════════════

  async getStats(filter?: VendorListFilter): Promise<VendorStats> {
    const baseWhere = this.buildWhere(filter, false);

    const [
      total,
      activeCount,
      pendingCount,
      suspendedCount,
      verifiedCount,
      featuredCount,
      salesAgg,
      statusGroups,
      typeGroups,
      tierGroups,
    ] = await Promise.all([
      this.delegate.count({ where: baseWhere }),
      this.delegate.count({ where: { ...baseWhere, status: 'active' } }),
      this.delegate.count({ where: { ...baseWhere, status: 'pending' } }),
      this.delegate.count({ where: { ...baseWhere, status: 'suspended' } }),
      this.delegate.count({ where: { ...baseWhere, isVerified: true } }),
      this.delegate.count({ where: { ...baseWhere, isFeatured: true } }),
      this.delegate.aggregate({
        where: baseWhere,
        _sum: { totalSales: true },
      }),
      this.delegate.groupBy({ by: ['status'], where: baseWhere, _count: true }),
      this.delegate.groupBy({ by: ['type'], where: baseWhere, _count: true }),
      this.delegate.groupBy({ by: ['tier'], where: baseWhere, _count: true }),
    ]);

    const toNum = (v: unknown): number => {
      if (typeof v === 'number') return v;
      if (typeof v === 'string') return Number(v);
      if (v && typeof v === 'object' && 'toNumber' in v) {
        return (v as { toNumber: () => number }).toNumber();
      }
      return Number(v ?? 0);
    };

    const byStatus: Record<string, number> = {};
    for (const g of statusGroups) {
      if (g.status) byStatus[g.status] = g._count;
    }
    const byType: Record<string, number> = {};
    for (const g of typeGroups) {
      if (g.type) byType[g.type] = g._count;
    }
    const byTier: Record<string, number> = {};
    for (const g of tierGroups) {
      if (g.tier) byTier[g.tier] = g._count;
    }

    return {
      total,
      activeCount,
      pendingCount,
      suspendedCount,
      verifiedCount,
      featuredCount,
      totalSales: Math.round(toNum(salesAgg._sum?.totalSales ?? 0) * 100) / 100,
      byStatus,
      byType,
      byTier,
    };
  }

  // ═══════════════════════════════════════════
  // Counts
  // ═══════════════════════════════════════════

  async countByStatus(status: string): Promise<number> {
    return this.delegate.count({ where: { status, deletedAt: null } });
  }

  async countByTier(tier: string): Promise<number> {
    return this.delegate.count({ where: { tier, deletedAt: null } });
  }

  // ═══════════════════════════════════════════
  // Cron / background support
  // ═══════════════════════════════════════════

  async findPendingForReview(olderThanHours: number): Promise<readonly VendorEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'pending',
        createdAt: { lt: cutoff },
        deletedAt: null,
      },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async findSuspendedForReview(): Promise<readonly VendorEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'suspended', deletedAt: null },
      orderBy: { updatedAt: 'asc' },
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async findInactive(olderThanDays: number): Promise<readonly VendorEntity[]> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'inactive',
        updatedAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  async findPendingTierUpgrades(): Promise<readonly VendorEntity[]> {
    // Simplified: active vendors with sufficient sales for next tier
    const rows = await this.delegate.findMany({
      where: { status: 'active', deletedAt: null },
      orderBy: { totalSales: 'desc' },
      take: 100,
    });
    return rows.map(VendorPrismaMapper.toDomain);
  }

  // ═══════════════════════════════════════════
  // Private helpers
  // ═══════════════════════════════════════════

  private buildWhere(filter?: VendorListFilter, includeDeleted = false): Record<string, unknown> {
    const where: Record<string, unknown> = {};

    if (!includeDeleted) {
      where['deletedAt'] = null;
    }
    if (!filter) return where;

    if (filter.status) {
      where['status'] = Array.isArray(filter.status)
        ? { in: filter.status }
        : filter.status;
    }
    if (filter.type) {
      where['type'] = Array.isArray(filter.type)
        ? { in: filter.type }
        : filter.type;
    }
    if (filter.businessType) {
      where['businessType'] = Array.isArray(filter.businessType)
        ? { in: filter.businessType }
        : filter.businessType;
    }
    if (filter.tier) {
      where['tier'] = Array.isArray(filter.tier)
        ? { in: filter.tier }
        : filter.tier;
    }
    if (filter.isVerified !== undefined) where['isVerified'] = filter.isVerified;
    if (filter.isFeatured !== undefined) where['isFeatured'] = filter.isFeatured;
    if (filter.minRating !== undefined) {
      where['rating'] = { gte: filter.minRating };
    }
    if (filter.minSales !== undefined) {
      where['totalSales'] = { gte: filter.minSales };
    }
    if (filter.createdFrom || filter.createdTo) {
      where['createdAt'] = {
        ...(filter.createdFrom ? { gte: new Date(filter.createdFrom) } : {}),
        ...(filter.createdTo ? { lte: new Date(filter.createdTo) } : {}),
      };
    }
    if (filter.search) {
      where['OR'] = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { displayName: { contains: filter.search, mode: 'insensitive' } },
        { slug: { contains: filter.search, mode: 'insensitive' } },
        { email: { contains: filter.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  private buildOrderBy(
    sortBy: string = 'createdAt',
    sortDir: 'asc' | 'desc' = 'desc',
  ): Record<string, 'asc' | 'desc'> {
    return { [sortBy]: sortDir };
  }
}
