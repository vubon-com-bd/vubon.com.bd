/**
 * FaqPrismaRepository
 * @module support-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { SupportPrismaService } from '../prisma.service';
import { FaqRepository } from '../../../../domain/repositories/faq.repository.interface';
import { FaqEntity } from '../../../../domain/entities/faq.entity';
import { FaqIdVO } from '../../../../domain/value-objects/primitives/faq-id.vo';
import { FaqStatusVO } from '../../../../domain/value-objects/primitives/faq-status.vo';
import { TicketCategoryIdVO } from '../../../../domain/value-objects/primitives/ticket-category-id.vo';
import { FaqMapper } from '../mappers/faq.mapper';

@Injectable()
export class FaqPrismaRepository implements FaqRepository {
  constructor(
    private readonly prisma: SupportPrismaService,
    private readonly mapper: FaqMapper,
  ) {}

  async findById(id: FaqIdVO): Promise<FaqEntity | null> {
    const raw = await this.prisma.faq.findUnique({ where: { id: id.value } });
    return raw ? this.mapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async save(entity: FaqEntity): Promise<FaqEntity> {
    const data = this.mapper.toPersistence(entity);
    const raw = await this.prisma.faq.upsert({
      where: { id: data.id },
      create: { ...data },
      update: {
        question: data.question,
        answer: data.answer,
        status: data.status,
        viewCount: data.viewCount,
        helpfulCount: data.helpfulCount,
        updatedAt: new Date(),
      },
    });
    return this.mapper.toDomain(raw);
  }

  async delete(id: FaqIdVO): Promise<void> {
    await this.prisma.faq.delete({ where: { id: id.value } });
  }

  async exists(id: FaqIdVO): Promise<boolean> {
    const count = await this.prisma.faq.count({ where: { id: id.value } });
    return count > 0;
  }

  async findPublished(): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({
      where: { status: 'published' },
      orderBy: { viewCount: 'desc' },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByCategory(categoryId: TicketCategoryIdVO): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({
      where: { categoryId: categoryId.value },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findByStatus(status: FaqStatusVO): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({ where: { status: status.value } });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async searchByKeyword(keyword: string): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({
      where: {
        OR: [
          { question: { contains: keyword, mode: 'insensitive' } },
          { answer: { contains: keyword, mode: 'insensitive' } },
        ],
      },
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }

  async findMostViewed(limit: number): Promise<readonly FaqEntity[]> {
    const rows = await this.prisma.faq.findMany({
      orderBy: { viewCount: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.mapper.toDomain(r));
  }
}
