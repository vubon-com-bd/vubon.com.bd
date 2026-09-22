import { Injectable } from '@nestjs/common';
import { Category as PrismaCategory } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CategoryEntity } from '../../../../domain/entities/category.entity';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo';
import { CategoryNameVO } from '../../../../domain/value-objects/primitives/category-name.vo';
import { CategorySlugVO } from '../../../../domain/value-objects/primitives/category-slug.vo';
import { CategoryPathVO } from '../../../../domain/value-objects/primitives/category-path.vo';
import type { CategoryRepository } from '../../../../domain/repositories/category.repository.interface';

@Injectable()
export class CategoryPrismaRepository
  extends BasePrismaRepository<CategoryEntity, CategoryIdVO>
  implements CategoryRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCategory): CategoryEntity {
    return CategoryEntity.reconstitute(
      CategoryIdVO.create(raw.id),
      {
        name: CategoryNameVO.create(raw.name),
        slug: CategorySlugVO.create(raw.slug),
        path: CategoryPathVO.create(raw.path),
        parentId: raw.parentId ? CategoryIdVO.create(raw.parentId) : null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: CategoryIdVO): Promise<CategoryEntity | null> {
    const raw = await this.prisma.category.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CategoryEntity[]> {
    const rows = await this.prisma.category.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CategoryEntity): Promise<CategoryEntity> {
    const data = {
      name: entity.name.value,
      slug: entity.slug.value,
      path: entity.path.value,
      parentId: entity.parentId?.value ?? null,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.category.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CategoryIdVO): Promise<void> {
    await this.prisma.category.delete({ where: { id: id.value } });
  }

  async findBySlug(slug: CategorySlugVO): Promise<CategoryEntity | null> {
    const raw = await this.prisma.category.findUnique({ where: { slug: slug.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async existsBySlug(slug: CategorySlugVO): Promise<boolean> {
    const count = await this.prisma.category.count({ where: { slug: slug.value } });
    return count > 0;
  }

  async findRoots(): Promise<readonly CategoryEntity[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByParent(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId: parentId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDescendants(categoryId: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId: categoryId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
