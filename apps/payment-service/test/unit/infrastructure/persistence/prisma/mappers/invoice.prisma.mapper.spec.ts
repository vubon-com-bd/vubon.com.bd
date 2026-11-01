/**
 * InvoicePrismaMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { InvoicePrismaMapper } from '@infrastructure/mappers/invoice.prisma.mapper';
import { InvoiceEntity } from '@domain/entities/invoice.entity';

const ROW = {
  id: '99999999-9999-4999-8999-999999999999',
  invoiceNumber: 'INV-2025-000123',
  userId: '33333333-3333-4333-8333-333333333333',
  orderId: '22222222-2222-4222-8222-222222222222',
  status: 'issued',
  subtotal: 1000,
  taxAmount: 150,
  total: 1150,
  currency: 'BDT',
  issuedAt: new Date('2025-01-15T10:00:00.000Z'),
  dueAt: new Date('2025-02-15T10:00:00.000Z'),
  paidAt: null,
  voidedAt: null,
  refundedAt: null,
  notes: 'Thanks',
  createdAt: new Date('2025-01-14T10:00:00.000Z'),
  updatedAt: new Date('2025-01-15T10:00:00.000Z'),
  deletedAt: null,
};

describe('InvoicePrismaMapper', () => {
  it('maps an issued invoice', () => {
    const entity = InvoicePrismaMapper.toDomain(ROW);
    expect(entity).toBeInstanceOf(InvoiceEntity);
    expect(entity.invoiceNumber.value).toBe('INV-2025-000123');
    expect(entity.status.isIssued()).toBe(true);
    expect(entity.amount.subtotal).toBe(1000);
    expect(entity.amount.taxAmount).toBe(150);
    expect(entity.amount.total).toBe(1150);
    expect(entity.orderId?.value).toBe(ROW.orderId);
    expect(entity.notes).toBe('Thanks');
  });

  it('maps a paid invoice', () => {
    const entity = InvoicePrismaMapper.toDomain({
      ...ROW,
      status: 'paid',
      paidAt: new Date('2025-01-20T10:00:00.000Z'),
    });
    expect(entity.isPaid()).toBe(true);
    expect(entity.paidAt).toBe('2025-01-20T10:00:00.000Z');
  });

  it('handles null orderId', () => {
    const entity = InvoicePrismaMapper.toDomain({ ...ROW, orderId: null });
    expect(entity.orderId).toBeUndefined();
  });

  it('round-trips via toPersistence', () => {
    const entity = InvoicePrismaMapper.toDomain(ROW);
    const data = InvoicePrismaMapper.toPersistence(entity);
    expect(data['invoiceNumber']).toBe('INV-2025-000123');
    expect(data['subtotal']).toBe(1000);
    expect(data['taxAmount']).toBe(150);
    expect(data['total']).toBe(1150);
  });
});
