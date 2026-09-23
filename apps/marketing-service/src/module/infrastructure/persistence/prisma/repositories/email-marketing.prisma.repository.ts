import { Injectable } from '@nestjs/common';
import { EmailMarketing as PrismaEmailMarketing } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { EmailMarketingEntity } from '../../../../domain/entities/email-marketing.entity';
import { EmailMarketingIdVO } from '../../../../domain/value-objects/primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../../../../domain/value-objects/primitives/email-campaign-status.vo';
import { EmailTemplateIdVO } from '../../../../domain/value-objects/primitives/email-template-id.vo';
import type { EmailMarketingRepository } from '../../../../domain/repositories/email-marketing.repository.interface';

@Injectable()
export class EmailMarketingPrismaRepository
  extends BasePrismaRepository<EmailMarketingEntity, EmailMarketingIdVO>
  implements EmailMarketingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaEmailMarketing): EmailMarketingEntity {
    return EmailMarketingEntity.reconstitute(
      EmailMarketingIdVO.create(raw.id),
      {
        name: raw.name,
        subject: raw.subject,
        content: raw.content,
        status: EmailCampaignStatusVO.create(raw.status),
        templateId: raw.templateId ? EmailTemplateIdVO.create(raw.templateId) : null,
        scheduledAt: raw.scheduledAt,
        sentAt: raw.sentAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: EmailMarketingIdVO): Promise<EmailMarketingEntity | null> {
    const raw = await this.prisma.emailMarketing.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly EmailMarketingEntity[]> {
    const rows = await this.prisma.emailMarketing.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: EmailMarketingEntity): Promise<EmailMarketingEntity> {
    const data = {
      name: entity.name,
      subject: entity.subject,
      content: entity.content,
      status: entity.status.value,
      templateId: entity.templateId?.value ?? null,
      scheduledAt: entity.scheduledAt,
      sentAt: entity.sentAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.emailMarketing.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: EmailMarketingIdVO): Promise<void> {
    await this.prisma.emailMarketing.delete({ where: { id: id.value } });
  }

  async findByStatus(status: EmailCampaignStatusVO): Promise<readonly EmailMarketingEntity[]> {
    const rows = await this.prisma.emailMarketing.findMany({ where: { status: status.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
