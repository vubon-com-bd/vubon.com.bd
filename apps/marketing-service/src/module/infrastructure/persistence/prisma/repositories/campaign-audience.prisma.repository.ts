import { Injectable } from '@nestjs/common';
import { CampaignAudience as PrismaCampaignAudience } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CampaignAudienceEntity } from '../../../../domain/entities/campaign-audience.entity';
import { CampaignAudienceVO } from '../../../../domain/value-objects/composites/campaign-audience.vo';
import { CampaignIdVO } from '../../../../domain/value-objects/primitives/campaign-id.vo';
import type { CampaignAudienceRepository } from '../../../../domain/repositories/campaign-audience.repository.interface';

@Injectable()
export class CampaignAudiencePrismaRepository
  extends BasePrismaRepository<CampaignAudienceEntity, string>
  implements CampaignAudienceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCampaignAudience): CampaignAudienceEntity {
    return CampaignAudienceEntity.reconstitute(
      raw.id,
      {
        campaignId: raw.campaignId ? CampaignIdVO.create(raw.campaignId) : null,
        audience: CampaignAudienceVO.create({
          targetType: raw.targetType,
          targetUserIds: [],
          source: null,
          estimated: raw.estimated,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<CampaignAudienceEntity | null> {
    const raw = await this.prisma.campaignAudience.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CampaignAudienceEntity[]> {
    const rows = await this.prisma.campaignAudience.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CampaignAudienceEntity): Promise<CampaignAudienceEntity> {
    const data = {
      campaignId: entity.campaignId?.value ?? null,
      targetType: entity.audience.targetType,
      estimated: entity.audience.estimated,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.campaignAudience.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.campaignAudience.delete({ where: { id } });
  }

  async findByCampaignId(campaignId: CampaignIdVO): Promise<CampaignAudienceEntity | null> {
    const raw = await this.prisma.campaignAudience.findUnique({
      where: { campaignId: campaignId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
