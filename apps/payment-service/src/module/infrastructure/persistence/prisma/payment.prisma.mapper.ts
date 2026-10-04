/**
 * PaymentPrismaMapper — row ↔ domain entity
 * @module payment-service/infrastructure/persistence/prisma
 */
import { PaymentEntity } from '../../../domain/entities/payment.entity.js';
import { PaymentStatusVO } from '../../../domain/value-objects/primitives/payment-status.vo.js';
import { PaymentTypeVO } from '../../../domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../domain/value-objects/primitives/payment-gateway.vo.js';
import { GatewayPaymentIdVO } from '../../../domain/value-objects/primitives/gateway-payment-id.vo.js';
import { GatewaySignatureVO } from '../../../domain/value-objects/primitives/gateway-signature.vo.js';
import { IdempotencyKeyVO } from '../../../domain/value-objects/primitives/idempotency-key.vo.js';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { FailureReasonVO } from '../../../domain/value-objects/primitives/failure-reason.vo.js';
import { FailureCodeVO } from '../../../domain/value-objects/primitives/failure-code.vo.js';

export interface PrismaPaymentRow {
  id: string;
  orderId: string;
  userId: string;
  type: string;
  status: string;
  method: string;
  gateway: string | null;
  amount: unknown;
  currency: string;
  gatewayPaymentId: string | null;
  gatewayOrderId: string | null;
  gatewaySignature: string | null;
  idempotencyKey: string | null;
  refundedAmount: unknown;
  retryAttempts: number;
  authorizedAt: Date | null;
  capturedAt: Date | null;
  failedAt: Date | null;
  cancelledAt: Date | null;
  expiredAt: Date | null;
  failureReason: string | null;
  failureCode: string | null;
  metadata: unknown;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

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

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class PaymentPrismaMapper {
  static toDomain(raw: PrismaPaymentRow): PaymentEntity {
    return PaymentEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        userId: UserIdVO.reconstitute(raw.userId),
        type: PaymentTypeVO.reconstitute(raw.type),
        method: PaymentMethodVO.reconstitute(raw.method),
        gateway: raw.gateway ? PaymentGatewayVO.reconstitute(raw.gateway) : undefined,
        amount: toNum(raw.amount),
        currency: raw.currency,
        status: PaymentStatusVO.reconstitute(raw.status),
        gatewayPaymentId: raw.gatewayPaymentId
          ? GatewayPaymentIdVO.reconstitute(raw.gatewayPaymentId)
          : undefined,
        gatewaySignature: raw.gatewaySignature
          ? GatewaySignatureVO.reconstitute(raw.gatewaySignature)
          : undefined,
        idempotencyKey: raw.idempotencyKey
          ? IdempotencyKeyVO.reconstitute(raw.idempotencyKey)
          : undefined,
        refundedAmount: toNum(raw.refundedAmount),
        retryAttempts: raw.retryAttempts,
        authorizedAt: toIso(raw.authorizedAt),
        capturedAt: toIso(raw.capturedAt),
        failedAt: toIso(raw.failedAt),
        cancelledAt: toIso(raw.cancelledAt),
        expiredAt: toIso(raw.expiredAt),
        failureReason: raw.failureReason
          ? FailureReasonVO.reconstitute(raw.failureReason)
          : undefined,
        failureCode: raw.failureCode ? FailureCodeVO.reconstitute(raw.failureCode) : undefined,
        metadata: (raw.metadata as Readonly<Record<string, unknown>>) ?? undefined,
      },
    });
  }

  static toPersistence(entity: PaymentEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value,
      method: entity.method.value,
      gateway: entity.gateway?.value ?? null,
      amount: entity.amount,
      currency: entity.currency,
      gatewayPaymentId: entity.gatewayPaymentId?.value ?? null,
      gatewaySignature: entity.gatewaySignature?.value ?? null,
      idempotencyKey: entity.idempotencyKey?.value ?? null,
      refundedAmount: entity.refundedAmount,
      retryAttempts: entity.retryAttempts,
      authorizedAt: entity.authorizedAt ? new Date(entity.authorizedAt) : null,
      capturedAt: entity.capturedAt ? new Date(entity.capturedAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      expiredAt: entity.expiredAt ? new Date(entity.expiredAt) : null,
      failureReason: entity.failureReason?.value ?? null,
      failureCode: entity.failureCode?.value ?? null,
      metadata: entity.metadata ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
