/**
 * VendorReviewPrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  VendorReviewRepository,
  VendorReviewListOptions,
  VendorReviewPaginationResult,
  VendorReviewStats,
} from '../../../../domain/repositories/vendor-review.repository.interface.js';
import { VendorReviewEntity } from '../../../../domain/entities/vendor-review.entity.js';
import { ReviewIdVO } from '../../../../domain/value-objects/primitives/review-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { VendorPrismaService } from '../prisma.service.js';
import {
  VendorReviewPrismaMapper,
  type VendorReviewPrismaRow,
} from '../mappers/vendor-review.prisma.mapper.js';

interface ReviewDelegate {
  findFirst(args: unknown): Promise<VendorReviewPrismaRow | null>;
  findMany(args: unknown): Promise<VendorReviewPrismaRow[]>;
  create(args: unknown): Promise<VendorReviewPrismaRow>;
  update(args: unknown): Promise<VendorReviewPrismaRow>;
  delete(args: unknown): Promise<VendorReviewPrismaRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VendorReviewPrismaRepository implements VendorReviewRepository {
  private readonly logger = new Logger(VendorReviewPrismaRepository.name);

  constructor(private readonly prisma: VendorPrismaService) {}

  private get delegate(): ReviewDelegate {
    return this.prisma.getModel<ReviewDelegate>('vendorReview');
  }

  async findById(id: string): Promise<VendorReviewEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? VendorReviewPrismaMapper.toDomain(raw) : null;
  }

  async findByIdVO(id: ReviewIdVO): Promise<VendorReviewEntity | null> {
    return this.findById(id.value);
  }

  async findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorReviewEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findByVendorAndStatus(
    vendorId: VendorIdVO | string,
    status: string,
  ): Promise<readonly VendorReviewEntity[]> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    const rows = await this.delegate.findMany({
      where: { vendorId: idStr, status, deletedAt: null },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findByUser(userId: UserIdVO | string): Promise<readonly VendorReviewEntity[]> {
    const idStr = typeof userId === 'string' ? userId : userId.value;
    const rows = await this.delegate.findMany({
      where: { userId: idStr, deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findByUserAndVendor(userId: string, vendorId: string): Promise<VendorReviewEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { userId, vendorId, deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return raw ? VendorReviewPrismaMapper.toDomain(raw) : null;
  }

  async findByOrder(orderId: string): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { orderId, deletedAt: null },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findByProduct(productId: string): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId, deletedAt: null },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findPendingModeration(limit = 50): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { submittedAt: 'asc' },
      take: limit,
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findFlagged(limit = 50): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'flagged', deletedAt: null },
      take: limit,
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findRecentByVendor(vendorId: string, days = 30): Promise<readonly VendorReviewEntity[]> {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { vendorId, submittedAt: { gte: cutoff }, deletedAt: null },
      orderBy: { submittedAt: 'desc' },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findPositiveByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { vendorId, rating: { gte: 4 }, deletedAt: null },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findNegativeByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { vendorId, rating: { lte: 2 }, deletedAt: null },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findUnansweredByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        vendorId,
        status: 'approved',
        vendorReply: null,
        deletedAt: null,
      },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async findAll(): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(VendorReviewPrismaMapper.toDomain);
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id, deletedAt: null } });
    return count > 0;
  }

  async existsByUserAndVendor(userId: string, vendorId: string): Promise<boolean> {
    const count = await this.delegate.count({
      where: { userId, vendorId, deletedAt: null },
    });
    return count > 0;
  }

  async save(entity: VendorReviewEntity): Promise<VendorReviewEntity> {
    const data = VendorReviewPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findFirst({
      where: { id: entity.id },
      select: { id: true },
    } as never);

    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return VendorReviewPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return VendorReviewPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async findPaginated(options: VendorReviewListOptions): Promise<VendorReviewPaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.userId) where['userId'] = f.userId;
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.productId) where['productId'] = f.productId;
    if (f.status) where['status'] = Array.isArray(f.status) ? { in: f.status } : f.status;
    if (f.minRating !== undefined) where['rating'] = { gte: f.minRating };
    if (f.maxRating !== undefined) {
      where['rating'] = { ...(where['rating'] as object ?? {}), lte: f.maxRating };
    }
    if (f.isVerifiedPurchase !== undefined) where['isVerifiedPurchase'] = f.isVerifiedPurchase;
    if (f.hasReply === true) where['vendorReply'] = { not: null };
    if (f.hasReply === false) where['vendorReply'] = null;
    if (f.submittedFrom || f.submittedTo) {
      where['submittedAt'] = {
        ...(f.submittedFrom ? { gte: new Date(f.submittedFrom) } : {}),
        ...(f.submittedTo ? { lte: new Date(f.submittedTo) } : {}),
      };
    }
    if (f.search) {
      where['content'] = { contains: f.search, mode: 'insensitive' };
    }

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where }),
    ]);

    const totalPages = Math.ceil(total / options.limit);
    return {
      items: rows.map(VendorReviewPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages,
      hasNext: options.page < totalPages,
      hasPrev: options.page > 1,
    };
  }

  async countByVendor(vendorId: VendorIdVO | string): Promise<number> {
    const idStr = typeof vendorId === 'string' ? vendorId : vendorId.value;
    return this.delegate.count({ where: { vendorId: idStr, deletedAt: null } });
  }

  async countByVendorAndStatus(vendorId: string, status: string): Promise<number> {
    return this.delegate.count({ where: { vendorId, status, deletedAt: null } });
  }

  async getStats(vendorId?: string, fromDate?: string, toDate?: string): Promise<VendorReviewStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (vendorId) where['vendorId'] = vendorId;
    if (fromDate || toDate) {
      where['submittedAt'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }

    const rows = await this.delegate.findMany({
      where,
      select: { rating: true, status: true, isVerifiedPurchase: true, vendorReply: true },
    } as never) as Array<{
      rating: number;
      status: string;
      isVerifiedPurchase: boolean;
      vendorReply: string | null;
    }>;

    const byStatus: Record<string, number> = {};
    const byRating: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRating = 0;
    let positive = 0;
    let negative = 0;
    let verified = 0;
    let withReplies = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      const star = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5;
      if (star >= 1 && star <= 5) byRating[star] += 1;
      totalRating += r.rating;
      if (r.rating >= 4) positive += 1;
      if (r.rating <= 2) negative += 1;
      if (r.isVerifiedPurchase) verified += 1;
      if (r.vendorReply) withReplies += 1;
    }

    return {
      total: rows.length,
      averageRating: rows.length ? Math.round((totalRating / rows.length) * 10) / 10 : 0,
      positiveCount: positive,
      negativeCount: negative,
      verifiedPurchaseCount: verified,
      withRepliesCount: withReplies,
      byStatus,
      byRating,
    };
  }
}
