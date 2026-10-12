/**
 * VendorReviewPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorReviewRepository,
  VendorReviewListOptions,
  VendorReviewPaginationResult,
  VendorReviewFilter,
} from '../../../../domain/repositories/vendor-review.repository.interface.js';
import { VendorReviewEntity } from '../../../../domain/entities/vendor-review.entity.js';
import { VendorReviewStatusVO } from '../../../../domain/value-objects/primitives/vendor-review-status.vo.js';
import { VendorReviewPrismaMapper } from '../mappers/vendor-review.prisma-mapper.js';

@Injectable()
export class VendorReviewPrismaRepository implements VendorReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorReviewEntity | null> {
    const row = await this.prisma.vendorReview.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorReviewPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async findByUserId(userId: string): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async findByOrderId(orderId: string): Promise<VendorReviewEntity | null> {
    const row = await this.prisma.vendorReview.findFirst({
      where: { orderId, deletedAt: null },
    });
    return row ? VendorReviewPrismaMapper.toDomain(row) : null;
  }

  async findByStatus(status: VendorReviewStatusVO): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async findPaginated(options: VendorReviewListOptions): Promise<VendorReviewPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter;
    if (f) {
      if (f.vendorId) where.vendorId = f.vendorId;
      if (f.userId) where.userId = f.userId;
      if (f.status) where.status = f.status;
      if (f.rating !== undefined) where.rating = f.rating;
      if (f.verifiedOnly) where.isVerifiedPurchase = true;
      if (f.fromDate || f.toDate) {
        const range: Record<string, Date> = {};
        if (f.fromDate) range.gte = new Date(f.fromDate);
        if (f.toDate) range.lte = new Date(f.toDate);
        where.createdAt = range;
      }
    }
    const sortBy = options.sortBy ?? 'createdAt';
    const sortDir = options.sortDir ?? 'desc';
    const skip = (options.page - 1) * options.limit;
    const [rows, total] = await Promise.all([
      this.prisma.vendorReview.findMany({
        where,
        orderBy: { [sortBy]: sortDir },
        skip,
        take: options.limit,
      }),
      this.prisma.vendorReview.count({ where }),
    ]);
    return {
      items: rows.map((r) => VendorReviewPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async search(filter: VendorReviewFilter): Promise<readonly VendorReviewEntity[]> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.vendorId) where.vendorId = filter.vendorId;
    if (filter.userId) where.userId = filter.userId;
    if (filter.status) where.status = filter.status;
    if (filter.rating !== undefined) where.rating = filter.rating;
    if (filter.verifiedOnly) where.isVerifiedPurchase = true;
    const rows = await this.prisma.vendorReview.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async findPendingModeration(): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async findFlagged(): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { status: 'flagged', deletedAt: null },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async findHidden(): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { status: 'hidden', deletedAt: null },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async findPublicByVendorId(vendorId: string): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { vendorId, status: 'approved', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VendorReviewPrismaMapper.toDomain(r));
  }

  async countByVendor(vendorId: string): Promise<number> {
    return this.prisma.vendorReview.count({
      where: { vendorId, deletedAt: null },
    });
  }

  async countByStatus(status: VendorReviewStatusVO): Promise<number> {
    return this.prisma.vendorReview.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async countVerifiedByVendorId(vendorId: string): Promise<number> {
    return this.prisma.vendorReview.count({
      where: { vendorId, isVerifiedPurchase: true, deletedAt: null },
    });
  }

  async existsByOrderId(orderId: string): Promise<boolean> {
    const c = await this.prisma.vendorReview.count({
      where: { orderId, deletedAt: null },
    });
    return c > 0;
  }

  async getVendorAverageRating(vendorId: string): Promise<number> {
    const agg = await this.prisma.vendorReview.aggregate({
      _avg: { rating: true },
      where: { vendorId, status: 'approved', deletedAt: null },
    });
    return Number(agg._avg.rating ?? 0);
  }

  async save(entity: VendorReviewEntity): Promise<VendorReviewEntity> {
    const data = VendorReviewPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorReview.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorReview.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorReview.create({ data: data as never });
    return VendorReviewPrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorReview.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorReview.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async deleteByVendorId(vendorId: string): Promise<void> {
    await this.prisma.vendorReview.updateMany({
      where: { vendorId },
      data: { deletedAt: new Date() },
    });
  }
}
