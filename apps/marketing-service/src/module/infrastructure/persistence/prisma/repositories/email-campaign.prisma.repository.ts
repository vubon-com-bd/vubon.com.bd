import { Injectable } from '@nestjs/common';
import { EmailCampaign as PrismaEmailCampaign } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { EmailCampaignEntity } from '../../../../domain/entities/email-campaign.entity';
import { EmailMarketingIdVO } from '../../../../domain/value-objects/primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../../../../domain/value-objects/primitives/email-campaign-status.vo';
import { EmailTemplateIdVO } from '../../../../domain/value-objects/primitives/email-template-id.vo';
import type { EmailCampaignRepository } from '../../../../domain/repositories/email-campaign.repository.interface';

@Injectable()
export class EmailCampaignPrismaRepository
  extends BasePrismaRepository<EmailCampaignEntity, EmailMarketingIdVO>
  implements EmailCampaignRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaEmailCampaign): EmailCampaignEntity {
    return EmailCampaignEntity.reconstitute(
      EmailMarketingIdVO.create(raw.id),
      {
        name: raw.name,
        subject: raw.subject,
        content: raw.content,
        status: EmailCampaignStatusVO.create(raw.status),
        templateId: raw.templateId ? EmailTemplateIdVO.create(raw.templateId) : null,
        recipientCount: raw.recipientCount,
        openCount: raw.openCount,
        clickCount: raw.clickCount,
        scheduledAt: raw.scheduledAt,
        sentAt: raw.sentAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: EmailMarketingIdVO): Promise<EmailCampaignEntity | null> {
    const raw = await this.prisma.emailCampaign.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly EmailCampaignEntity[]> {
    const rows = await this.prisma.emailCampaign.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: EmailCampaignEntity): Promise<EmailCampaignEntity> {
    const data = {
      name: entity.name,
      subject: entity.subject,
      content: entity.content,
      status: entity.status.value,
      templateId: entity.templateId?.value ?? null,
      recipientCount: entity.recipientCount,
      openCount: entity.openCount,
      clickCount: entity.clickCount,
      scheduledAt: entity.scheduledAt,
      sentAt: entity.sentAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.emailCampaign.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: EmailMarketingIdVO): Promise<void> {
    await this.prisma.emailCampaign.delete({ where: { id: id.value } });
  }

  async findByStatus(status: EmailCampaignStatusVO): Promise<readonly EmailCampaignEntity[]> {
    const rows = await this.prisma.emailCampaign.findMany({ where: { status: status.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
