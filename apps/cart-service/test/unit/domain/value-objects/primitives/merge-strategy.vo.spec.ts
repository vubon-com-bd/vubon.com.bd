/**
 * MergeStrategyVO — Unit Tests
 */
import { MergeStrategyVO } from '../../../../../src/module/domain/value-objects/primitives/merge-strategy.vo.js';
import { MERGE_STRATEGY } from '@vubon/shared-constants/business/cart';

describe('MergeStrategyVO', () => {
  describe('create()', () => {
    it('accepts each valid strategy', () => {
      Object.values(MERGE_STRATEGY).forEach((s) => {
        const vo = MergeStrategyVO.create(s);
        expect(vo.value).toBe(s);
      });
    });

    it('throws on invalid strategy', () => {
      expect(() => MergeStrategyVO.create('invalid')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => MergeStrategyVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(MergeStrategyVO.reconstitute('custom').value).toBe('custom');
    });
  });

  describe('default()', () => {
    it('returns SUM_QUANTITY', () => {
      expect(MergeStrategyVO.default().value).toBe(MERGE_STRATEGY.SUM_QUANTITY);
    });
  });

  describe('isX() methods', () => {
    it('isSumQuantity()', () => {
      expect(MergeStrategyVO.create(MERGE_STRATEGY.SUM_QUANTITY).isSumQuantity()).toBe(true);
      expect(MergeStrategyVO.create(MERGE_STRATEGY.MAX_QUANTITY).isSumQuantity()).toBe(false);
    });

    it('isMaxQuantity()', () => {
      expect(MergeStrategyVO.create(MERGE_STRATEGY.MAX_QUANTITY).isMaxQuantity()).toBe(true);
    });

    it('isKeepLatest()', () => {
      expect(MergeStrategyVO.create(MERGE_STRATEGY.KEEP_LATEST).isKeepLatest()).toBe(true);
    });

    it('isKeepExisting()', () => {
      expect(MergeStrategyVO.create(MERGE_STRATEGY.KEEP_EXISTING).isKeepExisting()).toBe(true);
    });

    it('isReplace()', () => {
      expect(MergeStrategyVO.create(MERGE_STRATEGY.REPLACE).isReplace()).toBe(true);
    });
  });

  describe('combine()', () => {
    const MAX = 999;

    it('SUM_QUANTITY: 5 + 3 = 8', () => {
      const s = MergeStrategyVO.create(MERGE_STRATEGY.SUM_QUANTITY);
      expect(s.combine(5, 3, MAX)).toBe(8);
    });

    it('MAX_QUANTITY: max(5, 3) = 5', () => {
      const s = MergeStrategyVO.create(MERGE_STRATEGY.MAX_QUANTITY);
      expect(s.combine(5, 3, MAX)).toBe(5);
      expect(s.combine(3, 5, MAX)).toBe(5);
    });

    it('KEEP_LATEST: returns incoming', () => {
      const s = MergeStrategyVO.create(MERGE_STRATEGY.KEEP_LATEST);
      expect(s.combine(5, 3, MAX)).toBe(3);
    });

    it('KEEP_EXISTING: returns existing', () => {
      const s = MergeStrategyVO.create(MERGE_STRATEGY.KEEP_EXISTING);
      expect(s.combine(5, 3, MAX)).toBe(5);
    });

    it('REPLACE: returns incoming', () => {
      const s = MergeStrategyVO.create(MERGE_STRATEGY.REPLACE);
      expect(s.combine(5, 3, MAX)).toBe(3);
    });

    it('SUM_QUANTITY capped at maxAllowed', () => {
      const s = MergeStrategyVO.create(MERGE_STRATEGY.SUM_QUANTITY);
      expect(s.combine(900, 200, MAX)).toBe(MAX);
    });

    it('MAX_QUANTITY capped at maxAllowed', () => {
      const s = MergeStrategyVO.create(MERGE_STRATEGY.MAX_QUANTITY);
      expect(s.combine(1200, 500, MAX)).toBe(MAX);
    });
  });
});
