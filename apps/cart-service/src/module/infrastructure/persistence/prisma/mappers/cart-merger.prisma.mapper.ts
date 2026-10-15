/**
 * CartMergerPrismaMapper — row ↔ CartMergerEntity
 * @module cart-service/infrastructure/persistence/prisma/mappers
 */
import { CartMergerEntity } from '../../../../domain/entities/cart-merger.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { MergeStrategyVO } from '../../../../domain/value-objects/primitives/merge-strategy.vo.js';

export interface PrismaCartMergerRow {
  readonly id: string;
  readonly sourceCartId: string;
  readonly targetCartId: string;
  readonly strategy: string;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedAt: Date;
  readonly mergedBy: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class CartMergerPrismaMapper {
  static toDomain(raw: PrismaCartMergerRow): CartMergerEntity {
    return CartMergerEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: null,
      props: {
        sourceCartId: CartIdVO.reconstitute(raw.sourceCartId),
        targetCartId: CartIdVO.reconstitute(raw.targetCartId),
        strategy: MergeStrategyVO.reconstitute(raw.strategy),
        mergedAt: new Date(raw.mergedAt).toISOString(),
      },
      itemsMerged: raw.itemsMerged,
      conflicts: raw.conflicts,
      completed: raw.itemsMerged > 0,
      failed: false,
    });
  }

  static toPersistence(entity: CartMergerEntity): Record<string, unknown> {
    return {
      id: entity.id,
      sourceCartId: entity.sourceCartId.value,
      targetCartId: entity.targetCartId.value,
      strategy: entity.strategy.value,
      itemsMerged: entity.itemsMerged,
      conflicts: entity.conflicts,
      mergedAt: new Date(entity.mergedAt),
      updatedAt: new Date(entity.updatedAt),
    };
  }

  static idOf(entity: CartMergerEntity): string {
    return entity.id;
  }

  static whereForId(id: string): Record<string, unknown> {
    return { id };
  }
}
