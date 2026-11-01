/**
 * PaymentPrismaMapper — row ↔ PaymentEntity
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentStatusVO } from '@domain/primitives/payment-status.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '@domain/primitives/payment-currency.vo';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { GatewayReferenceVO } from '@domain/primitives/gateway-reference.vo';

export interface PrismaPaymentRow {
  id: string;
  orderId: string;
  userId: string;
  status: string;
  method: string;
  methodType: string;
  provider: string | null;
  providerEnv: string | null;
  amount: unknown;
  currency: string;
  gatewayReference: string | null;
  authorizedAt: Date | null;
  capturedAt: Date | null;
  paidAt: Date | null;
  refundedAmount: unknown | null;
  failureReason: string | null;
  failureCode: string | null;
  metadata: unknown | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};

export const toIso = (d: Date | null | undefined): string | undefined =>
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
        amount: PaymentAmountVO.reconstitute(toNum(raw.amount), raw.currency),
        currency: PaymentCurrencyVO.reconstitute(raw.currency),
        status: PaymentStatusVO.create(raw.status),
        method: PaymentMethodTypeVO.reconstitute(raw.method as never, raw.methodType as never),
        provider:
          raw.provider && raw.providerEnv
            ? PaymentMethodProviderVO.reconstitute(
                raw.provider as never,
                raw.providerEnv as never,
              )
            : undefined,
        gatewayReference: raw.gatewayReference
          ? GatewayReferenceVO.reconstitute(raw.gatewayReference)
          : undefined,
        authorizedAt: toIso(raw.authorizedAt),
        capturedAt: toIso(raw.capturedAt),
        paidAt: toIso(raw.paidAt),
        refundedAmount:
          raw.refundedAmount !== null ? toNum(raw.refundedAmount) : undefined,
        failureReason: raw.failureReason ?? undefined,
        failureCode: raw.failureCode ?? undefined,
        metadata: (raw.metadata as Readonly<Record<string, unknown>>) ?? undefined,
      },
    });
  }

  static toPersistence(entity: PaymentEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      userId: entity.userId.value,
      status: entity.status.value,
      method: entity.method.method,
      methodType: entity.method.type,
      provider: entity.provider?.provider ?? null,
      providerEnv: entity.provider?.env ?? null,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      gatewayReference: entity.gatewayReference?.value ?? null,
      authorizedAt: entity.authorizedAt ? new Date(entity.authorizedAt) : null,
      capturedAt: entity.capturedAt ? new Date(entity.capturedAt) : null,
      paidAt: entity.paidAt ? new Date(entity.paidAt) : null,
      refundedAmount: entity.refundedAmount || null,
      failureReason: entity.failureReason ?? null,
      failureCode: entity.failureCode ?? null,
      metadata: entity.metadata ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
