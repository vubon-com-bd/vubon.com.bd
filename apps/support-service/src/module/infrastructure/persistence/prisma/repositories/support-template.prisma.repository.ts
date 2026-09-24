import { Injectable } from '@nestjs/common';
import { SupportTemplate as PrismaSupportTemplate } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SupportTemplateEntity } from '../../../../domain/entities/support-template.entity';
import { TemplateIdVO } from '../../../../domain/value-objects/primitives/template-id.vo';
import { TemplateTypeVO } from '../../../../domain/value-objects/primitives/template-type.vo';
import { TemplateContentVO } from '../../../../domain/value-objects/primitives/template-content.vo';
import type { SupportTemplateRepository } from '../../../../domain/repositories/support-template.repository.interface';

@Injectable()
export class SupportTemplatePrismaRepository
  extends BasePrismaRepository<SupportTemplateEntity, TemplateIdVO>
  implements SupportTemplateRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSupportTemplate): SupportTemplateEntity {
    return SupportTemplateEntity.reconstitute(
      TemplateIdVO.create(raw.id),
      {
        name: raw.name,
        type: TemplateTypeVO.create(raw.type),
        content: TemplateContentVO.create(raw.content),
        variables: raw.variables,
        isActive: raw.isActive,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: TemplateIdVO): Promise<SupportTemplateEntity | null> {
    const raw = await this.prisma.supportTemplate.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SupportTemplateEntity): Promise<SupportTemplateEntity> {
    const data = {
      name: entity.name,
      type: entity.type.value,
      content: entity.content.value,
      variables: [...entity.variables],
      isActive: entity.isActive,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.supportTemplate.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TemplateIdVO): Promise<void> {
    await this.prisma.supportTemplate.delete({ where: { id: id.value } });
  }

  async findByType(type: TemplateTypeVO): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly SupportTemplateEntity[]> {
    const rows = await this.prisma.supportTemplate.findMany({ where: { isActive: true } });
    return rows.map((r) => this.toDomain(r));
  }
}
