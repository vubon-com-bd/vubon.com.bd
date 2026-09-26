/**
 * FaqCategoryPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { FaqCategoryRepository } from '../../../../domain/repositories/faq-category.repository.interface';
import { FaqCategoryEntity } from '../../../../domain/entities/faq-category.entity';
import { TicketCategoryIdVO } from '../../../../domain/value-objects/primitives/ticket-category-id.vo';
import { FaqCategoryMapper } from '../mappers/faq-category.mapper';

@Injectable()
export class FaqCategoryPrismaRepository implements FaqCategoryRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: FaqCategoryMapper,
  ) {}

  async findById(id: TicketCategoryIdVO): Promise<FaqCategoryEntity | null> {
    const raw = await this.prisma.faqCategory.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FaqCategoryEntity[]> {
    const rows = await this.prisma.faqCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: FaqCategoryEntity): Promise<FaqCategoryEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.faqCategory.upsert({
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
    await this.prisma.faqCategory.delete({ where: { id: id.value } });
  }

  async exists(id: TicketCategoryIdVO): Promise<boolean> {
    const count = await this.prisma.faqCategory.count({ where: { id: id.value } });
    return count > 0;
  }

  async findActive(): Promise<readonly FaqCategoryEntity[]> {
    const rows = await this.prisma.faqCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findBySlug(slug: string): Promise<FaqCategoryEntity | null> {
    const raw = await this.prisma.faqCategory.findUnique({ where: { slug } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findRoots(): Promise<readonly FaqCategoryEntity[]> {
    const rows = await this.prisma.faqCategory.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findChildren(parentId: TicketCategoryIdVO): Promise<readonly FaqCategoryEntity[]> {
    const rows = await this.prisma.faqCategory.findMany({
      where: { parentId: parentId.value },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
