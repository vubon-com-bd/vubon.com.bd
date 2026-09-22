import { ProductEntity } from '../../domain/entities/product.entity';
import type { ProductResponseDTO } from '../dtos/responses/product-response.dto';

export class ProductMapper {
  static toResponse(entity: ProductEntity): ProductResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.slug.value,
      sku: entity.sku.value,
      status: entity.status.value,
      type: entity.type.value,
      vendorId: entity.vendorId.value,
      categoryId: entity.categoryId?.value ?? null,
      brandId: entity.brandId?.value ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as ProductResponseDTO;
  }

  static toListResponse(
    entities: readonly ProductEntity[],
  ): readonly ProductResponseDTO[] {
    return entities.map((e) => ProductMapper.toResponse(e));
  }
}
