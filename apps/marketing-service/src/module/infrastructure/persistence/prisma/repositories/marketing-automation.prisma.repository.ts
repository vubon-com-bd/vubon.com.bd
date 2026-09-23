import { Injectable } from '@nestjs/common';
import { MarketingAutomation as PrismaMarketingAutomation } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { MarketingAutomationEntity } from '../../../../domain/entities/marketing-automation.entity';
import { MarketingAutomationIdVO } from '../../../../domain/value-objects/primitives/marketing-automation-id.vo';
import { AutomationTypeVO } from '../../../../domain/value-objects/primitives/automation-type.vo';
import { AutomationTriggerVO } from '../../../../domain/value-objects/primitives/automation-trigger.vo';
import type { MarketingAutomationRepository } from '../../../../domain/repositories/marketing-automation.repository.interface';

@Injectable()
export class MarketingAutomationPrismaRepository
  extends BasePrismaRepository<MarketingAutomationEntity, MarketingAutomationIdVO>
  implements MarketingAutomationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMarketingAutomation): MarketingAutomationEntity {
    return MarketingAutomationEntity.reconstitute(
      MarketingAutomationIdVO.create(raw.id),
      {
        name: raw.name,
        type: AutomationTypeVO.create(raw.type),
        trigger: AutomationTriggerVO.create(raw.trigger),
        status: raw.status,
        config: (raw.config ?? null) as Readonly<Record<string, unknown>> | null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: MarketingAutomationIdVO): Promise<MarketingAutomationEntity | null> {
    const raw = await this.prisma.marketingAutomation.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MarketingAutomationEntity[]> {
    const rows = await this.prisma.marketingAutomation.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: MarketingAutomationEntity): Promise<MarketingAutomationEntity> {
    const data = {
      name: entity.name,
      type: entity.type.value,
      trigger: entity.trigger.value,
      status: entity.status,
      config: (entity.config ?? null) as never,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.marketingAutomation.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: MarketingAutomationIdVO): Promise<void> {
    await this.prisma.marketingAutomation.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly MarketingAutomationEntity[]> {
    const rows = await this.prisma.marketingAutomation.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }
}
