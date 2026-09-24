import { Injectable } from '@nestjs/common';
import { Template as PrismaTemplate } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TemplateEntity } from '../../../../domain/entities/template.entity';
import { TemplateIdVO } from '../../../../domain/value-objects/primitives/template-id.vo';
import { TemplateNameVO } from '../../../../domain/value-objects/primitives/template-name.vo';
import { TemplateContentVO } from '../../../../domain/value-objects/primitives/template-content.vo';
import { TemplateFormatVO } from '../../../../domain/value-objects/primitives/template-format.vo';
import { NotificationChannelVO } from '../../../../domain/value-objects/primitives/notification-channel.vo';
import type { TemplateRepository } from '../../../../domain/repositories/template.repository.interface';

@Injectable()
export class TemplatePrismaRepository
  extends BasePrismaRepository<TemplateEntity, TemplateIdVO>
  implements TemplateRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTemplate): TemplateEntity {
    return TemplateEntity.reconstitute(
      TemplateIdVO.create(raw.id),
      {
        name: TemplateNameVO.create(raw.name),
        channel: NotificationChannelVO.create(raw.channel),
        language: raw.language,
        subject: raw.subject,
        content: TemplateContentVO.create(raw.content),
        format: TemplateFormatVO.create(raw.format),
        variables: [],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: TemplateIdVO): Promise<TemplateEntity | null> {
    const raw = await this.prisma.template.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TemplateEntity[]> {
    const rows = await this.prisma.template.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TemplateEntity): Promise<TemplateEntity> {
    const data = {
      name: entity.name.value,
      channel: entity.channel.value,
      language: entity.language,
      subject: entity.subject,
      content: entity.content.value,
      format: entity.format.value,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.template.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TemplateIdVO): Promise<void> {
    await this.prisma.template.delete({ where: { id: id.value } });
  }

  async findByName(name: TemplateNameVO): Promise<TemplateEntity | null> {
    const raw = await this.prisma.template.findUnique({
      where: { name: name.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByChannel(channel: NotificationChannelVO): Promise<readonly TemplateEntity[]> {
    const rows = await this.prisma.template.findMany({
      where: { channel: channel.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByLanguage(language: string): Promise<readonly TemplateEntity[]> {
    const rows = await this.prisma.template.findMany({ where: { language } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByNameAndLanguage(
    name: TemplateNameVO,
    language: string,
  ): Promise<TemplateEntity | null> {
    const raw = await this.prisma.template.findFirst({
      where: { name: name.value, language },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
