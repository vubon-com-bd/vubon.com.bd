import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CategoryEntity } from '../../../domain/entities/category.entity';
import type { CreateCategoryRequestDTO } from '../../dtos/requests/category/create-category.dto';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto';

export interface CategoryServiceInterface
  extends BaseServiceInterface<CategoryEntity, string> {
  create(input: CreateCategoryRequestDTO): Promise<CategoryResponseDTO>;
  update(categoryId: string, name?: string, parentId?: string | null): Promise<CategoryResponseDTO>;
  delete(categoryId: string): Promise<void>;
  findById(categoryId: string): Promise<CategoryResponseDTO | null>;
  findBySlug(slug: string): Promise<CategoryResponseDTO | null>;
  list(): Promise<readonly CategoryResponseDTO[]>;
  getTree(): Promise<readonly CategoryResponseDTO[]>;
}
