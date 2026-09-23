import { Injectable } from '@nestjs/common';
import { Promotion as PrismaPromotion } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PromotionEntity } from '../../../../domain/entities/promotion.entity';
import { PromotionIdVO } from '../../../../domain/value-objects/primitives/promotion-id.vo';
import { PromotionNameVO } from '../../../../domain/value-objects/primitives/promotion-name.vo';
import { PromotionCodeVO } from '../../../../domain/value-objects/primitives/promotion-code.vo';
import { PromotionStatusVO } from '../../../../domain/value-objects/primitives/promotion-status.vo';
import { PromotionTypeVO } from '../../../../domain/value-objects/primitives/promotion-type.vo';
import { PromotionUsageVO } from '../../../../domain/value-objects/primitives/promotion-usage.vo';
import type { PromotionRepository } from '../../../../domain/repositories/promotion.repository.interface';

@Injectable()
export class PromotionPrismaRepository
  extends BasePrismaRepository<PromotionEntity, PromotionIdVO>
  implements PromotionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPromotion): PromotionEntity {
    return PromotionEntity.reconstitute(
      PromotionIdVO.create(raw.id),
      {
        name: PromotionNameVO.create(raw.name),
        code: PromotionCodeVO.create(raw.code),
        status: PromotionStatusVO.create(raw.status),
        type: PromotionTypeVO.create(raw.type),
        usage: PromotionUsageVO.create(raw.usedCount),
        maxUsage: raw.maxUsage,
        startDate: raw.startDate,
        endDate: raw.endDate,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PromotionIdVO): Promise<PromotionEntity | null> {
    const raw = await this.prisma.promotion.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PromotionEntity[]> {
    const rows = await this.prisma.promotion.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PromotionEntity): Promise<PromotionEntity> {
    const data = {
      name: entity.name.value,
      code: entity.code.value,
      status: entity.status.value,
      type: entity.type.value,
      discountType: 'percentage',
      discountValue: 0,
      maxUsage: entity.maxUsage,
      usedCount: entity.usage.value,
      startDate: entity.startDate,
      endDate: entity.endDate,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.promotion.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PromotionIdVO): Promise<void> {
    await this.prisma.promotion.delete({ where: { id: id.value } });
  }

  async findByCode(code: PromotionCodeVO): Promise<PromotionEntity | null> {
    const raw = await this.prisma.promotion.findUnique({ where: { code: code.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findActive(): Promise<readonly PromotionEntity[]> {
    const rows = await this.prisma.promotion.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }
}
