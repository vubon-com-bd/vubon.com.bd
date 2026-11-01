/**
 * TransactionPrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { TransactionEntity } from '@domain/entities/transaction.entity';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { GatewayReferenceVO } from '@domain/primitives/gateway-reference.vo';
import { toNum, toIso } from './payment.prisma.mapper.js';

export interface PrismaTransactionRow {
  id: string;
  paymentId: string;
  type: string;
  status: string;
  amount: unknown;
  currency: string;
  gatewayReference: string | null;
  settledAt: Date | null;
  failureReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class TransactionPrismaMapper {
  static toDomain(raw: PrismaTransactionRow): TransactionEntity {
    return TransactionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        paymentId: PaymentIdVO.reconstitute(raw.paymentId),
        type: TransactionTypeVO.reconstitute(raw.type as never),
        status: TransactionStatusVO.create(raw.status),
        amount: PaymentAmountVO.reconstitute(toNum(raw.amount), raw.currency),
        gatewayReference: raw.gatewayReference
          ? GatewayReferenceVO.reconstitute(raw.gatewayReference)
          : undefined,
        settledAt: toIso(raw.settledAt),
        failureReason: raw.failureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: TransactionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.amount.currency,
      gatewayReference: entity.gatewayReference?.value ?? null,
      settledAt: entity.settledAt ? new Date(entity.settledAt) : null,
      failureReason: entity.failureReason ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
