import { Injectable } from '@nestjs/common';
import { SmsCampaign as PrismaSmsCampaign } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SmsCampaignEntity } from '../../../../domain/entities/sms-campaign.entity';
import { SmsMarketingIdVO } from '../../../../domain/value-objects/primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../../../../domain/value-objects/primitives/sms-campaign-status.vo';
import { SmsContentVO } from '../../../../domain/value-objects/primitives/sms-content.vo';
import type { SmsCampaignRepository } from '../../../../domain/repositories/sms-campaign.repository.interface';

@Injectable()
export class SmsCampaignPrismaRepository
  extends BasePrismaRepository<SmsCampaignEntity, SmsMarketingIdVO>
  implements SmsCampaignRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSmsCampaign): SmsCampaignEntity {
    return SmsCampaignEntity.reconstitute(
      SmsMarketingIdVO.create(raw.id),
      {
        name: raw.name,
        content: SmsContentVO.create(raw.content),
        status: SmsCampaignStatusVO.create(raw.status),
        recipientCount: raw.recipientCount,
        deliveredCount: raw.deliveredCount,
        scheduledAt: raw.scheduledAt,
        sentAt: raw.sentAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: SmsMarketingIdVO): Promise<SmsCampaignEntity | null> {
    const raw = await this.prisma.smsCampaign.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SmsCampaignEntity[]> {
    const rows = await this.prisma.smsCampaign.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SmsCampaignEntity): Promise<SmsCampaignEntity> {
    const data = {
      name: entity.name,
      content: entity.content.value,
      status: entity.status.value,
      recipientCount: entity.recipientCount,
      deliveredCount: entity.deliveredCount,
      scheduledAt: entity.scheduledAt,
      sentAt: entity.sentAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.smsCampaign.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SmsMarketingIdVO): Promise<void> {
    await this.prisma.smsCampaign.delete({ where: { id: id.value } });
  }

  async findByStatus(status: SmsCampaignStatusVO): Promise<readonly SmsCampaignEntity[]> {
    const rows = await this.prisma.smsCampaign.findMany({ where: { status: status.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
