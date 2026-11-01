/**
 * AbandonedCartPrismaMapper — row ↔ AbandonedCartEntity
 * @module cart-service/infrastructure/persistence/prisma/mappers
 */
import { AbandonedCartEntity } from '../../../../domain/entities/abandoned-cart.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';

export interface PrismaAbandonedCartRow {
  readonly id: string;
  readonly cartId: string;
  readonly userId: string | null;
  readonly email: string | null;
  readonly status: string;
  readonly reminderType: string;
  readonly itemCount: number;
  readonly cartValue: unknown;
  readonly currency: string;
  readonly abandonedAt: Date;
  readonly remindersSent: number;
  readonly lastReminderAt: Date | null;
  readonly recoveredAt: Date | null;
  readonly recoveredOrderId: string | null;
  readonly recoveryDiscountPercent: unknown;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

export class AbandonedCartPrismaMapper {
  static toDomain(raw: PrismaAbandonedCartRow): AbandonedCartEntity {
    return AbandonedCartEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      status: raw.status,
      props: {
        cartId: CartIdVO.reconstitute(raw.cartId),
        userId: raw.userId ? UserIdVO.reconstitute(raw.userId) : undefined,
        email: raw.email ?? undefined,
        itemCount: raw.itemCount,
        cartValue: toNum(raw.cartValue),
        currency: raw.currency,
        abandonedAt: new Date(raw.abandonedAt).toISOString(),
        remindersSent: raw.remindersSent,
        lastReminderAt: raw.lastReminderAt
          ? new Date(raw.lastReminderAt).toISOString()
          : undefined,
        recoveredAt: raw.recoveredAt ? new Date(raw.recoveredAt).toISOString() : undefined,
        recoveredOrderId: raw.recoveredOrderId ?? undefined,
        recoveryDiscountPercent:
          raw.recoveryDiscountPercent != null
            ? toNum(raw.recoveryDiscountPercent)
            : undefined,
      },
    });
  }

  static toPersistence(entity: AbandonedCartEntity): Record<string, unknown> {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      userId: entity.userId?.value ?? null,
      email: entity.email ?? null,
      status: entity.status.value,
      itemCount: entity.itemCount,
      cartValue: entity.cartValue,
      currency: entity.currency,
      abandonedAt: new Date(entity.abandonedAt),
      remindersSent: entity.remindersSent,
      lastReminderAt: entity.lastReminderAt ? new Date(entity.lastReminderAt) : null,
      recoveredAt: entity.recoveredAt ? new Date(entity.recoveredAt) : null,
      recoveredOrderId: entity.recoveredOrderId ?? null,
      recoveryDiscountPercent: entity.recoveryDiscountPercent ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  static idOf(entity: AbandonedCartEntity): string {
    return entity.id;
  }

  static whereForId(id: string): Record<string, unknown> {
    return { id };
  }
}
