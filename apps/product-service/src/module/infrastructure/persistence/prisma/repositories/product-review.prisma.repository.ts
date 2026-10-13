/**
 * ProductReviewPrismaRepository
 * @module product-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type {
  ProductReviewRepository,
  ReviewListOptions,
  ReviewListFilter,
  ReviewPaginationResult,
  ReviewSummaryStats,
} from '../../../../domain/repositories/product-review.repository.interface.js';
import { ProductReviewEntity } from '../../../../domain/entities/product-review.entity.js';
import { ReviewIdVO } from '../../../../domain/value-objects/primitives/review-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductPrismaService } from '../prisma.service.js';
import {
  ProductReviewPrismaMapper,
  type PrismaProductReviewRow,
} from '../mappers/product-review.prisma.mapper.js';

interface ReviewDelegate {
  findFirst(args: unknown): Promise<PrismaProductReviewRow | null>;
  findUnique(args: unknown): Promise<PrismaProductReviewRow | null>;
  findMany(args?: unknown): Promise<PrismaProductReviewRow[]>;
  create(args: unknown): Promise<PrismaProductReviewRow>;
  update(args: unknown): Promise<PrismaProductReviewRow>;
  delete(args: unknown): Promise<PrismaProductReviewRow>;
  count(args?: unknown): Promise<number>;
  groupBy(args: unknown): Promise<unknown[]>;
  aggregate(args: unknown): Promise<unknown>;
}

@Injectable()
export class ProductReviewPrismaRepository implements ProductReviewRepository {
  private readonly logger = new Logger(ProductReviewPrismaRepository.name);

  constructor(private readonly prisma: ProductPrismaService) {}

  private get delegate(): ReviewDelegate {
    return this.prisma.getModel<ReviewDelegate>('productReview');
  }

  async findById(id: string): Promise<ProductReviewEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id, deletedAt: null } });
    return raw ? ProductReviewPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductReviewPrismaMapper.toDomain);
  }

  async save(entity: ProductReviewEntity): Promise<ProductReviewEntity> {
    const data = ProductReviewPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    } as never);
    if (existing) {
      const updated = await this.delegate.update({ where: { id: entity.id }, data });
      return ProductReviewPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data });
    return ProductReviewPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id } });
    return c > 0;
  }

  async findByIdVO(id: ReviewIdVO): Promise<ProductReviewEntity | null> {
    return this.findById(id.value);
  }

  async existsByProductAndUser(productId: ProductIdVO, userId: string): Promise<boolean> {
    const c = await this.delegate.count({
      where: { productId: productId.value, userId, deletedAt: null },
    });
    return c > 0;
  }

  async findByProductAndUser(
    productId: ProductIdVO,
    userId: string,
  ): Promise<ProductReviewEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { productId: productId.value, userId, deletedAt: null },
    });
    return raw ? ProductReviewPrismaMapper.toDomain(raw) : null;
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId: productId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductReviewPrismaMapper.toDomain);
  }

  async findApprovedByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { productId: productId.value, status: 'approved', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductReviewPrismaMapper.toDomain);
  }

  async findByUser(userId: string): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(ProductReviewPrismaMapper.toDomain);
  }

  async findByStatus(status: string): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map(ProductReviewPrismaMapper.toDomain);
  }

  async findPaginated(options: ReviewListOptions): Promise<ReviewPaginationResult> {
    const where = this.buildWhere(options.filter);
    const orderBy = options.sortBy
      ? { [options.sortBy === 'helpfulCount' ? 'helpfulCount' : 'createdAt']: options.sortDir ?? 'desc' }
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
      items: rows.map(ProductReviewPrismaMapper.toDomain),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getSummary(productId: ProductIdVO): Promise<ReviewSummaryStats> {
    const where = { productId: productId.value, deletedAt: null };

    const [total, verified, approved, pending, agg, groups] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.count({ where: { ...where, isVerifiedPurchase: true } }),
      this.delegate.count({ where: { ...where, status: 'approved' } }),
      this.delegate.count({ where: { ...where, status: 'pending' } }),
      this.delegate.aggregate({ where, _avg: { rating: true } } as never),
      this.delegate.groupBy({
        where,
        by: ['rating'],
        _count: { _all: true },
      } as never),
    ]);

    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const g of groups as Array<{ rating: number; _count: { _all: number } }>) {
      dist[g.rating] = g._count._all;
    }

    const avg = (agg as { _avg?: { rating?: number | null } })._avg?.rating ?? 0;

    return {
      productId: productId.value,
      totalReviews: total,
      averageRating: Math.round(avg * 100) / 100,
      ratingDistribution: dist as unknown as ReviewSummaryStats['ratingDistribution'],
      verifiedCount: verified,
      approvedCount: approved,
      pendingCount: pending,
    };
  }

  async countByProduct(productId: ProductIdVO): Promise<number> {
    return this.delegate.count({
      where: { productId: productId.value, deletedAt: null },
    });
  }

  async findPendingOlderThan(hours: number): Promise<readonly ProductReviewEntity[]> {
    const cutoff = new Date(Date.now() - hours * 3600 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: 'pending', createdAt: { lt: cutoff }, deletedAt: null },
    });
    return rows.map(ProductReviewPrismaMapper.toDomain);
  }

  async findFlagged(threshold: number): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.delegate.findMany({
      where: { reportCount: { gte: threshold }, deletedAt: null },
    });
    return rows.map(ProductReviewPrismaMapper.toDomain);
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date(), deletedBy: deletedBy ?? null, status: 'deleted' },
    });
  }

  private buildWhere(filter: ReviewListFilter | undefined): Record<string, unknown> {
    const w: Record<string, unknown> = { deletedAt: null };
    if (!filter) return w;
    if (filter.productId) w['productId'] = filter.productId;
    if (filter.userId) w['userId'] = filter.userId;
    if (filter.status) {
      w['status'] = Array.isArray(filter.status) ? { in: filter.status } : filter.status;
    }
    if (filter.rating !== undefined) w['rating'] = filter.rating;
    if (filter.minRating !== undefined || filter.maxRating !== undefined) {
      w['rating'] = {
        ...(filter.minRating !== undefined ? { gte: filter.minRating } : {}),
        ...(filter.maxRating !== undefined ? { lte: filter.maxRating } : {}),
      };
    }
    if (filter.isVerifiedPurchase !== undefined) {
      w['isVerifiedPurchase'] = filter.isVerifiedPurchase;
    }
    return w;
  }
}
