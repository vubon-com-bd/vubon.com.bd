/**
 * ICategoryService — contract
 * @module product-service/application/services/interfaces
 */
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
  CategoryTreeResponseDTO,
  CategoryStatsResponseDTO,
} from '../../dtos/responses/category-response.dto.js';

export const CATEGORY_SERVICE = Symbol('CATEGORY_SERVICE');

export interface CategoryListFilterDTO {
  readonly status?: string | readonly string[];
  readonly parentId?: string;
  readonly depth?: number;
  readonly isFeatured?: boolean;
  readonly hasProducts?: boolean;
  readonly search?: string;
}

export interface CategoryListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'name' | 'sortOrder' | 'createdAt' | 'productCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CategoryListFilterDTO;
}

export interface ICategoryService {
  // Commands
  create(dto: CreateCategoryRequestDTO): Promise<CategoryResponseDTO>;
  update(dto: UpdateCategoryRequestDTO): Promise<CategoryResponseDTO>;
  delete(dto: DeleteCategoryRequestDTO): Promise<{ readonly success: true; readonly categoryId: string }>;
  move(categoryId: string, newParentId?: string, actorId?: string): Promise<CategoryResponseDTO>;

  // Queries
  getById(id: string): Promise<CategoryResponseDTO>;
  getBySlug(slug: string): Promise<CategoryResponseDTO>;
  getPublic(id: string): Promise<CategoryPublicResponseDTO>;
  list(options: CategoryListOptionsDTO): Promise<CategoryListResponseDTO>;
  listRoots(): Promise<readonly CategorySummaryResponseDTO[]>;
  listChildren(parentId: string): Promise<readonly CategorySummaryResponseDTO[]>;
  getTree(rootId?: string): Promise<CategoryTreeResponseDTO>;
  getStats(filter?: CategoryListFilterDTO): Promise<CategoryStatsResponseDTO>;
}
