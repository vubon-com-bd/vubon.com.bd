/**
 * CategoryMapper — Entity → Response DTO
 * @module product-service/application/mappers
 */
import type { CategoryEntity } from '../../domain/entities/category.entity.js';
import type { CategoryStatusValue } from '@vubon/shared-types/business/product';
import type {
  CategoryResponseDTO,
  CategoryPublicResponseDTO,
  CategorySummaryResponseDTO,
  CategoryListResponseDTO,
  CategoryTreeNodeDTO,
  CategoryTreeResponseDTO,
  CategoryStatsResponseDTO,
} from '../dtos/responses/category-response.dto.js';

export class CategoryMapper {
  static toResponse(entity: CategoryEntity): CategoryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      description: vo.description,
      parentId: vo.parentId?.value,
      path: [...vo.path.value],
      depth: vo.depth,
      status: vo.status as CategoryStatusValue,
      imageUrl: vo.imageUrl,
      iconUrl: vo.iconUrl,
      sortOrder: vo.sortOrder,
      productCount: vo.productCount,
      isFeatured: vo.isFeatured,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: CategoryEntity): CategoryPublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      parentId: vo.parentId?.value,
      imageUrl: vo.imageUrl,
      productCount: vo.productCount,
    };
  }

  static toSummary(entity: CategoryEntity): CategorySummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      depth: vo.depth,
      productCount: vo.productCount,
    };
  }

  static toListResponse(
    entities: readonly CategoryEntity[],
    total: number,
    page: number,
    limit: number,
  ): CategoryListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toTreeNode(entity: CategoryEntity, children: readonly CategoryTreeNodeDTO[]): CategoryTreeNodeDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      slug: vo.slug.value,
      imageUrl: vo.imageUrl,
      productCount: vo.productCount,
      children,
    };
  }

  static toTreeResponse(
    roots: readonly CategoryTreeNodeDTO[],
    totalNodes: number,
    maxDepth: number,
  ): CategoryTreeResponseDTO {
    return { roots, totalNodes, maxDepth };
  }

  static toStatsResponse(stats: {
    total: number;
    activeCount: number;
    rootCount: number;
    maxDepth: number;
    totalProducts: number;
    byDepth: Readonly<Record<number, number>>;
  }): CategoryStatsResponseDTO {
    return { ...stats };
  }
}
