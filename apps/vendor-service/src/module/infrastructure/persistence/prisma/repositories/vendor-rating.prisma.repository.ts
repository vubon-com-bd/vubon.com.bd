/**
 * VendorRatingPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorRatingRepository,
  RatingStats,
} from '../../../../domain/repositories/vendor-rating.repository.interface.js';
import { VendorRatingEntity } from '../../../../domain/entities/vendor-rating.entity.js';
import { VendorRatingPrismaMapper } from '../mappers/vendor-rating.prisma-mapper.js';

@Injectable()
export class VendorRatingPrismaRepository implements VendorRatingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorRatingEntity | null> {
    const row = await this.prisma.vendorRating.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorRatingPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.prisma.vendorRating.findMany({
      where: { deletedAt: null },
      orderBy: { overall: 'desc' },
    });
    return rows.map((r) => VendorRatingPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<VendorRatingEntity | null> {
    const row = await this.prisma.vendorRating.findFirst({
      where: { vendorId, deletedAt: null },
    });
    return row ? VendorRatingPrismaMapper.toDomain(row) : null;
  }

  async existsByVendorId(vendorId: string): Promise<boolean> {
    const c = await this.prisma.vendorRating.count({
      where: { vendorId, deletedAt: null },
    });
    return c > 0;
  }

  async findBelow(threshold: number): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.prisma.vendorRating.findMany({
      where: {
        overall: { lt: threshold, gt: 0 },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorRatingPrismaMapper.toDomain(r));
  }

  async findTopRated(limit: number): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.prisma.vendorRating.findMany({
      where: { overall: { gt: 0 }, deletedAt: null },
      orderBy: { overall: 'desc' },
      take: limit,
    });
    return rows.map((r) => VendorRatingPrismaMapper.toDomain(r));
  }

  async findAutoHideCandidates(): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.prisma.vendorRating.findMany({
      where: {
        overall: { gt: 0, lt: 2 },
        totalReviews: { gte: 5 },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorRatingPrismaMapper.toDomain(r));
  }

  async findWithMinReviews(minReviews: number): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.prisma.vendorRating.findMany({
      where: {
        totalReviews: { gte: minReviews },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorRatingPrismaMapper.toDomain(r));
  }

  async getStats(): Promise<RatingStats> {
    const [agg, count, withReviews] = await Promise.all([
      this.prisma.vendorRating.aggregate({
        _avg: { overall: true },
        where: { deletedAt: null },
      }),
      this.prisma.vendorRating.count({ where: { deletedAt: null } }),
      this.prisma.vendorRating.count({
        where: { totalReviews: { gt: 0 }, deletedAt: null },
      }),
    ]);

    // Distribution is per-vendor; aggregate is complex. Return zeros as placeholder.
    const distribution: Record<'1' | '2' | '3' | '4' | '5', number> = {
      '1': 0, '2': 0, '3': 0, '4': 0, '5': 0,
    };

    return {
      avgRating: Number(agg._avg.overall ?? 0),
      totalVendors: count,
      vendorsWithReviews: withReviews,
      distribution,
    };
  }

  async upsert(entity: VendorRatingEntity): Promise<VendorRatingEntity> {
    const data = VendorRatingPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorRating.findFirst({
      where: { vendorId: entity.vendorId },
    });
    const row = existing
      ? await this.prisma.vendorRating.update({ where: { id: existing.id }, data })
      : await this.prisma.vendorRating.create({ data: data as never });
    return VendorRatingPrismaMapper.toDomain(row);
  }

  async save(entity: VendorRatingEntity): Promise<VendorRatingEntity> {
    return this.upsert(entity);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorRating.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorRating.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorRating.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
