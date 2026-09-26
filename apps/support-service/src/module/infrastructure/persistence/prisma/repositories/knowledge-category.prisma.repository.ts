/**
 * KnowledgeCategoryPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { KnowledgeCategoryRepository } from '../../../../domain/repositories/knowledge-category.repository.interface';
import { KnowledgeCategoryEntity } from '../../../../domain/entities/knowledge-category.entity';
import { TicketCategoryIdVO } from '../../../../domain/value-objects/primitives/ticket-category-id.vo';
import { KnowledgeCategoryMapper } from '../mappers/knowledge-category.mapper';

@Injectable()
export class KnowledgeCategoryPrismaRepository
  implements KnowledgeCategoryRepository
{
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: KnowledgeCategoryMapper,
  ) {}

  async findById(id: TicketCategoryIdVO): Promise<KnowledgeCategoryEntity | null> {
    const raw = await this.prisma.knowledgeCategory.findUnique({
      where: { id: id.value },
    });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly KnowledgeCategoryEntity[]> {
    const rows = await this.prisma.knowledgeCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: KnowledgeCategoryEntity): Promise<KnowledgeCategoryEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.knowledgeCategory.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        name: data.name,
        description: data.description,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: TicketCategoryIdVO): Promise<void> {
    await this.prisma.knowledgeCategory.delete({ where: { id: id.value } });
  }

  async exists(id: TicketCategoryIdVO): Promise<boolean> {
    const count = await this.prisma.knowledgeCategory.count({
      where: { id: id.value },
    });
    return count > 0;
  }

  async findActive(): Promise<readonly KnowledgeCategoryEntity[]> {
    const rows = await this.prisma.knowledgeCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findBySlug(slug: string): Promise<KnowledgeCategoryEntity | null> {
    const raw = await this.prisma.knowledgeCategory.findUnique({ where: { slug } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findRoots(): Promise<readonly KnowledgeCategoryEntity[]> {
    const rows = await this.prisma.knowledgeCategory.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findChildren(parentId: TicketCategoryIdVO): Promise<readonly KnowledgeCategoryEntity[]> {
    const rows = await this.prisma.knowledgeCategory.findMany({
      where: { parentId: parentId.value },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
