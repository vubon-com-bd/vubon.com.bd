import { Injectable } from '@nestjs/common';
import { Transaction as PrismaTransaction } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TransactionEntity } from '../../../../domain/entities/transaction.entity';
import { TransactionIdVO } from '../../../../domain/value-objects/primitives/transaction-id.vo';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo';
import { PaymentAmountVO } from '../../../../domain/value-objects/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../../../../domain/value-objects/primitives/payment-currency.vo';
import { TransactionTypeVO } from '../../../../domain/value-objects/primitives/transaction-type.vo';
import { TransactionStatusVO } from '../../../../domain/value-objects/primitives/transaction-status.vo';
import type { TransactionRepository } from '../../../../domain/repositories/transaction.repository.interface';

@Injectable()
export class TransactionPrismaRepository
  extends BasePrismaRepository<TransactionEntity, TransactionIdVO>
  implements TransactionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTransaction): TransactionEntity {
    return TransactionEntity.reconstitute(
      TransactionIdVO.create(raw.id),
      {
        paymentId: PaymentIdVO.create(raw.paymentId),
        type: TransactionTypeVO.create(raw.type),
        status: TransactionStatusVO.create(raw.status),
        amount: PaymentAmountVO.create(Number(raw.amount)),
        currency: PaymentCurrencyVO.create(raw.currency),
        gatewayTransactionId: raw.gatewayTransactionId,
        reference: raw.reference,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: TransactionIdVO): Promise<TransactionEntity | null> {
    const raw = await this.prisma.transaction.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TransactionEntity[]> {
    const rows = await this.prisma.transaction.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TransactionEntity): Promise<TransactionEntity> {
    const data = {
      paymentId: entity.paymentId.value,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      gatewayTransactionId: entity.gatewayTransactionId,
      reference: entity.reference,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.transaction.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TransactionIdVO): Promise<void> {
    await this.prisma.transaction.delete({ where: { id: id.value } });
  }

  async findByPaymentId(paymentId: PaymentIdVO): Promise<readonly TransactionEntity[]> {
    const rows = await this.prisma.transaction.findMany({
      where: { paymentId: paymentId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
