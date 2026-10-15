import { describe, it, expect } from '@jest/globals';
import { GuestCartVO } from '@domain/value-objects/composites/guest-cart.vo.js';
import { GuestCartIdVO } from '@domain/value-objects/primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '@domain/value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '@domain/value-objects/primitives/guest-token.vo.js';
import { TEST_IDS, TEST_DATES } from '../../../../fixtures/index.js';

describe('GuestCartVO — getters', () => {
  it('accesses all getters', () => {
    const vo = GuestCartVO.create({
      id: GuestCartIdVO.create(TEST_IDS.GUEST_CART_ID),
      token: GuestTokenVO.create('guest-token-1234567890'),
      status: GuestCartStatusVO.active(),
      itemCount: 2,
      createdAt: TEST_DATES.NOW,
      expiresAt: TEST_DATES.NEXT_WEEK,
    });

    expect(vo.id.value).toBe(TEST_IDS.GUEST_CART_ID);
    expect(vo.token.value).toBe('guest-token-1234567890');
    expect(vo.status.value).toBe('active');
    expect(vo.itemCount).toBe(2);
    expect(vo.createdAt).toBe(TEST_DATES.NOW);
    expect(vo.expiresAt).toBe(TEST_DATES.NEXT_WEEK);
    expect(vo.isActive()).toBe(true);
    expect(vo.isExpired()).toBe(false);
    expect(vo.canMerge()).toBe(true);
  });

  it('canMerge false if empty', () => {
    const vo = GuestCartVO.create({
      id: GuestCartIdVO.create(TEST_IDS.GUEST_CART_ID),
      token: GuestTokenVO.create('guest-token-1234567890'),
      status: GuestCartStatusVO.active(),
      itemCount: 0,
      createdAt: TEST_DATES.NOW,
      expiresAt: TEST_DATES.NEXT_WEEK,
    });
    expect(vo.canMerge()).toBe(false);
  });

  it('isExpired with past date', () => {
    const vo = GuestCartVO.create({
      id: GuestCartIdVO.create(TEST_IDS.GUEST_CART_ID),
      token: GuestTokenVO.create('guest-token-1234567890'),
      status: GuestCartStatusVO.active(),
      itemCount: 2,
      createdAt: TEST_DATES.YESTERDAY,
      expiresAt: TEST_DATES.YESTERDAY,
    });
    expect(vo.isExpired()).toBe(true);
  });
});
