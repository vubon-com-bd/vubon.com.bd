/**
 * InvoiceNumberService unit tests
 *
 * ⚠️ Known design mismatch (not a test bug):
 *    - generate() returns INV-YYYY-[A-Z0-9]{6,8}
 *    - isInvoiceNumber() accepts ONLY INV-YYYY-\d{6} (numeric)
 *
 * This spec tests the CURRENT behavior, not ideal behavior.
 * A refactor should align isInvoiceNumber() to accept both formats.
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceNumberService } from '@domain/services/invoice-number.service';

describe('InvoiceNumberService', () => {
  describe('generate()', () => {
    it('returns INV-YYYY-{alphanumeric suffix}', () => {
      const num = InvoiceNumberService.generate(new Date('2025-06-15'));
      // nanoid strips `_`/`-` after gen, so suffix is 6-8 chars
      expect(num).toMatch(/^INV-\d{4}-[A-Z0-9]{6,8}$/);
      expect(num.startsWith('INV-2025-')).toBe(true);
    });

    it('uses current date when no arg given', () => {
      const num = InvoiceNumberService.generate();
      const year = new Date().getFullYear();
      expect(num.startsWith(`INV-${year}-`)).toBe(true);
    });

    it('two calls produce different numbers', () => {
      const a = InvoiceNumberService.generate();
      const b = InvoiceNumberService.generate();
      expect(a).not.toBe(b);
    });
  });

  describe('isInvoiceNumber() — current strict numeric behavior', () => {
    it('true for INV-YYYY-NNNNNN', () => {
      expect(InvoiceNumberService.isInvoiceNumber('INV-2025-000123')).toBe(true);
    });

    it('false for alphanumeric (design gap — see module doc)', () => {
      expect(InvoiceNumberService.isInvoiceNumber('INV-2025-XCHTRSL')).toBe(false);
    });

    it('false for wrong prefix', () => {
      expect(InvoiceNumberService.isInvoiceNumber('XXX-2025-000123')).toBe(false);
    });

    it('false for short year', () => {
      expect(InvoiceNumberService.isInvoiceNumber('INV-25-123456')).toBe(false);
    });

    it('false for empty', () => {
      expect(InvoiceNumberService.isInvoiceNumber('')).toBe(false);
    });
  });

  describe('yearOf()', () => {
    it('parses year from numeric invoice', () => {
      expect(InvoiceNumberService.yearOf('INV-2025-000123')).toBe(2025);
    });

    it('parses year from any INV-YYYY-*', () => {
      expect(InvoiceNumberService.yearOf('INV-2030-XCHTRSL')).toBe(2030);
    });
  });

  describe('sequenceOf()', () => {
    it('parses numeric sequence', () => {
      expect(InvoiceNumberService.sequenceOf('INV-2025-000123')).toBe(123);
    });
  });
});
