import { Injectable } from '@nestjs/common';
import { Faq as PrismaFaq } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { FaqEntity } from '../../../../domain/entities/faq.entity';
import { FaqIdVO } from '../../../../domain/value-objects/primitives/faq-id.vo';
import { FaqQuestionVO } from '../../../../domain/value-objects/primitives/faq-question.vo';
import { FaqAnswerVO } from '../../../../domain/value-objects/primitives/faq-answer.vo';
import { FaqStatusVO } from '../../../../domain/value-objects/primitives/faq-status.vo';
import type { FaqRepository } from '../../../../domain/repositories/faq.repository.interface';

@Injectable()
export class FaqPrismaRepository
  extends BasePrismaRepository<FaqEntity, FaqIdVO>
  implements FaqRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaFaq): FaqEntity {
    return FaqEntity.reconstitute(
      FaqIdVO.create(raw.id),
      {
        question: FaqQuestionVO.create(raw.question),
        answer: FaqAnswerVO.create(raw.answer),
        status: FaqStatusVO.create(raw.status),
        categoryId: raw.categoryId,
        keywords: raw.keywords,
        viewCount: raw.viewCount,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: FaqIdVO): Promise<FaqEntity | null> {
    const raw = await this.prisma.faq.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: FaqEntity): Promise<FaqEntity> {
    const data = {
      question: entity.question.value,
      answer: entity.answer.value,
      status: entity.status.value,
      categoryId: entity.categoryId,
      keywords: [...entity.keywords],
      viewCount: entity.viewCount,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.faq.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: FaqIdVO): Promise<void> {
    await this.prisma.faq.delete({ where: { id: id.value } });
  }

  async findPublished(): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({ where: { status: 'published' } });
    return rows.map((r) => this.toDomain(r));
  }

  async searchByKeyword(keyword: string): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({
      where: {
        OR: [
          { question: { contains: keyword, mode: 'insensitive' } },
          { answer: { contains: keyword, mode: 'insensitive' } },
          { keywords: { has: keyword } },
        ],
      },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByCategory(categoryId: string): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({ where: { categoryId } });
    return rows.map((r) => this.toDomain(r));
  }
}
