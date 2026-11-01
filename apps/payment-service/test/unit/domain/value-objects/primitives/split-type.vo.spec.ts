/**
 * SplitTypeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SplitTypeVO', () => {
  describe('create()', () => {
    it('accepts all valid types', () => {
      for (const t of ['percentage', 'fixed', 'equal', 'custom']) {
        expect(SplitTypeVO.create(t).value).toBe(t);
      }
    });
    it('normalizes case', () => {
      expect(SplitTypeVO.create('PERCENTAGE').value).toBe('percentage');
    });
    it('throws on invalid', () => {
      expect(() => SplitTypeVO.create('unknown')).toThrow(ValidationError);
    });
    it('throws on non-string', () => {
      expect(() => SplitTypeVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves value', () => {
      expect(SplitTypeVO.reconstitute('percentage').value).toBe('percentage');
    });
  });

  describe('predicates', () => {
    it('isPercentage', () => expect(SplitTypeVO.create('percentage').isPercentage()).toBe(true));
    it('isFixed', () => expect(SplitTypeVO.create('fixed').isFixed()).toBe(true));
    it('isEqual', () => expect(SplitTypeVO.create('equal').isEqual()).toBe(true));
    it('isCustom', () => expect(SplitTypeVO.create('custom').isCustom()).toBe(true));
  });
});
