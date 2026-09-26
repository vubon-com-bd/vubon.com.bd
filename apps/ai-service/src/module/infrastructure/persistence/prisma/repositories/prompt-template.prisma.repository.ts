import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiPromptTemplate as PrismaTemplate } from '@prisma/client';
import { PromptTemplateEntity } from '../../../../domain/entities/prompt-template.entity';
import type { PromptTemplateRepository } from '../../../../domain/repositories/prompt-template.repository.interface';
import { PromptIdVO } from '../../../../domain/value-objects/primitives/prompt-id.vo';
import { PromptTemplateVO_ } from '../../../../domain/value-objects/composites/prompt-template.vo';
import { PromptTemplateVO } from '../../../../domain/value-objects/primitives/prompt-template.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PromptTemplatePrismaRepository
  extends BasePrismaRepository<PromptTemplateEntity, PromptIdVO>
  implements PromptTemplateRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaTemplate): PromptTemplateEntity {
    return PromptTemplateEntity.reconstitute(
      PromptIdVO.create(raw.id),
      {
        promptId: PromptIdVO.create(raw.id),
        template: PromptTemplateVO_.create({
          name: raw.name,
          template: PromptTemplateVO.create(raw.template),
          role: raw.role,
          variables: raw.variables,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: PromptIdVO): Promise<PromptTemplateEntity | null> {
    const raw = await this.prisma.aiPromptTemplate.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PromptTemplateEntity[]> {
    const rows = await this.prisma.aiPromptTemplate.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PromptTemplateEntity): Promise<PromptTemplateEntity> {
    const data = {
      name: entity.template.name,
      template: entity.template.template.value,
      role: entity.template.role,
      variables: [...entity.template.variables],
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiPromptTemplate.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PromptIdVO): Promise<void> {
    await this.prisma.aiPromptTemplate.delete({ where: { id: id.value } });
  }

  async findByPromptId(promptId: PromptIdVO): Promise<PromptTemplateEntity | null> {
    const raw = await this.prisma.aiPromptTemplate.findUnique({ where: { id: promptId.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findWithVariable(variable: string): Promise<readonly PromptTemplateEntity[]> {
    const rows = await this.prisma.aiPromptTemplate.findMany({
      where: { variables: { has: variable } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
