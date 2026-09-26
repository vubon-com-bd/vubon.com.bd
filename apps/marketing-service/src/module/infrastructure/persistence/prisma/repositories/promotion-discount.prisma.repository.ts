import { Injectable } from '@nestjs/common';
import { PromotionDiscount as PrismaPromotionDiscount } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PromotionDiscountEntity } from '../../../../domain/entities/promotion-discount.entity';
import { PromotionDiscountVO } from '../../../../domain/value-objects/composites/promotion-discount.vo';
import { PromotionIdVO } from '../../../../domain/value-objects/primitives/promotion-id.vo';
import { PromotionDiscountTypeVO } from '../../../../domain/value-objects/primitives/promotion-discount-type.vo';
import type { PromotionDiscountRepository } from '../../../../domain/repositories/promotion-discount.repository.interface';

@Injectable()
export class PromotionDiscountPrismaRepository
  extends BasePrismaRepository<PromotionDiscountEntity, string>
  implements PromotionDiscountRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPromotionDiscount): PromotionDiscountEntity {
    return PromotionDiscountEntity.reconstitute(
      raw.id,
      {
        promotionId: PromotionIdVO.create(raw.promotionId),
        discount: PromotionDiscountVO.create({
          discountType: PromotionDiscountTypeVO.create(raw.discountType),
          numericValue: raw.value,
          maxDiscount: null,
          minPurchase: null,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<PromotionDiscountEntity | null> {
    const raw = await this.prisma.promotionDiscount.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PromotionDiscountEntity[]> {
    const rows = await this.prisma.promotionDiscount.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PromotionDiscountEntity): Promise<PromotionDiscountEntity> {
    const data = {
      promotionId: entity.promotionId.value,
      discountType: entity.discount.discountType.value,
      value: entity.discount.value_,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.promotionDiscount.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.promotionDiscount.delete({ where: { id } });
  }

  async findByPromotionId(promotionId: PromotionIdVO): Promise<readonly PromotionDiscountEntity[]> {
    const rows = await this.prisma.promotionDiscount.findMany({
      where: { promotionId: promotionId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
