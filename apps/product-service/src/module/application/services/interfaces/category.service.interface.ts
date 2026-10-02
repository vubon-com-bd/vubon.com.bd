/**
 * ICategoryService Interface
 */
import type { CreateCategoryRequestDTO } from '../../dtos/requests/category/create-category.dto.js';
import type { UpdateCategoryRequestDTO } from '../../dtos/requests/category/update-category.dto.js';
import type { CategoryResponseDTO, CategoryTreeResponseDTO } from '../../dtos/responses/category-response.dto.js';

export const CATEGORY_SERVICE = Symbol('CATEGORY_SERVICE');

export interface ICategoryService {
  create(dto: CreateCategoryRequestDTO, actorId: string): Promise<CategoryResponseDTO>;
  update(dto: UpdateCategoryRequestDTO, actorId: string): Promise<CategoryResponseDTO>;
  remove(categoryId: string, actorId: string): Promise<void>;
  move(categoryId: string, newParentId: string | null, actorId: string): Promise<CategoryResponseDTO>;
  activate(categoryId: string, actorId: string): Promise<CategoryResponseDTO>;
  deactivate(categoryId: string, actorId: string): Promise<CategoryResponseDTO>;
  getTree(): Promise<readonly CategoryTreeResponseDTO[]>;
  getById(categoryId: string): Promise<CategoryResponseDTO | null>;
  getBySlug(slug: string): Promise<CategoryResponseDTO | null>;
}
