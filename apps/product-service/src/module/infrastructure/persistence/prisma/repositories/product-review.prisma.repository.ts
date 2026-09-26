import { Injectable } from '@nestjs/common';
import { ProductReview as PrismaProductReview } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ProductReviewEntity } from '../../../../domain/entities/product-review.entity';
import { ReviewIdVO } from '../../../../domain/value-objects/primitives/review-id.vo';
import { ReviewRatingVO } from '../../../../domain/value-objects/primitives/review-rating.vo';
import { ReviewContentVO } from '../../../../domain/value-objects/primitives/review-content.vo';
import { ReviewStatusVO } from '../../../../domain/value-objects/primitives/review-status.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import type { ProductReviewRepository } from '../../../../domain/repositories/product-review.repository.interface';

@Injectable()
export class ProductReviewPrismaRepository
  extends BasePrismaRepository<ProductReviewEntity, ReviewIdVO>
  implements ProductReviewRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaProductReview): ProductReviewEntity {
    return ProductReviewEntity.reconstitute(
      ReviewIdVO.create(raw.id),
      {
        productId: ProductIdVO.create(raw.productId),
        userId: raw.userId,
        rating: ReviewRatingVO.create(raw.rating),
        content: ReviewContentVO.create(raw.content ?? ''),
        status: ReviewStatusVO.create(raw.status),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ReviewIdVO): Promise<ProductReviewEntity | null> {
    const raw = await this.prisma.productReview.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.prisma.productReview.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ProductReviewEntity): Promise<ProductReviewEntity> {
    const data = {
      productId: entity.productId.value,
      userId: entity.userId,
      rating: entity.rating.value,
      content: entity.content.value,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.productReview.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ReviewIdVO): Promise<void> {
    await this.prisma.productReview.delete({ where: { id: id.value } });
  }

  async findByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.prisma.productReview.findMany({
      where: { productId: productId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findApprovedByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]> {
    const rows = await this.prisma.productReview.findMany({
      where: { productId: productId.value, status: 'approved' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByUser(productId: ProductIdVO, userId: string): Promise<ProductReviewEntity | null> {
    const raw = await this.prisma.productReview.findFirst({
      where: { productId: productId.value, userId },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async existsByUser(productId: ProductIdVO, userId: string): Promise<boolean> {
    const count = await this.prisma.productReview.count({
      where: { productId: productId.value, userId },
    });
    return count > 0;
  }

  async averageRating(productId: ProductIdVO): Promise<number> {
    const result = await this.prisma.productReview.aggregate({
      where: { productId: productId.value, status: 'approved' },
      _avg: { rating: true },
    });
    return result._avg.rating ?? 0;
  }

  async countByProduct(productId: ProductIdVO): Promise<number> {
    return this.prisma.productReview.count({
      where: { productId: productId.value },
    });
  }
}
