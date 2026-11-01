/**
 * CategoryService — orchestrates category use cases
 * @module product-service/application/services/impl
 *
 * Real business logic:
 *  - Depth validation on create/move
 *  - Circular reference prevention
 *  - Tree assembly
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  CATEGORY_REPOSITORY,
  type CategoryRepository,
  type CategoryListFilter,
  type CategoryListOptions,
} from '../../../domain/repositories/category.repository.interface.js';
import { CategoryEntity } from '../../../domain/entities/category.entity.js';
import { CategoryVO } from '../../../domain/value-objects/composites/category.vo.js';
import { CategoryIdVO } from '../../../domain/value-objects/primitives/category-id.vo.js';
import { CategoryNameVO } from '../../../domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../../../domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../../../domain/value-objects/primitives/category-path.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CategoryMapper } from '../../mappers/category.mapper.js';
import type {
  ICategoryService,
  CategoryListOptionsDTO,
  CategoryListFilterDTO,
} from '../interfaces/category.service.interface.js';
import {
  CategoryNotFoundApplicationError,
  CategoryCreateError,
  CategoryUpdateError,
  CategorySlugConflictApplicationError,
  CategoryDepthExceededApplicationError,
} from '../../errors/category.errors.js';
import type {
  CreateCategoryRequestDTO,
  UpdateCategoryRequestDTO,
  DeleteCategoryRequestDTO,
} from '../../dtos/requests/category/index.js';
import type {
  CategoryResponseDTO,
  CategoryPublicResponseDTO,
  CategorySummaryResponseDTO,
  CategoryListResponseDTO,
  CategoryTreeNodeDTO,
  CategoryTreeResponseDTO,
  CategoryStatsResponseDTO,
} from '../../dtos/responses/category-response.dto.js';

const MAX_DEPTH = 5;

@Injectable()
export class CategoryService implements ICategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repo: CategoryRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async create(dto: CreateCategoryRequestDTO): Promise<CategoryResponseDTO> {
    if (await this.repo.existsBySlug(dto.slug)) {
      throw new CategorySlugConflictApplicationError(dto.slug);
    }

    // ─── Parent + path resolution ───
    let parentId: CategoryIdVO | undefined;
    let path: CategoryPathVO;

    if (dto.parentId) {
      const parent = await this.load(dto.parentId);
      parentId = parent.categoryId;
      const childPath = parent.path.append(parent.id);
      if (childPath.depth > MAX_DEPTH) {
        throw new CategoryDepthExceededApplicationError(MAX_DEPTH, childPath.depth);
      }
      path = childPath;
    } else {
      const id = randomUUID();
      path = CategoryPathVO.create([id]);
    }

    const now = new Date().toISOString();
    const id = parentId ? randomUUID() : path.leafId!;

    try {
      const vo = CategoryVO.create({
        id: CategoryIdVO.create(id),
        name: CategoryNameVO.create(dto.name),
        slug: CategorySlugVO.create(dto.slug),
        description: dto.description,
        parentId,
        path,
        status: 'active',
        imageUrl: dto.imageUrl,
        iconUrl: dto.iconUrl,
        sortOrder: dto.sortOrder ?? 0,
        productCount: 0,
        isFeatured: dto.isFeatured ?? false,
      });

      const entity = CategoryEntity.create({ id, vo, now });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);

      this.logger.log(`Category "${saved.name.value}" (${saved.id}) created at depth ${saved.depth}`);
      return CategoryMapper.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CategoryCreateError(msg);
    }
  }

  async update(dto: UpdateCategoryRequestDTO): Promise<CategoryResponseDTO> {
    const entity = await this.load(dto.categoryId);
    const current = entity.vo.value;

    const nextVo = CategoryVO.create({
      ...current,
      name: dto.name ? CategoryNameVO.create(dto.name) : current.name,
      description: dto.description !== undefined ? dto.description : current.description,
      imageUrl: dto.imageUrl !== undefined ? dto.imageUrl : current.imageUrl,
      iconUrl: dto.iconUrl !== undefined ? dto.iconUrl : current.iconUrl,
      status: dto.status ?? current.status,
      sortOrder: dto.sortOrder ?? current.sortOrder,
      isFeatured: dto.isFeatured ?? current.isFeatured,
    });

    try {
      const updated = CategoryEntity.reconstitute({
        id: entity.id,
        createdAt: entity.createdAt,
        updatedAt: new Date().toISOString(),
        vo: nextVo,
        version: entity.version,
      });

      const saved = await this.repo.save(updated);
      await this.eventBridge.publishFromEntity(saved);
      this.logger.log(`Category ${saved.id} updated`);
      return CategoryMapper.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CategoryUpdateError(dto.categoryId, msg);
    }
  }

  async delete(
    dto: DeleteCategoryRequestDTO,
  ): Promise<{ readonly success: true; readonly categoryId: string }> {
    const entity = await this.load(dto.categoryId);

    try {
      entity.delete(dto.actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CategoryUpdateError(dto.categoryId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Category ${saved.id} deleted`);
    return { success: true, categoryId: saved.id };
  }

  async move(
    categoryId: string,
    newParentId?: string,
    _actorId?: string,
  ): Promise<CategoryResponseDTO> {
    const entity = await this.load(categoryId);

    let newParent: CategoryEntity | undefined;
    if (newParentId) {
      newParent = await this.load(newParentId);
      if (newParent.path.depth + 1 > MAX_DEPTH) {
        throw new CategoryDepthExceededApplicationError(MAX_DEPTH, newParent.path.depth + 1);
      }
    }

    try {
      entity.moveTo(newParent?.categoryId, newParent?.path);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CategoryUpdateError(categoryId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Category ${saved.id} moved to parent ${newParentId ?? 'root'}`);
    return CategoryMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<CategoryResponseDTO> {
    const entity = await this.load(id);
    return CategoryMapper.toResponse(entity);
  }

  async getBySlug(slug: string): Promise<CategoryResponseDTO> {
    const entity = await this.repo.findBySlug(slug);
    if (!entity) throw new CategoryNotFoundApplicationError(slug);
    return CategoryMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<CategoryPublicResponseDTO> {
    const entity = await this.load(id);
    return CategoryMapper.toPublicResponse(entity);
  }

  async list(options: CategoryListOptionsDTO): Promise<CategoryListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as CategoryListFilter | undefined,
    } as CategoryListOptions);
    return CategoryMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async listRoots(): Promise<readonly CategorySummaryResponseDTO[]> {
    const entities = await this.repo.findRoots();
    return entities.map((e) => CategoryMapper.toSummary(e));
  }

  async listChildren(parentId: string): Promise<readonly CategorySummaryResponseDTO[]> {
    const entities = await this.repo.findChildren(CategoryIdVO.create(parentId));
    return entities.map((e) => CategoryMapper.toSummary(e));
  }

  async getTree(rootId?: string): Promise<CategoryTreeResponseDTO> {
    const all = rootId
      ? await this.repo.findDescendants([rootId])
      : await this.repo.loadTree();

    // Group by parentId
    const grouped = new Map<string | undefined, CategoryEntity[]>();
    for (const c of all) {
      const parent = c.parentId?.value;
      if (!grouped.has(parent)) grouped.set(parent, []);
      grouped.get(parent)!.push(c);
    }

    const buildNodes = (parentId: string | undefined): CategoryTreeNodeDTO[] => {
      const children = grouped.get(parentId) ?? [];
      return children.map((c) =>
        CategoryMapper.toTreeNode(c, buildNodes(c.id)),
      );
    };

    const roots = rootId
      ? buildNodes(rootId)
      : buildNodes(undefined);

    let totalNodes = 0;
    let maxDepth = 0;
    const walk = (nodes: readonly CategoryTreeNodeDTO[]): void => {
      for (const n of nodes) {
        totalNodes++;
        maxDepth = Math.max(maxDepth, 1 + (n.children.length > 0 ? 0 : 0));
        walk(n.children);
      }
    };
    walk(roots);

    return CategoryMapper.toTreeResponse(roots, totalNodes, maxDepth);
  }

  async getStats(filter?: CategoryListFilterDTO): Promise<CategoryStatsResponseDTO> {
    const stats = await this.repo.getStats(filter as CategoryListFilter | undefined);
    return CategoryMapper.toStatsResponse(stats);
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<CategoryEntity> {
    const vo = CategoryIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new CategoryNotFoundApplicationError(id);
    return entity;
  }
}
