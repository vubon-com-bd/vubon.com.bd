/**
 * TransactionPrismaMapper — row ↔ domain entity
 * @module payment-service/infrastructure/persistence/prisma
 */
import { TransactionEntity } from '../../../domain/entities/transaction.entity.js';
import { TransactionTypeVO } from '../../../domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionStatusVO } from '../../../domain/value-objects/primitives/transaction-status.vo.js';
import { TransactionReferenceVO } from '../../../domain/value-objects/primitives/transaction-reference.vo.js';
import { PaymentIdVO } from '../../../domain/value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
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

export class TransactionPrismaMapper {
  static toDomain(raw: Record<string, unknown>): TransactionEntity {
    return TransactionEntity.reconstitute({
      id: String(raw['id']),
      createdAt: new Date(raw['createdAt'] as Date).toISOString(),
      updatedAt: new Date(raw['updatedAt'] as Date).toISOString(),
      deletedAt: raw['deletedAt'] ? new Date(raw['deletedAt'] as Date).toISOString() : null,
      props: {
        paymentId: PaymentIdVO.reconstitute(String(raw['paymentId'])),
        orderId: raw['orderId'] ? OrderIdVO.reconstitute(String(raw['orderId'])) : undefined,
        userId: raw['userId'] ? UserIdVO.reconstitute(String(raw['userId'])) : undefined,
        type: TransactionTypeVO.reconstitute(String(raw['type'])),
        status: TransactionStatusVO.reconstitute(String(raw['status'])),
        amount: toNum(raw['amount']),
        currency: String(raw['currency']),
        gateway: raw['gateway'] ? String(raw['gateway']) : undefined,
        gatewayTransactionId: raw['gatewayTransactionId']
          ? String(raw['gatewayTransactionId'])
          : undefined,
        reference: raw['reference']
          ? TransactionReferenceVO.reconstitute(String(raw['reference']))
          : undefined,
        idempotencyKey: raw['idempotencyKey'] ? String(raw['idempotencyKey']) : undefined,
        errorCode: raw['errorCode']
          ? FailureCodeVO.reconstitute(String(raw['errorCode']))
          : undefined,
        errorMessage: raw['errorMessage']
          ? FailureReasonVO.reconstitute(String(raw['errorMessage']))
          : undefined,
        metadata: (raw['metadata'] as Readonly<Record<string, unknown>>) ?? undefined,
        processedAt: toIso(raw['processedAt'] as Date | null),
      },
    });
  }

  static toPersistence(entity: TransactionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      orderId: entity.orderId?.value ?? null,
      userId: entity.userId?.value ?? null,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount,
      currency: entity.currency,
      gateway: entity.gateway ?? null,
      gatewayTransactionId: entity.gatewayTransactionId ?? null,
      reference: entity.reference?.value ?? null,
      idempotencyKey: entity.idempotencyKey ?? null,
      errorCode: entity.errorCode?.value ?? null,
      errorMessage: entity.errorMessage?.value ?? null,
      metadata: entity.metadata ?? null,
      processedAt: entity.processedAt ? new Date(entity.processedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
