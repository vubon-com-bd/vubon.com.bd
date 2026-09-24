import { Injectable } from '@nestjs/common';
import { TemplateVariable as PrismaVar } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TemplateVariableEntity } from '../../../../domain/entities/template-variable.entity';
import { TemplateIdVO } from '../../../../domain/value-objects/primitives/template-id.vo';
import type { TemplateVariableRepository } from '../../../../domain/repositories/template-variable.repository.interface';

@Injectable()
export class TemplateVariablePrismaRepository
  extends BasePrismaRepository<TemplateVariableEntity, string>
  implements TemplateVariableRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVar): TemplateVariableEntity {
    return TemplateVariableEntity.reconstitute(
      raw.id,
      {
        templateId: TemplateIdVO.create(raw.templateId),
        name: raw.name,
        required: raw.required,
        defaultValue: raw.defaultValue,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<TemplateVariableEntity | null> {
    const raw = await this.prisma.templateVariable.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TemplateVariableEntity[]> {
    const rows = await this.prisma.templateVariable.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TemplateVariableEntity): Promise<TemplateVariableEntity> {
    const data = {
      templateId: entity.templateId.value,
      name: entity.name,
      required: entity.required,
      defaultValue: entity.defaultValue,
    };
    const raw = await this.prisma.templateVariable.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.templateVariable.delete({ where: { id } });
  }

  async findByTemplateId(templateId: TemplateIdVO): Promise<readonly TemplateVariableEntity[]> {
    const rows = await this.prisma.templateVariable.findMany({
      where: { templateId: templateId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteByTemplateId(templateId: TemplateIdVO): Promise<void> {
    await this.prisma.templateVariable.deleteMany({
      where: { templateId: templateId.value },
    });
  }
}
