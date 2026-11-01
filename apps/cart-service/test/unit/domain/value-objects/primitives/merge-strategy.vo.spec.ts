/**
 * MergeStrategyVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('MergeStrategyVO', () => {
  it('create() accepts valid strategies', () => {
    const list = ['sum_quantity', 'max_quantity', 'keep_latest', 'keep_existing', 'replace'];
    for (const s of list) {
      expect(MergeStrategyVO.create(s).value).toBe(s);
    }
  });

  it('create() throws on invalid', () => {
    expect(() => MergeStrategyVO.create('bogus')).toThrow(ValidationError);
  });

  describe('mergeQuantities()', () => {
    it('sum_quantity', () => {
      const v = MergeStrategyVO.sumQuantity();
      expect(v.mergeQuantities(2, 3)).toBe(5);
    });

    it('max_quantity', () => {
      const v = MergeStrategyVO.create('max_quantity');
      expect(v.mergeQuantities(2, 5)).toBe(5);
      expect(v.mergeQuantities(5, 2)).toBe(5);
    });

    it('keep_latest', () => {
      const v = MergeStrategyVO.create('keep_latest');
      expect(v.mergeQuantities(2, 5)).toBe(5);
    });

    it('keep_existing', () => {
      const v = MergeStrategyVO.create('keep_existing');
      expect(v.mergeQuantities(2, 5)).toBe(2);
    });

    it('replace', () => {
      const v = MergeStrategyVO.create('replace');
      expect(v.mergeQuantities(2, 5)).toBe(5);
    });
  });

  describe('predicates', () => {
    it('isSumQuantity()', () => {
      expect(MergeStrategyVO.sumQuantity().isSumQuantity()).toBe(true);
      expect(MergeStrategyVO.create('max_quantity').isSumQuantity()).toBe(false);
    });
    it('isMaxQuantity()', () => {
      expect(MergeStrategyVO.create('max_quantity').isMaxQuantity()).toBe(true);
    });
  });
});
