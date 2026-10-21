/**
 * InvoiceGeneratorService — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { InvoiceGeneratorService } from '@infrastructure/services/internal/invoice-generator.service';

describe('InvoiceGeneratorService', () => {
  let service: InvoiceGeneratorService;

  beforeEach(() => {
    service = new InvoiceGeneratorService();
  });

  describe('generateNumber()', () => {
    it('returns INV-YYYY-NNNNNN format (matches shared-utils generator)', () => {
      const num = service.generateNumber();
      expect(num).toMatch(/^INV-\d{4}-\d{6}$/);
    });

    it('uses custom date year', () => {
      const date = new Date('2030-05-15');
      const num = service.generateNumber(date);
      expect(num).toContain('2030');
    });

    it('generates unique numbers', () => {
      const a = service.generateNumber();
      const b = service.generateNumber();
      expect(a).not.toBe(b);
    });

    it('always starts with INV-', () => {
      const num = service.generateNumber();
      expect(num.startsWith('INV-')).toBe(true);
    });
  });

  describe('renderHtml()', () => {
    it('includes invoice number + amounts', () => {
      const html = service.renderHtml({
        invoiceNumber: 'INV-2025-000123',
        userId: 'u1',
        subtotal: 1000,
        taxAmount: 150,
        total: 1150,
        currency: 'BDT',
        issuedAt: '2025-01-15T10:00:00.000Z',
      });
      expect(html).toContain('INV-2025-000123');
      expect(html).toContain('1000.00');
      expect(html).toContain('150.00');
      expect(html).toContain('1150.00');
      expect(html).toContain('BDT');
    });

    it('renders notes when provided', () => {
      const html = service.renderHtml({
        invoiceNumber: 'INV-1',
        userId: 'u',
        subtotal: 100,
        taxAmount: 0,
        total: 100,
        currency: 'BDT',
        issuedAt: '2025-01-15',
        notes: 'Thanks for your business',
      });
      expect(html).toContain('Thanks for your business');
    });

    it('includes issuedAt date', () => {
      const html = service.renderHtml({
        invoiceNumber: 'INV-1',
        userId: 'u',
        subtotal: 100,
        taxAmount: 0,
        total: 100,
        currency: 'BDT',
        issuedAt: '2025-01-15T10:00:00.000Z',
      });
      expect(html).toContain('2025-01-15');
    });
  });
});
