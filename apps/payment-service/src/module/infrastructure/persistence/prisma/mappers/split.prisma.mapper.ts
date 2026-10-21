/**
 * SplitPaymentPrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import {
  SplitPaymentEntity,
  type SplitReceiverData,
} from '@domain/entities/split-payment.entity';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { toIso } from './payment.prisma.mapper.js';

interface PrismaReceiverShape {
  receiverId: string;
  amount: number;
  percentage?: number;
}

export interface PrismaSplitRow {
  id: string;
  paymentId: string;
  type: string;
  receivers: unknown;
  totalAmount: unknown;
  currency: string;
  executedAt: Date | null;
  failureReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class SplitPaymentPrismaMapper {
  static toDomain(raw: PrismaSplitRow): SplitPaymentEntity {
    const receivers = (raw.receivers as PrismaReceiverShape[]) ?? [];
    return SplitPaymentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        paymentId: PaymentIdVO.reconstitute(raw.paymentId),
        type: SplitTypeVO.create(raw.type),
        receivers: receivers.map(
          (r): SplitReceiverData => ({
            receiverId: r.receiverId,
            amount: SplitAmountVO.reconstitute(r.amount, raw.currency),
            percentage:
              r.percentage !== undefined
                ? SplitPercentageVO.reconstitute(r.percentage)
                : undefined,
          }),
        ),
        totalAmount: Number(raw.totalAmount),
        currency: raw.currency,
        executedAt: toIso(raw.executedAt),
        failureReason: raw.failureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: SplitPaymentEntity): Record<string, unknown> {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      type: entity.type.value,
      receivers: entity.receivers.map((r) => ({
        receiverId: r.receiverId,
        amount: r.amount.amount,
        percentage: r.percentage?.value,
      })),
      totalAmount: entity.totalAmount,
      currency: entity.currency,
      executedAt: entity.executedAt ? new Date(entity.executedAt) : null,
      failureReason: entity.failureReason ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
