/**
 * RefundPrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { RefundEntity } from '@domain/entities/refund.entity';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { RefundStatusVO } from '@domain/primitives/refund-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { toNum, toIso } from './payment.prisma.mapper.js';

export interface PrismaRefundRow {
  id: string;
  paymentId: string;
  amount: unknown;
  currency: string;
  reason: string;
  note: string | null;
  status: string;
  requestedBy: string | null;
  approvedBy: string | null;
  completedAt: Date | null;
  failureReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class RefundPrismaMapper {
  static toDomain(raw: PrismaRefundRow): RefundEntity {
    return RefundEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        paymentId: PaymentIdVO.reconstitute(raw.paymentId),
        amount: RefundAmountVO.reconstitute(toNum(raw.amount), raw.currency),
        reason: RefundReasonVO.reconstitute(raw.reason as never, raw.note ?? undefined),
        status: RefundStatusVO.create(raw.status),
        requestedBy: raw.requestedBy ?? undefined,
        approvedBy: raw.approvedBy ?? undefined,
        completedAt: toIso(raw.completedAt),
        failureReason: raw.failureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: RefundEntity): Record<string, unknown> {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      amount: entity.amount.amount,
      currency: entity.amount.currency,
      reason: entity.reason.reason,
      note: entity.reason.note ?? null,
      status: entity.status.value,
      requestedBy: entity.requestedBy ?? null,
      approvedBy: entity.approvedBy ?? null,
      completedAt: entity.completedAt ? new Date(entity.completedAt) : null,
      failureReason: entity.failureReason ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
