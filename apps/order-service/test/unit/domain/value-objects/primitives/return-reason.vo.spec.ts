/**
 * ReturnReasonVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { ReturnReasonVO } from '@domain/primitives/return-reason.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ReturnReasonVO', () => {
  describe('create', () => {
    it.each([
      'defective', 'wrong_item', 'not_as_described', 'size_issue',
      'changed_mind', 'damaged_in_transit', 'missing_parts', 'other',
    ])('accepts "%s"', (r) => expect(ReturnReasonVO.create(r).value).toBe(r));
    it('normalizes to lowercase', () => {
      expect(ReturnReasonVO.create('DEFECTIVE').value).toBe('defective');
    });
    it('throws for invalid', () => {
      expect(() => ReturnReasonVO.create('x')).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(ReturnReasonVO.reconstitute('legacy').value).toBe('legacy');
    });
  });

  describe('isDefective', () => {
    it('true for defective types', () => {
      expect(ReturnReasonVO.create('defective').isDefective()).toBe(true);
      expect(ReturnReasonVO.create('damaged_in_transit').isDefective()).toBe(true);
      expect(ReturnReasonVO.create('missing_parts').isDefective()).toBe(true);
    });
    it('false for non-defective', () => {
      expect(ReturnReasonVO.create('changed_mind').isDefective()).toBe(false);
      expect(ReturnReasonVO.create('wrong_item').isDefective()).toBe(false);
      expect(ReturnReasonVO.create('size_issue').isDefective()).toBe(false);
    });
  });

  describe('isChangeOfMind', () => {
    it('true for changed_mind', () => {
      expect(ReturnReasonVO.create('changed_mind').isChangeOfMind()).toBe(true);
    });
    it('false for others', () => {
      expect(ReturnReasonVO.create('defective').isChangeOfMind()).toBe(false);
    });
  });
});
