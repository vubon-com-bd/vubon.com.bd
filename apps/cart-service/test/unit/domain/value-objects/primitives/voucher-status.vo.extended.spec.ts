/**
 * VoucherStatusVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { VoucherStatusVO } from '@domain/value-objects/primitives/voucher-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VoucherStatusVO — extended', () => {
  it.each(['active', 'inactive', 'redeemed', 'expired', 'cancelled', 'scheduled'])(
    'accepts %s',
    (s) => expect(VoucherStatusVO.create(s).value).toBe(s),
  );

  it('throws on invalid', () => {
    expect(() => VoucherStatusVO.create('bogus')).toThrow(ValidationError);
  });

  it('active() factory', () => {
    expect(VoucherStatusVO.active().value).toBe('active');
  });

  it('all predicates', () => {
    expect(VoucherStatusVO.active().isActiveStatus()).toBe(true);
    expect(VoucherStatusVO.create('inactive').isInactive()).toBe(true);
    expect(VoucherStatusVO.create('redeemed').isRedeemed()).toBe(true);
    expect(VoucherStatusVO.create('expired').isExpired()).toBe(true);
    expect(VoucherStatusVO.create('cancelled').isCancelled()).toBe(true);
    expect(VoucherStatusVO.create('scheduled').isScheduled()).toBe(true);
  });

  it('isRedeemable()', () => {
    expect(VoucherStatusVO.active().isRedeemable()).toBe(true);
    expect(VoucherStatusVO.create('expired').isRedeemable()).toBe(false);
  });

  it('isFinal() for redeemed/expired/cancelled', () => {
    expect(VoucherStatusVO.create('redeemed').isFinal()).toBe(true);
    expect(VoucherStatusVO.create('expired').isFinal()).toBe(true);
    expect(VoucherStatusVO.create('cancelled').isFinal()).toBe(true);
    expect(VoucherStatusVO.active().isFinal()).toBe(false);
  });

  it('state machine transitions', () => {
    expect(VoucherStatusVO.active().canTransitionTo('redeemed')).toBe(true);
    expect(VoucherStatusVO.create('redeemed').canTransitionTo('active')).toBe(false);
  });

  it('reconstitute()', () => {
    expect(VoucherStatusVO.reconstitute('active').value).toBe('active');
  });
});
