/**
 * SupportTemplatePrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { SupportTemplateRepository } from '../../../../domain/repositories/support-template.repository.interface';
import { SupportTemplateEntity } from '../../../../domain/entities/support-template.entity';
import { TemplateIdVO } from '../../../../domain/value-objects/primitives/template-id.vo';
import { TemplateTypeVO } from '../../../../domain/value-objects/primitives/template-type.vo';
import { SupportTemplateMapper } from '../mappers/support-template.mapper';

@Injectable()
export class SupportTemplatePrismaRepository
  implements SupportTemplateRepository
{
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: SupportTemplateMapper,
  ) {}

  async findById(id: TemplateIdVO): Promise<SupportTemplateEntity | null> {
    const raw = await this.prisma.supportTemplate.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: SupportTemplateEntity): Promise<SupportTemplateEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.supportTemplate.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        name: data.name,
        content: data.content,
        isActive: data.isActive,
        usageCount: data.usageCount,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: TemplateIdVO): Promise<void> {
    await this.prisma.supportTemplate.delete({ where: { id: id.value } });
  }

  async exists(id: TemplateIdVO): Promise<boolean> {
    const count = await this.prisma.supportTemplate.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findActive(): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany({
      where: { isActive: true },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByType(type: TemplateTypeVO): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByLanguage(language: string): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany({ where: { language } });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByTypeAndLanguage(
    type: TemplateTypeVO,
    language: string,
  ): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany({
      where: { type: type.value, language },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findCustomerFacing(): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany({
      where: { type: { in: ['email', 'sms', 'notification', 'chat'] } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
