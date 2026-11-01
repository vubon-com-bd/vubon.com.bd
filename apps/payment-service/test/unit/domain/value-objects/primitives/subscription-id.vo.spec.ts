/**
 * SubscriptionIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SubscriptionIdVO } from '@domain/primitives/subscription-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('SubscriptionIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      expect(SubscriptionIdVO.create(TEST_IDS.SUBSCRIPTION_ID).value).toBe(TEST_IDS.SUBSCRIPTION_ID);
    });
    it('throws on empty', () => {
      expect(() => SubscriptionIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => SubscriptionIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });
  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(SubscriptionIdVO.reconstitute('x').value).toBe('x');
    });
  });
});
