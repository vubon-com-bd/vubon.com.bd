/**
 * VendorInvoicePrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorInvoice as PrismaVendorInvoice } from '@prisma/client';
import { VendorInvoiceEntity } from '../../../../domain/entities/vendor-invoice.entity.js';
import { InvoiceNumberVO } from '../../../../domain/value-objects/primitives/invoice-number.vo.js';
import { InvoiceStatusVO } from '../../../../domain/value-objects/primitives/invoice-status.vo.js';
import { InvoiceTypeVO } from '../../../../domain/value-objects/primitives/invoice-type.vo.js';

export class VendorInvoicePrismaMapper {
  static toDomain(row: PrismaVendorInvoice): VendorInvoiceEntity {
    return VendorInvoiceEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        invoiceNumber: InvoiceNumberVO.reconstitute(row.invoiceNumber),
        type: InvoiceTypeVO.create(row.type),
        status: InvoiceStatusVO.create(row.status),
        amount: Number(row.amount),
        taxAmount: Number(row.taxAmount),
        totalAmount: Number(row.totalAmount),
        currency: row.currency,
        issueDate: row.issueDate.toISOString(),
        dueDate: row.dueDate.toISOString(),
        paidAt: row.paidAt?.toISOString(),
        periodStart: row.periodStart?.toISOString(),
        periodEnd: row.periodEnd?.toISOString(),
        orderIds: row.orderIds,
        notes: row.notes ?? undefined,
        pdfUrl: row.pdfUrl ?? undefined,
      },
    });
  }

  static toPersistence(entity: VendorInvoiceEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      invoiceNumber: entity.invoiceNumber.value,
      type: entity.type.value,
      status: entity.status.value,
      amount: entity.amount,
      taxAmount: entity.taxAmount,
      totalAmount: entity.totalAmount,
      currency: entity.currency,
      issueDate: new Date(entity.issueDate),
      dueDate: new Date(entity.dueDate),
      paidAt: entity.paidAt ? new Date(entity.paidAt) : null,
      periodStart: entity.periodStart ? new Date(entity.periodStart) : null,
      periodEnd: entity.periodEnd ? new Date(entity.periodEnd) : null,
      orderIds: [...entity.orderIds],
      notes: entity.notes,
      pdfUrl: entity.pdfUrl,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
