/**
 * SessionStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SessionStatusVO', () => {
  describe('create()', () => {
    it('should create all valid', () => {
      for (const s of ['active', 'idle', 'expired', 'revoked']) {
        expect(SessionStatusVO.create(s).value).toBe(s);
      }
    });

    it('should normalize case', () => {
      expect(SessionStatusVO.create(' ACTIVE ').value).toBe('active');
    });

    it('should throw on empty', () => {
      expect(() => SessionStatusVO.create('')).toThrow(ValidationError);
    });

    it('should throw on invalid', () => {
      expect(() => SessionStatusVO.create('xxx')).toThrow(ValidationError);
    });
  });

  describe('static factories', () => {
    it('active/idle/expired/revoked', () => {
      expect(SessionStatusVO.active().value).toBe('active');
      expect(SessionStatusVO.idle().value).toBe('idle');
      expect(SessionStatusVO.expired().value).toBe('expired');
      expect(SessionStatusVO.revoked().value).toBe('revoked');
    });
  });

  describe('predicates', () => {
    it('isActive', () => {
      expect(SessionStatusVO.active().isActive()).toBe(true);
      expect(SessionStatusVO.idle().isActive()).toBe(false);
    });

    it('isIdle', () => {
      expect(SessionStatusVO.idle().isIdle()).toBe(true);
      expect(SessionStatusVO.active().isIdle()).toBe(false);
    });

    it('isExpired', () => {
      expect(SessionStatusVO.expired().isExpired()).toBe(true);
      expect(SessionStatusVO.active().isExpired()).toBe(false);
    });

    it('isRevoked', () => {
      expect(SessionStatusVO.revoked().isRevoked()).toBe(true);
      expect(SessionStatusVO.active().isRevoked()).toBe(false);
    });

    it('isFinal', () => {
      expect(SessionStatusVO.expired().isFinal()).toBe(true);
      expect(SessionStatusVO.revoked().isFinal()).toBe(true);
      expect(SessionStatusVO.active().isFinal()).toBe(false);
    });

    it('isUsable', () => {
      expect(SessionStatusVO.active().isUsable()).toBe(true);
      expect(SessionStatusVO.idle().isUsable()).toBe(true);
      expect(SessionStatusVO.expired().isUsable()).toBe(false);
      expect(SessionStatusVO.revoked().isUsable()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('active → idle/expired/revoked', () => {
      expect(SessionStatusVO.active().canTransitionTo('idle')).toBe(true);
      expect(SessionStatusVO.active().canTransitionTo('expired')).toBe(true);
      expect(SessionStatusVO.active().canTransitionTo('revoked')).toBe(true);
    });

    it('idle → active/expired/revoked', () => {
      expect(SessionStatusVO.idle().canTransitionTo('active')).toBe(true);
      expect(SessionStatusVO.idle().canTransitionTo('expired')).toBe(true);
    });

    it('revoked → nothing', () => {
      expect(SessionStatusVO.revoked().canTransitionTo('active')).toBe(false);
      expect(SessionStatusVO.revoked().canTransitionTo('idle')).toBe(false);
    });

    it('expired → nothing', () => {
      expect(SessionStatusVO.expired().canTransitionTo('active')).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(SessionStatusVO.reconstitute('anything').value).toBe('anything');
    });
  });
});
