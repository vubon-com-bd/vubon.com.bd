import { Injectable } from '@nestjs/common';
import { SplitPayment as PrismaSplitPayment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SplitPaymentEntity } from '../../../../domain/entities/split-payment.entity';
import { SplitIdVO } from '../../../../domain/value-objects/primitives/split-id.vo';
import { SplitAmountVO } from '../../../../domain/value-objects/primitives/split-amount.vo';
import { SplitTypeVO } from '../../../../domain/value-objects/primitives/split-type.vo';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo';
import { PaymentCurrencyVO } from '../../../../domain/value-objects/primitives/payment-currency.vo';
import type { SplitPaymentRepository } from '../../../../domain/repositories/split-payment.repository.interface';

@Injectable()
export class SplitPaymentPrismaRepository
  extends BasePrismaRepository<SplitPaymentEntity, SplitIdVO>
  implements SplitPaymentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSplitPayment): SplitPaymentEntity {
    return SplitPaymentEntity.reconstitute(
      SplitIdVO.create(raw.id),
      {
        paymentId: PaymentIdVO.create(raw.paymentId),
        type: SplitTypeVO.create(raw.splitType),
        amount: SplitAmountVO.create(Number(raw.amount)),
        currency: PaymentCurrencyVO.create(raw.currency),
        recipientId: raw.recipientId,
        status: raw.status,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: SplitIdVO): Promise<SplitPaymentEntity | null> {
    const raw = await this.prisma.splitPayment.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SplitPaymentEntity[]> {
    const rows = await this.prisma.splitPayment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SplitPaymentEntity): Promise<SplitPaymentEntity> {
    const data = {
      paymentId: entity.paymentId.value,
      splitType: entity.type.value,
      amount: entity.amount.amount,
      recipientId: entity.recipientId,
      currency: entity.currency.value,
      status: entity.status,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.splitPayment.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SplitIdVO): Promise<void> {
    await this.prisma.splitPayment.delete({ where: { id: id.value } });
  }

  async findByPaymentId(paymentId: PaymentIdVO): Promise<readonly SplitPaymentEntity[]> {
    const rows = await this.prisma.splitPayment.findMany({
      where: { paymentId: paymentId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
