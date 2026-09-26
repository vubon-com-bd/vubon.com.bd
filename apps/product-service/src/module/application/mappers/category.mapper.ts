import { CategoryEntity } from '../../domain/entities/category.entity';
import type { CategoryResponseDTO } from '../dtos/responses/category-response.dto';

export class CategoryMapper {
  static toResponse(entity: CategoryEntity): CategoryResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.slug.value,
      path: entity.path.value,
      parentId: entity.parentId?.value ?? null,
    } as unknown as CategoryResponseDTO;
  }
}
