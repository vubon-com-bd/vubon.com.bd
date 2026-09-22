import { Injectable } from '@nestjs/common';
import { Refund as PrismaRefund } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { RefundEntity } from '../../../../domain/entities/refund.entity';
import { RefundIdVO } from '../../../../domain/value-objects/primitives/refund-id.vo';
import { RefundAmountVO } from '../../../../domain/value-objects/primitives/refund-amount.vo';
import { RefundStatusVO } from '../../../../domain/value-objects/primitives/refund-status.vo';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo';
import { PaymentCurrencyVO } from '../../../../domain/value-objects/primitives/payment-currency.vo';
import type { RefundRepository } from '../../../../domain/repositories/refund.repository.interface';

@Injectable()
export class RefundPrismaRepository
  extends BasePrismaRepository<RefundEntity, RefundIdVO>
  implements RefundRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaRefund): RefundEntity {
    return RefundEntity.reconstitute(
      RefundIdVO.create(raw.id),
      {
        paymentId: PaymentIdVO.create(raw.paymentId),
        amount: RefundAmountVO.create(Number(raw.amount)),
        currency: PaymentCurrencyVO.create(raw.currency),
        status: RefundStatusVO.create(raw.status),
        reason: raw.reason,
        gatewayRefundId: raw.gatewayRefundId,
        processedAt: raw.processedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: RefundIdVO): Promise<RefundEntity | null> {
    const raw = await this.prisma.refund.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RefundEntity[]> {
    const rows = await this.prisma.refund.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: RefundEntity): Promise<RefundEntity> {
    const data = {
      paymentId: entity.paymentId.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      reason: entity.reason,
      gatewayRefundId: entity.gatewayRefundId,
      processedAt: entity.processedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.refund.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: RefundIdVO): Promise<void> {
    await this.prisma.refund.delete({ where: { id: id.value } });
  }

  async findByPaymentId(paymentId: PaymentIdVO): Promise<readonly RefundEntity[]> {
    const rows = await this.prisma.refund.findMany({
      where: { paymentId: paymentId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findPending(): Promise<readonly RefundEntity[]> {
    const rows = await this.prisma.refund.findMany({
      where: { status: 'pending' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
