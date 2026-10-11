import { describe, it, expect } from '@jest/globals';
import { DigestTypeVO } from '../../../../src/module/domain/value-objects/primitives/digest-type.vo.js';

describe('DigestTypeVO', () => {
  it('create + reconstitute', () => {
    expect(DigestTypeVO.create('summary').value).toBe('summary');
    expect(() => DigestTypeVO.create('bad')).toThrow();
    expect(DigestTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(DigestTypeVO.summary().value).toBe('summary');
    expect(DigestTypeVO.detailed().value).toBe('detailed');
    expect(DigestTypeVO.categorized().value).toBe('categorized');
    expect(DigestTypeVO.priorityBased().value).toBe('priority_based');
  });
});
