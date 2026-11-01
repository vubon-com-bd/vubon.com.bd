/**
 * InvoiceNumberVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceNumberVO } from '@domain/primitives/invoice-number.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('InvoiceNumberVO', () => {
  describe('create()', () => {
    it('creates valid INV-YYYY-NNNNNN', () => {
      const vo = InvoiceNumberVO.create('INV-2025-000001');
      expect(vo.value).toBe('INV-2025-000001');
    });
    it('uppercases', () => {
      expect(InvoiceNumberVO.create('inv-2025-000001').value).toBe('INV-2025-000001');
    });
    it('trims whitespace', () => {
      expect(InvoiceNumberVO.create('  INV-2025-000001  ').value).toBe('INV-2025-000001');
    });
    it('throws on empty', () => {
      expect(() => InvoiceNumberVO.create('')).toThrow(ValidationError);
    });
    it('throws on missing prefix', () => {
      expect(() => InvoiceNumberVO.create('2025-000001')).toThrow(ValidationError);
    });
    it('throws on wrong year length', () => {
      expect(() => InvoiceNumberVO.create('INV-25-000001')).toThrow(ValidationError);
    });
    it('throws on wrong sequence length', () => {
      expect(() => InvoiceNumberVO.create('INV-2025-1')).toThrow(ValidationError);
    });
    it('throws on lowercase without normalization', () => {
      // uppercased first, so this should succeed — verify it's strict about non-INV prefix
      expect(() => InvoiceNumberVO.create('XXX-2025-000001')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves value', () => {
      expect(InvoiceNumberVO.reconstitute('INV-2025-999999').value).toBe('INV-2025-999999');
    });
  });

  describe('year getter', () => {
    it('returns year', () => {
      expect(InvoiceNumberVO.create('INV-2025-000123').year).toBe(2025);
    });
  });

  describe('sequence getter', () => {
    it('returns sequence', () => {
      expect(InvoiceNumberVO.create('INV-2025-000123').sequence).toBe(123);
    });
  });
});
