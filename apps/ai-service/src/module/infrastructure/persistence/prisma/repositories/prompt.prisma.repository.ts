import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiPrompt as PrismaPrompt } from '@prisma/client';
import { PromptEntity } from '../../../../domain/entities/prompt.entity';
import type { PromptRepository } from '../../../../domain/repositories/prompt.repository.interface';
import { PromptIdVO } from '../../../../domain/value-objects/primitives/prompt-id.vo';
import { PromptTokenCountVO } from '../../../../domain/value-objects/primitives/prompt-token-count.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PromptPrismaRepository
  extends BasePrismaRepository<PromptEntity, PromptIdVO>
  implements PromptRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaPrompt): PromptEntity {
    return PromptEntity.reconstitute(
      PromptIdVO.create(raw.id),
      {
        type: raw.type,
        text: raw.text,
        role: raw.role,
        template: null,
        tokenCount: PromptTokenCountVO.create(raw.tokenCount),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: PromptIdVO): Promise<PromptEntity | null> {
    const raw = await this.prisma.aiPrompt.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PromptEntity[]> {
    const rows = await this.prisma.aiPrompt.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PromptEntity): Promise<PromptEntity> {
    const data = {
      type: entity.type,
      text: entity.text,
      role: entity.role,
      tokenCount: entity.tokenCount.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiPrompt.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PromptIdVO): Promise<void> {
    await this.prisma.aiPrompt.delete({ where: { id: id.value } });
  }

  async findByType(type: string): Promise<readonly PromptEntity[]> {
    const rows = await this.prisma.aiPrompt.findMany({ where: { type } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByRole(role: string): Promise<readonly PromptEntity[]> {
    const rows = await this.prisma.aiPrompt.findMany({ where: { role } });
    return rows.map((r) => this.toDomain(r));
  }

  async findFromTemplate(): Promise<readonly PromptEntity[]> {
    const rows = await this.prisma.aiPrompt.findMany({ where: { templateId: { not: null } } });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecent(limit: number): Promise<readonly PromptEntity[]> {
    const rows = await this.prisma.aiPrompt.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
