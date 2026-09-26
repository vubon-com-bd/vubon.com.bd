/**
 * KnowledgeArticlePrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { KnowledgeArticleRepository } from '../../../../domain/repositories/knowledge-article.repository.interface';
import { KnowledgeArticleEntity } from '../../../../domain/entities/knowledge-article.entity';
import { KnowledgeArticleIdVO } from '../../../../domain/value-objects/primitives/knowledge-article-id.vo';
import { KnowledgeStatusVO } from '../../../../domain/value-objects/primitives/knowledge-status.vo';
import { TicketCategoryIdVO } from '../../../../domain/value-objects/primitives/ticket-category-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { KnowledgeArticleMapper } from '../mappers/knowledge-article.mapper';

@Injectable()
export class KnowledgeArticlePrismaRepository
  implements KnowledgeArticleRepository
{
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: KnowledgeArticleMapper,
  ) {}

  async findById(id: KnowledgeArticleIdVO): Promise<KnowledgeArticleEntity | null> {
    const raw = await this.prisma.knowledgeArticle.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: KnowledgeArticleEntity): Promise<KnowledgeArticleEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.knowledgeArticle.upsert({
      where: { id: data.id },
      create: { ...data, tags: [...data.tags] },
      update: {
        title: data.title,
        body: data.body,
        status: data.status,
        tags: [...data.tags],
        viewCount: data.viewCount,
        helpfulCount: data.helpfulCount,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: KnowledgeArticleIdVO): Promise<void> {
    await this.prisma.knowledgeArticle.delete({ where: { id: id.value } });
  }

  async exists(id: KnowledgeArticleIdVO): Promise<boolean> {
    const count = await this.prisma.knowledgeArticle.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findPublished(): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      where: { status: 'published' },
      orderBy: { viewCount: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByCategory(categoryId: TicketCategoryIdVO): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      where: { categoryId: categoryId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: KnowledgeStatusVO): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      where: { status: status.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByAuthor(authorId: UserIdVO): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      where: { authorId: authorId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByTag(tag: string): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      where: { tags: { has: tag } },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async searchByKeyword(keyword: string): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      where: {
        OR: [
          { title: { contains: keyword, mode: 'insensitive' } },
          { body: { contains: keyword, mode: 'insensitive' } },
        ],
      },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findMostViewed(limit: number): Promise<readonly KnowledgeArticleEntity[]> {
    const rows = await this.prisma.knowledgeArticle.findMany({
      orderBy: { viewCount: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
