import { Injectable } from '@nestjs/common';
import { VendorReview as PrismaVendorReview } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorReviewEntity } from '../../../../domain/entities/vendor-review.entity';
import { ReviewIdVO } from '../../../../domain/value-objects/primitives/review-id.vo';
import { ReviewContentVO } from '../../../../domain/value-objects/primitives/review-content.vo';
import { ReviewStatusVO } from '../../../../domain/value-objects/primitives/review-status.vo';
import { RatingValueVO } from '../../../../domain/value-objects/primitives/rating-value.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import type { VendorReviewRepository } from '../../../../domain/repositories/vendor-review.repository.interface';

@Injectable()
export class VendorReviewPrismaRepository
  extends BasePrismaRepository<VendorReviewEntity, ReviewIdVO>
  implements VendorReviewRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorReview): VendorReviewEntity {
    return VendorReviewEntity.reconstitute(
      ReviewIdVO.create(raw.id),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        userId: UserIdVO.create(raw.userId),
        orderId: OrderIdVO.create(raw.orderId),
        rating: RatingValueVO.create(raw.rating),
        content: raw.content ? ReviewContentVO.create(raw.content) : null,
        status: ReviewStatusVO.create(raw.status),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ReviewIdVO): Promise<VendorReviewEntity | null> {
    const raw = await this.prisma.vendorReview.findUnique({
      where: { id: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorReviewEntity): Promise<VendorReviewEntity> {
    const data = {
      vendorId: entity.vendorId.value,
      userId: entity.userId.value,
      orderId: entity.orderId.value,
      rating: entity.rating.value,
      content: entity.content?.value ?? null,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorReview.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ReviewIdVO): Promise<void> {
    await this.prisma.vendorReview.delete({ where: { id: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findApproved(vendorId: VendorIdVO): Promise<readonly VendorReviewEntity[]> {
    const rows = await this.prisma.vendorReview.findMany({
      where: { vendorId: vendorId.value, status: 'approved' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByVendor(vendorId: VendorIdVO): Promise<number> {
    return this.prisma.vendorReview.count({
      where: { vendorId: vendorId.value },
    });
  }
}
