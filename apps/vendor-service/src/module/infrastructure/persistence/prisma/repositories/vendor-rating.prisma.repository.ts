import { Injectable } from '@nestjs/common';
import { VendorRating as PrismaVendorRating } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VendorRatingEntity } from '../../../../domain/entities/vendor-rating.entity';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import { RatingValueVO } from '../../../../domain/value-objects/primitives/rating-value.vo';
import type { VendorRatingRepository } from '../../../../domain/repositories/vendor-rating.repository.interface';

@Injectable()
export class VendorRatingPrismaRepository
  extends BasePrismaRepository<VendorRatingEntity, VendorIdVO>
  implements VendorRatingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVendorRating): VendorRatingEntity {
    return VendorRatingEntity.reconstitute(
      VendorIdVO.create(raw.vendorId),
      {
        vendorId: VendorIdVO.create(raw.vendorId),
        averageRating: RatingValueVO.create(raw.averageRating),
        totalRatings: raw.totalRatings,
        fiveStarCount: raw.fiveStarCount,
        fourStarCount: raw.fourStarCount,
        threeStarCount: raw.threeStarCount,
        twoStarCount: raw.twoStarCount,
        oneStarCount: raw.oneStarCount,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VendorIdVO): Promise<VendorRatingEntity | null> {
    const raw = await this.prisma.vendorRating.findUnique({
      where: { vendorId: id.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VendorRatingEntity[]> {
    const rows = await this.prisma.vendorRating.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VendorRatingEntity): Promise<VendorRatingEntity> {
    const data = {
      averageRating: entity.averageRating.value,
      totalRatings: entity.totalRatings,
      fiveStarCount: entity.fiveStarCount,
      fourStarCount: entity.fourStarCount,
      threeStarCount: entity.threeStarCount,
      twoStarCount: entity.twoStarCount,
      oneStarCount: entity.oneStarCount,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vendorRating.upsert({
      where: { vendorId: entity.vendorId.value },
      create: { id: entity.id.value, vendorId: entity.vendorId.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VendorIdVO): Promise<void> {
    await this.prisma.vendorRating.delete({ where: { vendorId: id.value } });
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<VendorRatingEntity | null> {
    const raw = await this.prisma.vendorRating.findUnique({
      where: { vendorId: vendorId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
