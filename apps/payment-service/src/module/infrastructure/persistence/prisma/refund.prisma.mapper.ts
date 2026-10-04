/**
 * RefundPrismaMapper — row ↔ domain entity
 * @module payment-service/infrastructure/persistence/prisma
 */
import { RefundEntity } from '../../../domain/entities/refund.entity.js';
import { RefundStatusVO } from '../../../domain/value-objects/primitives/refund-status.vo.js';
import { RefundReasonVO } from '../../../domain/value-objects/primitives/refund-reason.vo.js';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { FailureReasonVO } from '../../../domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../domain/value-objects/primitives/failure-code.vo.js';

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (
    v &&
    typeof v === 'object' &&
    'toNumber' in v &&
    typeof (v as { toNumber: () => number }).toNumber === 'function'
  ) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};
const toIso = (d: Date | null | undefined) => (d ? new Date(d).toISOString() : undefined);

export class RefundPrismaMapper {
  static toDomain(raw: Record<string, unknown>): RefundEntity {
    return RefundEntity.reconstitute({
      id: String(raw['id']),
      createdAt: new Date(raw['createdAt'] as Date).toISOString(),
      updatedAt: new Date(raw['updatedAt'] as Date).toISOString(),
      deletedAt: raw['deletedAt'] ? new Date(raw['deletedAt'] as Date).toISOString() : null,
      props: {
        paymentId: PaymentIdVO.reconstitute(String(raw['paymentId'])),
        transactionId: raw['transactionId'] ? String(raw['transactionId']) : undefined,
        orderId: raw['orderId'] ? OrderIdVO.reconstitute(String(raw['orderId'])) : undefined,
        status: RefundStatusVO.reconstitute(String(raw['status'])),
        amount: toNum(raw['amount']),
        currency: String(raw['currency']),
        reason: raw['reason'] ? RefundReasonVO.reconstitute(String(raw['reason'])) : undefined,
        gatewayRefundId: raw['gatewayRefundId'] ? String(raw['gatewayRefundId']) : undefined,
        processedAt: toIso(raw['processedAt'] as Date | null),
        failedAt: toIso(raw['failedAt'] as Date | null),
        failureReason: raw['failureReason']
          ? FailureReasonVO.reconstitute(String(raw['failureReason']))
          : undefined,
        failureCode: raw['failureCode']
          ? FailureCodeVO.reconstitute(String(raw['failureCode']))
          : undefined,
      },
    });
  }

  static toPersistence(entity: RefundEntity): Record<string, unknown> {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      transactionId: entity.transactionId ?? null,
      orderId: entity.orderId?.value ?? null,
      status: entity.status.value,
      amount: entity.amount,
      currency: entity.currency,
      reason: entity.reason?.value ?? null,
      gatewayRefundId: entity.gatewayRefundId ?? null,
      processedAt: entity.processedAt ? new Date(entity.processedAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      failureReason: entity.failureReason?.value ?? null,
      failureCode: entity.failureCode?.value ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
