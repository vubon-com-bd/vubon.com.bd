/**
 * OrderIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('OrderIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      expect(OrderIdVO.create(TEST_IDS.ORDER_ID).value).toBe(TEST_IDS.ORDER_ID);
    });
    it('throws on empty', () => {
      expect(() => OrderIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => OrderIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });
  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(OrderIdVO.reconstitute('x').value).toBe('x');
    });
  });
  describe('equality', () => {
    it('equal same', () => {
      expect(OrderIdVO.create(TEST_IDS.ORDER_ID).equals(OrderIdVO.create(TEST_IDS.ORDER_ID))).toBe(true);
    });
  });
});
