import { Injectable } from '@nestjs/common';
import { MarketingWorkflow as PrismaMarketingWorkflow } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { MarketingWorkflowEntity } from '../../../../domain/entities/marketing-workflow.entity';
import { MarketingWorkflowVO } from '../../../../domain/value-objects/composites/marketing-workflow.vo';
import { MarketingAutomationIdVO } from '../../../../domain/value-objects/primitives/marketing-automation-id.vo';
import { AutomationTriggerVO } from '../../../../domain/value-objects/primitives/automation-trigger.vo';
import type { MarketingWorkflowRepository } from '../../../../domain/repositories/marketing-workflow.repository.interface';

@Injectable()
export class MarketingWorkflowPrismaRepository
  extends BasePrismaRepository<MarketingWorkflowEntity, string>
  implements MarketingWorkflowRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMarketingWorkflow): MarketingWorkflowEntity {
    const automationId = MarketingAutomationIdVO.create(raw.automationId);
    return MarketingWorkflowEntity.reconstitute(
      raw.id,
      {
        workflow: MarketingWorkflowVO.create({
          automationId,
          name: raw.name,
          trigger: AutomationTriggerVO.create('signup'),
          steps: [],
          status: raw.status,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<MarketingWorkflowEntity | null> {
    const raw = await this.prisma.marketingWorkflow.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MarketingWorkflowEntity[]> {
    const rows = await this.prisma.marketingWorkflow.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: MarketingWorkflowEntity): Promise<MarketingWorkflowEntity> {
    const data = {
      automationId: entity.workflow.automationId.value,
      name: entity.workflow.name,
      steps: (entity.workflow.steps as never) ?? [],
      status: entity.workflow.status,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.marketingWorkflow.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.marketingWorkflow.delete({ where: { id } });
  }

  async findByAutomation(automationId: string): Promise<readonly MarketingWorkflowEntity[]> {
    const rows = await this.prisma.marketingWorkflow.findMany({
      where: { automationId },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
