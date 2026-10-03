/**
 * SavedForLaterPrismaRepository
 * @module cart-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import type { SavedForLaterRepository, SavedListOptions, SavedPaginationResult } from '../../../../domain/repositories/saved-for-later.repository.interface.js';
import { SavedForLaterEntity } from '../../../../domain/entities/saved-for-later.entity.js';
import { SavedItemIdVO } from '../../../../domain/value-objects/primitives/saved-item-id.vo.js';
import { CartUserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { CartProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { CartVariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { SavedItemStatusVO } from '../../../../domain/value-objects/primitives/saved-item-status.vo.js';

interface PrismaSavedItemRow {
  id: string;
  userId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class SavedForLaterPrismaRepository implements SavedForLaterRepository {
  private readonly logger = new Logger(SavedForLaterPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<SavedForLaterEntity | null> {
    try {
      const raw = (await this.prisma.savedItem.findUnique({ where: { id } })) as PrismaSavedItemRow | null;
      return raw ? this.toDomain(raw) : null;
    } catch (err) {
      this.logger.warn(`findById failed: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    }
  }

  async findByIdVO(id: SavedItemIdVO): Promise<SavedForLaterEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly SavedForLaterEntity[]> {
    try {
      const rows = (await this.prisma.savedItem.findMany()) as PrismaSavedItemRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async save(entity: SavedForLaterEntity): Promise<SavedForLaterEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.prisma.savedItem.findUnique({ where: { id: entity.id } });
      const raw = existing
        ? (await this.prisma.savedItem.update({ where: { id: entity.id }, data: data as never })) as PrismaSavedItemRow
        : (await this.prisma.savedItem.create({ data: data as never })) as PrismaSavedItemRow;
      return this.toDomain(raw);
    } catch (err) {
      this.logger.error(`save failed: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.savedItem.update({
        where: { id },
        data: { deletedAt: new Date() } as never,
      });
    } catch (err) {
      this.logger.warn(`delete failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.savedItem.count({ where: { id } });
      return count > 0;
    } catch {
      return false;
    }
  }

  async findByUserId(userId: CartUserIdVO): Promise<readonly SavedForLaterEntity[]> {
    try {
      const rows = (await this.prisma.savedItem.findMany({
        where: { userId: userId.value, deletedAt: null },
      })) as PrismaSavedItemRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findByProduct(
    userId: CartUserIdVO,
    productId: CartProductIdVO,
    variantId?: string,
  ): Promise<SavedForLaterEntity | null> {
    try {
      const raw = (await this.prisma.savedItem.findFirst({
        where: {
          userId: userId.value,
          productId: productId.value,
          variantId: variantId ?? null,
          deletedAt: null,
        },
      })) as PrismaSavedItemRow | null;
      return raw ? this.toDomain(raw) : null;
    } catch {
      return null;
    }
  }

  async findActiveByUserId(userId: CartUserIdVO): Promise<readonly SavedForLaterEntity[]> {
    try {
      const rows = (await this.prisma.savedItem.findMany({
        where: { userId: userId.value, status: 'active', deletedAt: null },
      })) as PrismaSavedItemRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findPaginated(
    userId: CartUserIdVO,
    options: SavedListOptions,
  ): Promise<SavedPaginationResult> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 20;
    try {
      const [rows, total] = await Promise.all([
        this.prisma.savedItem.findMany({
          where: { userId: userId.value, deletedAt: null },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: options.sortDir ?? 'desc' },
        }) as Promise<PrismaSavedItemRow[]>,
        this.prisma.savedItem.count({ where: { userId: userId.value, deletedAt: null } }),
      ]);
      return {
        items: rows.map((r) => this.toDomain(r)),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch {
      return { items: [], total: 0, page, limit, totalPages: 0 };
    }
  }

  async countByUserId(userId: CartUserIdVO): Promise<number> {
    try {
      return await this.prisma.savedItem.count({
        where: { userId: userId.value, deletedAt: null },
      });
    } catch {
      return 0;
    }
  }

  private toDomain(raw: PrismaSavedItemRow): SavedForLaterEntity {
    return SavedForLaterEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        userId: CartUserIdVO.reconstitute(raw.userId),
        productId: CartProductIdVO.reconstitute(raw.productId),
        variantId: raw.variantId ? CartVariantIdVO.reconstitute(raw.variantId) : undefined,
        quantity: raw.quantity,
        status: SavedItemStatusVO.reconstitute(raw.status),
        notes: raw.notes ?? undefined,
      },
    });
  }

  private toPersistence(entity: SavedForLaterEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      quantity: entity.quantity,
      status: entity.status.value,
      notes: entity.notes ?? null,
    };
  }
}
