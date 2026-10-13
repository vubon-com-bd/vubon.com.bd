/**
 * ProductAttributePrismaMapper
 * @module product-service/infrastructure/persistence/prisma/mappers
 */
import { ProductAttributeEntity } from '../../../../domain/entities/product-attribute.entity.js';
import { ProductAttributeVO } from '../../../../domain/value-objects/composites/product-attribute.vo.js';
import { AttributeIdVO } from '../../../../domain/value-objects/primitives/attribute-id.vo.js';
import { AttributeNameVO } from '../../../../domain/value-objects/primitives/attribute-name.vo.js';
import { AttributeValueVO } from '../../../../domain/value-objects/primitives/attribute-value.vo.js';

export interface PrismaProductAttributeRow {
  id: string;
  productId: string;
  name: string;
  type: string | null;
  values: unknown;
  isRequired: boolean;
  isSearchable: boolean;
  isFilterable: boolean;
  unit: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface StoredValue {
  value: string | number | boolean | string[];
}

export class ProductAttributePrismaMapper {
  static toDomain(raw: PrismaProductAttributeRow): ProductAttributeEntity {
    const stored = Array.isArray(raw.values) ? (raw.values as StoredValue[]) : [];

    const vo = ProductAttributeVO.reconstitute({
      id: AttributeIdVO.reconstitute(raw.id),
      name: AttributeNameVO.reconstitute(raw.name),
      values: stored.map((s) => AttributeValueVO.reconstitute(s.value)),
      isRequired: raw.isRequired,
      isSearchable: raw.isSearchable,
      isFilterable: raw.isFilterable,
      unit: raw.unit ?? undefined,
    });

    return ProductAttributeEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      vo,
    });
  }

  static toPersistence(entity: ProductAttributeEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      productId: '',
      name: vo.name.value,
      type: 'text',
      values: vo.values.map((v) => ({ value: v.value })),
      isRequired: vo.isRequired,
      isSearchable: vo.isSearchable,
      isFilterable: vo.isFilterable,
      unit: vo.unit ?? null,
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
