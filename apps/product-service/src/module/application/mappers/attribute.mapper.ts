/**
 * AttributeMapper — Entity → Response DTO
 * @module product-service/application/mappers
 */
import type { ProductAttributeEntity } from '../../domain/entities/product-attribute.entity.js';
import type { AttributeTypeValue } from '@vubon/shared-types/business/product';
import type {
  AttributeResponseDTO,
  AttributePublicResponseDTO,
  AttributeListResponseDTO,
  AttributeValueResponseDTO,
} from '../dtos/responses/attribute-response.dto.js';

export class AttributeMapper {
  static toResponse(entity: ProductAttributeEntity): AttributeResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: '',
      name: vo.name.value,
      type: 'text' as AttributeTypeValue,
      values: vo.values.map((v, i) => ({
        value: v.asString(),
        label: v.asString(),
        sortOrder: i,
      })),
      isRequired: vo.isRequired,
      isSearchable: vo.isSearchable,
      isFilterable: vo.isFilterable,
      unit: vo.unit,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: ProductAttributeEntity): AttributePublicResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name.value,
      type: 'text' as AttributeTypeValue,
      values: vo.values.map((v, i) => ({
        value: v.asString(),
        label: v.asString(),
        sortOrder: i,
      })),
      unit: vo.unit,
    };
  }

  static toListResponse(
    entities: readonly ProductAttributeEntity[],
    total: number,
    page: number,
    limit: number,
  ): AttributeListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
