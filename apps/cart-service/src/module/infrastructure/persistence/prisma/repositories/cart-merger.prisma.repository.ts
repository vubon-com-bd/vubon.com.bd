/**
 * CartMergerPrismaRepository
 * @module cart-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import type { CartMergerRepository } from '../../../../domain/repositories/cart-merger.repository.interface.js';
import { CartMergerEntity } from '../../../../domain/entities/cart-merger.entity.js';
import { CartMergerIdVO } from '../../../../domain/value-objects/primitives/cart-merger-id.vo.js';
import { MergeStrategyVO } from '../../../../domain/value-objects/primitives/merge-strategy.vo.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';

interface PrismaMergerRow {
  id: string;
  sourceCartId: string;
  targetCartId: string;
  strategy: string;
  itemsMerged: number;
  conflicts: number;
  mergedAt: Date;
  mergedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class CartMergerPrismaRepository implements CartMergerRepository {
  private readonly logger = new Logger(CartMergerPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<CartMergerEntity | null> {
    try {
      const raw = (await this.prisma.cartMerger.findUnique({ where: { id } })) as PrismaMergerRow | null;
      return raw ? this.toDomain(raw) : null;
    } catch {
      return null;
    }
  }

  async findByIdVO(id: CartMergerIdVO): Promise<CartMergerEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly CartMergerEntity[]> {
    try {
      const rows = (await this.prisma.cartMerger.findMany()) as PrismaMergerRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async save(entity: CartMergerEntity): Promise<CartMergerEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.prisma.cartMerger.findUnique({ where: { id: entity.id } });
      const raw = existing
        ? (await this.prisma.cartMerger.update({ where: { id: entity.id }, data: data as never })) as PrismaMergerRow
        : (await this.prisma.cartMerger.create({ data: data as never })) as PrismaMergerRow;
      return this.toDomain(raw);
    } catch (err) {
      this.logger.error(`save failed: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.cartMerger.delete({ where: { id } });
    } catch (err) {
      this.logger.warn(`delete failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.cartMerger.count({ where: { id } });
      return count > 0;
    } catch {
      return false;
    }
  }

  async findBySourceCartId(cartId: CartIdVO): Promise<readonly CartMergerEntity[]> {
    try {
      const rows = (await this.prisma.cartMerger.findMany({ where: { sourceCartId: cartId.value } })) as PrismaMergerRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findByTargetCartId(cartId: CartIdVO): Promise<readonly CartMergerEntity[]> {
    try {
      const rows = (await this.prisma.cartMerger.findMany({ where: { targetCartId: cartId.value } })) as PrismaMergerRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findLatestByTargetCartId(cartId: CartIdVO): Promise<CartMergerEntity | null> {
    try {
      const raw = (await this.prisma.cartMerger.findFirst({
        where: { targetCartId: cartId.value },
        orderBy: { mergedAt: 'desc' },
      })) as PrismaMergerRow | null;
      return raw ? this.toDomain(raw) : null;
    } catch {
      return null;
    }
  }

  async countByTargetCartId(cartId: CartIdVO): Promise<number> {
    try {
      return await this.prisma.cartMerger.count({ where: { targetCartId: cartId.value } });
    } catch {
      return 0;
    }
  }

  private toDomain(raw: PrismaMergerRow): CartMergerEntity {
    return CartMergerEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        sourceCartId: CartIdVO.reconstitute(raw.sourceCartId),
        targetCartId: CartIdVO.reconstitute(raw.targetCartId),
        strategy: MergeStrategyVO.reconstitute(raw.strategy),
        itemsMerged: raw.itemsMerged,
        conflicts: raw.conflicts,
        mergedAt: raw.mergedAt.toISOString(),
        mergedBy: raw.mergedBy ?? undefined,
      },
    });
  }

  private toPersistence(entity: CartMergerEntity): Record<string, unknown> {
    return {
      id: entity.id,
      sourceCartId: entity.sourceCartId.value,
      targetCartId: entity.targetCartId.value,
      strategy: entity.strategy.value,
      itemsMerged: entity.itemsMerged,
      conflicts: entity.conflicts,
      mergedAt: new Date(entity.mergedAt),
      mergedBy: entity.mergedBy ?? null,
    };
  }
}
