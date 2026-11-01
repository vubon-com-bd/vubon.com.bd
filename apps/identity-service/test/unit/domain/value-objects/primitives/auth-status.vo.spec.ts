/**
 * AuthStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { AuthStatusVO } from '@domain/value-objects/primitives/auth-status.vo.js';
import { InvalidAuthStatusError } from '@domain/errors/auth.errors.js';

describe('AuthStatusVO', () => {
  describe('create()', () => {
    it('should create each valid status', () => {
      for (const s of ['pending', 'active', 'inactive', 'locked', 'unverified', 'expired', 'revoked']) {
        expect(AuthStatusVO.create(s).value).toBe(s);
      }
    });

    it('should normalize case + trim', () => {
      expect(AuthStatusVO.create(' ACTIVE ').value).toBe('active');
    });

    it('should throw on invalid status', () => {
      expect(() => AuthStatusVO.create('xxx')).toThrow(InvalidAuthStatusError);
    });
  });

  describe('static factories', () => {
    it('pending/active/inactive/locked/unverified/expired/revoked', () => {
      expect(AuthStatusVO.pending().value).toBe('pending');
      expect(AuthStatusVO.active().value).toBe('active');
      expect(AuthStatusVO.inactive().value).toBe('inactive');
      expect(AuthStatusVO.locked().value).toBe('locked');
      expect(AuthStatusVO.unverified().value).toBe('unverified');
      expect(AuthStatusVO.expired().value).toBe('expired');
      expect(AuthStatusVO.revoked().value).toBe('revoked');
    });
  });

  describe('predicates', () => {
    it('isActive()', () => {
      expect(AuthStatusVO.active().isActive()).toBe(true);
      expect(AuthStatusVO.pending().isActive()).toBe(false);
    });

    it('isFinal()', () => {
      expect(AuthStatusVO.revoked().isFinal()).toBe(true);
      expect(AuthStatusVO.expired().isFinal()).toBe(true);
      expect(AuthStatusVO.active().isFinal()).toBe(false);
    });

    it('isUsable()', () => {
      expect(AuthStatusVO.active().isUsable()).toBe(true);
      expect(AuthStatusVO.inactive().isUsable()).toBe(true);
      expect(AuthStatusVO.locked().isUsable()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → active allowed', () => {
      expect(AuthStatusVO.pending().canTransitionTo('active')).toBe(true);
    });
    it('revoked → anything false', () => {
      expect(AuthStatusVO.revoked().canTransitionTo('active')).toBe(false);
    });
    it('active → inactive allowed', () => {
      expect(AuthStatusVO.active().canTransitionTo('inactive')).toBe(true);
    });
    it('active → locked allowed', () => {
      expect(AuthStatusVO.active().canTransitionTo('locked')).toBe(true);
    });
    it('locked → active allowed', () => {
      expect(AuthStatusVO.locked().canTransitionTo('active')).toBe(true);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(AuthStatusVO.reconstitute('whatever').value).toBe('whatever');
    });
  });
});
