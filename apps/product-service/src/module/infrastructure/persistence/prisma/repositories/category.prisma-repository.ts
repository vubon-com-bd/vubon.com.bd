/**
 * CategoryPrismaRepository
 */
import { Injectable } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import { BasePrismaRepository, type PrismaDelegate } from '@vubon/shared-kernel/prisma';
import { CategoryEntity } from '../../../../domain/entities/category.entity.js';
import type {
  CategoryRepository,
  CategoryTreeNode,
} from '../../../../domain/repositories/category.repository.interface.js';
import { CategoryIdVO } from '../../../../domain/value-objects/primitives/category-id.vo.js';
import { CategoryNameVO } from '../../../../domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../../../../domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../../../../domain/value-objects/primitives/category-path.vo.js';

interface PrismaCategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  path: string[];
  depth: number;
  status: string;
  imageUrl: string | null;
  iconUrl: string | null;
  sortOrder: number;
  productCount: number;
  isFeatured: boolean;
  hasChildren: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class CategoryPrismaRepository
  extends BasePrismaRepository<CategoryEntity, PrismaCategoryRow, string>
  implements CategoryRepository
{
  protected readonly model: PrismaDelegate<PrismaCategoryRow>;

  constructor(private readonly prismaService: PrismaService) {
    super();
    const client = this.prismaService as unknown as { category: PrismaDelegate<PrismaCategoryRow> };
    this.model = client.category;
  }

  private get client(): PrismaClient {
    return this.prismaService as unknown as PrismaClient;
  }

  protected toDomain(raw: PrismaCategoryRow): CategoryEntity {
    return CategoryEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        name: CategoryNameVO.reconstitute(raw.name),
        slug: CategorySlugVO.reconstitute(raw.slug),
        description: raw.description ?? undefined,
        parentId: raw.parentId ? CategoryIdVO.reconstitute(raw.parentId) : undefined,
        path: CategoryPathVO.reconstitute(raw.path),
        status: raw.status,
        imageUrl: raw.imageUrl ?? undefined,
        iconUrl: raw.iconUrl ?? undefined,
        sortOrder: raw.sortOrder,
        productCount: raw.productCount,
        isFeatured: raw.isFeatured,
        hasChildren: raw.hasChildren,
      },
    });
  }

  protected toPersistence(domain: CategoryEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      slug: domain.slug.value,
      description: domain.description ?? null,
      parentId: domain.parentId?.value ?? null,
      path: [...domain.path.value],
      depth: domain.depth,
      status: domain.status,
      imageUrl: domain.imageUrl ?? null,
      iconUrl: domain.iconUrl ?? null,
      sortOrder: domain.sortOrder,
      productCount: domain.productCount,
      isFeatured: domain.isFeatured,
      hasChildren: domain.hasChildren,
      deletedAt: domain.deletedAt ? new Date(domain.deletedAt) : null,
    };
  }

  protected idOf(domain: CategoryEntity): string { return domain.id; }
  protected whereForId(id: string): Record<string, unknown> { return { id }; }

  async findByIdVO(id: CategoryIdVO): Promise<CategoryEntity | null> {
    return this.findById(id.value);
  }

  async findBySlug(slug: CategorySlugVO): Promise<CategoryEntity | null> {
    const raw = await this.client.category.findUnique({ where: { slug: slug.value } });
    return raw ? this.toDomain(raw as unknown as PrismaCategoryRow) : null;
  }

  async existsBySlug(slug: CategorySlugVO): Promise<boolean> {
    const count = await this.client.category.count({ where: { slug: slug.value } });
    return count > 0;
  }

  async findRoots(): Promise<readonly CategoryEntity[]> {
    const rows = await this.client.category.findMany({
      where: { parentId: null, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaCategoryRow));
  }

  async findByParentId(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const rows = await this.client.category.findMany({
      where: { parentId: parentId.value, deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaCategoryRow));
  }

  async findChildren(parentId: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    return this.findByParentId(parentId);
  }

  async hasChildren(categoryId: CategoryIdVO): Promise<boolean> {
    const count = await this.client.category.count({
      where: { parentId: categoryId.value, deletedAt: null },
    });
    return count > 0;
  }

  async findDescendants(categoryId: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const rows = await this.client.category.findMany({
      where: { path: { has: categoryId.value }, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaCategoryRow));
  }

  async findAncestors(categoryId: CategoryIdVO): Promise<readonly CategoryEntity[]> {
    const category = await this.findById(categoryId.value);
    if (!category) return [];
    const pathIds = category.path.value;
    if (pathIds.length === 0) return [];
    const rows = await this.client.category.findMany({
      where: { id: { in: [...pathIds] }, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaCategoryRow));
  }

  async findTree(): Promise<readonly CategoryTreeNode[]> {
    const all = await this.client.category.findMany({
      where: { deletedAt: null },
      orderBy: { sortOrder: 'asc' },
    });
    const entities = all.map((r) => this.toDomain(r as unknown as PrismaCategoryRow));

    const buildNode = (parentId: string | undefined): CategoryTreeNode[] => {
      return entities
        .filter((c) => (parentId === undefined ? c.parentId === undefined : c.parentId?.value === parentId))
        .map((cat) => ({
          category: cat,
          children: buildNode(cat.id),
        }));
    };
    return buildNode(undefined);
  }

  async findActive(): Promise<readonly CategoryEntity[]> {
    const rows = await this.client.category.findMany({
      where: { status: 'active', deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaCategoryRow));
  }

  async findByPath(path: readonly string[]): Promise<readonly CategoryEntity[]> {
    const rows = await this.client.category.findMany({
      where: { path: { hasEvery: [...path] }, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r as unknown as PrismaCategoryRow));
  }

  async findByIds(ids: readonly string[]): Promise<readonly CategoryEntity[]> {
    const rows = await this.client.category.findMany({ where: { id: { in: [...ids] } } });
    return rows.map((r) => this.toDomain(r as unknown as PrismaCategoryRow));
  }
}
