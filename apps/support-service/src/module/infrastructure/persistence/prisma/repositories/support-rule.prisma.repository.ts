import { Injectable } from '@nestjs/common';
import { SupportRule as PrismaSupportRule } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SupportRuleEntity } from '../../../../domain/entities/support-rule.entity';
import { RuleIdVO } from '../../../../domain/value-objects/primitives/rule-id.vo';
import { RuleTypeVO } from '../../../../domain/value-objects/primitives/rule-type.vo';
import { RuleConditionVO } from '../../../../domain/value-objects/primitives/rule-condition.vo';
import type { SupportRuleRepository } from '../../../../domain/repositories/support-rule.repository.interface';

@Injectable()
export class SupportRulePrismaRepository
  extends BasePrismaRepository<SupportRuleEntity, RuleIdVO>
  implements SupportRuleRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSupportRule): SupportRuleEntity {
    return SupportRuleEntity.reconstitute(
      RuleIdVO.create(raw.id),
      {
        name: raw.name,
        type: RuleTypeVO.create(raw.type),
        condition: RuleConditionVO.create(raw.condition),
        action: raw.action,
        priority: raw.priority,
        isActive: raw.isActive,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: RuleIdVO): Promise<SupportRuleEntity | null> {
    const raw = await this.prisma.supportRule.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportRuleEntity[]> {
    const rows = await this.prisma.supportRule.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SupportRuleEntity): Promise<SupportRuleEntity> {
    const data = {
      name: entity.name,
      type: entity.type.value,
      condition: entity.condition.value,
      action: entity.action,
      priority: entity.priority,
      isActive: entity.isActive,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.supportRule.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RuleIdVO): Promise<void> {
    await this.prisma.supportRule.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly SupportRuleEntity[]> {
    const rows = await this.prisma.supportRule.findMany({ where: { isActive: true } });
    return rows.map((r) => this.toDomain(r));
  }
}
