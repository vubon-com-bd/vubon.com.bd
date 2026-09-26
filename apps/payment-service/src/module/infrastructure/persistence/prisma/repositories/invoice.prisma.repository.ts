import { Injectable } from '@nestjs/common';
import { Invoice as PrismaInvoice } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { InvoiceEntity } from '../../../../domain/entities/invoice.entity';
import { InvoiceIdVO } from '../../../../domain/value-objects/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '../../../../domain/value-objects/primitives/invoice-number.vo';
import { InvoiceStatusVO } from '../../../../domain/value-objects/primitives/invoice-status.vo';
import { InvoiceAmountVO } from '../../../../domain/value-objects/primitives/invoice-amount.vo';
import { PaymentCurrencyVO } from '../../../../domain/value-objects/primitives/payment-currency.vo';
import type { InvoiceRepository } from '../../../../domain/repositories/invoice.repository.interface';

@Injectable()
export class InvoicePrismaRepository
  extends BasePrismaRepository<InvoiceEntity, InvoiceIdVO>
  implements InvoiceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaInvoice): InvoiceEntity {
    return InvoiceEntity.reconstitute(
      InvoiceIdVO.create(raw.id),
      {
        number: InvoiceNumberVO.create(raw.number),
        status: InvoiceStatusVO.create(raw.status),
        amount: InvoiceAmountVO.create(Number(raw.amount)),
        currency: PaymentCurrencyVO.create(raw.currency),
        userId: raw.userId,
        orderId: raw.orderId,
        subscriptionId: raw.subscriptionId,
        dueAt: raw.dueAt,
        paidAt: raw.paidAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: InvoiceIdVO): Promise<InvoiceEntity | null> {
    const raw = await this.prisma.invoice.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly InvoiceEntity[]> {
    const rows = await this.prisma.invoice.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: InvoiceEntity): Promise<InvoiceEntity> {
    const data = {
      subscriptionId: entity.subscriptionId,
      orderId: entity.orderId,
      userId: entity.userId,
      number: entity.number.value,
      status: entity.status.value,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      dueAt: entity.dueAt,
      paidAt: entity.paidAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.invoice.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: InvoiceIdVO): Promise<void> {
    await this.prisma.invoice.delete({ where: { id: id.value } });
  }

  async findByNumber(number: InvoiceNumberVO): Promise<InvoiceEntity | null> {
    const raw = await this.prisma.invoice.findUnique({
      where: { number: number.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findOverdue(before: Date): Promise<readonly InvoiceEntity[]> {
    const rows = await this.prisma.invoice.findMany({
      where: { status: 'open', dueAt: { lt: before } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
