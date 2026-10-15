/**
 * GuestCartStatusVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { GuestCartStatusVO } from '@domain/value-objects/primitives/guest-cart-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('GuestCartStatusVO — extended', () => {
  it.each(['active', 'expired', 'merged', 'abandoned'])(
    'accepts %s',
    (s) => expect(GuestCartStatusVO.create(s).value).toBe(s),
  );

  it('throws on invalid', () => {
    expect(() => GuestCartStatusVO.create('bogus')).toThrow(ValidationError);
  });

  it('active() factory', () => {
    expect(GuestCartStatusVO.active().value).toBe('active');
  });

  it('all predicates', () => {
    expect(GuestCartStatusVO.active().isActiveStatus()).toBe(true);
    expect(GuestCartStatusVO.create('expired').isExpired()).toBe(true);
    expect(GuestCartStatusVO.create('merged').isMerged()).toBe(true);
    expect(GuestCartStatusVO.create('abandoned').isAbandoned()).toBe(true);
  });

  it('isFinal() for expired/merged', () => {
    expect(GuestCartStatusVO.create('expired').isFinal()).toBe(true);
    expect(GuestCartStatusVO.create('merged').isFinal()).toBe(true);
    expect(GuestCartStatusVO.active().isFinal()).toBe(false);
  });

  it('state machine', () => {
    expect(GuestCartStatusVO.active().canTransitionTo('merged')).toBe(true);
    expect(GuestCartStatusVO.create('expired').canTransitionTo('active')).toBe(false);
  });

  it('reconstitute()', () => {
    expect(GuestCartStatusVO.reconstitute('active').value).toBe('active');
  });
});
