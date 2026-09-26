import { Injectable } from '@nestjs/common';
import { RecurringPayment as PrismaRecurringPayment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { RecurringPaymentEntity } from '../../../../domain/entities/recurring-payment.entity';
import { RecurringIdVO } from '../../../../domain/value-objects/primitives/recurring-id.vo';
import { RecurringFrequencyVO } from '../../../../domain/value-objects/primitives/recurring-frequency.vo';
import { RecurringStatusVO } from '../../../../domain/value-objects/primitives/recurring-status.vo';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo';
import { PaymentAmountVO } from '../../../../domain/value-objects/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../../../../domain/value-objects/primitives/payment-currency.vo';
import type { RecurringPaymentRepository } from '../../../../domain/repositories/recurring-payment.repository.interface';

@Injectable()
export class RecurringPaymentPrismaRepository
  extends BasePrismaRepository<RecurringPaymentEntity, RecurringIdVO>
  implements RecurringPaymentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaRecurringPayment): RecurringPaymentEntity {
    return RecurringPaymentEntity.reconstitute(
      RecurringIdVO.create(raw.id),
      {
        paymentId: PaymentIdVO.create(raw.paymentId),
        frequency: RecurringFrequencyVO.create(raw.frequency),
        status: RecurringStatusVO.create(raw.status),
        amount: PaymentAmountVO.create(Number(raw.amount)),
        currency: PaymentCurrencyVO.create(raw.currency),
        nextRunAt: raw.nextRunAt,
        lastRunAt: raw.lastRunAt,
        completedCycles: raw.completedCycles,
        maxCycles: raw.maxCycles,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: RecurringIdVO): Promise<RecurringPaymentEntity | null> {
    const raw = await this.prisma.recurringPayment.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RecurringPaymentEntity[]> {
    const rows = await this.prisma.recurringPayment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: RecurringPaymentEntity): Promise<RecurringPaymentEntity> {
    const data = {
      paymentId: entity.paymentId.value,
      frequency: entity.frequency.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      nextRunAt: entity.nextRunAt,
      lastRunAt: entity.lastRunAt,
      completedCycles: entity.completedCycles,
      maxCycles: entity.maxCycles,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.recurringPayment.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RecurringIdVO): Promise<void> {
    await this.prisma.recurringPayment.delete({ where: { id: id.value } });
  }

  async findByPaymentId(paymentId: PaymentIdVO): Promise<readonly RecurringPaymentEntity[]> {
    const rows = await this.prisma.recurringPayment.findMany({
      where: { paymentId: paymentId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDue(before: Date): Promise<readonly RecurringPaymentEntity[]> {
    const rows = await this.prisma.recurringPayment.findMany({
      where: { status: 'active', nextRunAt: { lte: before } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
