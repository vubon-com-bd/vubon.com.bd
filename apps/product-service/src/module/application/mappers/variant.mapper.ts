import { ProductVariantEntity } from '../../domain/entities/product-variant.entity';
import type { VariantResponseDTO } from '../dtos/responses/variant-response.dto';

export class VariantMapper {
  static toResponse(entity: ProductVariantEntity): VariantResponseDTO {
    return {
      id: entity.id.value,
      productId: entity.productId.value,
      name: entity.name.value,
      sku: entity.sku.value,
      price: entity.price.value,
      isDefault: entity.isDefault,
    } as unknown as VariantResponseDTO;
  }
}
