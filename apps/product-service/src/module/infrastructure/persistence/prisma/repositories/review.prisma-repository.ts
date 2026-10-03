/**
 * ReviewPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { ProductReviewEntity } from '../../../../domain/entities/product-review.entity.js';
import type {
  ReviewRepository,
  ReviewPaginationOptions,
  ReviewPaginationResult,
  ReviewAggregate,
  ReviewRatingDistribution,
} from '../../../../domain/repositories/review.repository.interface.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { ReviewRatingVO } from '../../../../domain/value-objects/primitives/review-rating.vo.js';
import { ReviewCommentVO } from '../../../../domain/value-objects/primitives/review-comment.vo.js';

interface PrismaReviewRow {
  id: string;
  productId: string;
  userId: string;
  orderId: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  images: string[];
  status: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  reportCount: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class ReviewPrismaRepository
  extends BasePrismaRepository<ProductReviewEntity, PrismaReviewRow, string>
  implements ReviewRepository
{
  protected readonly model: PrismaDelegate<PrismaReviewRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { productReview: PrismaDelegate<PrismaReviewRow> };
    this.model = client.productReview;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  protected toDomain(raw: PrismaReviewRow): ProductReviewEntity {
    return ProductReviewEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        productId: ProductIdVO.reconstitute(raw.productId),
        userId: raw.userId,
        orderId: raw.orderId ?? undefined,
        rating: ReviewRatingVO.reconstitute(raw.rating),
        title: raw.title ?? undefined,
        comment: raw.comment ? ReviewCommentVO.reconstitute(raw.comment) : ReviewCommentVO.empty(),
        images: raw.images,
        status: raw.status,
        isVerifiedPurchase: raw.isVerifiedPurchase,
        helpfulCount: raw.helpfulCount,
        reportCount: raw.reportCount,
        createdAt: raw.createdAt.toISOString(),
        updatedAt: raw.updatedAt.toISOString(),
      },
    });
  }

  protected toPersistence(domain: ProductReviewEntity): Record<string, unknown> {
    return {
      id: domain.id,
      productId: domain.productId.value,
      userId: domain.userId,
      orderId: domain.orderId ?? null,
      rating: domain.rating.value,
      title: domain.title ?? null,
      comment: domain.comment.value || null,
      images: [...domain.images],
      status: domain.status,
      isVerifiedPurchase: domain.isVerifiedPurchase,
      helpfulCount: domain.helpfulCount,
      reportCount: domain.reportCount,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: ProductReviewEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findByProductId(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.client.productReview.findMany({
      where: { productId: productId.value, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaReviewRow));
  }

  async findByUserId(userId: string): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.client.productReview.findMany({
      where: { userId, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaReviewRow));
  }

  async findByUserAndProduct(userId: string, productId: ProductIdVO): Promise<ProductReviewEntity | null> {
    const raw = await this.client.productReview.findFirst({
      where: { userId, productId: productId.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw as unknown as PrismaReviewRow) : null;
  }

  async existsByUserAndProduct(userId: string, productId: ProductIdVO): Promise<boolean> {
    const count = await this.client.productReview.count({
      where: { userId, productId: productId.value },
    });
    return count > 0;
  }

  async findApprovedByProductId(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.client.productReview.findMany({
      where: { productId: productId.value, status: 'approved', deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaReviewRow));
  }

  async findPaginatedByProduct(
    productId: ProductIdVO,
    options: ReviewPaginationOptions,
  ): Promise<ReviewPaginationResult> {
    const where: Record<string, unknown> = { productId: productId.value, deletedAt: null };
    if (options.status) where.status = options.status;
    if (options.minRating !== undefined || options.maxRating !== undefined) {
      const r: Record<string, number> = {};
      if (options.minRating !== undefined) r.gte = options.minRating;
      if (options.maxRating !== undefined) r.lte = options.maxRating;
      where.rating = r;
    }
    if (options.verifiedOnly) where.isVerifiedPurchase = true;

    const [rows, total] = await Promise.all([
      this.client.productReview.findMany({
        where,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.client.productReview.count({ where }),
    ]);

    return {
      items: rows.map((r) => this.toDomain(r as unknown as PrismaReviewRow)),
      total,
      page: options.page,
      limit: options.limit,
    };
  }

  async aggregateRatings(productId: ProductIdVO): Promise<ReviewAggregate | null> {
    const rows = await this.client.productReview.findMany({
      where: { productId: productId.value, status: 'approved', deletedAt: null },
      select: { rating: true },
    });
    if (rows.length === 0) return null;

    const dist: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;
    for (const r of rows) {
      sum += r.rating;
      const key = r.rating as 1 | 2 | 3 | 4 | 5;
      dist[key] += 1;
    }
    return {
      productId: productId.value,
      totalReviews: rows.length,
      averageRating: Math.round((sum / rows.length) * 100) / 100,
      distribution: dist as ReviewRatingDistribution,
    };
  }

  async countByProductId(productId: ProductIdVO): Promise<number> {
    return this.client.productReview.count({ where: { productId: productId.value, deletedAt: null } });
  }

  async countByUserId(userId: string): Promise<number> {
    return this.client.productReview.count({ where: { userId, deletedAt: null } });
  }

  async deleteByProductId(productId: ProductIdVO): Promise<number> {
    const result = await this.client.productReview.deleteMany({ where: { productId: productId.value } });
    return result.count;
  }
}
