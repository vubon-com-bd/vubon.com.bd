/**
 * InvoicePrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { InvoiceEntity } from '@domain/entities/invoice.entity';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '@domain/primitives/invoice-number.vo';
import { InvoiceStatusVO } from '@domain/primitives/invoice-status.vo';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { toNum, toIso } from './payment.prisma.mapper.js';

export interface PrismaInvoiceRow {
  id: string;
  invoiceNumber: string;
  userId: string;
  orderId: string | null;
  status: string;
  subtotal: unknown;
  taxAmount: unknown;
  total: unknown;
  currency: string;
  issuedAt: Date | null;
  dueAt: Date | null;
  paidAt: Date | null;
  voidedAt: Date | null;
  refundedAt: Date | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class InvoicePrismaMapper {
  static toDomain(raw: PrismaInvoiceRow): InvoiceEntity {
    return InvoiceEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        invoiceNumber: InvoiceNumberVO.reconstitute(raw.invoiceNumber),
        status: InvoiceStatusVO.create(raw.status),
        amount: InvoiceAmountVO.reconstitute(
          toNum(raw.subtotal),
          toNum(raw.taxAmount),
          toNum(raw.total),
          raw.currency,
        ),
        userId: UserIdVO.reconstitute(raw.userId),
        orderId: raw.orderId ? OrderIdVO.reconstitute(raw.orderId) : undefined,
        issuedAt: toIso(raw.issuedAt),
        dueAt: toIso(raw.dueAt),
        paidAt: toIso(raw.paidAt),
        voidedAt: toIso(raw.voidedAt),
        refundedAt: toIso(raw.refundedAt),
        notes: raw.notes ?? undefined,
      },
    });
  }

  static toPersistence(entity: InvoiceEntity): Record<string, unknown> {
    return {
      id: entity.id,
      invoiceNumber: entity.invoiceNumber.value,
      userId: entity.userId.value,
      orderId: entity.orderId?.value ?? null,
      status: entity.status.value,
      subtotal: entity.amount.subtotal,
      taxAmount: entity.amount.taxAmount,
      total: entity.amount.total,
      currency: entity.amount.currency,
      issuedAt: entity.issuedAt ? new Date(entity.issuedAt) : null,
      dueAt: entity.dueAt ? new Date(entity.dueAt) : null,
      paidAt: entity.paidAt ? new Date(entity.paidAt) : null,
      voidedAt: entity.voidedAt ? new Date(entity.voidedAt) : null,
      refundedAt: entity.refundedAt ? new Date(entity.refundedAt) : null,
      notes: entity.notes ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
