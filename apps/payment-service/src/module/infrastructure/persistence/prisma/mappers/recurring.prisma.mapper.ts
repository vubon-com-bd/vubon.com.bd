/**
 * RecurringPaymentPrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { RecurringPaymentEntity } from '@domain/entities/recurring-payment.entity';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { RecurringStatusVO } from '@domain/primitives/recurring-status.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { toNum, toIso } from './payment.prisma.mapper.js';

export interface PrismaRecurringRow {
  id: string;
  paymentId: string;
  status: string;
  interval: string;
  intervalCount: number;
  amount: unknown;
  currency: string;
  startAt: Date;
  endAt: Date | null;
  nextRunAt: Date | null;
  attemptCount: number;
  cancelledAt: Date | null;
  failureReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class RecurringPaymentPrismaMapper {
  static toDomain(raw: PrismaRecurringRow): RecurringPaymentEntity {
    return RecurringPaymentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        paymentId: PaymentIdVO.reconstitute(raw.paymentId),
        status: RecurringStatusVO.create(raw.status),
        frequency: RecurringFrequencyVO.reconstitute(raw.interval as never, raw.intervalCount),
        amount: PaymentAmountVO.reconstitute(toNum(raw.amount), raw.currency),
        startAt: new Date(raw.startAt).toISOString(),
        endAt: toIso(raw.endAt),
        nextRunAt: toIso(raw.nextRunAt),
        attemptCount: raw.attemptCount,
        cancelledAt: toIso(raw.cancelledAt),
        failureReason: raw.failureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: RecurringPaymentEntity): Record<string, unknown> {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      status: entity.status.value,
      interval: entity.frequency.interval,
      intervalCount: entity.frequency.intervalCount,
      amount: entity.amount.amount,
      currency: entity.amount.currency,
      startAt: new Date(entity.startAt),
      endAt: entity.endAt ? new Date(entity.endAt) : null,
      nextRunAt: entity.nextRunAt ? new Date(entity.nextRunAt) : null,
      attemptCount: entity.attemptCount,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      failureReason: entity.failureReason ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
