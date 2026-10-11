import { describe, it, expect } from '@jest/globals';
import { DigestStatusVO } from '../../../../src/module/domain/value-objects/primitives/digest-status.vo.js';

describe('DigestStatusVO', () => {
  it('create + reconstitute', () => {
    expect(DigestStatusVO.create('pending').value).toBe('pending');
    expect(() => DigestStatusVO.create('bad')).toThrow();
    expect(DigestStatusVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(DigestStatusVO.pending().value).toBe('pending');
    expect(DigestStatusVO.generating().value).toBe('generating');
    expect(DigestStatusVO.ready().value).toBe('ready');
    expect(DigestStatusVO.sent().value).toBe('sent');
    expect(DigestStatusVO.failed().value).toBe('failed');
    expect(DigestStatusVO.cancelled().value).toBe('cancelled');
  });
  it('predicates', () => {
    expect(DigestStatusVO.pending().isPending()).toBe(true);
    expect(DigestStatusVO.generating().isGenerating()).toBe(true);
    expect(DigestStatusVO.ready().isReady()).toBe(true);
    expect(DigestStatusVO.sent().isSent()).toBe(true);
    expect(DigestStatusVO.failed().isFailed()).toBe(true);
    expect(DigestStatusVO.cancelled().isCancelled()).toBe(true);
    expect(DigestStatusVO.sent().isFinal()).toBe(true);
    expect(DigestStatusVO.failed().isFinal()).toBe(true);
    expect(DigestStatusVO.cancelled().isFinal()).toBe(true);
    expect(DigestStatusVO.ready().canBeSent()).toBe(true);
  });
});
