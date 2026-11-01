import { describe, it, expect } from '@jest/globals';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';

describe('MergeStrategyVO — extended', () => {
  it('predicates', () => {
    expect(MergeStrategyVO.create('keep_latest').isKeepLatest()).toBe(true);
    expect(MergeStrategyVO.create('keep_existing').isKeepExisting()).toBe(true);
    expect(MergeStrategyVO.create('replace').isReplace()).toBe(true);
  });

  it('reconstitute()', () => {
    expect(MergeStrategyVO.reconstitute('sum_quantity').value).toBe('sum_quantity');
  });
});
