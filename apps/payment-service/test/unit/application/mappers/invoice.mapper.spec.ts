/**
 * InvoiceMapper — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceMapper } from '@application/mappers/invoice.mapper';
import type { InvoiceEntity } from '@domain/entities/invoice.entity';

function makeMockEntity(): InvoiceEntity {
  return {
    id: 'inv-1',
    invoiceNumber: { value: 'INV-2025-000001' },
    userId: { value: 'user-1' },
    orderId: { value: 'order-1' },
    status: { value: 'issued' },
    amount: { subtotal: 1000, taxAmount: 150, total: 1150, currency: 'BDT' },
    issuedAt: '2025-01-15T10:00:00.000Z',
    dueAt: '2025-02-15T10:00:00.000Z',
    paidAt: undefined,
    voidedAt: undefined,
    refundedAt: undefined,
    notes: 'Test invoice',
    createdAt: '2025-01-15T10:00:00.000Z',
    updatedAt: '2025-01-15T10:00:00.000Z',
  } as unknown as InvoiceEntity;
}

describe('InvoiceMapper', () => {
  describe('toResponse', () => {
    it('should map full invoice', () => {
      const dto = InvoiceMapper.toResponse(makeMockEntity());
      expect(dto.id).toBe('inv-1');
      expect(dto.invoiceNumber).toBe('INV-2025-000001');
      expect(dto.subtotal).toBe(1000);
      expect(dto.taxAmount).toBe(150);
      expect(dto.total).toBe(1150);
      expect(dto.notes).toBe('Test invoice');
    });

    it('should handle missing orderId', () => {
      const entity = { ...makeMockEntity(), orderId: undefined } as unknown as InvoiceEntity;
      const dto = InvoiceMapper.toResponse(entity);
      expect(dto.orderId).toBeUndefined();
    });
  });

  describe('toSummary', () => {
    it('should map summary', () => {
      const dto = InvoiceMapper.toSummary(makeMockEntity());
      expect(dto.invoiceNumber).toBe('INV-2025-000001');
      expect(dto.total).toBe(1150);
    });
  });

  describe('toListResponse', () => {
    it('should paginate', () => {
      const dto = InvoiceMapper.toListResponse([makeMockEntity()], 1, 1, 10);
      expect(dto.items).toHaveLength(1);
      expect(dto.totalPages).toBe(1);
    });
  });
});
