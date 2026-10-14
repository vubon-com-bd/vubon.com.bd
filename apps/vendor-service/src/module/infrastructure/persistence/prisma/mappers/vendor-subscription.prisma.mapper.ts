/**
 * VendorSubscriptionPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorSubscriptionEntity } from '../../../../domain/entities/vendor-subscription.entity.js';
import {
  VendorSubscriptionVO,
  type SubscriptionStatusValue,
  type SubscriptionCycleValue,
} from '../../../../domain/value-objects/composites/vendor-subscription.vo.js';
import { SubscriptionIdVO } from '../../../../domain/value-objects/primitives/subscription-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { SubscriptionPlanVO } from '../../../../domain/value-objects/primitives/subscription-plan.vo.js';

export interface VendorSubscriptionPrismaRow {
  id: string;
  vendorId: string;
  plan: string;
  status: string;
  cycle: string;
  priceAmount: unknown;
  currency: string;
  startedAt: Date;
  trialEndsAt: Date | null;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelledAt: Date | null;
  cancellationReason: string | null;
  cancelAtPeriodEnd: boolean;
  autoRenew: boolean;
  lastPaymentAt: Date | null;
  nextPaymentAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v ?? 0);
};

const toIso = (d: Date | null): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorSubscriptionPrismaMapper {
  static toDomain(raw: VendorSubscriptionPrismaRow): VendorSubscriptionEntity {
    const vo = VendorSubscriptionVO.reconstitute({
      id: SubscriptionIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      plan: SubscriptionPlanVO.reconstitute(raw.plan),
      status: raw.status as SubscriptionStatusValue,
      cycle: raw.cycle as SubscriptionCycleValue,
      priceAmount: toNum(raw.priceAmount),
      currency: raw.currency,
      startedAt: new Date(raw.startedAt).toISOString(),
      trialEndsAt: toIso(raw.trialEndsAt),
      currentPeriodStart: new Date(raw.currentPeriodStart).toISOString(),
      currentPeriodEnd: new Date(raw.currentPeriodEnd).toISOString(),
      cancelledAt: toIso(raw.cancelledAt),
      cancellationReason: raw.cancellationReason ?? undefined,
      cancelAtPeriodEnd: raw.cancelAtPeriodEnd,
      autoRenew: raw.autoRenew,
      lastPaymentAt: toIso(raw.lastPaymentAt),
      nextPaymentAt: toIso(raw.nextPaymentAt),
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorSubscriptionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorSubscriptionEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      plan: vo.plan.value,
      status: vo.status,
      cycle: vo.cycle,
      priceAmount: vo.priceAmount,
      currency: vo.currency,
      startedAt: new Date(vo.startedAt),
      trialEndsAt: vo.trialEndsAt ? new Date(vo.trialEndsAt) : null,
      currentPeriodStart: new Date(vo.currentPeriodStart),
      currentPeriodEnd: new Date(vo.currentPeriodEnd),
      cancelledAt: vo.cancelledAt ? new Date(vo.cancelledAt) : null,
      cancellationReason: vo.cancellationReason ?? null,
      cancelAtPeriodEnd: vo.cancelAtPeriodEnd,
      autoRenew: vo.autoRenew,
      lastPaymentAt: vo.lastPaymentAt ? new Date(vo.lastPaymentAt) : null,
      nextPaymentAt: vo.nextPaymentAt ? new Date(vo.nextPaymentAt) : null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
