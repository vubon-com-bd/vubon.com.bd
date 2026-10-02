/**
 * AttributeMapper
 */
import { ProductAttributeEntity } from '../../domain/entities/product-attribute.entity.js';
import type { AttributeResponseDTO } from '../dtos/responses/attribute-response.dto.js';

export class AttributeMapper {
  static toResponse(a: ProductAttributeEntity): AttributeResponseDTO {
    return {
      id: a.id,
      productId: a.productId,
      name: a.name,
      slug: a.slug,
      type: a.type,
      isRequired: a.isRequired,
      isSearchable: a.isSearchable,
      isFilterable: a.isFilterable,
      unit: a.unit,
      options: a.options ? a.options.map((o) => ({ value: o.value, label: o.label, sortOrder: o.sortOrder })) : undefined,
      value: a.value,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    };
  }

  static toResponseList(attributes: readonly ProductAttributeEntity[]): readonly AttributeResponseDTO[] {
    return attributes.map((a) => AttributeMapper.toResponse(a));
  }
}
