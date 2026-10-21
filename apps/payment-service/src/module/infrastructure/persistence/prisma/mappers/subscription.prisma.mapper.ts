/**
 * SubscriptionPrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { SubscriptionEntity } from '@domain/entities/subscription.entity';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { SubscriptionStatusVO } from '@domain/primitives/subscription-status.vo';
import { SubscriptionPlanVO } from '@domain/primitives/subscription-plan.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { toNum, toIso } from './payment.prisma.mapper.js';

export interface PrismaSubscriptionRow {
  id: string;
  userId: string;
  status: string;
  plan: string;
  interval: string;
  intervalCount: number;
  price: unknown;
  currency: string;
  startedAt: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialEndsAt: Date | null;
  cancelledAt: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class SubscriptionPrismaMapper {
  static toDomain(raw: PrismaSubscriptionRow): SubscriptionEntity {
    return SubscriptionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        userId: UserIdVO.reconstitute(raw.userId),
        status: SubscriptionStatusVO.create(raw.status),
        plan: SubscriptionPlanVO.reconstitute(raw.plan as never),
        frequency: RecurringFrequencyVO.reconstitute(raw.interval as never, raw.intervalCount),
        price: PaymentAmountVO.reconstitute(toNum(raw.price), raw.currency),
        startedAt: new Date(raw.startedAt).toISOString(),
        trialEndsAt: toIso(raw.trialEndsAt),
        currentPeriodStart: new Date(raw.currentPeriodStart).toISOString(),
        currentPeriodEnd: new Date(raw.currentPeriodEnd).toISOString(),
        cancelledAt: toIso(raw.cancelledAt),
        cancelAtPeriodEnd: raw.cancelAtPeriodEnd,
      },
    });
  }

  static toPersistence(entity: SubscriptionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      status: entity.status.value,
      plan: entity.plan.value,
      interval: entity.frequency.interval,
      intervalCount: entity.frequency.intervalCount,
      price: entity.price.amount,
      currency: entity.price.currency,
      startedAt: new Date(entity.startedAt),
      currentPeriodStart: new Date(entity.currentPeriodStart),
      currentPeriodEnd: new Date(entity.currentPeriodEnd),
      trialEndsAt: entity.trialEndsAt ? new Date(entity.trialEndsAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      cancelAtPeriodEnd: entity.cancelAtPeriodEnd,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
