/**
 * TokenTypeVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { InvalidTokenTypeError } from '@domain/errors/token.errors.js';

describe('TokenTypeVO', () => {
  describe('create()', () => {
    it('should create all valid types', () => {
      for (const t of ['access', 'refresh', 'id', 'reset', 'verify', 'invite', 'api']) {
        expect(TokenTypeVO.create(t).value).toBe(t);
      }
    });

    it('should normalize case', () => {
      expect(TokenTypeVO.create(' ACCESS ').value).toBe('access');
    });

    it('should throw on invalid', () => {
      expect(() => TokenTypeVO.create('xxx')).toThrow(InvalidTokenTypeError);
    });

    it('should throw on empty', () => {
      expect(() => TokenTypeVO.create('')).toThrow(InvalidTokenTypeError);
    });
  });

  describe('static factories', () => {
    it('access/refresh/id/reset/verify/invite/api', () => {
      expect(TokenTypeVO.access().value).toBe('access');
      expect(TokenTypeVO.refresh().value).toBe('refresh');
      expect(TokenTypeVO.id().value).toBe('id');
      expect(TokenTypeVO.reset().value).toBe('reset');
      expect(TokenTypeVO.verify().value).toBe('verify');
      expect(TokenTypeVO.invite().value).toBe('invite');
      expect(TokenTypeVO.api().value).toBe('api');
    });
  });

  describe('predicates', () => {
    it('isAccess()', () => {
      expect(TokenTypeVO.access().isAccess()).toBe(true);
      expect(TokenTypeVO.refresh().isAccess()).toBe(false);
    });

    it('isRefresh()', () => {
      expect(TokenTypeVO.refresh().isRefresh()).toBe(true);
      expect(TokenTypeVO.access().isRefresh()).toBe(false);
    });

    it('isId()', () => {
      expect(TokenTypeVO.id().isId()).toBe(true);
      expect(TokenTypeVO.access().isId()).toBe(false);
    });

    it('isReset()', () => {
      expect(TokenTypeVO.reset().isReset()).toBe(true);
    });

    it('isVerify()', () => {
      expect(TokenTypeVO.verify().isVerify()).toBe(true);
    });

    it('isInvite()', () => {
      expect(TokenTypeVO.invite().isInvite()).toBe(true);
    });

    it('isApi()', () => {
      expect(TokenTypeVO.api().isApi()).toBe(true);
    });

    it('isShortLived() for access + id', () => {
      expect(TokenTypeVO.access().isShortLived()).toBe(true);
      expect(TokenTypeVO.id().isShortLived()).toBe(true);
      expect(TokenTypeVO.refresh().isShortLived()).toBe(false);
    });

    it('isLongLived() for refresh + api', () => {
      expect(TokenTypeVO.refresh().isLongLived()).toBe(true);
      expect(TokenTypeVO.api().isLongLived()).toBe(true);
      expect(TokenTypeVO.access().isLongLived()).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(TokenTypeVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
