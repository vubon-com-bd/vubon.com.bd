import { Injectable } from '@nestjs/common';
import { CampaignBudget as PrismaCampaignBudget } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CampaignBudgetEntity } from '../../../../domain/entities/campaign-budget.entity';
import { CampaignIdVO } from '../../../../domain/value-objects/primitives/campaign-id.vo';
import { CampaignBudgetVO } from '../../../../domain/value-objects/primitives/campaign-budget.vo';
import type { CampaignBudgetRepository } from '../../../../domain/repositories/campaign-budget.repository.interface';

@Injectable()
export class CampaignBudgetPrismaRepository
  extends BasePrismaRepository<CampaignBudgetEntity, string>
  implements CampaignBudgetRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCampaignBudget): CampaignBudgetEntity {
    return CampaignBudgetEntity.reconstitute(
      raw.id,
      {
        campaignId: raw.campaignId ? CampaignIdVO.create(raw.campaignId) : null,
        budget: CampaignBudgetVO.create(raw.amount, raw.currency as never),
        spent: raw.spent,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<CampaignBudgetEntity | null> {
    const raw = await this.prisma.campaignBudget.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CampaignBudgetEntity[]> {
    const rows = await this.prisma.campaignBudget.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CampaignBudgetEntity): Promise<CampaignBudgetEntity> {
    const data = {
      campaignId: entity.campaignId?.value ?? null,
      amount: entity.budget.amount,
      currency: entity.budget.currency,
      spent: entity.spent,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.campaignBudget.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.campaignBudget.delete({ where: { id } });
  }

  async findByCampaignId(campaignId: CampaignIdVO): Promise<CampaignBudgetEntity | null> {
    const raw = await this.prisma.campaignBudget.findUnique({
      where: { campaignId: campaignId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
