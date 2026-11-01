/**
 * CartTypeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartTypeVO', () => {
  describe('create()', () => {
    it.each(['guest', 'user', 'wishlist', 'saved', 'subscription'])(
      'should accept "%s"',
      (t) => {
        expect(CartTypeVO.create(t).value).toBe(t);
      },
    );

    it('should throw on invalid type', () => {
      expect(() => CartTypeVO.create('bogus')).toThrow(ValidationError);
    });
  });

  describe('factory', () => {
    it('guest()', () => expect(CartTypeVO.guest().value).toBe('guest'));
    it('user()', () => expect(CartTypeVO.user().value).toBe('user'));
  });

  describe('predicates', () => {
    it('isGuest()', () => {
      expect(CartTypeVO.guest().isGuest()).toBe(true);
      expect(CartTypeVO.user().isGuest()).toBe(false);
    });
    it('isUser()', () => {
      expect(CartTypeVO.user().isUser()).toBe(true);
      expect(CartTypeVO.guest().isUser()).toBe(false);
    });
    it('requiresUser() opposite of guest', () => {
      expect(CartTypeVO.guest().requiresUser()).toBe(false);
      expect(CartTypeVO.user().requiresUser()).toBe(true);
    });
  });
});
