/**
 * VendorRatingPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorRatingRepository,
  VendorRatingListOptions,
  VendorRatingPaginationResult,
} from '../../../../domain/repositories/vendor-rating.repository.interface.js';
import { VendorRatingEntity } from '../../../../domain/entities/vendor-rating.entity.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorRatingPrismaMapper,
  type VendorRatingPrismaRow,
} from '../mappers/vendor-rating.prisma.mapper.js';

interface RatingDelegate {
  findFirst(args: unknown): Promise<VendorRatingPrismaRow | null>;
  findMany(args: unknown): Promise<VendorRatingPrismaRow[]>;
  create(args: unknown): Promise<VendorRatingPrismaRow>;
  update(args: unknown): Promise<VendorRatingPrismaRow>;
  delete(args: unknown): Promise<VendorRatingPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorRatingPrismaRepository implements VendorRatingRepository {
  private readonly logger = new Logger(VendorRatingPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): RatingDelegate {
    return this.prisma.getModel<RatingDelegate>('vendorRating');
  }

  async findById(id: string): Promise<VendorRatingEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorRatingPrismaMapper.toDomain(raw) : null;
  }

  async findByVendorId(vendorId: VendorIdVO | string): Promise<VendorRatingEntity | null> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const raw = await this.delegate.findFirst({
      where: { vendorId: idStr, deletedAt: null },
    });
    return raw ? VendorRatingPrismaMapper.toDomain(raw) : null;
  }

  async findByVendorIds(vendorIds: readonly string[]): Promise<readonly VendorRatingEntity[]> {
    if (vendorIds.length === 0) return [];
    const rows = await this.delegate.findMany({
      where: { vendorId: { in: [...vendorIds] }, deletedAt: null },
    });
    return rows.map(VendorRatingPrismaMapper.toDomain);
  }

  async findTopRated(limit = 20): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null, totalReviews: { gte: 5 } },
      orderBy: { overall: 'desc' },
      take: limit,
    });
    return rows.map(VendorRatingPrismaMapper.toDomain);
  }

  async findBottomRated(limit = 20): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null, totalReviews: { gte: 5 } },
      orderBy: { overall: 'asc' },
      take: limit,
    });
    return rows.map(VendorRatingPrismaMapper.toDomain);
  }

  async findNeedingAutoHide(): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        totalReviews: { gte: 5 },
        overall: { lt: 2, gt: 0 },
      },
    });
    return rows.map(VendorRatingPrismaMapper.toDomain);
  }

  async findNeedingAutoFlag(): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        totalReviews: { gte: 5 },
        overall: { gte: 2, lt: 3 },
      },
    });
    return rows.map(VendorRatingPrismaMapper.toDomain);
  }

  async findWithRecentDecline(_days = 30): Promise<readonly VendorRatingEntity[]> {
    // Simplified: ratings below 3 with recent activity
    const cutoff = new Date(Date.now() - _days * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        deletedAt: null,
        overall: { lt: 3, gt: 0 },
        lastUpdatedAt: { gte: cutoff },
      },
    });
    return rows.map(VendorRatingPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorRatingPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async save(entity: VendorRatingEntity): Promise<VendorRatingEntity> {
    const data = VendorRatingPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorRatingPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorRatingPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorRatingListOptions): Promise<VendorRatingPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.minOverall !== undefined) where['overall'] = { gte: f.minOverall };
    if (f.maxOverall !== undefined) {
      where['overall'] = { ...(where['overall'] as object ?? {}), lte: f.maxOverall };
    }
    if (f.minReviews !== undefined) where['totalReviews'] = { gte: f.minReviews };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    return {
      items: rows.map(VendorRatingPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(): Promise<{
    readonly total: number;
    readonly averageOverall: number;
    readonly averageTotalReviews: number;
    readonly positiveCount: number;
    readonly negativeCount: number;
    readonly autoHideCount: number;
    readonly autoFlagCount: number;
  }> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      select: { overall: true, totalReviews: true },
    } as never) as Array<{ overall: unknown; totalReviews: number }>;

    let totalScore = 0;
    let totalReviews = 0;
    let positive = 0;
    let negative = 0;
    let autoHide = 0;
    let autoFlag = 0;

    for (const r of rows) {
      const score = Number(r.overall) || 0;
      totalScore += score;
      totalReviews += r.totalReviews;
      if (score >= 4) positive += 1;
      if (score > 0 && score < 3) negative += 1;
      if (r.totalReviews >= 5 && score > 0 && score < 2) autoHide += 1;
      if (r.totalReviews >= 5 && score >= 2 && score < 3) autoFlag += 1;
    }

    return {
      total: rows.length,
      averageOverall: rows.length ? Math.round((totalScore / rows.length) * 10) / 10 : 0,
      averageTotalReviews: rows.length ? Math.round(totalReviews / rows.length) : 0,
      positiveCount: positive,
      negativeCount: negative,
      autoHideCount: autoHide,
      autoFlagCount: autoFlag,
    };
  }

  async getDistribution(vendorId: string): Promise<Readonly<Record<1 | 2 | 3 | 4 | 5, number>>> {
    const rating = await this.findByVendorId(vendorId);
    if (!rating) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    return rating.distribution;
  }
}
