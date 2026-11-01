/**
 * InvoiceControllerMapper — unit tests
 * @module payment-service/test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceControllerMapper } from '@interfaces/mappers/invoice.controller.mapper';

describe('InvoiceControllerMapper', () => {
  describe('toGenerateAppDto', () => {
    it('maps full DTO', () => {
      const dto = {
        orderId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
        userId: 'b1b2c3d4-e5f6-4789-a012-3456789abcde',
        subtotal: 1000,
        taxAmount: 150,
        currency: 'BDT',
        dueAt: '2024-12-31',
        notes: 'net 30',
      };
      const app = InvoiceControllerMapper.toGenerateAppDto(dto);
      expect(app.subtotal).toBe(1000);
      expect(app.taxAmount).toBe(150);
      expect(app.currency).toBe('BDT');
    });

    it('handles no orderId', () => {
      const dto = {
        userId: 'u1',
        subtotal: 100,
        taxAmount: 15,
        currency: 'BDT',
      };
      const app = InvoiceControllerMapper.toGenerateAppDto(dto);
      expect(app.orderId).toBeUndefined();
    });
  });

  describe('toListOptions', () => {
    it('defaults', () => {
      const opts = InvoiceControllerMapper.toListOptions({});
      expect(opts.page).toBe(1);
      expect(opts.limit).toBe(20);
    });

    it('passes filters', () => {
      const opts = InvoiceControllerMapper.toListOptions({
        page: 2,
        limit: 10,
        userId: 'u1',
        status: 'issued',
        search: 'INV-2024',
      });
      expect(opts.filter?.userId).toBe('u1');
      expect(opts.filter?.search).toBe('INV-2024');
    });
  });

  describe('toHttpResponse', () => {
    it('maps full', () => {
      const app = {
        id: 'i1',
        invoiceNumber: 'INV-2024-000001',
        userId: 'u1',
        orderId: 'o1',
        status: 'issued' as never,
        subtotal: 1000,
        taxAmount: 150,
        total: 1150,
        currency: 'BDT',
        issuedAt: '2024-01-01',
        dueAt: '2024-01-15',
        paidAt: undefined,
        voidedAt: undefined,
        refundedAt: undefined,
        notes: 'net 15',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      };
      const http = InvoiceControllerMapper.toHttpResponse(app);
      expect(http.id).toBe('i1');
      expect(http.total).toBe(1150);
    });
  });

  describe('toSummaryHttp', () => {
    it('maps summary', () => {
      const app = {
        id: 'i1',
        invoiceNumber: 'INV-2024-000001',
        status: 'issued' as never,
        total: 1150,
        currency: 'BDT',
        dueAt: '2024-01-15',
      };
      const http = InvoiceControllerMapper.toSummaryHttp(app);
      expect(http.id).toBe('i1');
    });
  });

  describe('toListHttp', () => {
    it('maps list', () => {
      const app = {
        items: [
          {
            id: 'i1',
            invoiceNumber: 'INV-2024-000001',
            status: 'issued' as never,
            total: 1150,
            currency: 'BDT',
            dueAt: '2024-01-15',
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
      const http = InvoiceControllerMapper.toListHttp(app);
      expect(http.items).toHaveLength(1);
    });
  });

  describe('toStatsHttp', () => {
    it('maps stats', () => {
      const app = {
        total: 10,
        totalAmount: 11500,
        outstandingAmount: 5000,
        currency: 'BDT',
        byStatus: { issued: 5, paid: 5 },
      };
      const http = InvoiceControllerMapper.toStatsHttp(app);
      expect(http.total).toBe(10);
      expect(http.outstandingAmount).toBe(5000);
    });
  });
});
