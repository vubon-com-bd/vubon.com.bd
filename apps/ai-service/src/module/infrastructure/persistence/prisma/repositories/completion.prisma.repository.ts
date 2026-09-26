import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiCompletion as PrismaCompletion } from '@prisma/client';
import { CompletionEntity } from '../../../../domain/entities/completion.entity';
import type { CompletionRepository } from '../../../../domain/repositories/completion.repository.interface';
import { CompletionIdVO } from '../../../../domain/value-objects/primitives/completion-id.vo';
import { CompletionTextVO } from '../../../../domain/value-objects/primitives/completion-text.vo';
import { PromptIdVO } from '../../../../domain/value-objects/primitives/prompt-id.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CompletionPrismaRepository
  extends BasePrismaRepository<CompletionEntity, CompletionIdVO>
  implements CompletionRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaCompletion): CompletionEntity {
    return CompletionEntity.reconstitute(
      CompletionIdVO.create(raw.id),
      {
        promptId: PromptIdVO.create(raw.promptId),
        text: CompletionTextVO.create(raw.text),
        tokensUsed: raw.tokensUsed,
        model: raw.model,
        finishReason: raw.finishReason,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: CompletionIdVO): Promise<CompletionEntity | null> {
    const raw = await this.prisma.aiCompletion.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CompletionEntity[]> {
    const rows = await this.prisma.aiCompletion.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CompletionEntity): Promise<CompletionEntity> {
    const data = {
      promptId: entity.promptId.value,
      text: entity.text.value,
      tokensUsed: entity.tokensUsed,
      model: entity.model,
      finishReason: entity.finishReason,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiCompletion.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CompletionIdVO): Promise<void> {
    await this.prisma.aiCompletion.delete({ where: { id: id.value } });
  }

  async findByPromptId(promptId: PromptIdVO): Promise<readonly CompletionEntity[]> {
    const rows = await this.prisma.aiCompletion.findMany({
      where: { promptId: promptId.value },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByModel(model: string): Promise<readonly CompletionEntity[]> {
    const rows = await this.prisma.aiCompletion.findMany({
      where: { model },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findComplete(): Promise<readonly CompletionEntity[]> {
    const rows = await this.prisma.aiCompletion.findMany({
      where: { finishReason: 'stop' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
