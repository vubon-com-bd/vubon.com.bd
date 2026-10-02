/**
 * CategoryService
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ICategoryService } from '../interfaces/category.service.interface.js';
import { CATEGORY_REPOSITORY, type CategoryRepository } from '../../../domain/repositories/category.repository.interface.js';
import { CategoryEntity } from '../../../domain/entities/category.entity.js';
import { CategoryNameVO } from '../../../domain/value-objects/primitives/category-name.vo.js';
import { CategorySlugVO } from '../../../domain/value-objects/primitives/category-slug.vo.js';
import { CategoryPathVO } from '../../../domain/value-objects/primitives/category-path.vo.js';
import { CategoryIdVO } from '../../../domain/value-objects/primitives/category-id.vo.js';
import { CategoryMapper } from '../../mappers/category.mapper.js';
import { CATEGORY_STATUS } from '@vubon/shared-constants/business/product';
import type { CreateCategoryRequestDTO } from '../../dtos/requests/category/create-category.dto.js';
import type { UpdateCategoryRequestDTO } from '../../dtos/requests/category/update-category.dto.js';
import type { CategoryResponseDTO, CategoryTreeResponseDTO } from '../../dtos/responses/category-response.dto.js';
import { CategoryNotFoundApplicationError, CategorySlugConflictError } from '../../errors/category.errors.js';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(@Inject(CATEGORY_REPOSITORY) private readonly categoryRepo: CategoryRepository) {}

  async create(dto: CreateCategoryRequestDTO, actorId: string): Promise<CategoryResponseDTO> {
    const slug = CategorySlugVO.create(dto.slug);
    if (await this.categoryRepo.existsBySlug(slug)) throw new CategorySlugConflictError(dto.slug);

    let parentPath = CategoryPathVO.root();
    let parentIdVO: CategoryIdVO | undefined;
    if (dto.parentId) {
      const parent = await this.categoryRepo.findById(dto.parentId);
      if (!parent) throw new CategoryNotFoundApplicationError(dto.parentId);
      parentPath = parent.path;
      parentIdVO = parent.toIdVO();
      parent.markHasChildren(true);
      await this.categoryRepo.save(parent);
    }

    const newId = randomUUID();
    const fullPath = parentIdVO ? parentPath.append(newId) : CategoryPathVO.create([newId]);
    const now = new Date().toISOString();
    const category = CategoryEntity.create({
      id: newId,
      now,
      props: {
        name: CategoryNameVO.create(dto.name),
        slug,
        description: dto.description,
        parentId: parentIdVO,
        path: fullPath,
        status: CATEGORY_STATUS.ACTIVE,
        imageUrl: dto.imageUrl,
        sortOrder: dto.sortOrder ?? 0,
        productCount: 0,
        isFeatured: false,
        hasChildren: false,
      },
    });
    await this.categoryRepo.save(category);
    void actorId;
    return CategoryMapper.toResponse(category);
  }

  async update(dto: UpdateCategoryRequestDTO, actorId: string): Promise<CategoryResponseDTO> {
    const category = await this.categoryRepo.findById(dto.categoryId);
    if (!category) throw new CategoryNotFoundApplicationError(dto.categoryId);
    if (dto.name !== undefined) {
      category.rename(CategoryNameVO.create(dto.name), category.slug, actorId);
    }
    category.updateMedia({
      imageUrl: dto.imageUrl,
      description: dto.description,
      sortOrder: dto.sortOrder,
      isFeatured: dto.isFeatured,
    }, actorId);
    await this.categoryRepo.save(category);
    return CategoryMapper.toResponse(category);
  }

  async remove(categoryId: string, actorId: string): Promise<void> {
    const category = await this.categoryRepo.findById(categoryId);
    if (!category) throw new CategoryNotFoundApplicationError(categoryId);
    category.softDelete(actorId);
    await this.categoryRepo.save(category);
  }

  async move(categoryId: string, newParentId: string | null, actorId: string): Promise<CategoryResponseDTO> {
    const category = await this.categoryRepo.findById(categoryId);
    if (!category) throw new CategoryNotFoundApplicationError(categoryId);
    let newParentIdVO: CategoryIdVO | undefined;
    let newParentPath = CategoryPathVO.root();
    if (newParentId) {
      const parent = await this.categoryRepo.findById(newParentId);
      if (!parent) throw new CategoryNotFoundApplicationError(newParentId);
      newParentIdVO = parent.toIdVO();
      newParentPath = parent.path;
    }
    category.moveTo({ newParentId: newParentIdVO, newParentPath, changedBy: actorId });
    await this.categoryRepo.save(category);
    return CategoryMapper.toResponse(category);
  }

  async activate(categoryId: string, actorId: string): Promise<CategoryResponseDTO> {
    const c = await this.categoryRepo.findById(categoryId);
    if (!c) throw new CategoryNotFoundApplicationError(categoryId);
    c.activate(actorId);
    await this.categoryRepo.save(c);
    return CategoryMapper.toResponse(c);
  }

  async deactivate(categoryId: string, actorId: string): Promise<CategoryResponseDTO> {
    const c = await this.categoryRepo.findById(categoryId);
    if (!c) throw new CategoryNotFoundApplicationError(categoryId);
    c.deactivate(actorId);
    await this.categoryRepo.save(c);
    return CategoryMapper.toResponse(c);
  }

  async getTree(): Promise<readonly CategoryTreeResponseDTO[]> {
    const tree = await this.categoryRepo.findTree();
    return CategoryMapper.toTree(tree);
  }

  async getById(categoryId: string): Promise<CategoryResponseDTO | null> {
    const c = await this.categoryRepo.findById(categoryId);
    return c ? CategoryMapper.toResponse(c) : null;
  }

  async getBySlug(slug: string): Promise<CategoryResponseDTO | null> {
    const c = await this.categoryRepo.findBySlug(CategorySlugVO.create(slug));
    return c ? CategoryMapper.toResponse(c) : null;
  }
}
