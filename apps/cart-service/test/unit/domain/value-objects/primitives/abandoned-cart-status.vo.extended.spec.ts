/**
 * AbandonedCartStatusVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { AbandonedCartStatusVO } from '@domain/value-objects/primitives/abandoned-cart-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('AbandonedCartStatusVO — extended', () => {
  it.each(['pending', 'reminded', 'recovered', 'lost', 'unsubscribed'])(
    'accepts %s',
    (s) => expect(AbandonedCartStatusVO.create(s).value).toBe(s),
  );

  it('throws on invalid', () => {
    expect(() => AbandonedCartStatusVO.create('bogus')).toThrow(ValidationError);
  });

  it('pending() factory', () => {
    expect(AbandonedCartStatusVO.pending().value).toBe('pending');
  });

  it('all predicates', () => {
    expect(AbandonedCartStatusVO.pending().isPending()).toBe(true);
    expect(AbandonedCartStatusVO.create('reminded').isReminded()).toBe(true);
    expect(AbandonedCartStatusVO.create('recovered').isRecovered()).toBe(true);
    expect(AbandonedCartStatusVO.create('lost').isLost()).toBe(true);
    expect(AbandonedCartStatusVO.create('unsubscribed').isUnsubscribed()).toBe(true);
  });

  it('isRecoverable() for pending/reminded', () => {
    expect(AbandonedCartStatusVO.pending().isRecoverable()).toBe(true);
    expect(AbandonedCartStatusVO.create('reminded').isRecoverable()).toBe(true);
    expect(AbandonedCartStatusVO.create('recovered').isRecoverable()).toBe(false);
  });

  it('isFinal()', () => {
    expect(AbandonedCartStatusVO.create('recovered').isFinal()).toBe(true);
    expect(AbandonedCartStatusVO.create('lost').isFinal()).toBe(true);
    expect(AbandonedCartStatusVO.create('unsubscribed').isFinal()).toBe(true);
    expect(AbandonedCartStatusVO.pending().isFinal()).toBe(false);
  });

  it('reconstitute()', () => {
    expect(AbandonedCartStatusVO.reconstitute('pending').value).toBe('pending');
  });
});
