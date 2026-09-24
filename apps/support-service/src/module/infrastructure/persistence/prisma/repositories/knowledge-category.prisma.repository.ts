import { Injectable } from '@nestjs/common';
import { KnowledgeCategory as PrismaKnowledgeCategory } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { KnowledgeCategoryEntity } from '../../../../domain/entities/knowledge-category.entity';
import type { KnowledgeCategoryRepository } from '../../../../domain/repositories/knowledge-category.repository.interface';

@Injectable()
export class KnowledgeCategoryPrismaRepository
  extends BasePrismaRepository<KnowledgeCategoryEntity, string>
  implements KnowledgeCategoryRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaKnowledgeCategory): KnowledgeCategoryEntity {
    return KnowledgeCategoryEntity.reconstitute(
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

  async findById(id: string): Promise<KnowledgeCategoryEntity | null> {
    const raw = await this.prisma.knowledgeCategory.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly KnowledgeCategoryEntity[]> {
    const rows = await this.prisma.knowledgeCategory.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: KnowledgeCategoryEntity): Promise<KnowledgeCategoryEntity> {
    const data = {
      name: entity.name,
      description: entity.description,
      sortOrder: entity.sortOrder,
      isActive: entity.isActive,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.knowledgeCategory.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.knowledgeCategory.delete({ where: { id } });
  }

  async findActive(): Promise<readonly KnowledgeCategoryEntity[]> {
    const rows = await this.prisma.knowledgeCategory.findMany({ where: { isActive: true } });
    return rows.map((r) => this.toDomain(r));
  }
}
