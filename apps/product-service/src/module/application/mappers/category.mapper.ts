/**
 * CategoryMapper
 */
import { CategoryEntity } from '../../domain/entities/category.entity.js';
import type { CategoryResponseDTO, CategoryTreeResponseDTO } from '../dtos/responses/category-response.dto.js';
import type { CategoryId, Slug, Url } from '@vubon/shared-types/common';
import type { CategoryTreeNode } from '../../domain/repositories/category.repository.interface.js';

export class CategoryMapper {
  static toResponse(c: CategoryEntity): CategoryResponseDTO {
    return {
      id: c.id as CategoryId,
      name: c.name.value,
      slug: c.slug.value as Slug,
      description: c.description,
      parentId: c.parentId?.value as CategoryId | undefined,
      path: c.path.value as readonly CategoryId[],
      depth: c.depth,
      status: c.status,
      imageUrl: c.imageUrl as Url | undefined,
      iconUrl: c.iconUrl as Url | undefined,
      sortOrder: c.sortOrder,
      productCount: c.productCount,
      isFeatured: c.isFeatured,
      hasChildren: c.hasChildren,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  }

  static toResponseList(categories: readonly CategoryEntity[]): readonly CategoryResponseDTO[] {
    return categories.map((c) => CategoryMapper.toResponse(c));
  }

  static toTree(nodes: readonly CategoryTreeNode[]): readonly CategoryTreeResponseDTO[] {
    return nodes.map((n) => ({
      ...CategoryMapper.toResponse(n.category),
      children: CategoryMapper.toTree(n.children),
    }));
  }
}
