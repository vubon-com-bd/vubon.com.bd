/**
 * AbandonedCartPrismaRepository
 * @module cart-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/prisma';
import type {
  AbandonedCartRepository,
  AbandonedListOptions,
  AbandonedPaginationResult,
  AbandonedStats,
} from '../../../../domain/repositories/abandoned-cart.repository.interface.js';
import { AbandonedCartEntity } from '../../../../domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '../../../../domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { AbandonedCartStatusVO } from '../../../../domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { AbandonedCartReminderVO } from '../../../../domain/value-objects/primitives/abandoned-cart-reminder.vo.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { CartUserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

interface PrismaAbandonedRow {
  id: string;
  cartId: string;
  userId: string | null;
  email: string | null;
  status: string;
  reminderType: string;
  itemCount: number;
  cartValue: { toString(): string } | number;
  currency: string;
  abandonedAt: Date;
  remindersSent: number;
  lastReminderAt: Date | null;
  recoveredAt: Date | null;
  recoveredOrderId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class AbandonedCartPrismaRepository implements AbandonedCartRepository {
  private readonly logger = new Logger(AbandonedCartPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<AbandonedCartEntity | null> {
    try {
      const raw = (await this.prisma.abandonedCart.findUnique({ where: { id } })) as PrismaAbandonedRow | null;
      return raw ? this.toDomain(raw) : null;
    } catch {
      return null;
    }
  }

  async findByIdVO(id: AbandonedCartIdVO): Promise<AbandonedCartEntity | null> {
    return this.findById(id.value);
  }

  async findAll(): Promise<readonly AbandonedCartEntity[]> {
    try {
      const rows = (await this.prisma.abandonedCart.findMany()) as PrismaAbandonedRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async save(entity: AbandonedCartEntity): Promise<AbandonedCartEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.prisma.abandonedCart.findUnique({ where: { id: entity.id } });
      const raw = existing
        ? (await this.prisma.abandonedCart.update({ where: { id: entity.id }, data: data as never })) as PrismaAbandonedRow
        : (await this.prisma.abandonedCart.create({ data: data as never })) as PrismaAbandonedRow;
      return this.toDomain(raw);
    } catch (err) {
      this.logger.error(`save failed: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.abandonedCart.update({
        where: { id },
        data: { deletedAt: new Date() } as never,
      });
    } catch (err) {
      this.logger.warn(`delete failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.abandonedCart.count({ where: { id } });
      return count > 0;
    } catch {
      return false;
    }
  }

  async findByCartId(cartId: CartIdVO): Promise<AbandonedCartEntity | null> {
    try {
      const raw = (await this.prisma.abandonedCart.findFirst({
        where: { cartId: cartId.value, deletedAt: null },
      })) as PrismaAbandonedRow | null;
      return raw ? this.toDomain(raw) : null;
    } catch {
      return null;
    }
  }

  async findByUserId(userId: CartUserIdVO): Promise<readonly AbandonedCartEntity[]> {
    try {
      const rows = (await this.prisma.abandonedCart.findMany({
        where: { userId: userId.value, deletedAt: null },
      })) as PrismaAbandonedRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findPending(): Promise<readonly AbandonedCartEntity[]> {
    try {
      const rows = (await this.prisma.abandonedCart.findMany({
        where: { status: { in: ['pending', 'reminded'] }, deletedAt: null },
      })) as PrismaAbandonedRow[];
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findReadyForReminder(): Promise<readonly AbandonedCartEntity[]> {
    return this.findPending();
  }

  async findPaginated(options: AbandonedListOptions): Promise<AbandonedPaginationResult> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 20;
    try {
      const where: Record<string, unknown> = { deletedAt: null };
      if (options.status) where.status = options.status;
      const [rows, total] = await Promise.all([
        this.prisma.abandonedCart.findMany({
          where: where as never,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { abandonedAt: options.sortDir ?? 'desc' },
        }) as Promise<PrismaAbandonedRow[]>,
        this.prisma.abandonedCart.count({ where: where as never }),
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

  async getStats(fromDate?: string, toDate?: string): Promise<AbandonedStats> {
    try {
      const where: Record<string, unknown> = { deletedAt: null };
      if (fromDate || toDate) {
        where.abandonedAt = {
          ...(fromDate ? { gte: new Date(fromDate) } : {}),
          ...(toDate ? { lte: new Date(toDate) } : {}),
        };
      }
      const [total, pending, reminded, recovered, lost] = await Promise.all([
        this.prisma.abandonedCart.count({ where: where as never }),
        this.prisma.abandonedCart.count({ where: { ...where, status: 'pending' } as never }),
        this.prisma.abandonedCart.count({ where: { ...where, status: 'reminded' } as never }),
        this.prisma.abandonedCart.count({ where: { ...where, status: 'recovered' } as never }),
        this.prisma.abandonedCart.count({ where: { ...where, status: 'lost' } as never }),
      ]);
      return {
        total,
        pending,
        reminded,
        recovered,
        lost,
        recoveryRate: total > 0 ? recovered / total : 0,
        averageCartValue: 0,
      };
    } catch {
      return { total: 0, pending: 0, reminded: 0, recovered: 0, lost: 0, recoveryRate: 0, averageCartValue: 0 };
    }
  }

  async countByStatus(status: string): Promise<number> {
    try {
      return await this.prisma.abandonedCart.count({ where: { status, deletedAt: null } });
    } catch {
      return 0;
    }
  }

  private toDomain(raw: PrismaAbandonedRow): AbandonedCartEntity {
    return AbandonedCartEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        cartId: CartIdVO.reconstitute(raw.cartId),
        userId: raw.userId ? CartUserIdVO.reconstitute(raw.userId) : undefined,
        email: raw.email ?? undefined,
        status: AbandonedCartStatusVO.reconstitute(raw.status),
        reminderType: AbandonedCartReminderVO.reconstitute(raw.reminderType),
        itemCount: raw.itemCount,
        cartValue: Number(raw.cartValue),
        currency: raw.currency,
        abandonedAt: raw.abandonedAt.toISOString(),
        remindersSent: raw.remindersSent,
        lastReminderAt: raw.lastReminderAt?.toISOString(),
        recoveredAt: raw.recoveredAt?.toISOString(),
        recoveredOrderId: raw.recoveredOrderId ?? undefined,
      },
    });
  }

  private toPersistence(entity: AbandonedCartEntity): Record<string, unknown> {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      userId: entity.userId?.value ?? null,
      email: entity.email ?? null,
      status: entity.status.value,
      reminderType: entity.reminderType.value,
      itemCount: entity.itemCount,
      cartValue: entity.cartValue,
      currency: entity.currency,
      abandonedAt: new Date(entity.abandonedAt),
      remindersSent: entity.remindersSent,
      lastReminderAt: entity.lastReminderAt ? new Date(entity.lastReminderAt) : null,
      recoveredAt: entity.recoveredAt ? new Date(entity.recoveredAt) : null,
      recoveredOrderId: entity.recoveredOrderId ?? null,
    };
  }
}
