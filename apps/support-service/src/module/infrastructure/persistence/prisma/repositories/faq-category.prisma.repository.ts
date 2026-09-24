import { Injectable } from '@nestjs/common';
import { FaqCategory as PrismaFaqCategory } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { FaqCategoryEntity } from '../../../../domain/entities/faq-category.entity';
import type { FaqCategoryRepository } from '../../../../domain/repositories/faq-category.repository.interface';

@Injectable()
export class FaqCategoryPrismaRepository
  extends BasePrismaRepository<FaqCategoryEntity, string>
  implements FaqCategoryRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaFaqCategory): FaqCategoryEntity {
    return FaqCategoryEntity.reconstitute(
      raw.id,
      {
        name: raw.name,
        description: raw.description,
        sortOrder: raw.sortOrder,
        isActive: raw.isActive,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<FaqCategoryEntity | null> {
    const raw = await this.prisma.faqCategory.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FaqCategoryEntity[]> {
    const rows = await this.prisma.faqCategory.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: FaqCategoryEntity): Promise<FaqCategoryEntity> {
    const data = {
      name: entity.name,
      description: entity.description,
      sortOrder: entity.sortOrder,
      isActive: entity.isActive,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.faqCategory.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.faqCategory.delete({ where: { id } });
  }

  async findActive(): Promise<readonly FaqCategoryEntity[]> {
    const rows = await this.prisma.faqCategory.findMany({ where: { isActive: true } });
    return rows.map((r) => this.toDomain(r));
  }
}
