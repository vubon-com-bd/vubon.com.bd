import { Injectable } from '@nestjs/common';
import { EmailTemplate as PrismaEmailTemplate } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { EmailTemplateEntity } from '../../../../domain/entities/email-template.entity';
import type { EmailTemplateRepository } from '../../../../domain/repositories/email-template.repository.interface';

@Injectable()
export class EmailTemplatePrismaRepository
  extends BasePrismaRepository<EmailTemplateEntity, string>
  implements EmailTemplateRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaEmailTemplate): EmailTemplateEntity {
    return EmailTemplateEntity.reconstitute(
      raw.id,
      {
        name: raw.name,
        subject: raw.subject,
        html: raw.html,
        language: raw.language,
        variables: [],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<EmailTemplateEntity | null> {
    const raw = await this.prisma.emailTemplate.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly EmailTemplateEntity[]> {
    const rows = await this.prisma.emailTemplate.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: EmailTemplateEntity): Promise<EmailTemplateEntity> {
    const data = {
      name: entity.name,
      subject: entity.subject,
      html: entity.html,
      language: entity.language,
      variables: [...entity.variables] as never,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.emailTemplate.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.emailTemplate.delete({ where: { id } });
  }

  async findByName(name: string): Promise<EmailTemplateEntity | null> {
    const raw = await this.prisma.emailTemplate.findFirst({ where: { name } });
    return raw ? this.toDomain(raw) : null;
  }
}
