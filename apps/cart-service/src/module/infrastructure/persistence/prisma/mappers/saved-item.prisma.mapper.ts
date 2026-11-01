/**
 * SavedItemPrismaMapper — row ↔ SavedForLaterEntity
 * @module cart-service/infrastructure/persistence/prisma/mappers
 */
import { SavedForLaterEntity } from '../../../../domain/entities/saved-for-later.entity.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';

export interface PrismaSavedItemRow {
  readonly id: string;
  readonly userId: string;
  readonly productId: string;
  readonly variantId: string | null;
  readonly quantity: number;
  readonly status: string;
  readonly notes: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}

export class SavedItemPrismaMapper {
  static toDomain(raw: PrismaSavedItemRow): SavedForLaterEntity {
    return SavedForLaterEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      status: raw.status,
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        productId: ProductIdVO.reconstitute(raw.productId),
        variantId: raw.variantId ? VariantIdVO.reconstitute(raw.variantId) : undefined,
        note: raw.notes ?? undefined,
        savedAt: new Date(raw.createdAt).toISOString(),
      },
    });
  }

  static toPersistence(entity: SavedForLaterEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      quantity: 1,
      status: entity.status.value,
      notes: entity.note ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  static idOf(entity: SavedForLaterEntity): string {
    return entity.id;
  }

  static whereForId(id: string): Record<string, unknown> {
    return { id };
  }
}
