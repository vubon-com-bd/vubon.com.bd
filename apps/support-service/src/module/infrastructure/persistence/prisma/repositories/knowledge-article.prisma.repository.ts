import { Injectable } from '@nestjs/common';
import { KnowledgeArticle as PrismaKnowledgeArticle } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { KnowledgeArticleEntity } from '../../../../domain/entities/knowledge-article.entity';
import { KnowledgeArticleIdVO } from '../../../../domain/value-objects/primitives/knowledge-article-id.vo';
import { KnowledgeArticleTitleVO } from '../../../../domain/value-objects/primitives/knowledge-article-title.vo';
import { KnowledgeArticleBodyVO } from '../../../../domain/value-objects/primitives/knowledge-article-body.vo';
import { KnowledgeStatusVO } from '../../../../domain/value-objects/primitives/knowledge-status.vo';
import type { KnowledgeArticleRepository } from '../../../../domain/repositories/knowledge-article.repository.interface';

@Injectable()
export class KnowledgeArticlePrismaRepository
  extends BasePrismaRepository<KnowledgeArticleEntity, KnowledgeArticleIdVO>
  implements KnowledgeArticleRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaKnowledgeArticle): KnowledgeArticleEntity {
    return KnowledgeArticleEntity.reconstitute(
      KnowledgeArticleIdVO.create(raw.id),
      {
        title: KnowledgeArticleTitleVO.create(raw.title),
        body: KnowledgeArticleBodyVO.create(raw.body),
        status: KnowledgeStatusVO.create(raw.status),
        categoryId: raw.categoryId,
        tags: raw.tags,
        viewCount: raw.viewCount,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: KnowledgeArticleIdVO): Promise<KnowledgeArticleEntity | null> {
    const raw = await this.prisma.knowledgeArticle.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: KnowledgeArticleEntity): Promise<KnowledgeArticleEntity> {
    const data = {
      title: entity.title.value,
      body: entity.body.value,
      status: entity.status.value,
      categoryId: entity.categoryId,
      tags: [...entity.tags],
      viewCount: entity.viewCount,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.knowledgeArticle.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: KnowledgeArticleIdVO): Promise<void> {
    await this.prisma.knowledgeArticle.delete({ where: { id: id.value } });
  }

  async findPublished(): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      where: { status: 'published' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async searchByKeyword(keyword: string): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { body: { contains: keyword, mode: 'insensitive' } },
          { tags: { has: keyword } },
        ],
      },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByCategory(categoryId: string): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({ where: { categoryId } });
    return rows.map((r) => this.toDomain(r));
  }
}
