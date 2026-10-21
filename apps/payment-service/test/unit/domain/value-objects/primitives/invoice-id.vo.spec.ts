/**
 * InvoiceIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('InvoiceIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      expect(InvoiceIdVO.create(TEST_IDS.INVOICE_ID).value).toBe(TEST_IDS.INVOICE_ID);
    });
    it('trims whitespace', () => {
      expect(InvoiceIdVO.create(`  ${TEST_IDS.INVOICE_ID}  `).value).toBe(TEST_IDS.INVOICE_ID);
    });
    it('throws on empty', () => {
      expect(() => InvoiceIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => InvoiceIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });
  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(InvoiceIdVO.reconstitute('x').value).toBe('x');
    });
  });
  describe('equality', () => {
    it('equal same', () => {
      expect(InvoiceIdVO.create(TEST_IDS.INVOICE_ID).equals(InvoiceIdVO.create(TEST_IDS.INVOICE_ID))).toBe(true);
    });
    it('not equal diff', () => {
      expect(InvoiceIdVO.create(TEST_IDS.INVOICE_ID).equals(InvoiceIdVO.create(TEST_IDS.INVOICE_ID_2))).toBe(false);
    });
  });
});
