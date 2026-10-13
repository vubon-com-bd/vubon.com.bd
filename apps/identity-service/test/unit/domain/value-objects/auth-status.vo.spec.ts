/**
 * AuthStatusVO — Unit Tests
 * @module identity-service/test/unit/domain/value-objects
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { AuthStatusVO } from '../../../../src/module/domain/value-objects/primitives/auth-status.vo.js';

describe('AuthStatusVO', () => {
  describe('create()', () => {
    it('should create with valid status "active"', () => {
      const vo = AuthStatusVO.create('active');
      expect(vo.value).toBe('active');
      expect(vo.isActive()).toBe(true);
    });

    it('should create with valid status "pending"', () => {
      const vo = AuthStatusVO.create('pending');
      expect(vo.isPending()).toBe(true);
    });

    it('should normalize case to lowercase', () => {
      const vo = AuthStatusVO.create('ACTIVE');
      expect(vo.value).toBe('active');
    });

    it('should trim whitespace', () => {
      const vo = AuthStatusVO.create('  active  ');
      expect(vo.value).toBe('active');
    });

    it('should throw for invalid status', () => {
      expect(() => AuthStatusVO.create('invalid')).toThrow();
    });

    it('should throw for empty string', () => {
      expect(() => AuthStatusVO.create('')).toThrow();
    });
  });

  describe('static factories', () => {
    it('pending() returns pending status', () => {
      expect(AuthStatusVO.pending().value).toBe('pending');
    });

    it('active() returns active status', () => {
      expect(AuthStatusVO.active().value).toBe('active');
    });

    it('locked() returns locked status', () => {
      expect(AuthStatusVO.locked().value).toBe('locked');
    });

    it('revoked() returns revoked status', () => {
      expect(AuthStatusVO.revoked().value).toBe('revoked');
    });

    it('expired() returns expired status', () => {
      expect(AuthStatusVO.expired().value).toBe('expired');
    });
  });

  describe('predicates', () => {
    it('isFinal() true for revoked/expired', () => {
      expect(AuthStatusVO.revoked().isFinal()).toBe(true);
      expect(AuthStatusVO.expired().isFinal()).toBe(true);
      expect(AuthStatusVO.active().isFinal()).toBe(false);
    });

    it('isUsable() true for active/inactive', () => {
      expect(AuthStatusVO.active().isUsable()).toBe(true);
      expect(AuthStatusVO.inactive().isUsable()).toBe(true);
      expect(AuthStatusVO.revoked().isUsable()).toBe(false);
    });
  });

  describe('state machine — canTransitionTo()', () => {
    it('pending → active allowed', () => {
      expect(AuthStatusVO.pending().canTransitionTo('active')).toBe(true);
    });

    it('pending → unverified allowed', () => {
      expect(AuthStatusVO.pending().canTransitionTo('unverified')).toBe(true);
    });

    it('active → locked allowed', () => {
      expect(AuthStatusVO.active().canTransitionTo('locked')).toBe(true);
    });

    it('revoked → anything not allowed (terminal)', () => {
      expect(AuthStatusVO.revoked().canTransitionTo('active')).toBe(false);
    });

    it('expired → anything not allowed (terminal)', () => {
      expect(AuthStatusVO.expired().canTransitionTo('active')).toBe(false);
    });

    it('active → pending not allowed', () => {
      expect(AuthStatusVO.active().canTransitionTo('pending')).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('should create without validation', () => {
      const vo = AuthStatusVO.reconstitute('active');
      expect(vo.value).toBe('active');
    });
  });

  describe('equality', () => {
    it('same status should be equal', () => {
      const a = AuthStatusVO.active();
      const b = AuthStatusVO.active();
      expect(a.equals(b)).toBe(true);
    });

    it('different status not equal', () => {
      expect(AuthStatusVO.active().equals(AuthStatusVO.pending())).toBe(false);
    });
  });
});
