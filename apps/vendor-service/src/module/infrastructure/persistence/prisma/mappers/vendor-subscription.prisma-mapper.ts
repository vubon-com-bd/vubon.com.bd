/**
 * VendorSubscriptionPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorSubscription as PrismaVendorSubscription } from '@prisma/client';
import { VendorSubscriptionEntity } from '../../../../domain/entities/vendor-subscription.entity.js';
import { SubscriptionPlanVO } from '../../../../domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionStatusVO } from '../../../../domain/value-objects/primitives/subscription-status.vo.js';
import { SubscriptionCycleVO } from '../../../../domain/value-objects/primitives/subscription-cycle.vo.js';

export class VendorSubscriptionPrismaMapper {
  static toDomain(row: PrismaVendorSubscription): VendorSubscriptionEntity {
    return VendorSubscriptionEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        plan: SubscriptionPlanVO.create(row.plan),
        status: SubscriptionStatusVO.create(row.status),
        cycle: SubscriptionCycleVO.create(row.cycle),
        price: Number(row.price),
        currency: row.currency,
        startedAt: row.startedAt.toISOString(),
        currentPeriodStart: row.currentPeriodStart.toISOString(),
        currentPeriodEnd: row.currentPeriodEnd.toISOString(),
        trialEndsAt: row.trialEndsAt?.toISOString(),
        cancelledAt: row.cancelledAt?.toISOString(),
        cancelAtPeriodEnd: row.cancelAtPeriodEnd,
        autoRenew: row.autoRenew,
        features: row.features,
      },
    });
  }

  static toPersistence(entity: VendorSubscriptionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      plan: entity.plan.value,
      status: entity.status.value,
      cycle: entity.cycle.value,
      price: entity.price,
      currency: entity.currency,
      startedAt: new Date(entity.startedAt),
      currentPeriodStart: new Date(entity.currentPeriodStart),
      currentPeriodEnd: new Date(entity.currentPeriodEnd),
      trialEndsAt: entity.trialEndsAt ? new Date(entity.trialEndsAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      cancelAtPeriodEnd: entity.cancelAtPeriodEnd,
      autoRenew: entity.autoRenew,
      features: [...entity.features],
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
