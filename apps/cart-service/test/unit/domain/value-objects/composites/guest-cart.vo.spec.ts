import { describe, it, expect } from '@jest/globals';
import { GuestCartVO } from '@domain/value-objects/composites/guest-cart.vo.js';
import { GuestCartIdVO } from '@domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '@domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '@domain/value-objects/primitives/guest-token.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES } from '../../../../fixtures/index.js';

describe('GuestCartVO', () => {
  const makeProps = () => ({
    id: GuestCartIdVO.create(TEST_IDS.GUEST_CART_ID),
    token: GuestTokenVO.create('guest-token-1234567890'),
    status: GuestCartStatusVO.active(),
    itemCount: 2,
    createdAt: TEST_DATES.NOW,
    expiresAt: TEST_DATES.NEXT_WEEK,
  });

  it('create() works', () => {
    const vo = GuestCartVO.create(makeProps());
    expect(vo.isActive()).toBe(true);
    expect(vo.canMerge()).toBe(true);
    expect(vo.isExpired()).toBe(false);
  });

  it('canMerge() false if empty', () => {
    const vo = GuestCartVO.create({ ...makeProps(), itemCount: 0 });
    expect(vo.canMerge()).toBe(false);
  });

  it('throws on negative itemCount', () => {
    expect(() => GuestCartVO.create({ ...makeProps(), itemCount: -1 })).toThrow(ValidationError);
  });
});
