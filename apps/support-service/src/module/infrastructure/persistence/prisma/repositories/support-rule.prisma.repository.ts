/**
 * SupportRulePrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { SupportRuleRepository } from '../../../../domain/repositories/support-rule.repository.interface';
import { SupportRuleEntity } from '../../../../domain/entities/support-rule.entity';
import { RuleIdVO } from '../../../../domain/value-objects/primitives/rule-id.vo';
import { RuleTypeVO } from '../../../../domain/value-objects/primitives/rule-type.vo';
import { SupportRuleMapper } from '../mappers/support-rule.mapper';

@Injectable()
export class SupportRulePrismaRepository implements SupportRuleRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: SupportRuleMapper,
  ) {}

  async findById(id: RuleIdVO): Promise<SupportRuleEntity | null> {
    const raw = await this.prisma.supportRule.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportRuleEntity[]> {
    const rows = await this.prisma.supportRule.findMany({
      orderBy: { priority: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: SupportRuleEntity): Promise<SupportRuleEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.supportRule.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        condition: data.condition,
        action: data.action,
        isActive: data.isActive,
        priority: data.priority,
        triggerCount: data.triggerCount,
        lastTriggeredAt: data.lastTriggeredAt,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: RuleIdVO): Promise<void> {
    await this.prisma.supportRule.delete({ where: { id: id.value } });
  }

  async exists(id: RuleIdVO): Promise<boolean> {
    const count = await this.prisma.supportRule.count({ where: { id: id.value } });
    return count > 0;
  }

  async findActive(): Promise<readonly SupportRuleEntity[]> {
    const rows = await this.prisma.supportRule.findMany({
      where: { isActive: true },
      orderBy: { priority: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: RuleTypeVO): Promise<readonly SupportRuleEntity[]> {
    const rows = await this.prisma.supportRule.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findAssignmentRules(): Promise<readonly SupportRuleEntity[]> {
    const rows = await this.prisma.supportRule.findMany({
      where: { type: 'assignment', isActive: true },
      orderBy: { priority: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findActiveByPriority(): Promise<readonly SupportRuleEntity[]> {
    const rows = await this.prisma.supportRule.findMany({
      where: { isActive: true },
      orderBy: { priority: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
