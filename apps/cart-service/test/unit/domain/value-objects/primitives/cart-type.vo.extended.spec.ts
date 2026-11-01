/**
 * CartTypeVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartTypeVO — extended', () => {
  it.each(['guest', 'user', 'wishlist', 'saved', 'subscription'])(
    'accepts %s',
    (t) => expect(CartTypeVO.create(t).value).toBe(t),
  );

  it('throws on non-string', () => {
    expect(() => CartTypeVO.create(123 as never)).toThrow(ValidationError);
  });

  it('all predicates', () => {
    expect(CartTypeVO.guest().isGuest()).toBe(true);
    expect(CartTypeVO.user().isUser()).toBe(true);
    expect(CartTypeVO.create('wishlist').isWishlist()).toBe(true);
    expect(CartTypeVO.create('saved').isSaved()).toBe(true);
    expect(CartTypeVO.create('subscription').isSubscription()).toBe(true);
  });

  it('requiresUser()', () => {
    expect(CartTypeVO.user().requiresUser()).toBe(true);
    expect(CartTypeVO.guest().requiresUser()).toBe(false);
  });

  it('reconstitute()', () => {
    expect(CartTypeVO.reconstitute('user').value).toBe('user');
  });
});
