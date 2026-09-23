import { Injectable } from '@nestjs/common';
import { Campaign as PrismaCampaign } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CampaignEntity } from '../../../../domain/entities/campaign.entity';
import { CampaignIdVO } from '../../../../domain/value-objects/primitives/campaign-id.vo';
import { CampaignNameVO } from '../../../../domain/value-objects/primitives/campaign-name.vo';
import { CampaignStatusVO } from '../../../../domain/value-objects/primitives/campaign-status.vo';
import { CampaignTypeVO } from '../../../../domain/value-objects/primitives/campaign-type.vo';
import { CampaignChannelVO } from '../../../../domain/value-objects/primitives/campaign-channel.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { CampaignRepository } from '../../../../domain/repositories/campaign.repository.interface';

@Injectable()
export class CampaignPrismaRepository
  extends BasePrismaRepository<CampaignEntity, CampaignIdVO>
  implements CampaignRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCampaign): CampaignEntity {
    return CampaignEntity.reconstitute(
      CampaignIdVO.create(raw.id),
      {
        name: CampaignNameVO.create(raw.name),
        status: CampaignStatusVO.create(raw.status),
        type: CampaignTypeVO.create(raw.type),
        channel: CampaignChannelVO.create(raw.channel),
        goal: null,
        createdBy: UserIdVO.create(raw.createdBy),
        startDate: raw.startDate,
        endDate: raw.endDate,
        launchedAt: raw.launchedAt,
        completedAt: raw.completedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: CampaignIdVO): Promise<CampaignEntity | null> {
    const raw = await this.prisma.campaign.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CampaignEntity[]> {
    const rows = await this.prisma.campaign.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CampaignEntity): Promise<CampaignEntity> {
    const data = {
      name: entity.name.value,
      status: entity.status.value,
      type: entity.type.value,
      channel: entity.channel.value,
      goal: entity.goal?.value ?? null,
      createdBy: entity.createdBy.value,
      startDate: entity.startDate,
      endDate: entity.endDate,
      launchedAt: entity.launchedAt,
      completedAt: entity.completedAt,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.campaign.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CampaignIdVO): Promise<void> {
    await this.prisma.campaign.delete({ where: { id: id.value } });
  }

  async findByStatus(status: CampaignStatusVO): Promise<readonly CampaignEntity[]> {
    const rows = await this.prisma.campaign.findMany({ where: { status: status.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByCreator(userId: UserIdVO): Promise<readonly CampaignEntity[]> {
    const rows = await this.prisma.campaign.findMany({ where: { createdBy: userId.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
