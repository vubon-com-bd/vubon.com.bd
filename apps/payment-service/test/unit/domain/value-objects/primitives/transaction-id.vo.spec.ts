/**
 * TransactionIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('TransactionIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      const vo = TransactionIdVO.create(TEST_IDS.TRANSACTION_ID);
      expect(vo.value).toBe(TEST_IDS.TRANSACTION_ID);
    });
    it('trims whitespace', () => {
      const vo = TransactionIdVO.create(`  ${TEST_IDS.TRANSACTION_ID}  `);
      expect(vo.value).toBe(TEST_IDS.TRANSACTION_ID);
    });
    it('throws on empty', () => {
      expect(() => TransactionIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => TransactionIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(TransactionIdVO.reconstitute('x').value).toBe('x');
    });
  });

  describe('equality', () => {
    it('equal for same', () => {
      expect(TransactionIdVO.create(TEST_IDS.TRANSACTION_ID).equals(
        TransactionIdVO.create(TEST_IDS.TRANSACTION_ID),
      )).toBe(true);
    });
  });
});
