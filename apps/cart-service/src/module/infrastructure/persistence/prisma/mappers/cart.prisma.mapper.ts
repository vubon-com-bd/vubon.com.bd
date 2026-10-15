/**
 * CartPrismaMapper — row ↔ domain entity
 * @module cart-service/infrastructure/persistence/prisma/mappers
 */
import { CartEntity } from '../../../../domain/entities/cart.entity.js';
import { CartStatusVO } from '../../../../domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '../../../../domain/value-objects/primitives/session-id.vo.js';
import { IdempotencyKeyVO } from '../../../../domain/value-objects/primitives/idempotency-key.vo.js';

export interface PrismaCartRow {
  readonly id: string;
  readonly userId: string | null;
  readonly sessionId: string | null;
  readonly type: string;
  readonly status: string;
  readonly itemCount: number;
  readonly subtotal: unknown;
  readonly discountAmount: unknown;
  readonly taxAmount: unknown;
  readonly shippingAmount: unknown;
  readonly total: unknown;
  readonly currency: string;
  readonly couponId: string | null;
  readonly voucherId: string | null;
  readonly notes: string | null;
  readonly idempotencyKey: string | null;
  readonly expiresAt: Date;
  readonly lastActivityAt: Date;
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

export class CartPrismaMapper {
  static toDomain(raw: PrismaCartRow): CartEntity {
    return CartEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      status: raw.status,
      props: {
        type: CartTypeVO.reconstitute(raw.type),
        userId: raw.userId ? UserIdVO.reconstitute(raw.userId) : undefined,
        sessionId: raw.sessionId ? SessionIdVO.reconstitute(raw.sessionId) : undefined,
        currency: raw.currency,
        itemCount: raw.itemCount,
        subtotal: toNum(raw.subtotal),
        discountAmount: toNum(raw.discountAmount),
        taxAmount: toNum(raw.taxAmount),
        shippingAmount: toNum(raw.shippingAmount),
        total: toNum(raw.total),
        notes: raw.notes ?? undefined,
        expiresAt: new Date(raw.expiresAt).toISOString(),
        lastActivityAt: new Date(raw.lastActivityAt).toISOString(),
        idempotencyKey: raw.idempotencyKey
          ? IdempotencyKeyVO.reconstitute(raw.idempotencyKey)
          : undefined,
      },
    });
  }

  static toPersistence(entity: CartEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId?.value ?? null,
      sessionId: entity.sessionId?.value ?? null,
      type: entity.type.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      couponId: null,
      voucherId: null,
      notes: entity.notes ?? null,
      idempotencyKey: entity.idempotencyKey?.value ?? null,
      expiresAt: new Date(entity.expiresAt),
      lastActivityAt: new Date(entity.lastActivityAt),
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
    };
  }

  static idOf(entity: CartEntity): string {
    return entity.id;
  }

  static whereForId(id: string): Record<string, unknown> {
    return { id };
  }
}
