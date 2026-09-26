/**
 * TokenTypeVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { TokenTypeVO } from './token-type.vo';
import { InvalidTokenError } from '../../errors/token.errors';

describe('TokenTypeVO', () => {
  describe('of()', () => {
    it('should accept all valid types', () => {
      const types = ['access', 'refresh', 'id', 'password_reset', 'email_verification', 'invite', 'api_key'];
      types.forEach((t) => {
        const vo = TokenTypeVO.of(t);
        expect(vo.value).toBe(t);
      });
    });

    it('should reject unknown type', () => {
      expect(() => TokenTypeVO.of('session')).toThrow(InvalidTokenError);
      expect(() => TokenTypeVO.of('')).toThrow(InvalidTokenError);
    });
  });

  describe('isShortLived()', () => {
    it('should return true for access', () => {
      expect(TokenTypeVO.of('access').isShortLived()).toBe(true);
    });

    it('should return true for id', () => {
      expect(TokenTypeVO.of('id').isShortLived()).toBe(true);
    });

    it('should return false for refresh', () => {
      expect(TokenTypeVO.of('refresh').isShortLived()).toBe(false);
    });

    it('should return false for api_key', () => {
      expect(TokenTypeVO.of('api_key').isShortLived()).toBe(false);
    });
  });

  describe('isRefreshLike()', () => {
    it('should return true only for refresh', () => {
      expect(TokenTypeVO.of('refresh').isRefreshLike()).toBe(true);
      ['access', 'id', 'password_reset', 'api_key'].forEach((t) => {
        expect(TokenTypeVO.of(t).isRefreshLike()).toBe(false);
      });
    });
  });
});
