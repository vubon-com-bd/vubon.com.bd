import { Injectable } from '@nestjs/common';
import { SmsMarketing as PrismaSmsMarketing } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SmsMarketingEntity } from '../../../../domain/entities/sms-marketing.entity';
import { SmsMarketingIdVO } from '../../../../domain/value-objects/primitives/sms-marketing-id.vo';
import { SmsCampaignStatusVO } from '../../../../domain/value-objects/primitives/sms-campaign-status.vo';
import { SmsContentVO } from '../../../../domain/value-objects/primitives/sms-content.vo';
import type { SmsMarketingRepository } from '../../../../domain/repositories/sms-marketing.repository.interface';

@Injectable()
export class SmsMarketingPrismaRepository
  extends BasePrismaRepository<SmsMarketingEntity, SmsMarketingIdVO>
  implements SmsMarketingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSmsMarketing): SmsMarketingEntity {
    return SmsMarketingEntity.reconstitute(
      SmsMarketingIdVO.create(raw.id),
      {
        name: raw.name,
        content: SmsContentVO.create(raw.content),
        status: SmsCampaignStatusVO.create(raw.status),
        scheduledAt: raw.scheduledAt,
        sentAt: raw.sentAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: SmsMarketingIdVO): Promise<SmsMarketingEntity | null> {
    const raw = await this.prisma.smsMarketing.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SmsMarketingEntity[]> {
    const rows = await this.prisma.smsMarketing.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SmsMarketingEntity): Promise<SmsMarketingEntity> {
    const data = {
      name: entity.name,
      content: entity.content.value,
      status: entity.status.value,
      scheduledAt: entity.scheduledAt,
      sentAt: entity.sentAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.smsMarketing.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SmsMarketingIdVO): Promise<void> {
    await this.prisma.smsMarketing.delete({ where: { id: id.value } });
  }

  async findByStatus(status: SmsCampaignStatusVO): Promise<readonly SmsMarketingEntity[]> {
    const rows = await this.prisma.smsMarketing.findMany({ where: { status: status.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
