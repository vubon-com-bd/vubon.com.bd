import { Injectable } from '@nestjs/common';
import { PromotionRule as PrismaPromotionRule } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PromotionRuleEntity } from '../../../../domain/entities/promotion-rule.entity';
import { PromotionRuleVO } from '../../../../domain/value-objects/composites/promotion-rule.vo';
import { PromotionIdVO } from '../../../../domain/value-objects/primitives/promotion-id.vo';
import type { PromotionRuleRepository } from '../../../../domain/repositories/promotion-rule.repository.interface';

@Injectable()
export class PromotionRulePrismaRepository
  extends BasePrismaRepository<PromotionRuleEntity, string>
  implements PromotionRuleRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPromotionRule): PromotionRuleEntity {
    const promotionId = PromotionIdVO.create(raw.promotionId);
    return PromotionRuleEntity.reconstitute(
      raw.id,
      {
        promotionId,
        rule: PromotionRuleVO.create({
          promotionId,
          ruleType: raw.ruleType,
          eligibleUserIds: [],
          eligibleProductIds: [],
          conditions: (raw.conditions ?? {}) as Record<string, unknown>,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<PromotionRuleEntity | null> {
    const raw = await this.prisma.promotionRule.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PromotionRuleEntity[]> {
    const rows = await this.prisma.promotionRule.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PromotionRuleEntity): Promise<PromotionRuleEntity> {
    const data = {
      promotionId: entity.promotionId.value,
      ruleType: entity.rule.ruleType,
      conditions: (entity.rule.conditions ?? {}) as never,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.promotionRule.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.promotionRule.delete({ where: { id } });
  }

  async findByPromotionId(promotionId: PromotionIdVO): Promise<readonly PromotionRuleEntity[]> {
    const rows = await this.prisma.promotionRule.findMany({
      where: { promotionId: promotionId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
